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
 *  Reliable Message signed by an asymmetric key
 *  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *  This class is used to sign the SecureMessage
 *  It contains a 'signature' field which signed with sender's private key
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
 *      },
 *      //-- signature
 *      signature: "..."   // base64_encode()
 *  }
 */

//! require <mkm.js>
//! require 'secure.js'

(function (ns) {
    'use strict';

    var Meta = ns.protocol.Meta;
    var Document = ns.protocol.Document;
    var SecureMessage = ns.protocol.SecureMessage;

    var ReliableMessage = function () {};
    ns.Interface(ReliableMessage, [SecureMessage]);

    ReliableMessage.prototype.getSignature = function () {
        console.assert(false, 'implement me!');
        return null;
    };

    /**
     *  Sender's Meta
     *  ~~~~~~~~~~~~~
     *  Extends for the first message package of 'Handshake' protocol.
     *
     * @return {Meta}
     */
    ReliableMessage.prototype.getMeta = function () {
        console.assert(false, 'implement me!');
        return null;
    };
    ReliableMessage.prototype.setMeta = function (meta) {
        console.assert(false, 'implement me!');
        return null;
    };
    ReliableMessage.getMeta = function (msg) {
        return Meta.parse(msg['meta']);
    }
    ReliableMessage.setMeta = function (meta, msg) {
        if (meta) {
            msg['meta'] = meta.toMap();
        } else {
            delete msg['meta'];
        }
    }

    /**
     *  Sender's Visa
     *  ~~~~~~~~~~~~~
     *  Extends for the first message package of 'Handshake' protocol.
     *
     * @return {Visa}
     */
    ReliableMessage.prototype.getVisa = function () {
        console.assert(false, 'implement me!');
        return null;
    };
    ReliableMessage.prototype.setVisa = function (doc) {
        console.assert(false, 'implement me!');
        return null;
    };
    ReliableMessage.getVisa = function (msg) {
        return Document.parse(msg['visa']);
    };
    ReliableMessage.setVisa = function (doc, msg) {
        if (doc) {
            msg['visa'] = doc.toMap();
        } else {
            delete msg['visa'];
        }
    };

    /*
     *  Verify the Reliable Message to Secure Message
     *
     *    +----------+      +----------+
     *    | sender   |      | sender   |
     *    | receiver |      | receiver |
     *    | time     |  ->  | time     |
     *    |          |      |          |
     *    | data     |      | data     |  1. verify(data, signature, sender.PK)
     *    | key/keys |      | key/keys |
     *    | signature|      +----------+
     *    +----------+
     */

    /**
     *  Verify 'data' and 'signature' field with sender's public key
     *
     * @return {SecureMessage}
     */
    ReliableMessage.prototype.verify = function () {
        console.assert(false, 'implement me!');
        return null;
    };

    /**
     *  Message Delegate
     *  ~~~~~~~~~~~~~~~~
     */
    var ReliableMessageDelegate = function () {};
    ns.Interface(ReliableMessageDelegate, [SecureMessage.Delegate])

    // noinspection JSUnusedLocalSymbols
    /**
     *  1. Decode 'message.signature' from String (Base64)
     *
     * @param {String} signature - Base64 string
     * @param {ReliableMessage} rMsg - reliable message
     * @returns {Uint8Array} signature
     */
    ReliableMessageDelegate.prototype.decodeSignature = function (signature, rMsg) {
        console.assert(false, 'implement me!');
        return null;
    };

    // noinspection JSUnusedLocalSymbols
    /**
     *  2. Verify the message data and signature with sender's public key
     *
     * @param {Uint8Array} data - message content(encrypted) data
     * @param {Uint8Array} signature - signature for message content(encrypted) data
     * @param {String} sender - sender ID/string
     * @param {ReliableMessage} rMsg - reliable message
     * @returns {boolean} true on signature matched
     */
    ReliableMessageDelegate.prototype.verifyDataSignature = function (data, signature, sender, rMsg) {
        console.assert(false, 'implement me!');
        return false;
    };

    ReliableMessage.Delegate = ReliableMessageDelegate;

    /**
     *  Message Factory
     *  ~~~~~~~~~~~~~~~
     */
    var ReliableMessageFactory = function () {};
    ns.Interface(ReliableMessageFactory, null)

    // noinspection JSUnusedLocalSymbols
    ReliableMessageFactory.prototype.parseReliableMessage = function (msg) {
        console.assert(false, 'implement me!');
        return null;
    };

    ReliableMessage.Factory = ReliableMessageFactory;

    //
    //  Instance of ReliableMessageFactory
    //
    var s_reliable_factory = null;

    ReliableMessage.getFactory = function () {
        return s_reliable_factory;
    };
    ReliableMessage.setFactory = function (factory) {
        s_reliable_factory = factory;
    };

    /**
     *  Parse map object to message
     *
     * @param {*} msg - message info
     * @return {ReliableMessage}
     */
    ReliableMessage.parse = function (msg) {
        if (!msg) {
            return null;
        } else if (ns.Interface.conforms(msg, ReliableMessage)) {
            return msg;
        }
        msg = ns.type.Wrapper.fetchMap(msg);
        var factory = ReliableMessage.getFactory();
        return factory.parseReliableMessage(msg);
    };

    //-------- namespace --------
    ns.protocol.ReliableMessage = ReliableMessage;

    ns.protocol.registers('ReliableMessage');

})(DaoKeDao);
