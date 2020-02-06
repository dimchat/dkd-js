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

!function (ns) {
    'use strict';

    var SecureMessage = ns.SecureMessage;

    /**
     *  Create reliable message
     *
     * @param msg - message info with envelope, data, key/keys, signature
     * @constructor
     */
    var ReliableMessage = function (msg) {
        SecureMessage.call(this, msg);
    };
    ReliableMessage.inherits(SecureMessage);

    ReliableMessage.prototype.getSignature = function () {
        var base64 = this.getValue('signature');
        return this.delegate.decodeSignature(base64, this);
    };

    /**
     *  Sender's Meta
     *  ~~~~~~~~~~~~~
     *  Extends for the first message package of 'Handshake' protocol.
     *
     * @param meta - Meta object or dictionary
     */
    ReliableMessage.prototype.setMeta = function (meta) {
        this.setValue('meta', meta);
    };

    ReliableMessage.prototype.getMeta = function () {
        return this.getValue('meta');
    };

    ReliableMessage.getInstance = function (msg) {
        if (!msg) {
            return null;
        }
        if (msg instanceof ReliableMessage) {
            return msg;
        }
        return new ReliableMessage(msg);
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
     * @returns {SecureMessage|null}
     */
    ReliableMessage.prototype.verify = function () {
        var sender = this.envelope.sender;
        var data = this.getData();
        var signature = this.getSignature();
        // 1. verify data signature with sender's public key
        if (this.delegate.verifyDataSignature(data, signature, sender, this)) {
            // 2. pack message
            var msg = this.getMap(true);
            delete msg['signature'];
            return new SecureMessage(msg);
        } else {
            // throw Error('message signature not match: ' + this);
            return null;
        }
    };

    //-------- namespace --------
    ns.ReliableMessage = ReliableMessage;

    ns.register('ReliableMessage');

}(DaoKeDao);
