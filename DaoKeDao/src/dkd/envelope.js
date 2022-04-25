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
 *  Envelope for message
 *  ~~~~~~~~~~~~~~~~~~~~
 *  This class is used to create a message envelope
 *  which contains 'sender', 'receiver' and 'time'
 *
 *  data format: {
 *      sender   : "moki@xxx",
 *      receiver : "hulk@yyy",
 *      time     : 123
 *  }
 */

//! require 'protocol/envelope.js'

(function (ns) {
    'use strict';

    var Dictionary = ns.type.Dictionary;

    var Envelope = ns.protocol.Envelope;

    /**
     *  Create envelope
     *
     *  Usages:
     *      1. new MessageEnvelope(map);
     *      2. new MessageEnvelope(sender, receiver);
     *      3. new MessageEnvelope(sender, receiver, time);
     */
    var MessageEnvelope = function () {
        var from, to, when;
        var env;
        if (arguments.length === 1) {
            // new MessageEnvelope(map);
            env = arguments[0];
            from = Envelope.getSender(env);
            to = Envelope.getReceiver(env);
            when = Envelope.getTime(env);
        } else if (arguments.length === 2) {
            // new MessageEnvelope(sender, receiver);
            from = arguments[0];
            to = arguments[1];
            when = new Date();
            env = {
                'sender': from.toString(),
                'receiver': to.toString(),
                'time': when.getTime() / 1000.0
            }
        } else if (arguments.length === 3) {
            // new MessageEnvelope(sender, receiver, time);
            from = arguments[0];
            to = arguments[1];
            when = arguments[2];
            if (!when) {
                when = new Date();
            } else if (typeof when === 'number') {
                when = new Date(when * 1000);
            }
            env = {
                'sender': from.toString(),
                'receiver': to.toString(),
                'time': when.getTime() / 1000.0
            }
        } else {
            throw new SyntaxError('envelope arguments error: ' + arguments);
        }
        Dictionary.call(this, env);
        this.__sender = from;
        this.__receiver = to;
        this.__time = when;
    };
    ns.Class(MessageEnvelope, Dictionary, [Envelope]);

    // Override
    MessageEnvelope.prototype.getSender = function () {
        return this.__sender;
    };

    // Override
    MessageEnvelope.prototype.getReceiver = function () {
        return this.__receiver;
    };

    // Override
    MessageEnvelope.prototype.getTime = function () {
        return this.__time;
    };

    // Override
    MessageEnvelope.prototype.getGroup = function () {
        var dict = this.toMap();
        return Envelope.getGroup(dict);
    };

    // Override
    MessageEnvelope.prototype.setGroup = function (identifier) {
        var dict = this.toMap();
        Envelope.setGroup(identifier, dict);
    };

    // Override
    MessageEnvelope.prototype.getType = function () {
        var dict = this.toMap();
        return Envelope.getType(dict);
    };

    // Override
    MessageEnvelope.prototype.setType = function (type) {
        var dict = this.toMap();
        Envelope.setType(type, dict);
    };

    //-------- namespace --------
    ns.dkd.MessageEnvelope = MessageEnvelope;

    ns.dkd.registers('MessageEnvelope');

})(DaoKeDao);
