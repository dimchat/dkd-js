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

//! require 'secure.js'

(function (ns) {
    'use strict';

    var Interface = ns.type.Interface;
    var SecureMessage = ns.protocol.SecureMessage;

    var general_factory = function () {
        var man = ns.dkd.FactoryManager;
        return man.generalFactory;
    };

    var ReliableMessage = Interface(null, [SecureMessage]);

    ReliableMessage.prototype.getSignature = function () {
        throw new Error('NotImplemented');
    };

    /**
     *  Sender's Meta
     *  ~~~~~~~~~~~~~
     *  Extends for the first message package of 'Handshake' protocol.
     *
     * @return {Meta}
     */
    ReliableMessage.prototype.getMeta = function () {
        throw new Error('NotImplemented');
    };
    ReliableMessage.prototype.setMeta = function (meta) {
        throw new Error('NotImplemented');
    };

    /**
     *  Sender's Visa
     *  ~~~~~~~~~~~~~
     *  Extends for the first message package of 'Handshake' protocol.
     *
     * @return {Visa}
     */
    ReliableMessage.prototype.getVisa = function () {
        throw new Error('NotImplemented');
    };
    ReliableMessage.prototype.setVisa = function (doc) {
        throw new Error('NotImplemented');
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
        throw new Error('NotImplemented');
    };

    /**
     *  Message Delegate
     *  ~~~~~~~~~~~~~~~~
     */
    var ReliableMessageDelegate = Interface(null, [SecureMessage.Delegate]);

    /**
     *  1. Decode 'message.signature' from String (Base64)
     *
     * @param {String} signature - Base64 string
     * @param {ReliableMessage} rMsg - reliable message
     * @returns {Uint8Array} signature
     */
    ReliableMessageDelegate.prototype.decodeSignature = function (signature, rMsg) {
        throw new Error('NotImplemented');
    };

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
        throw new Error('NotImplemented');
    };

    ReliableMessage.Delegate = ReliableMessageDelegate;

    /**
     *  Message Factory
     *  ~~~~~~~~~~~~~~~
     */
    var ReliableMessageFactory = Interface(null, null);

    ReliableMessageFactory.prototype.parseReliableMessage = function (msg) {
        throw new Error('NotImplemented');
    };

    ReliableMessage.Factory = ReliableMessageFactory;

    ReliableMessage.getFactory = function () {
        var gf = general_factory();
        return gf.getReliableMessageFactory();
    };
    ReliableMessage.setFactory = function (factory) {
        var gf = general_factory();
        gf.setReliableMessageFactory(factory);
    };

    /**
     *  Parse map object to message
     *
     * @param {*} msg - message info
     * @return {ReliableMessage}
     */
    ReliableMessage.parse = function (msg) {
        var gf = general_factory();
        return gf.parseReliableMessage(msg);
    };

    //-------- namespace --------
    ns.protocol.ReliableMessage = ReliableMessage;

})(DaoKeDao);
