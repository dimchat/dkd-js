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

(function (ns) {
    'use strict';

    var Interface = ns.type.Interface;
    var Message = ns.protocol.Message;

    var general_factory = function () {
        var man = ns.dkd.FactoryManager;
        return man.generalFactory;
    };

    var InstantMessage = Interface(null, [Message]);

    InstantMessage.prototype.getContent = function () {
        throw new Error('NotImplemented');
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
     *  Encrypt message, replace 'content' field with encrypted 'data'
     *
     * @param {SymmetricKey} password - symmetric key
     * @param {ID[]} members - members for group message
     * @return SecureMessage object
     */
    InstantMessage.prototype.encrypt = function (password, members) {
        throw new Error('NotImplemented');
    };

    /**
     *  Message Delegate
     *  ~~~~~~~~~~~~~~~~
     */
    var InstantMessageDelegate = Interface(null, [Message.Delegate]);

    //
    //  Encrypt Content
    //

    /**
     *  1. Serialize 'message.content' to data (JsON / ProtoBuf / ...)
     *
     * @param {Content} content - message.content
     * @param {SymmetricKey} pwd - symmetric key
     * @param {InstantMessage} iMsg - instant message object
     * @return {Uint8Array} serialized content data
     */
    InstantMessageDelegate.prototype.serializeContent = function (content, pwd, iMsg) {
        throw new Error('NotImplemented');
    };

    /**
     *  2. Encrypt content data to 'message.data' with symmetric key
     *
     * @param {Uint8Array} data - serialized data of message.content
     * @param {SymmetricKey} pwd - symmetric key
     * @param {InstantMessage} iMsg - instant message object
     * @return {Uint8Array} encrypted message content data
     */
    InstantMessageDelegate.prototype.encryptContent = function (data, pwd, iMsg) {
        throw new Error('NotImplemented');
    };

    /**
     *  3. Encode 'message.data' to String (Base64)
     *
     * @param {Uint8Array} data - encrypted content data
     * @param {InstantMessage} iMsg - instant message object
     * @returns {String} Base64 string
     */
    InstantMessageDelegate.prototype.encodeData = function (data, iMsg) {
        throw new Error('NotImplemented');
    };

    //
    //  Encrypt Key
    //

    /**
     *  4. Serialize message key to data (JsON / ProtoBuf / ...)
     *
     * @param {SymmetricKey} pwd - symmetric key
     * @param {InstantMessage} iMsg - instant message object
     * @return {Uint8Array} serialized key data
     */
    InstantMessageDelegate.prototype.serializeKey = function (pwd, iMsg) {
        throw new Error('NotImplemented');
    };

    /**
     *  5. Encrypt key data to 'message.key' with receiver's public key
     *
     * @param {Uint8Array} data - symmetric key to be encrypted
     * @param {String} receiver - receiver ID/string
     * @param {InstantMessage} iMsg - instant message object
     * @returns {Uint8Array} encrypted symmetric key data
     */
    InstantMessageDelegate.prototype.encryptKey = function (data, receiver, iMsg) {
        throw new Error('NotImplemented');
    };

    /**
     *  6. Encode 'message.key' to String (Base64)
     *
     * @param {Uint8Array} data - encrypted key data
     * @param {InstantMessage} iMsg - instant message object
     * @returns {String} Base64 string
     */
    InstantMessageDelegate.prototype.encodeKey = function (data, iMsg) {
        throw new Error('NotImplemented');
    };

    InstantMessage.Delegate = InstantMessageDelegate;

    /**
     *  Message Factory
     *  ~~~~~~~~~~~~~~~
     */
    var InstantMessageFactory = Interface(null, null);

    InstantMessageFactory.prototype.generateSerialNumber = function (msgType, now) {
        throw new Error('NotImplemented');
    };

    InstantMessageFactory.prototype.createInstantMessage = function (head, body) {
        throw new Error('NotImplemented');
    };

    InstantMessageFactory.prototype.parseInstantMessage = function (msg) {
        throw new Error('NotImplemented');
    };

    InstantMessage.Factory = InstantMessageFactory;

    InstantMessage.getFactory = function () {
        var gf = general_factory();
        return gf.getInstantMessageFactory();
    };
    InstantMessage.setFactory = function (factory) {
        var gf = general_factory();
        gf.setInstantMessageFactory(factory);
    };

    /**
     *  Generate SN (Message ID) with msg type & time
     *
     * @param {ContentType|uint} type
     * @param {float} now
     * @return {uint}
     */
    InstantMessage.generateSerialNumber = function (type, now) {
        var gf = general_factory();
        return gf.generateSerialNumber(type, now);
    };

    /**
     *  Create instant message with envelope & content
     *
     * @param {Envelope} head - message envelope
     * @param {Content} body - message content
     * @return {InstantMessage}
     */
    InstantMessage.create = function (head, body) {
        var gf = general_factory();
        return gf.createInstantMessage(head, body);
    };

    /**
     *  Parse map object to message
     *
     * @param {*} msg - message info
     * @return {InstantMessage}
     */
    InstantMessage.parse = function (msg) {
        var gf = general_factory();
        return gf.parseInstantMessage(msg);
    };

    //-------- namespace --------
    ns.protocol.InstantMessage = InstantMessage;

})(DaoKeDao);
