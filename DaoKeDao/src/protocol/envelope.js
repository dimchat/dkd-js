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

//! require <mkm.js>
//! require 'types.js'

(function (ns) {
    'use strict';

    var map = ns.type.Map;
    var ID = ns.protocol.ID;
    var ContentType = ns.protocol.ContentType;

    var Envelope = function () {
    };
    ns.Interface(Envelope, [map]);

    /**
     *  message from
     *
     * @return {ID}
     */
    Envelope.prototype.getSender = function () {
        console.assert(false, 'implement me!');
        return null;
    };
    Envelope.getSender = function (env) {
        return ns.protocol.ID.parse(env['sender']);
    };

    /**
     *  message to
     *
     * @return {ID}
     */
    Envelope.prototype.getReceiver = function () {
        console.assert(false, 'implement me!');
        return null;
    };
    Envelope.getReceiver = function (env) {
        return ID.parse(env['receiver']);
    };

    /**
     *  Get message time
     *
     * @return {Date}
     */
    Envelope.prototype.getTime = function () {
        console.assert(false, 'implement me!');
        return null;
    };
    Envelope.getTime = function (env) {
        var timestamp = env['time'];
        if (timestamp) {
            return new Date(timestamp * 1000);
        } else {
            return null;
        }
    };

    /*
     *  Group ID
     *  ~~~~~~~~
     *  when a group message was split/trimmed to a single message
     *  the 'receiver' will be changed to a member ID, and
     *  the group ID will be saved as 'group'.
     */
    Envelope.prototype.getGroup = function () {
        console.assert(false, 'implement me!');
        return null;
    };
    Envelope.prototype.setGroup = function (identifier) {
        console.assert(false, 'implement me!');
    };
    Envelope.getGroup = function (env) {
        return ID.parse(env['group']);
    };
    Envelope.setGroup = function (group, env) {
        if (group) {
            env['group'] = group.toString();
        } else {
            delete env['group'];
        }
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
        console.assert(false, 'implement me!');
        return null;
    };
    Envelope.prototype.setType = function (type) {
        console.assert(false, 'implement me!');
    };
    Envelope.getType = function (env) {
        var type = env['type'];
        if (type) {
            return type;
        } else {
            return 0;
        }
    };
    Envelope.setType = function (type, env) {
        if (type) {
            if (type instanceof ContentType) {
                type = type.valueOf();
            }
            env['type'] = type;
        } else {
            delete env['type'];
        }
    };

    //-------- namespace --------
    ns.protocol.Envelope = Envelope;

    ns.protocol.registers('Envelope');

})(DaoKeDao);

(function (ns) {
    'use strict';

    var map = ns.type.Map;
    var Envelope = ns.protocol.Envelope;

    /**
     *  Envelope Factory
     *  ~~~~~~~~~~~~~~~~
     */
    var EnvelopeFactory = function () {
    };
    ns.Interface(EnvelopeFactory, null);

    // noinspection JSUnusedLocalSymbols
    EnvelopeFactory.prototype.createEnvelope = function (from, to, when) {
        console.assert(false, 'implement me!');
        return null;
    };

    // noinspection JSUnusedLocalSymbols
    EnvelopeFactory.prototype.parseEnvelope = function (env) {
        console.assert(false, 'implement me!');
        return null;
    };

    Envelope.Factory = EnvelopeFactory;

    var s_factory = null;

    Envelope.getFactory = function () {
        return s_factory;
    }
    Envelope.setFactory = function (factory) {
        s_factory = factory;
    };

    /**
     *  Create envelope
     *
     * @param {ID} from        - sender ID
     * @param {ID} to          - receiver ID
     * @param {Date/uint} when - message time
     * @return {Envelope}
     */
    Envelope.create = function (from, to, when) {
        return Envelope.getFactory().createEnvelope(from, to, when);
    };

    /**
     *  Parse map object to envelope
     *
     * @param {{String:Object}} env - envelope info
     * @return {Envelope}
     */
    Envelope.parse = function (env) {
        if (!env) {
            return null;
        } else if (ns.Interface.conforms(env, Envelope)) {
            return env;
        } else if (ns.Interface.conforms(env, map)) {
            env = env.getMap();
        }
        return Envelope.getFactory().parseEnvelope(env);
    };

})(DaoKeDao);
