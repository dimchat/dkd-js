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

//!require 'dkd/envelope.js'
//!require 'dkd/instant.js'
//!require 'dkd/secure.js'
//!require 'dkd/reliable.js'

(function (ns) {
    'use strict';

    var obj = ns.type.Object;
    var Envelope = ns.protocol.Envelope;
    var MessageEnvelope = ns.dkd.MessageEnvelope;

    var EnvelopeFactory = function () {
        obj.call(this);
    };
    ns.Class(EnvelopeFactory, obj, [Envelope.Factory]);

    EnvelopeFactory.prototype.createEnvelope = function (from, to, when) {
        if (!when) {
            when = new Date();
        }
        return new MessageEnvelope(from, to, when);
    };

    EnvelopeFactory.prototype.parseEnvelope = function (env) {
        if (!env || !env['sender']) {
            // env.sender should not empty
            return null;
        }
        return new MessageEnvelope(env);
    };

    Envelope.setFactory(new EnvelopeFactory());

    //-------- namespace --------
    ns.dkd.EnvelopeFactory = EnvelopeFactory;

    ns.dkd.registers('EnvelopeFactory');

})(DaoKeDao);

(function (ns) {
    'use strict';

    var obj = ns.type.Object;
    var InstantMessage = ns.protocol.InstantMessage;
    var PlainMessage = ns.dkd.PlainMessage;

    var InstantMessageFactory = function () {
        obj.call(this);
    };
    ns.Class(InstantMessageFactory, obj, [InstantMessage.Factory]);

    InstantMessageFactory.prototype.createInstantMessage = function (head, body) {
        return new PlainMessage(head, body);
    };

    InstantMessageFactory.prototype.parseInstantMessage = function (msg) {
        return new PlainMessage(msg);
    };

    InstantMessage.setFactory(new InstantMessageFactory());

    //-------- namespace --------
    ns.dkd.InstantMessageFactory = InstantMessageFactory;

    ns.dkd.registers('InstantMessageFactory');

})(DaoKeDao);

(function (ns) {
    'use strict';

    var obj = ns.type.Object;
    var SecureMessage = ns.protocol.SecureMessage;
    var EncryptedMessage = ns.dkd.EncryptedMessage;

    var SecureMessageFactory = function () {
        obj.call(this);
    };
    ns.Class(SecureMessageFactory, obj, [SecureMessage.Factory]);

    SecureMessageFactory.prototype.parseSecureMessage = function (msg) {
        return new EncryptedMessage(msg);
    };

    SecureMessage.setFactory(new SecureMessageFactory());

    //-------- namespace --------
    ns.dkd.SecureMessageFactory = SecureMessageFactory;

    ns.dkd.registers('SecureMessageFactory');

})(DaoKeDao);

(function (ns) {
    'use strict';

    var obj = ns.type.Object;
    var ReliableMessage = ns.protocol.ReliableMessage;
    var NetworkMessage = ns.dkd.NetworkMessage;

    var ReliableMessageFactory = function () {
        obj.call(this);
    };
    ns.Class(ReliableMessageFactory, obj, [ReliableMessage.Factory]);

    ReliableMessageFactory.prototype.parseReliableMessage = function (msg) {
        return new NetworkMessage(msg);
    };

    ReliableMessage.setFactory(new ReliableMessageFactory());

    //-------- namespace --------
    ns.dkd.ReliableMessageFactory = ReliableMessageFactory;

    ns.dkd.registers('ReliableMessageFactory');

})(DaoKeDao);
