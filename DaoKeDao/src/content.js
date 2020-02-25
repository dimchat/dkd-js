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

//! require 'namespace.js'
//! require 'protocol.js'

!function (ns) {
    'use strict';

    var Dictionary = ns.type.Dictionary;

    var ContentType = ns.protocol.ContentType;

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
     * @param info {{}|ContentType} - content info; or content type
     * @constructor
     */
    var Content = function (info) {
        if ((typeof info === 'number') || info instanceof ContentType) {
            // create new content with type
            info = {
                'type': info,
                'sn': randomPositiveInteger()
            };
        }
        Dictionary.call(this, info);
        // message type: text, image, ...
        this.type = new ContentType(info['type']);
        // serial number: random number to identify message content
        this.sn = info['sn'];
    };
    ns.Class(Content, Dictionary, null);

    // Group ID/string for group message
    //    if field 'group' exists, it means this is a group message
    Content.prototype.getGroup = function () {
        return this.getValue('group');
    };

    Content.prototype.setGroup = function (identifier) {
        this.setValue('group', identifier);
    };

    //-------- Runtime --------
    var content_classes = {};

    /**
     *  Register content class with content type
     *
     * @param type {ContentType}
     * @param clazz {Class}
     */
    Content.register = function (type, clazz) {
        var value;
        if (type instanceof ContentType) {
            value = type.valueOf();
        } else {
            value = type;
        }
        content_classes[value] = clazz;
    };

    /**
     *  Create content
     *
     * @param content {{}|Content}
     * @returns {Content}
     */
    Content.getInstance = function (content) {
        if (!content) {
            return null;
        } else if (content instanceof Content) {
            return content;
        }
        // create instance by subclass (with content type)
        var type = content['type'];
        if (type instanceof ContentType) {
            type = type.valueOf();
        }
        var clazz = content_classes[type];
        if (typeof clazz === 'function') {
            return Content.createInstance(clazz, content);
        }
        // custom message content
        return new Content(content);
    };

    /**
     *  Create content with specified class
     *
     * @param clazz - content Class
     * @param map {{}} - content info
     * @returns {Content}
     */
    Content.createInstance = function (clazz, map) {
        if (typeof clazz.getInstance === 'function') {
            return clazz.getInstance(map);
        } else {
            return new clazz(map);
        }
    };

    //-------- namespace --------
    ns.Content = Content;

    ns.register('Content');

}(DaoKeDao);
