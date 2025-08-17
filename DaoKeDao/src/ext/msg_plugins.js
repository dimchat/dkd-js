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


/**
 *  Message GeneralFactory
 *  ~~~~~~~~~~~~~~~~~~~~~~
 */
dkd.ext.GeneralMessageHelper = Interface(null, null);
var GeneralMessageHelper = dkd.ext.GeneralMessageHelper;

GeneralMessageHelper.prototype = {

    //
    //  Message Type
    //

    /**
     *  Get message type
     *
     * @return {String}
     */
    getContentType: function (content, defaultValue) {}

};


/**
 *  Message FactoryManager
 *  ~~~~~~~~~~~~~~~~~~~~~~
 */
dkd.ext.SharedMessageExtensions = {

    //
    //  Content
    //
    setContentHelper: function (helper) {
        MessageExtensions.setContentHelper(helper);
    },
    getContentHelper: function () {
        return MessageExtensions.getContentHelper();
    },

    //
    //  Envelope
    //
    setEnvelopeHelper: function (helper) {
        MessageExtensions.setEnvelopeHelper(helper);
    },
    getEnvelopeHelper: function () {
        return MessageExtensions.getEnvelopeHelper();
    },

    //
    //  Instant Message
    //
    setInstantHelper: function (helper) {
        MessageExtensions.setInstantHelper(helper);
    },
    getInstantHelper: function () {
        return MessageExtensions.getInstantHelper();
    },

    //
    //  Secure Message
    //
    setSecureHelper: function (helper) {
        MessageExtensions.setSecureHelper(helper);
    },
    getSecureHelper: function () {
        return MessageExtensions.getSecureHelper();
    },

    //
    //  Reliable Message
    //
    setReliableHelper: function (helper) {
        MessageExtensions.setReliableHelper(helper);
    },
    getReliableHelper: function () {
        return MessageExtensions.getReliableHelper();
    },

    //
    //  General Helper
    //
    setHelper: function (helper) {
        generalMessageHelper = helper;
    },
    getHelper: function () {
        return generalMessageHelper;
    }

};
var SharedMessageExtensions = dkd.ext.SharedMessageExtensions;

var generalMessageHelper = null;
