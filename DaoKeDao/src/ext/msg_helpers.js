'use strict';
// license: https://mit-license.org
//
//  Dao-Ke-Dao: Universal Message Module
//
//                               Written in 2025 by Moky <albert.moky@gmail.com>
//
// =============================================================================
// The MIT License (MIT)
//
// Copyright (c) 2025 Albert Moky
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

//! require 'protocol/content.js'
//! require 'protocol/envelope.js'
//! require 'protocol/instant.js'
//! require 'protocol/secure.js'
//! require 'protocol/reliable.js'


dkd.ext.ContentHelper = Interface(null, null);
var ContentHelper = dkd.ext.ContentHelper;

ContentHelper.prototype = {

    setContentFactory: function (msg_type, factory) {},
    getContentFactory: function (msg_type) {},

    parseContent: function (content) {}

};


dkd.ext.EnvelopeHelper = Interface(null, null);
var EnvelopeHelper = dkd.ext.EnvelopeHelper;

EnvelopeHelper.prototype = {

    setEnvelopeFactory: function (factory) {},
    getEnvelopeFactory: function () {},

    createEnvelope: function (sender, receiver, time) {},

    parseEnvelope: function (env) {}

};


dkd.ext.InstantMessageHelper = Interface(null, null);
var InstantMessageHelper = dkd.ext.InstantMessageHelper;

InstantMessageHelper.prototype = {

    setInstantMessageFactory: function (factory) {},
    getInstantMessageFactory: function () {},

    createInstantMessage: function (head, body) {},

    parseInstantMessage: function (msg) {},

    generateSerialNumber: function (msg_type, when) {}

};


dkd.ext.SecureMessageHelper = Interface(null, null);
var SecureMessageHelper = dkd.ext.SecureMessageHelper;

SecureMessageHelper.prototype = {

    setSecureMessageFactory: function (factory) {},
    getSecureMessageFactory: function () {},

    parseSecureMessage: function (msg) {}

};


dkd.ext.ReliableMessageHelper = Interface(null, null);
var ReliableMessageHelper = dkd.ext.ReliableMessageHelper;

ReliableMessageHelper.prototype = {

    setReliableMessageFactory: function (factory) {},
    getReliableMessageFactory: function () {},

    parseReliableMessage: function (msg) {}

};


/**
 *  Message FactoryManager
 *  ~~~~~~~~~~~~~~~~~~~~~~
 */
dkd.ext.MessageExtensions = {

    /**
     *  Init content helper
     *
     * @param {ContentHelper} helper
     */
    setContentHelper: function (helper) {
        contentHelper = helper;
    },
    getContentHelper: function () {
        return contentHelper;
    },

    /**
     *  Init envelope helper
     *
     * @param {EnvelopeHelper} helper
     */
    setEnvelopeHelper: function (helper) {
        envelopeHelper = helper;
    },
    getEnvelopeHelper: function () {
        return envelopeHelper;
    },

    /**
     *  Init instant message helper
     *
     * @param {InstantMessageHelper} helper
     */
    setInstantHelper: function (helper) {
        instantHelper = helper;
    },
    getInstantHelper: function () {
        return instantHelper;
    },

    /**
     *  Init secure message helper
     *
     * @param {SecureMessageHelper} helper
     */
    setSecureHelper: function (helper) {
        secureHelper = helper;
    },
    getSecureHelper: function () {
        return secureHelper;
    },

    /**
     *  Init reliable message helper
     *
     * @param {ReliableMessageHelper} helper
     */
    setReliableHelper: function (helper) {
        reliableHelper = helper;
    },
    getReliableHelper: function () {
        return reliableHelper;
    }

};
var MessageExtensions = dkd.ext.MessageExtensions;

var contentHelper = null;
var envelopeHelper = null;

var instantHelper = null;
var secureHelper = null;
var reliableHelper = null;
