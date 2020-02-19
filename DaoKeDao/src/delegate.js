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
    ns.type.Interface(MessageDelegate);

    //-------- instant message delegate

    var InstantMessageDelegate = function () {
    };
    ns.type.Interface(InstantMessageDelegate, MessageDelegate);
    /**
     *  Encrypt 'message.content' to 'message.data' with symmetric key
     *
     * @param content - message content
     * @param pwd - symmetric key
     * @param msg - instant message object
     * @returns {Uint8Array}
     */
    InstantMessageDelegate.prototype.encryptContent = function (content, pwd, msg) {
        console.assert(content !== null, 'content empty');
        console.assert(pwd !== null, 'key empty');
        console.assert(msg !== null, 'msg empty');
        console.assert(false, 'implement me!');
        return null;
    };
    /**
     *  Encode 'message.data' to String(Base64)
     *
     * @param data - encrypted content data (Uint8Array)
     * @param msg - instant message object
     * @returns {string|null}
     */
    InstantMessageDelegate.prototype.encodeData = function (data, msg) {
        console.assert(data !== null, 'msg data empty');
        console.assert(msg !== null, 'msg empty');
        console.assert(false, 'implement me!');
        return null;
    };
    /**
     *  Encrypt 'message.key' with receiver's public key
     *
     * @param pwd - symmetric key to be encrypted
     * @param receiver - receiver ID/string
     * @param msg - instant message object
     * @returns {Uint8Array}
     */
    InstantMessageDelegate.prototype.encryptKey = function (pwd, receiver, msg) {
        console.assert(pwd !== null, 'key empty');
        console.assert(receiver !== null, 'receiver empty');
        console.assert(msg !== null, 'msg empty');
        console.assert(false, 'implement me!');
        return null;
    };
    /**
     *  Encode 'message.key' to String(Base64)
     *
     * @param key - encrypted key data (Uint8Array)
     * @param msg - instant message object
     * @returns {string|null}
     */
    InstantMessageDelegate.prototype.encodeKey = function (key, msg) {
        console.assert(key !== null, 'key data empty');
        console.assert(msg !== null, 'msg empty');
        console.assert(false, 'implement me!');
        return null;
    };

    //-------- secure message delegate

    var SecureMessageDelegate = function () {
    };
    ns.type.Interface(SecureMessageDelegate, MessageDelegate);
    /**
     *  Decode 'message.key' to encrypted symmetric key data
     *
     * @param key - base64 string
     * @param msg - secure message object
     * @returns {Uint8Array}
     */
    SecureMessageDelegate.prototype.decodeKey = function (key, msg) {
        console.assert(key !== null, 'key string empty');
        console.assert(msg !== null, 'secure message empty');
        console.assert(false, 'implement me!');
        return null;
    };
    /**
     *  Decrypt 'message.key' with receiver's private key
     *
     * @param key - encrypted symmetric key data (Uint8Array)
     * @param sender - sender/member ID string
     * @param receiver - receiver/group ID string
     * @param msg - secure message object
     * @returns {SymmetricKey|null}
     */
    SecureMessageDelegate.prototype.decryptKey = function (key, sender, receiver, msg) {
        console.assert(key !== null, 'key data empty');
        console.assert(sender !== null, 'sender empty');
        console.assert(receiver !== null, 'receiver empty');
        console.assert(msg !== null, 'msg empty');
        console.assert(false, 'implement me!');
        return null;
    };
    /**
     *  Decode 'message.data' to encrypted content data
     *
     * @param data - base64 string
     * @param msg - secure message object
     * @returns {Uint8Array}
     */
    SecureMessageDelegate.prototype.decodeData = function (data, msg) {
        console.assert(data !== null, 'msg data empty');
        console.assert(msg !== null, 'msg empty');
        console.assert(false, 'implement me!');
        return null;
    };
    /**
     *  Decrypt 'message.data' with symmetric key
     *
     * @param data - encrypt content data (Uint8Array)
     * @param pwd - symmetric key
     * @param msg - secure message object
     * @returns {Content|null}
     */
    SecureMessageDelegate.prototype.decryptContent = function (data, pwd, msg) {
        console.assert(data !== null, 'msg data empty');
        console.assert(pwd !== null, 'key empty');
        console.assert(msg !== null, 'msg empty');
        console.assert(false, 'implement me!');
        return null;
    };
    /**
     *  Sign 'message.data' with sender's private key
     *
     * @param data - encrypted message data (Uint8Array)
     * @param sender - sender ID
     * @param msg - secure message object
     * @returns {Uint8Array}
     */
    SecureMessageDelegate.prototype.signData = function (data, sender, msg) {
        console.assert(data !== null, 'msg data empty');
        console.assert(sender !== null, 'sender empty');
        console.assert(msg !== null, 'msg empty');
        console.assert(false, 'implement me!');
        return null;
    };
    /**
     *  Encode 'message.signature' to String(Base64)
     *
     * @param signature - signature of message.data (Uint8Array)
     * @param msg - secure message object
     * @returns {string|null}
     */
    SecureMessageDelegate.prototype.encodeSignature = function (signature, msg) {
        console.assert(signature !== null, 'msg signature empty');
        console.assert(msg !== null, 'msg empty');
        console.assert(false, 'implement me!');
        return null;
    };

    //-------- reliable message delegate

    var ReliableMessageDelegate = function () {
    };
    ns.type.Interface(ReliableMessageDelegate, SecureMessageDelegate);
    /**
     *  Decode 'message.signature' from String(Base64)
     *
     * @param signature - base64 string
     * @param msg - reliable message
     * @returns {Uint8Array}
     */
    ReliableMessageDelegate.prototype.decodeSignature = function (signature, msg) {
        console.assert(msg !== null, 'msg empty');
        console.assert(msg !== null, 'msg empty');
        console.assert(false, 'implement me!');
        return null;
    };
    /**
     *  Verify the message data and signature with sender's public key
     *
     * @param data - message content(encrypted) data (Uint8Array)
     * @param signature - signature for message content(encrypted) data (Uint8Array)
     * @param sender - sender ID/string
     * @param msg - reliable message object
     * @returns {boolean}
     */
    ReliableMessageDelegate.prototype.verifyDataSignature = function (data, signature, sender, msg) {
        console.assert(msg !== null, 'msg empty');
        console.assert(msg !== null, 'msg empty');
        console.assert(msg !== null, 'msg empty');
        console.assert(msg !== null, 'msg empty');
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
