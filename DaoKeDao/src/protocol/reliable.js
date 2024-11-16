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

//! require 'secure.js'

(function (ns) {
    'use strict';

    var Interface = ns.type.Interface;
    var SecureMessage = ns.protocol.SecureMessage;

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
     *      data     : "...",  // base64_encode( symmetric_encrypt(content))
     *      key      : "...",  // base64_encode(asymmetric_encrypt(password))
     *      keys     : {
     *          "ID1": "key1", // base64_encode(asymmetric_encrypt(password))
     *      },
     *      //-- signature
     *      signature: "..."   // base64_encode(asymmetric_sign(data))
     *  }
     */
    var ReliableMessage = Interface(null, [SecureMessage]);

    /**
     *  Message Data Signature
     *
     * @return {Uint8Array} sign(data)
     */
    ReliableMessage.prototype.getSignature = function () {};

    //
    //  Factory methods
    //

    var general_factory = function () {
        var man = ns.dkd.MessageFactoryManager;
        return man.generalFactory;
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

    ReliableMessage.getFactory = function () {
        var gf = general_factory();
        return gf.getReliableMessageFactory();
    };
    ReliableMessage.setFactory = function (factory) {
        var gf = general_factory();
        gf.setReliableMessageFactory(factory);
    };

    /**
     *  Message Factory
     *  ~~~~~~~~~~~~~~~
     */
    var ReliableMessageFactory = Interface(null, null);

    /**
     *  Parse map object to message
     *
     * @param {*} msg - message info
     * @return {ReliableMessage}
     */
    ReliableMessageFactory.prototype.parseReliableMessage = function (msg) {};

    ReliableMessage.Factory = ReliableMessageFactory;

    //-------- namespace --------
    ns.protocol.ReliableMessage = ReliableMessage;
    // ns.protocol.ReliableMessageFactory = ReliableMessageFactory;

})(DaoKeDao);
