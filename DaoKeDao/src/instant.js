;
// license: https://mit-license.org
//
//  Dao-Ke-Dao: Universal Message Module
//
//                               Written in 2020 by Moky <albert.moky@gmail.com>
//
// =============================================================================
// The MIT License (MIT)
//
// Copyright (c) 2020 Albert Moky
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
// =============================================================================
//

/**
 *  Instant Message
 *  ~~~~~~~~~~~~~~~
 *
 *  data format: {
 *      //-- envelope
 *      sender   : "moki@xxx",
 *      receiver : "hulk@yyy",
 *      time     : 123,
 *      //-- content
 *      content  : {...}
 *  }
 */

//! require 'message.js'

!function (ns) {
    'use strict';

    var Envelope = ns.Envelope;
    var Content = ns.Content;
    var Message = ns.Message;
    var SecureMessage = ns.SecureMessage;

    /**
     *  Create instant message
     *
     * @param msg - message info with envelope, content
     * @constructor
     */
    var InstantMessage = function (msg) {
        Message.call(this, msg);
        this.content = Content.getInstance(msg['content']);
    };
    InstantMessage.inherits(Message);

    InstantMessage.newMessage = function (content, envelope) {
        envelope = Envelope.getInstance(envelope);
        var msg = envelope.getMap(); // get inner dictionary
        msg['content'] = content;
        return new InstantMessage(msg);
    };

    InstantMessage.getInstance = function (msg) {
        if (!msg) {
            return null;
        }
        if (msg instanceof InstantMessage) {
            return msg;
        }
        return new InstantMessage(msg);
    };

    /*
     *  Encrypt the Instant Message to Secure Message
     *
     *    +----------+      +----------+
     *    | sender   |      | sender   |
     *    | receiver |      | receiver |
     *    | time     |  ->  | time     |
     *    |          |      |          |
     *    | content  |      | data     |  1. data = encrypt(content, PW)
     *    +----------+      | key/keys |  2. key  = encrypt(PW, receiver.PK)
     *                      +----------+
     */

    /**
     *  Encrypt group message, replace 'content' field with encrypted 'data'
     *
     * @param password - symmetric key
     * @param members - group members
     * @returns {SecureMessage}
     */
    InstantMessage.prototype.encrypt = function (password, members) {
        // 0. check attachment for File/Image/Audio/Video message content
        //    (do it in 'core' module)
        var msg = this.getMap(true);

        // 1. encrypt 'message.content' to 'message.data'
        // 1.1. encrypt message content with password
        var data = this.delegate.encryptContent(this.content, password, this);
        // 1.2. encode encrypted data
        // 1.3. replace 'content' with encrypted 'data'
        msg['data'] = this.delegate.encodeData(data, this);
        delete msg['content'];
        var key; // key data
        // 2. encrypt symmetric key(password) to 'key'/'keys'
        if (members && members.length > 0) {
            // group message
            var keys = {};
            var member;
            for (var i = 0; i < members.length; ++i) {
                member = members[i];
                // 2.1. serialize & encrypt symmetric key
                key = this.delegate.encryptKey(password, member, this);
                if (key) {
                    // 2.2. encode encrypted key data to Base64
                    // 2.3. insert to 'message.keys' with member ID
                    keys[member] = this.delegate.encodeKey(key, this);
                }
            }
            if (keys.length > 0) {
                msg['keys'] = keys;
            }
            // Group ID
            // NOTICE: this help the receiver knows the group ID
            //         when the group message separated to multi-messages,
            //         if don't want the others know you are the group members,
            //         remove it.
            msg['group'] = this.content.getGroup();
        } else {
            // personal message
            var receiver = this.envelope.receiver;
            // 2.1. serialize & encrypt symmetric key
            key = this.delegate.encryptKey(password, receiver, this);
            if (key) {
                // 2.2. encode encrypted key data
                // 2.3. insert as 'key'
                msg['key'] = this.delegate.encodeKey(key, this);
            }
        }

        // 3. pack message
        return new SecureMessage(msg);
    };

    //-------- namespace --------
    ns.InstantMessage = InstantMessage;

}(DIMP);
