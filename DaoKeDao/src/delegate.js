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

//! require 'namespace.js'

!function (ns) {
    'use strict';

    var MessageDelegate = function () {
    };
    ns.Interface(MessageDelegate, null);

    //-------- instant message delegate

    var InstantMessageDelegate = function () {
    };
    ns.Interface(InstantMessageDelegate, [MessageDelegate]);

    //
    //  Encrypt Content
    //

    // noinspection JSUnusedLocalSymbols
    /**
     *  1. Serialize 'message.content' to data (JsON / ProtoBuf / ...)
     *
     * @param {Content} content - message.content
     * @param {SymmetricKey} pwd - symmetric key
     * @param {InstantMessage} iMsg - instant message object
     * @return {Uint8Array} serialized content data
     */
    InstantMessageDelegate.prototype.serializeContent = function (content, pwd, iMsg) {
        console.assert(false, 'implement me!');
        return null;
    };

    // noinspection JSUnusedLocalSymbols
    /**
     *  2. Encrypt content data to 'message.data' with symmetric key
     *
     * @param {Uint8Array} data - serialized data of message.content
     * @param {SymmetricKey} pwd - symmetric key
     * @param {InstantMessage} iMsg - instant message object
     * @return {Uint8Array} encrypted message content data
     */
    InstantMessageDelegate.prototype.encryptContent = function (data, pwd, iMsg) {
        console.assert(false, 'implement me!');
        return null;
    };

    // noinspection JSUnusedLocalSymbols
    /**
     *  3. Encode 'message.data' to String (Base64)
     *
     * @param {Uint8Array} data - encrypted content data
     * @param {InstantMessage} iMsg - instant message object
     * @returns {String} Base64 string
     */
    InstantMessageDelegate.prototype.encodeData = function (data, iMsg) {
        console.assert(false, 'implement me!');
        return null;
    };

    //
    //  Encrypt Key
    //

    // noinspection JSUnusedLocalSymbols
    /**
     *  4. Serialize message key to data (JsON / ProtoBuf / ...)
     *
     * @param {SymmetricKey} pwd - symmetric key
     * @param {InstantMessage} iMsg - instant message object
     * @return {Uint8Array} serialized key data
     */
    InstantMessageDelegate.prototype.serializeKey = function (pwd, iMsg) {
        console.assert(false, 'implement me!');
        return null;
    };

    // noinspection JSUnusedLocalSymbols
    /**
     *  5. Encrypt key data to 'message.key' with receiver's public key
     *
     * @param {Uint8Array} data - symmetric key to be encrypted
     * @param {String} receiver - receiver ID/string
     * @param {InstantMessage} iMsg - instant message object
     * @returns {Uint8Array} encrypted symmetric key data
     */
    InstantMessageDelegate.prototype.encryptKey = function (data, receiver, iMsg) {
        console.assert(false, 'implement me!');
        return null;
    };

    // noinspection JSUnusedLocalSymbols
    /**
     *  6. Encode 'message.key' to String (Base64)
     *
     * @param {Uint8Array} data - encrypted key data
     * @param {InstantMessage} iMsg - instant message object
     * @returns {String} Base64 string
     */
    InstantMessageDelegate.prototype.encodeKey = function (data, iMsg) {
        console.assert(false, 'implement me!');
        return null;
    };

    //-------- secure message delegate

    var SecureMessageDelegate = function () {
    };
    ns.Interface(SecureMessageDelegate, [MessageDelegate]);

    //
    //  Decrypt Key
    //

    // noinspection JSUnusedLocalSymbols
    /**
     *  1. Decode 'message.key' to encrypted symmetric key data
     *
     * @param {String} key - Base64 string
     * @param {SecureMessage} sMsg - secure message object
     * @returns {Uint8Array} encrypted symmetric key data
     */
    SecureMessageDelegate.prototype.decodeKey = function (key, sMsg) {
        console.assert(false, 'implement me!');
        return null;
    };

    // noinspection JSUnusedLocalSymbols
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
        console.assert(false, 'implement me!');
        return null;
    };

    // noinspection JSUnusedLocalSymbols
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
        console.assert(false, 'implement me!');
        return null;
    };

    //
    //  Decrypt Content
    //

    // noinspection JSUnusedLocalSymbols
    /**
     *  4. Decode 'message.data' to encrypted content data
     *
     * @param {String} data - Base64 string
     * @param {SecureMessage} sMsg - secure message object
     * @returns {Uint8Array} encrypt content data
     */
    SecureMessageDelegate.prototype.decodeData = function (data, sMsg) {
        console.assert(false, 'implement me!');
        return null;
    };

    // noinspection JSUnusedLocalSymbols
    /**
     *  5. Decrypt 'message.data' with symmetric key
     *
     * @param {Uint8Array} data - encrypt content data
     * @param {SymmetricKey} pwd - symmetric key
     * @param {SecureMessage} sMsg - secure message object
     * @returns {Uint8Array} serialized message content
     */
    SecureMessageDelegate.prototype.decryptContent = function (data, pwd, sMsg) {
        console.assert(false, 'implement me!');
        return null;
    };

    // noinspection JSUnusedLocalSymbols
    /**
     *  6. Deserialize message content from data (JsON / ProtoBuf / ...)
     *
     * @param {Uint8Array} data - serialized message content
     * @param {SymmetricKey} pwd - symmetric key
     * @param {SecureMessage} sMsg - secure message object
     * @returns {Content} message content
     */
    SecureMessageDelegate.prototype.deserializeContent = function (data, pwd, sMsg) {
        console.assert(false, 'implement me!');
        return null;
    };

    //
    //  Signature
    //

    // noinspection JSUnusedLocalSymbols
    /**
     *  1. Sign 'message.data' with sender's private key
     *
     * @param {Uint8Array} data - encrypted message data
     * @param {String} sender - sender ID
     * @param {SecureMessage} sMsg - secure message object
     * @returns {Uint8Array} signature of encrypted message data
     */
    SecureMessageDelegate.prototype.signData = function (data, sender, sMsg) {
        console.assert(false, 'implement me!');
        return null;
    };

    // noinspection JSUnusedLocalSymbols
    /**
     *  2. Encode 'message.signature' to String (Base64)
     *
     * @param {Uint8Array} signature - signature of message.data
     * @param {SecureMessage} sMsg - secure message object
     * @returns {String} Base64 string
     */
    SecureMessageDelegate.prototype.encodeSignature = function (signature, sMsg) {
        console.assert(false, 'implement me!');
        return null;
    };

    //-------- reliable message delegate

    var ReliableMessageDelegate = function () {
    };
    ns.Interface(ReliableMessageDelegate, [SecureMessageDelegate]);

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

    //-------- namespace --------
    ns.InstantMessageDelegate = InstantMessageDelegate;
    ns.SecureMessageDelegate = SecureMessageDelegate;
    ns.ReliableMessageDelegate = ReliableMessageDelegate;

    ns.register('InstantMessageDelegate');
    ns.register('SecureMessageDelegate');
    ns.register('ReliableMessageDelegate');

}(DaoKeDao);
