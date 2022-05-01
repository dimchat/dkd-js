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
    var InstantMessage = ns.protocol.InstantMessage;

    /**
     *  Create message content
     *
     *  Usages:
     *      1. new BaseContent(map);
     *      2. new BaseContent(type);
     */
    var BaseContent = function (info) {
        if (info instanceof ContentType) {
            // new BaseContent(type);
            info = info.valueOf();
        }
        var content, type, sn, time;
        if (typeof info === 'number') {
            // new BaseContent(type);
            type = info;
            time = new Date();
            sn = InstantMessage.generateSerialNumber(type, time);
            content = {
                'type': type,
                'sn': sn,
                'time': time.getTime() / 1000.0
            };
        } else {
            // new BaseContent(map);
            content = info;
            type = Content.getType(content);
            sn = Content.getSerialNumber(content);
            time = Content.getTime(content);
        }
        Dictionary.call(this, content);
        // message type: text, image, ...
        this.__type = type;
        // serial number: random number to identify message content
        this.__sn = sn;
        // message time
        this.__time = time;
    };
    ns.Class(BaseContent, Dictionary, [Content], {
        // Override
        getType: function () {
            return this.__type;
        },

        // Override
        getSerialNumber: function () {
            return this.__sn;
        },

        // Override
        getTime: function () {
            return this.__time;
        },

        // Override
        getGroup: function () {
            var dict = this.toMap();
            return Content.getGroup(dict);
        },

        // Override
        setGroup: function (identifier) {
            var dict = this.toMap();
            Content.setGroup(identifier, dict);
        }
    });

    //-------- namespace --------
    ns.dkd.BaseContent = BaseContent;

    ns.dkd.registers('BaseContent');

})(DaoKeDao);
