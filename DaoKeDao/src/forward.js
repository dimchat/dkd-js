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
 *  Top-Secret message: {
 *      type : 0xFF,
 *      sn   : 456,
 *
 *      forward : {...}  // reliable (secure + certified) message
 *  }
 */

//! require 'namespace.js'
//! require 'protocol.js'
//! require 'content.js'
//! require 'message.js'

!function (ns) {
    'use strict';

    var ContentType = ns.protocol.ContentType;
    var Content = ns.Content;
    var Message = ns.Message;

    /**
     *  Create top-secret message content
     *
     * @param info - content info; or secret message
     * @constructor
     */
    var ForwardContent = function (info) {
        var secret = null;
        if (!info) {
            // create empty forward content
            info = ContentType.FORWARD;
        } else if (info instanceof Message) {
            // create new forward content with secret message
            secret = info;
            info = ContentType.FORWARD;
        }
        Content.call(this, info);
        if (secret) {
            this.setMessage(secret);
        } else if (info.hasOwnProperty('forward')) {
            // update this.forward
            this.getMessage();
        } else {
            this.forward = null;
        }
    };
    ForwardContent.inherits(Content);

    ForwardContent.prototype.getMessage = function () {
        if (!this.forward) {
            var forward = this.getValue('forward');
            this.forward = Message.getInstance(forward);
        }
        return this.forward;
    };
    ForwardContent.prototype.setMessage = function (secret) {
        this.setValue('forward', secret);
        this.forward = secret;
    };

    //-------- register --------
    Content.register(ContentType.FORWARD, ForwardContent);

    //-------- namespace --------
    ns.protocol.ForwardContent = ForwardContent;

    ns.protocol.register('ForwardContent');

}(DaoKeDao);
