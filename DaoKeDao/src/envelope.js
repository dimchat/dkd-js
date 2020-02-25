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

//! require 'namespace.js'
//! require 'protocol.js'

!function (ns) {
    'use strict';

    var Dictionary = ns.type.Dictionary;

    var ContentType = ns.protocol.ContentType;

    var Envelope = function (env) {
        Dictionary.call(this, env);
        this.sender = env['sender'];
        this.receiver = env['receiver'];
        this.time = env['time'];
    };
    ns.Class(Envelope, Dictionary, null);

    /**
     *  Generate envelope
     *
     * @param sender {String}
     * @param receiver {String}
     * @param time {Date|Number}
     * @returns {Envelope}
     */
    Envelope.newEnvelope = function (sender, receiver, time) {
        var env = {
            'sender': sender,
            'receiver': receiver
        };
        if (!time) {
            // get current time
            time = new Date();
            env['time'] = Math.ceil(time.getTime() / 1000);
        } else if (time instanceof Date) {
            /** getTime(): Gets the time value in milliseconds. */
            env['time'] = Math.ceil(time.getTime() / 1000);
        } else {
            // time in seconds since midnight, January 1, 1970 UTC.
            env['time'] = time;
        }
        return new Envelope(env);
    };

    /**
     *  Create envelope
     *
     * @param env {{}|Envelope}
     * @returns {Envelope}
     */
    Envelope.getInstance = function (env) {
        if (!env) {
            return null;
        } else if (env instanceof Envelope) {
            return env;
        }
        return new Envelope(env);
    };

    /*
     *  Group ID
     *  ~~~~~~~~
     *  when a group message was split/trimmed to a single message
     *  the 'receiver' will be changed to a member ID, and
     *  the group ID will be saved as 'group'.
     */
    Envelope.prototype.getGroup = function () {
        return this.getValue('group');
    };
    Envelope.prototype.setGroup = function (identifier) {
        this.setValue('group', identifier);
    };

    /*
     *  Message Type
     *  ~~~~~~~~~~~~
     *  because the message content will be encrypted, so
     *  the intermediate nodes(station) cannot recognize what kind of it.
     *  we pick out the content type and set it in envelope
     *  to let the station do its job.
     */
    Envelope.prototype.getType = function () {
        var type = this.getValue('type');
        if (type) {
            return new ContentType(type);
        } else {
            return null;
        }
    };
    Envelope.prototype.setType = function (type) {
        this.setValue('type', type);
    };

    //-------- namespace --------
    ns.Envelope = Envelope;

    ns.register('Envelope');

}(DaoKeDao);
