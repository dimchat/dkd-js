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

(function (ns) {
    'use strict';

    var Interface = ns.type.Interface;
    var Message = ns.protocol.Message;

    var SecureMessage = Interface(null, [Message]);

    /**
     *  Get encrypted content data
     *
     * @return {Uint8Array}
     */
    SecureMessage.prototype.getData = function () {
        throw new Error('NotImplemented');
    };

    /**
     *  Get encrypted symmetric key
     *
     * @return {Uint8Array}
     */
    SecureMessage.prototype.getEncryptedKey = function () {
        throw new Error('NotImplemented');
    };
    SecureMessage.prototype.getEncryptedKeys = function () {
        throw new Error('NotImplemented');
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
     * @return {InstantMessage}
     */
    SecureMessage.prototype.decrypt = function () {
        throw new Error('NotImplemented');
    };

    /*
     *  Sign the Secure Message to Reliable Message
     *
     *    +----------+      +----------+
     *    | sender   |      | sender   |
     *    | receiver |      | receiver |
     *    | time     |  ->  | time     |
     *    |          |      |          |
     *    | data     |      | data     |
     *    | key/keys |      | key/keys |
     *    +----------+      | signature|  1. signature = sign(data, sender.SK)
     *                      +----------+
     */

    /**
     *  Sign message.data, add 'signature' field
     *
     * @return {ReliableMessage}
     */
    SecureMessage.prototype.sign = function () {
        throw new Error('NotImplemented');
    };

    /*
     *  Split/Trim group message
     *
     *  for each members, get key from 'keys' and replace 'receiver' to member ID
     */

    /**
     *  Split the group message to single person messages
     *
     *  @param {ID[]} members - group members
     *  @return {SecureMessage[]}secure/reliable message(s)
     */
    SecureMessage.prototype.split = function (members) {
        throw new Error('NotImplemented');
    };

    /**
     *  Trim the group message for a member
     *
     * @param {ID} member - group member ID
     * @return {SecureMessage}
     */
    SecureMessage.prototype.trim = function (member) {
        throw new Error('NotImplemented');
    };

    /**
     *  Message Delegate
     *  ~~~~~~~~~~~~~~~~
     */
    var SecureMessageDelegate = Interface(null, [Message.Delegate]);

    //
    //  Decrypt Key
    //

    /**
     *  1. Decode 'message.key' to encrypted symmetric key data
     *
     * @param {String} key         - Base64 string
     * @param {SecureMessage} sMsg - secure message object
     * @returns {Uint8Array} encrypted symmetric key data
     */
    SecureMessageDelegate.prototype.decodeKey = function (key, sMsg) {
        throw new Error('NotImplemented');
    };

    /**
     *  2. Decrypt 'message.key' with receiver's private key
     *
     * @param {Uint8Array} data - encrypted symmetric key data
     * @param {String} sender - sender/member ID string
     * @param {String} receiver - receiver/group ID string
     * @param {SecureMessage} sMsg - secure message object
     * @returns {Uint8Array} serialized symmetric key
     */
    SecureMessageDelegate.prototype.decryptKey = function (data, sender, receiver, sMsg) {
        throw new Error('NotImplemented');
    };

    /**
     *  3. Deserialize message key from data (JsON / ProtoBuf / ...)
     *
     * @param {Uint8Array} data - serialized symmetric key
     * @param {String} sender - sender/member ID string
     * @param {String} receiver - receiver/group ID string
     * @param {SecureMessage} sMsg - secure message object
     * @returns {SymmetricKey} symmetric key
     */
    SecureMessageDelegate.prototype.deserializeKey = function (data, sender, receiver, sMsg) {
        throw new Error('NotImplemented');
    };

    //
    //  Decrypt Content
    //

    /**
     *  4. Decode 'message.data' to encrypted content data
     *
     * @param {String} data - Base64 string
     * @param {SecureMessage} sMsg - secure message object
     * @returns {Uint8Array} encrypt content data
     */
    SecureMessageDelegate.prototype.decodeData = function (data, sMsg) {
        throw new Error('NotImplemented');
    };

    /**
     *  5. Decrypt 'message.data' with symmetric key
     *
     * @param {Uint8Array} data - encrypt content data
     * @param {SymmetricKey} pwd - symmetric key
     * @param {SecureMessage} sMsg - secure message object
     * @returns {Uint8Array} serialized message content
     */
    SecureMessageDelegate.prototype.decryptContent = function (data, pwd, sMsg) {
        throw new Error('NotImplemented');
    };

    /**
     *  6. Deserialize message content from data (JsON / ProtoBuf / ...)
     *
     * @param {Uint8Array} data - serialized message content
     * @param {SymmetricKey} pwd - symmetric key
     * @param {SecureMessage} sMsg - secure message object
     * @returns {Content} message content
     */
    SecureMessageDelegate.prototype.deserializeContent = function (data, pwd, sMsg) {
        throw new Error('NotImplemented');
    };

    //
    //  Signature
    //

    /**
     *  1. Sign 'message.data' with sender's private key
     *
     * @param {Uint8Array} data - encrypted message data
     * @param {String} sender - sender ID
     * @param {SecureMessage} sMsg - secure message object
     * @returns {Uint8Array} signature of encrypted message data
     */
    SecureMessageDelegate.prototype.signData = function (data, sender, sMsg) {
        throw new Error('NotImplemented');
    };

    /**
     *  2. Encode 'message.signature' to String (Base64)
     *
     * @param {Uint8Array} signature - signature of message.data
     * @param {SecureMessage} sMsg - secure message object
     * @returns {String} Base64 string
     */
    SecureMessageDelegate.prototype.encodeSignature = function (signature, sMsg) {
        throw new Error('NotImplemented');
    };

    SecureMessage.Delegate = SecureMessageDelegate;

    /**
     *  Message Factory
     *  ~~~~~~~~~~~~~~~
     */
    var SecureMessageFactory = Interface(null, null);

    SecureMessageFactory.prototype.parseSecureMessage = function (msg) {
        throw new Error('NotImplemented');
    };

    SecureMessage.Factory = SecureMessageFactory;

    var general_factory = function () {
        var man = ns.dkd.FactoryManager;
        return man.generalFactory;
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
     *  Parse map object to message
     *
     * @param {*} msg - message info
     * @return {SecureMessage}
     */
    SecureMessage.parse = function (msg) {
        var gf = general_factory();
        return gf.parseSecureMessage(msg);
    };

    //-------- namespace --------
    ns.protocol.SecureMessage = SecureMessage;

})(DaoKeDao);
