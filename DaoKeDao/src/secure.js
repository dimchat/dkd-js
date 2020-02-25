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
 *  Secure Message
 *  ~~~~~~~~~~~~~~
 *  Instant Message encrypted by a symmetric key
 *
 *  data format: {
 *      //-- envelope
 *      sender   : "moki@xxx",
 *      receiver : "hulk@yyy",
 *      time     : 123,
 *      //-- content data and key/keys
 *      data     : "...",  // base64_encode(symmetric)
 *      key      : "...",  // base64_encode(asymmetric)
 *      keys     : {
 *          "ID1": "key1", // base64_encode(asymmetric)
 *      }
 *  }
 */

//! require 'message.js'
//! require 'instant.js'

!function (ns) {
    'use strict';

    var Message = ns.Message;

    /**
     *  Create secure message
     *
     * @param msg {{}} - message info with envelope, data, key/keys
     * @constructor
     */
    var SecureMessage = function (msg) {
        Message.call(this, msg);
    };
    ns.Class(SecureMessage, Message);

    /**
     *  Get encrypted message content data
     *
     * @returns {Uint8Array}
     */
    SecureMessage.prototype.getData = function () {
        var base64 = this.getValue('data');
        return this.delegate.decodeData(base64, this);
    };

    /**
     *  Get encrypted key data for receiver
     *
     * @returns {Uint8Array}
     */
    SecureMessage.prototype.getKey = function () {
        var base64 = this.getValue('key');
        if (!base64) {
            // check 'keys'
            var keys = this.getKeys();
            if (keys) {
                base64 = keys[this.envelope.receiver];
            }
        }
        if (base64) {
            return this.delegate.decodeKey(base64, this);
        } else {
            return null;
        }
    };

    /**
     *  Get encrypted keys for group members
     *
     * @returns {{}}
     */
    SecureMessage.prototype.getKeys = function () {
        return this.getValue('keys');
    };

    SecureMessage.getInstance = function (msg) {
        if (!msg) {
            return null;
        }
        if (msg.hasOwnProperty('signature')) {
            // this should be a reliable message
            return ns.ReliableMessage.getInstance(msg);
        }
        if (msg instanceof SecureMessage) {
            return msg;
        }
        return new SecureMessage(msg);
    };

    /*
     *  Decrypt the Secure Message to Instant Message
     *
     *    +----------+      +----------+
     *    | sender   |      | sender   |
     *    | receiver |      | receiver |
     *    | time     |  ->  | time     |
     *    |          |      |          |  1. PW      = decrypt(key, receiver.SK)
     *    | data     |      | content  |  2. content = decrypt(data, PW)
     *    | key/keys |      +----------+
     *    +----------+
     */

    /**
     *  Decrypt message, replace encrypted 'data' with 'content' field
     *
     * @returns {InstantMessage}
     */
    SecureMessage.prototype.decrypt = function () {
        var sender = this.envelope.sender;
        var receiver = this.envelope.receiver;
        var group = this.envelope.getGroup();
        // 1. decrypt 'message.key' to symmetric key
        // 1.1. decode encrypted key data
        var key = this.getKey();
        // 1.2. decrypt key data
        //      if key is empty, means it should be reused, get it from key cache
        var password;
        if (group) {
            // group message
            password = this.delegate.decryptKey(key, sender, group, this);
        } else {
            // personal message
            password = this.delegate.decryptKey(key, sender, receiver, this);
        }
        // 2. decrypt 'message.data' to 'message.content'
        // 2.1. decode encrypted content data
        var data = this.getData();
        // 2.2. decrypt & deserialize content data
        var content = this.delegate.decryptContent(data, password, this);
        // 2.3. check attachment for File/Image/Audio/Video message content
        //      if file data not download yet,
        //          decrypt file data with password;
        //      else,
        //          save password to 'message.content.password'.
        //      (do it in 'core' module)
        if (!content) {
            throw Error('failed to decrypt message data: ' + this);
        }
        // 3. pack message
        var msg = this.getMap(true);
        delete msg['key'];
        delete msg['keys'];
        delete msg['data'];
        msg['content'] = content;
        return new ns.InstantMessage(msg);
    };

    /**
     *  Sign message.data, add 'signature' field
     *
     * @returns {ReliableMessage}
     */
    SecureMessage.prototype.sign = function () {
        var sender = this.envelope.sender;
        // 1. sign with sender's private key
        var signature = this.delegate.signData(this.getData(), sender, this);
        var base64 = this.delegate.encodeSignature(signature, this);
        // 2. pack message
        var msg = this.getMap(true);
        msg['signature'] = base64;
        return new ns.ReliableMessage(msg);
    };

    /*
     *  Split/Trim group message
     *
     *  for each members, get key from 'keys' and replace 'receiver' to member ID
     */

    /**
     *  Split the group message to single person messages
     *
     * @param members {String[]} - group members ID/string list
     * @returns {SecureMessage[]}
     */
    SecureMessage.prototype.split = function (members) {
        // check reliable
        var reliable = this instanceof ns.ReliableMessage;
        // get 'keys' for members
        var keys = this.getKeys();

        // 1. move the receiver(group ID) to 'group'
        //    this will help the receiver knows the group ID
        //    when the group message separated to multi-messages;
        //    if don't want the others know your membership,
        //    DON'T do this.
        var group = this.envelope.receiver;

        var messages = [];
        var msg;
        var receiver;
        for (var i = 0; i < members.length; ++i) {
            receiver = members[i];
            msg = this.getMap(true); // copy inner dictionary
            // 2. change 'receiver' for each group member
            msg['receiver'] = receiver;
            msg['group'] = group;
            // 3. get encrypted key
            if (keys) {
                delete msg['keys'];
                msg['key'] = keys[receiver];
            }
            // 4. repack message
            if (reliable) {
                messages.push(new ns.ReliableMessage(msg));
            } else {
                messages.push(new SecureMessage(msg));
            }
        }
        return messages;
    };

    /**
     *  Trim the group message for a member
     *
     * @param member {String} - group member ID/string
     * @returns {ReliableMessage|SecureMessage}
     */
    SecureMessage.prototype.trim = function (member) {
        var msg = this.getMap(true);
        msg['receiver'] = member;
        // check 'keys'
        var keys = this.getKeys();
        if (keys) {
            var base64 = keys[member];
            if (base64) {
                msg['key'] = base64;
            }
            delete msg['keys'];
        }
        // check 'group'
        var group = this.envelope.getGroup();
        if (!group) {
            // if 'group' not exists, the 'receiver' must be a group ID here, and
            // it will not be equal to the member of course,
            // so move 'receiver' to 'group'
            msg['group'] = this.envelope.receiver;
        }
        // repack
        var reliable = this instanceof ns.ReliableMessage;
        if (reliable) {
            return new ns.ReliableMessage(msg);
        } else {
            return new SecureMessage(msg);
        }
    };

    //-------- namespace --------
    ns.SecureMessage = SecureMessage;

    ns.register('SecureMessage');

}(DaoKeDao);
