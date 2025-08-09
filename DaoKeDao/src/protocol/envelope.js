'use strict';
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
    dkd.protocol.Envelope = Interface(null, [Mapper]);
    var Envelope = dkd.protocol.Envelope;

    /**
     *  message from
     *
     * @return {ID}
     */
    Envelope.prototype.getSender = function () {};

    /**
     *  message to
     *
     * @return {ID}
     */
    Envelope.prototype.getReceiver = function () {};

    /**
     *  Get message time
     *
     * @return {Date}
     */
    Envelope.prototype.getTime = function () {};

    /**
     *  Group ID
     *  ~~~~~~~~
     *  when a group message was split/trimmed to a single message
     *  the 'receiver' will be changed to a member ID, and
     *  the group ID will be saved as 'group'.
     *
     * @param {ID} identifier - group ID
     */
    Envelope.prototype.setGroup = function (identifier) {};
    Envelope.prototype.getGroup = function () {};

    /**
     *  Message Type
     *  ~~~~~~~~~~~~
     *  because the message content will be encrypted, so
     *  the intermediate nodes(station) cannot recognize what kind of it.
     *  we pick out the content type and set it in envelope
     *  to let the station do its job.
     *
     * @param {String} type - content type
     */
    Envelope.prototype.setType = function (type) {};
    Envelope.prototype.getType = function () {};

    //
    //  Factory methods
    //

    /**
     *  Create envelope
     *
     * @param {ID} from   - sender ID
     * @param {ID} to     - receiver ID
     * @param {Date} when - message time
     * @return {Envelope}
     */
    Envelope.create = function (from, to, when) {
        var helper = MessageExtensions.getEnvelopeHelper();
        return helper.createEnvelope(from, to, when);
    };

    /**
     *  Parse map object to envelope
     *
     * @param {*} env - envelope info
     * @return {Envelope}
     */
    Envelope.parse = function (env) {
        var helper = MessageExtensions.getEnvelopeHelper();
        return helper.parseEnvelope(env);
    };

    Envelope.getFactory = function () {
        var helper = MessageExtensions.getEnvelopeHelper();
        return helper.getEnvelopeFactory();
    }
    Envelope.setFactory = function (factory) {
        var helper = MessageExtensions.getEnvelopeHelper();
        helper.setEnvelopeFactory(factory);
    };

    /**
     *  Envelope Factory
     *  ~~~~~~~~~~~~~~~~
     */
    Envelope.Factory = Interface(null, null);
    var EnvelopeFactory = Envelope.Factory;

    /**
     *  Create envelope
     *
     * @param {ID} from   - sender ID
     * @param {ID} to     - receiver ID
     * @param {Date} when - message time
     * @return {Envelope}
     */
    EnvelopeFactory.prototype.createEnvelope = function (from, to, when) {};

    /**
     *  Parse map object to envelope
     *
     * @param {*} env - envelope info
     * @return {Envelope}
     */
    EnvelopeFactory.prototype.parseEnvelope = function (env) {};
