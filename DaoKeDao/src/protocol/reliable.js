'use strict';
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
    dkd.protocol.ReliableMessage = Interface(null, [SecureMessage]);
    var ReliableMessage = dkd.protocol.ReliableMessage;

    /**
     *  Message Data Signature
     *
     * @return {Uint8Array} sign(data)
     */
    ReliableMessage.prototype.getSignature = function () {};

    //
    //  Conveniences
    //

    /**
     *  Convert Maps to Messages
     *
     * @param {*[]} array
     * @return {ReliableMessage[]}
     */
    ReliableMessage.convert = function (array) {
        var messages = [];
        var msg;
        for (var i = 0; i < array.length; ++i) {
            msg = ReliableMessage.parse(array[i]);
            if (msg) {
                messages.push(msg);
            }
        }
        return messages;
    };

    /**
     *  Convert InstantMessage to Maps
     * @param {ReliableMessage[]} messages
     * @return {*[]}
     */
    ReliableMessage.revert = function (messages) {
        var array = [];
        var msg;
        for (var i = 0; i < messages.length; ++i) {
            msg = messages[i];
            if (Interface.conforms(msg, Mapper)) {
                array.push(msg.toMap());
            } else {
                array.push(msg);
            }
        }
        return array;
    };

    //
    //  Factory methods
    //

    /**
     *  Parse map object to message
     *
     * @param {*} msg - message info
     * @return {ReliableMessage}
     */
    ReliableMessage.parse = function (msg) {
        var helper = MessageExtensions.getReliableHelper();
        return helper.parseReliableMessage(msg);
    };

    ReliableMessage.getFactory = function () {
        var helper = MessageExtensions.getReliableHelper();
        return helper.getReliableMessageFactory();
    };
    ReliableMessage.setFactory = function (factory) {
        var helper = MessageExtensions.getReliableHelper();
        helper.setReliableMessageFactory(factory);
    };

    /**
     *  Message Factory
     *  ~~~~~~~~~~~~~~~
     */
    ReliableMessage.Factory = Interface(null, null);
    var ReliableMessageFactory = ReliableMessage.Factory;

    /**
     *  Parse map object to message
     *
     * @param {*} msg - message info
     * @return {ReliableMessage}
     */
    ReliableMessageFactory.prototype.parseReliableMessage = function (msg) {};
