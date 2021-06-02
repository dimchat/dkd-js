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
 *  Message Content
 *  ~~~~~~~~~~~~~~~
 *  This class is for creating message content
 *
 *  data format: {
 *      'type'    : 0x00,            // message type
 *      'sn'      : 0,               // serial number
 *
 *      'group'   : 'Group ID',      // for group message
 *
 *      //-- message info
 *      'text'    : 'text',          // for text message
 *      'command' : 'Command Name',  // for system command
 *      //...
 *  }
 */

//! require 'protocol/content.js'

(function (ns) {
    'use strict';

    var Dictionary = ns.type.Dictionary;
    var ContentType = ns.protocol.ContentType;
    var Content = ns.protocol.Content;

    var MAX_LONG = 0xFFFFFFFF;
    var randomPositiveInteger = function () {
        var sn = Math.ceil(Math.random() * MAX_LONG);
        if (sn > 0) {
            return sn;
        } else if (sn < 0) {
            return -sn;
        }
        // ZERO? do it again!
        return 9527 + 9394; // randomPositiveInteger();
    };

    /**
     *  Create message content
     *
     * @param {{String:Object}|ContentType} info - content info; or content type
     * @constructor
     */
    var BaseContent = function (info) {
        var content, type, sn, time;
        if (typeof info === 'number') {
            type = info;
            sn = randomPositiveInteger();
            time = new Date();
            content = {
                'type': type,
                'sn': sn,
                'time': time.getTime() / 1000
            };
        } else if (info instanceof ContentType) {
            type = info.valueOf();
            sn = randomPositiveInteger();
            time = new Date();
            content = {
                'type': type,
                'sn': sn,
                'time': time.getTime() / 1000
            };
        } else {
            content = info;
            type = Content.getType(content);
            sn = Content.getSerialNumber(content);
            time = Content.getTime(content);
        }
        Dictionary.call(this, content);
        // message type: text, image, ...
        this.type = type;
        // serial number: random number to identify message content
        this.sn = sn;
        // message time
        this.time = time;
    };
    ns.Class(BaseContent, Dictionary, [Content]);

    BaseContent.prototype.getType = function () {
        return this.type;
    };
    BaseContent.prototype.getSerialNumber = function () {
        return this.sn;
    };
    BaseContent.prototype.getTime = function () {
        return this.time;
    };

    // Group ID/string for group message
    //    if field 'group' exists, it means this is a group message
    BaseContent.prototype.getGroup = function () {
        return Content.getGroup(this.getMap());
    };

    BaseContent.prototype.setGroup = function (identifier) {
        Content.setGroup(identifier, this.getMap());
    };

    //-------- namespace --------
    ns.BaseContent = BaseContent;

    ns.register('BaseContent');

})(DaoKeDao);