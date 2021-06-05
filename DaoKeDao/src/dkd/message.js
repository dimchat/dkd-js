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

/*
 *  Message Transforming
 *  ~~~~~~~~~~~~~~~~~~~~
 *
 *     Instant Message <-> Secure Message <-> Reliable Message
 *     +-------------+     +------------+     +--------------+
 *     |  sender     |     |  sender    |     |  sender      |
 *     |  receiver   |     |  receiver  |     |  receiver    |
 *     |  time       |     |  time      |     |  time        |
 *     |             |     |            |     |              |
 *     |  content    |     |  data      |     |  data        |
 *     +-------------+     |  key/keys  |     |  key/keys    |
 *                         +------------+     |  signature   |
 *                                            +--------------+
 *     Algorithm:
 *         data      = password.encrypt(content)
 *         key       = receiver.public_key.encrypt(password)
 *         signature = sender.private_key.sign(data)
 */

/**
 *  Message with Envelope
 *  ~~~~~~~~~~~~~~~~~~~~~
 *  Base classes for messages
 *  This class is used to create a message
 *  with the envelope fields, such as 'sender', 'receiver', and 'time'
 *
 *  data format: {
 *      //-- envelope
 *      sender   : "moki@xxx",
 *      receiver : "hulk@yyy",
 *      time     : 123,
 *      //-- body
 *      ...
 *  }
 */

//! require 'protocol/message.js'

(function (ns) {
    'use strict';

    var Dictionary = ns.type.Dictionary;

    var Envelope = ns.protocol.Envelope;
    var Message = ns.protocol.Message;

    /**
     *  Create message
     *
     *  Usages:
     *      1. new BaseMessage(map);
     *      2. new BaseMessage(envelope);
     */
    var BaseMessage = function (msg) {
        var env;
        if (ns.Interface.conforms(msg, Envelope)) {
            env = msg;
            msg = env.getMap();
        } else {
            env = Message.getEnvelope(msg);
        }
        Dictionary.call(this, msg);
        // envelope, which shared the same dictionary with the message
        this.envelope = env;
        // delegate to transform messages
        this.delegate = null;
    };
    ns.Class(BaseMessage, Dictionary, [Message]);

    BaseMessage.prototype.getDelegate = function () {
        return this.delegate;
    };
    BaseMessage.prototype.setDelegate = function (delegate) {
        this.delegate = delegate;
    };

    BaseMessage.prototype.getEnvelope = function () {
        return this.envelope;
    };

    BaseMessage.prototype.getSender = function () {
        return this.getEnvelope().getSender();
    };
    BaseMessage.prototype.getReceiver = function () {
        return this.getEnvelope().getReceiver()
    };
    BaseMessage.prototype.getTime = function () {
        return this.getEnvelope().getTime();
    };

    BaseMessage.prototype.getGroup = function () {
        return this.getEnvelope().getGroup();
    };
    BaseMessage.prototype.getType = function () {
        return this.getEnvelope().getTime();
    };

    //-------- namespace --------
    ns.BaseMessage = BaseMessage;

    ns.register('BaseMessage');

})(DaoKeDao);
