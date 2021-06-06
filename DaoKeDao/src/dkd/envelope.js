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
                'time': Math.ceil(when.getTime() / 1000)
            }
        } else if (arguments.length === 3) {
            // new MessageEnvelope(sender, receiver, time);
            from = arguments[0];
            to = arguments[1];
            if (arguments[2] instanceof Date) {
                when = arguments[2];
            } else {
                when = new Date(arguments[2] * 1000);
            }
            env = {
                'sender': from.toString(),
                'receiver': to.toString(),
                'time': Math.ceil(when.getTime() / 1000)
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

    MessageEnvelope.prototype.getSender = function () {
        return this.__sender;
    };
    MessageEnvelope.prototype.getReceiver = function () {
        return this.__receiver;
    };
    MessageEnvelope.prototype.getTime = function () {
        return this.__time;
    };

    /*
     *  Group ID
     *  ~~~~~~~~
     *  when a group message was split/trimmed to a single message
     *  the 'receiver' will be changed to a member ID, and
     *  the group ID will be saved as 'group'.
     */
    MessageEnvelope.prototype.getGroup = function () {
        return Envelope.getGroup(this.getMap());
    };
    MessageEnvelope.prototype.setGroup = function (identifier) {
        Envelope.setGroup(identifier, this.getMap());
    };

    /*
     *  Message Type
     *  ~~~~~~~~~~~~
     *  because the message content will be encrypted, so
     *  the intermediate nodes(station) cannot recognize what kind of it.
     *  we pick out the content type and set it in envelope
     *  to let the station do its job.
     */
    MessageEnvelope.prototype.getType = function () {
        return Envelope.getType(this.getMap());
    };
    MessageEnvelope.prototype.setType = function (type) {
        Envelope.setType(type, this.getMap());
    };

    //-------- namespace --------
    ns.MessageEnvelope = MessageEnvelope;

    ns.register('MessageEnvelope');

})(DaoKeDao);
