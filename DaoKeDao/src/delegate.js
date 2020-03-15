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
    // noinspection JSUnusedLocalSymbols
    /**
     *  Encrypt 'message.content' to 'message.data' with symmetric key
     *
     * @param content {Content}
     * @param pwd {SymmetricKey}
     * @param iMsg {InstantMessage}
     * @returns {Uint8Array}
     */
    InstantMessageDelegate.prototype.encryptContent = function (content, pwd, iMsg) {
        console.assert(false, 'implement me!');
        return null;
    };
    // noinspection JSUnusedLocalSymbols
    /**
     *  Encode 'message.data' to String(Base64)
     *
     * @param data {Uint8Array} - encrypted content data
     * @param iMsg {InstantMessage}
     * @returns {string|null}
     */
    InstantMessageDelegate.prototype.encodeData = function (data, iMsg) {
        console.assert(false, 'implement me!');
        return null;
    };
    // noinspection JSUnusedLocalSymbols
    /**
     *  Encrypt 'message.key' with receiver's public key
     *
     * @param pwd {SymmetricKey} - symmetric key to be encrypted
     * @param receiver {String} - receiver ID/string
     * @param iMsg {InstantMessage}
     * @returns {Uint8Array}
     */
    InstantMessageDelegate.prototype.encryptKey = function (pwd, receiver, iMsg) {
        console.assert(false, 'implement me!');
        return null;
    };
    // noinspection JSUnusedLocalSymbols
    /**
     *  Encode 'message.key' to String(Base64)
     *
     * @param key {Uint8Array} - encrypted key data
     * @param iMsg {InstantMessage}
     * @returns {string|null}
     */
    InstantMessageDelegate.prototype.encodeKey = function (key, iMsg) {
        console.assert(false, 'implement me!');
        return null;
    };

    //-------- secure message delegate

    var SecureMessageDelegate = function () {
    };
    ns.Interface(SecureMessageDelegate, [MessageDelegate]);
    // noinspection JSUnusedLocalSymbols
    /**
     *  Decode 'message.key' to encrypted symmetric key data
     *
     * @param key {String} - base64 string
     * @param sMsg {SecureMessage}
     * @returns {Uint8Array}
     */
    SecureMessageDelegate.prototype.decodeKey = function (key, sMsg) {
        console.assert(false, 'implement me!');
        return null;
    };
    // noinspection JSUnusedLocalSymbols
    /**
     *  Decrypt 'message.key' with receiver's private key
     *
     * @param key {Uint8Array} - encrypted symmetric key data
     * @param sender {String} - sender/member ID string
     * @param receiver {String} - receiver/group ID string
     * @param sMsg {SecureMessage}
     * @returns {SymmetricKey}
     */
    SecureMessageDelegate.prototype.decryptKey = function (key, sender, receiver, sMsg) {
        console.assert(false, 'implement me!');
        return null;
    };
    // noinspection JSUnusedLocalSymbols
    /**
     *  Decode 'message.data' to encrypted content data
     *
     * @param data {String} - base64 string
     * @param sMsg {SecureMessage}
     * @returns {Uint8Array}
     */
    SecureMessageDelegate.prototype.decodeData = function (data, sMsg) {
        console.assert(false, 'implement me!');
        return null;
    };
    // noinspection JSUnusedLocalSymbols
    /**
     *  Decrypt 'message.data' with symmetric key
     *
     * @param data {Uint8Array} - encrypt content data
     * @param pwd {SymmetricKey}
     * @param sMsg {SecureMessage}
     * @returns {Content}
     */
    SecureMessageDelegate.prototype.decryptContent = function (data, pwd, sMsg) {
        console.assert(false, 'implement me!');
        return null;
    };
    // noinspection JSUnusedLocalSymbols
    /**
     *  Sign 'message.data' with sender's private key
     *
     * @param data {Uint8Array} - encrypted message data
     * @param sender {String} - sender ID
     * @param sMsg {SecureMessage}
     * @returns {Uint8Array}
     */
    SecureMessageDelegate.prototype.signData = function (data, sender, sMsg) {
        console.assert(false, 'implement me!');
        return null;
    };
    // noinspection JSUnusedLocalSymbols
    /**
     *  Encode 'message.signature' to String(Base64)
     *
     * @param signature {Uint8Array} - signature of message.data
     * @param sMsg {SecureMessage}
     * @returns {String}
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
     *  Decode 'message.signature' from String(Base64)
     *
     * @param signature {String} - base64 string
     * @param rMsg {ReliableMessage}
     * @returns {Uint8Array}
     */
    ReliableMessageDelegate.prototype.decodeSignature = function (signature, rMsg) {
        console.assert(false, 'implement me!');
        return null;
    };
    // noinspection JSUnusedLocalSymbols
    /**
     *  Verify the message data and signature with sender's public key
     *
     * @param data {Uint8Array} - message content(encrypted) data
     * @param signature {Uint8Array} - signature for message content(encrypted) data
     * @param sender {String} - sender ID/string
     * @param rMsg {ReliableMessage}
     * @returns {boolean}
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
