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

//! require 'envelope.js'

(function (ns) {
    'use strict';

    var map = ns.type.Map;
    var Envelope = ns.protocol.Envelope;

    var Message = function () {
    };
    ns.Interface(Message, [map]);

    // message delegate
    Message.prototype.getDelegate = function () {
        console.assert(false, 'implement me!');
        return null;
    };
    Message.prototype.setDelegate = function (delegate) {
        console.assert(false, 'implement me!');
    };

    // message envelope
    Message.prototype.getEnvelope = function () {
        console.assert(false, 'implement me!');
        return null;
    };
    Message.getEnvelope = function (msg) {
        return Envelope.parse(msg);
    };

    //--------

    Message.prototype.getSender = function () {
        console.assert(false, 'implement me!');
        return null;
    };
    Message.prototype.getReceiver = function () {
        console.assert(false, 'implement me!');
        return null;
    };
    Message.prototype.getTime = function () {
        console.assert(false, 'implement me!');
        return null;
    };

    Message.prototype.getGroup = function () {
        console.assert(false, 'implement me!');
        return null;
    };
    Message.prototype.getType = function () {
        console.assert(false, 'implement me!');
        return null;
    };

    //-------- namespace --------
    ns.protocol.Message = Message;

    ns.protocol.register('Message');

})(DaoKeDao);

(function (ns) {
    'use strict';

    var Message = ns.protocol.Message;

    var MessageDelegate = function () {
    };
    ns.Interface(MessageDelegate, null);

    Message.Delegate = MessageDelegate;

})(DaoKeDao);
