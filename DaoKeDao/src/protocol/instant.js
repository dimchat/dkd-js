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

//! require 'message.js'
//! require 'content.js'

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
    dkd.protocol.InstantMessage = Interface(null, [Message]);
    var InstantMessage = dkd.protocol.InstantMessage;

    InstantMessage.prototype.getContent = function () {};
    /*/
    // only for rebuild content
    InstantMessage.prototype.setContent = function (body) {};
    /*/

    //
    //  Conveniences
    //

    /**
     *  Convert Maps to Messages
     *
     * @param {*[]} array
     * @return {InstantMessage[]}
     */
    InstantMessage.convert = function (array) {
        var messages = [];
        var msg;
        for (var i = 0; i < array.length; ++i) {
            msg = InstantMessage.parse(array[i]);
            if (msg) {
                messages.push(msg);
            }
        }
        return messages;
    };

    /**
     *  Convert InstantMessage to Maps
     * @param {InstantMessage[]} messages
     * @return {*[]}
     */
    InstantMessage.revert = function (messages) {
        var array = [];
        var msg;
        for (var i = 0; i < messages.length; ++i) {
            msg = messages[i];
            if (Interface.conforms(msg, Mapper)) {
                array.push(msg.toMap());
            } else {
                array.push(msg);
            }
        }
        return array;
    };

    //
    //  Factory methods
    //

    /**
     *  Generate SN (Message ID) with msg type & time
     *
     * @param {String} type - message type
     * @param {Date} now    - message time
     * @return {uint} SN (uint64, serial number as msg id)
     */
    InstantMessage.generateSerialNumber = function (type, now) {
        var helper = MessageExtensions.getInstantHelper();
        return helper.generateSerialNumber(type, now);
    };

    /**
     *  Create instant message with envelope & content
     *
     * @param {Envelope} head - message envelope
     * @param {Content} body - message content
     * @return {InstantMessage}
     */
    InstantMessage.create = function (head, body) {
        var helper = MessageExtensions.getInstantHelper();
        return helper.createInstantMessage(head, body);
    };

    /**
     *  Parse map object to message
     *
     * @param {*} msg - message info
     * @return {InstantMessage}
     */
    InstantMessage.parse = function (msg) {
        var helper = MessageExtensions.getInstantHelper();
        return helper.parseInstantMessage(msg);
    };

    InstantMessage.getFactory = function () {
        var helper = MessageExtensions.getInstantHelper();
        return helper.getInstantMessageFactory();
    };
    InstantMessage.setFactory = function (factory) {
        var helper = MessageExtensions.getInstantHelper();
        helper.setInstantMessageFactory(factory);
    };

    /**
     *  Message Factory
     *  ~~~~~~~~~~~~~~~
     */
    InstantMessage.Factory = Interface(null, null);
    var InstantMessageFactory = InstantMessage.Factory;

    /**
     *  Generate SN for message content
     *
     * @param {String} msgType - content type
     * @param {Date} now       - message time
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
