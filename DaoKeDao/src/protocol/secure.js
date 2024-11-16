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

//! require 'message.js'

(function (ns) {
    'use strict';

    var Interface = ns.type.Interface;
    var Message = ns.protocol.Message;

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
     *      data     : "...",  // base64_encode( symmetric_encrypt(content))
     *      key      : "...",  // base64_encode(asymmetric_encrypt(password))
     *      keys     : {
     *          "ID1": "key1", // base64_encode(asymmetric_encrypt(password))
     *      }
     *  }
     */
    var SecureMessage = Interface(null, [Message]);

    /**
     *  Get encrypted content data
     *
     * @return {Uint8Array}
     */
    SecureMessage.prototype.getData = function () {};

    /**
     *  Get encrypted symmetric key
     *
     * @return {Uint8Array}
     */
    SecureMessage.prototype.getEncryptedKey = function () {};
    // String => String
    SecureMessage.prototype.getEncryptedKeys = function () {};

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
     * @return {SecureMessage}
     */
    SecureMessage.parse = function (msg) {
        var gf = general_factory();
        return gf.parseSecureMessage(msg);
    };

    SecureMessage.getFactory = function () {
        var gf = general_factory();
        return gf.getSecureMessageFactory();
    };
    SecureMessage.setFactory = function (factory) {
        var gf = general_factory();
        gf.setSecureMessageFactory(factory);
    };

    /**
     *  Message Factory
     *  ~~~~~~~~~~~~~~~
     */
    var SecureMessageFactory = Interface(null, null);

    /**
     *  Parse map object to message
     *
     * @param {*} msg - message info
     * @return {SecureMessage}
     */
    SecureMessageFactory.prototype.parseSecureMessage = function (msg) {};

    SecureMessage.Factory = SecureMessageFactory;

    //-------- namespace --------
    ns.protocol.SecureMessage = SecureMessage;
    // ns.protocol.SecureMessageFactory = SecureMessageFactory;

})(DaoKeDao);
