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

    /**
     *  Create instant message
     *
     * @param {{}} msg - message info with envelope, content
     * @constructor
     */
    var InstantMessage = function (msg) {
        Message.call(this, msg);
        this.content = Content.getInstance(msg['content']);
    };
    ns.Class(InstantMessage, Message, null);

    /**
     *  Generate instant message
     *
     * @param {Content} content - message content info
     * @param {Envelope|String} heads - message envelope info
     * @returns {InstantMessage}
     */
    InstantMessage.newMessage = function (content, heads) {
        var msg;
        var count = arguments.length;
        if (count === 2) {
            var env = Envelope.getInstance(heads);
            msg = env.getMap(true); // copy inner dictionary
        } else if (count === 3 || count === 4) {
            var sender = arguments[1];
            var receiver = arguments[2];
            var time = (count === 4) ? arguments[3] : 0;
            msg = {
                'sender': sender,
                'receiver': receiver,
                'time': time
            }
        } else {
            throw Error('instant message arguments error: ' + arguments);
        }
        msg['content'] = content;
        return new InstantMessage(msg);
    };

    /**
     *  Create instant message
     *
     * @param {{}|Message} msg
     * @returns {InstantMessage}
     */
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
     * @param {SymmetricKey} password
     * @param {String[]} members - group members ID/string list
     * @returns {SecureMessage}
     */
    InstantMessage.prototype.encrypt = function (password, members) {
        // 0. check attachment for File/Image/Audio/Video message content
        //    (do it in 'core' module)
        var msg;

        // 1., 2.
        if (members && members.length > 0) {
            // group message
            msg = encrypt_keys.call(this, password, members);
        } else {
            // personal message
            msg = encrypt_key.call(this, password);
        }

        // 3. pack message
        return new ns.SecureMessage(msg);
    };

    var encrypt_key = function (password) {
        // 1. encrypt 'message.content' to 'message.data'
        var msg = prepare_data.call(this, password);
        // 2. encrypt symmetric key(password) to 'message.key'
        // 2.1. serialize symmetric key
        var key = this.delegate.serializeKey(password, this);
        if (key) {
            // 2.2. encrypt symmetric key
            var receiver = this.envelope.receiver;
            var data = this.delegate.encryptKey(key, receiver, this);
            if (data) {
                // 2.3. encode encrypted key data to Base64
                // 2.4. insert as 'key'
                msg['key'] = this.delegate.encodeKey(data, this);
            }
        }
        return msg;
    };

    var encrypt_keys = function (password, members) {
        // 1. encrypt 'message.content' to 'message.data'
        var msg = prepare_data.call(this, password);
        // 2. encrypt symmetric key(password) to 'message.key'
        // 2.1. serialize symmetric key
        var key = this.delegate.serializeKey(password, this);
        if (key) {
            // encrypt key data to 'message.keys'
            var keys = {};
            var keys_length = 0;
            var member;
            var data;
            for (var i = 0; i < members.length; ++i) {
                member = members[i];
                // 2.2. encrypt symmetric key data
                data = this.delegate.encryptKey(key, member, this);
                if (data) {
                    // 2.3. encode encrypted key data
                    // 2.4. insert to 'message.keys' with member ID
                    keys[member] = this.delegate.encodeKey(data, this);
                    keys_length += 1;
                }
            }
            if (keys_length > 0) {
                msg['keys'] = keys;
            }
        }
        return msg;
    };

    var prepare_data = function (password) {
        // 1. serialize message content
        var data = this.delegate.serializeContent(this.content, password, this);
        // 2. encrypt content data with password
        data = this.delegate.encryptContent(data, password, this);
        // 3. encode encrypted data
        var base64 = this.delegate.encodeData(data, this);
        // 4. replace 'content' with encrypted 'data'
        var msg = this.getMap(true);
        delete msg['content'];
        msg['data'] = base64;
        return msg;
    };

    //-------- namespace --------
    ns.InstantMessage = InstantMessage;

    ns.register('InstantMessage');

}(DaoKeDao);
