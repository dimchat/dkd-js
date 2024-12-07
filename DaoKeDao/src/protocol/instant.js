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

//! require 'message.js'
//! require 'content.js'

(function (ns) {
    'use strict';

    var Interface = ns.type.Interface;
    var Message = ns.protocol.Message;

    /**
     *  Instant Message
     *  ~~~~~~~~~~~~~~~
     *
     *  data format: {
     *      //-- envelope
     *      sender   : "moki@xxx",
     *      receiver : "hulk@yyy",
     *      time     : 123,
     *      //-- content
     *      content  : {...}
     *  }
     */
    var InstantMessage = Interface(null, [Message]);

    InstantMessage.prototype.getContent = function () {};
    /*/
    // only for rebuild content
    InstantMessage.prototype.setContent = function (body) {};
    /*/

    //
    //  Factory methods
    //

    var general_factory = function () {
        var man = ns.dkd.MessageFactoryManager;
        return man.generalFactory;
    };

    /**
     *  Generate SN (Message ID) with msg type & time
     *
     * @param {ContentType|uint} type - message type
     * @param {Date} now              - message time
     * @return {uint} SN (uint64, serial number as msg id)
     */
    InstantMessage.generateSerialNumber = function (type, now) {
        var gf = general_factory();
        return gf.generateSerialNumber(type, now);
    };

    /**
     *  Create instant message with envelope & content
     *
     * @param {Envelope} head - message envelope
     * @param {Content} body - message content
     * @return {InstantMessage}
     */
    InstantMessage.create = function (head, body) {
        var gf = general_factory();
        return gf.createInstantMessage(head, body);
    };

    /**
     *  Parse map object to message
     *
     * @param {*} msg - message info
     * @return {InstantMessage}
     */
    InstantMessage.parse = function (msg) {
        var gf = general_factory();
        return gf.parseInstantMessage(msg);
    };

    InstantMessage.getFactory = function () {
        var gf = general_factory();
        return gf.getInstantMessageFactory();
    };
    InstantMessage.setFactory = function (factory) {
        var gf = general_factory();
        gf.setInstantMessageFactory(factory);
    };

    /**
     *  Message Factory
     *  ~~~~~~~~~~~~~~~
     */
    var InstantMessageFactory = Interface(null, null);

    /**
     *  Generate SN for message content
     *
     * @param {uint} msgType - content type
     * @param {Date} now     - message time
     * @return {uint} SN (uint64, serial number as msg id)
     */
    InstantMessageFactory.prototype.generateSerialNumber = function (msgType, now) {};

    /**
     *  Create instant message with envelope & content
     *
     * @param {Envelope} head - message envelope
     * @param {Content} body  - message content
     * @return {InstantMessage}
     */
    InstantMessageFactory.prototype.createInstantMessage = function (head, body) {};

    /**
     *  Parse map object to message
     *
     * @param {*} msg - message info
     * @return {InstantMessage}
     */
    InstantMessageFactory.prototype.parseInstantMessage = function (msg) {};

    InstantMessage.Factory = InstantMessageFactory;

    //-------- namespace --------
    ns.protocol.InstantMessage = InstantMessage;
    // ns.protocol.InstantMessageFactory = InstantMessageFactory;

})(DaoKeDao);
