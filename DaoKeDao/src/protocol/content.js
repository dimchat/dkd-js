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

//! require <mkm.js>
//! require 'types.js'

(function (ns) {
    'use strict';

    var Mapper = ns.type.Mapper;
    var ID = ns.protocol.ID;
    var ContentType = ns.protocol.ContentType;

    var Content = function () {};
    ns.Interface(Content, [Mapper]);

    /**
     *  Get content type
     *
     * @return {uint}
     */
    Content.prototype.getType = function () {
        console.assert(false, 'implement me!');
        return 0;
    };
    Content.getType = function (content) {
        return content['type'];
    };

    /**
     *  Get serial number (message id)
     *
     * @return {uint}
     */
    Content.prototype.getSerialNumber = function () {
        console.assert(false, 'implement me!');
        return 0;
    };
    Content.getSerialNumber = function (content) {
        return content['sn'];
    };

    /**
     *  Get message time
     *
     * @return {Date}
     */
    Content.prototype.getTime = function () {
        console.assert(false, 'implement me!');
        return null;
    };
    Content.getTime = function (content) {
        var timestamp = content['time'];
        if (timestamp) {
            return new Date(timestamp * 1000);
        } else {
            return null;
        }
    };

    // Group ID/string for group message
    //    if field 'group' exists, it means this is a group message
    Content.prototype.getGroup = function () {
        console.assert(false, 'implement me!');
        return null;
    };
    Content.prototype.setGroup = function (identifier) {
        console.assert(false, 'implement me!');
    };
    Content.getGroup = function (content) {
        return ID.parse(content['group']);
    };
    Content.setGroup = function (group, content) {
        if (group) {
            content['group'] = group.toString();
        } else {
            delete content['group'];
        }
    };

    var EnumToUint = function (type) {
        if (typeof type === 'number') {
            return type;
        } else {
            return type.valueOf();
        }
    };

    /**
     *  Content Factory
     *  ~~~~~~~~~~~~~~~
     */
    var ContentFactory = function () {};
    ns.Interface(ContentFactory, null);

    // noinspection JSUnusedLocalSymbols
    ContentFactory.prototype.parseContent = function (content) {
        console.assert(false, 'implement me!');
        return null;
    };

    Content.Factory = ContentFactory;

    //
    //  Instances of ContentFactory
    //
    var s_content_factories = {};  // type(uint8|ContentType) -> ContentFactory

    /**
     *  Register content factory with type
     *
     * @param {ContentType|uint} type
     * @param {ContentFactory} factory
     */
    Content.setFactory = function (type, factory) {
        s_content_factories[EnumToUint(type)] = factory;
    };
    Content.getFactory = function (type) {
        return s_content_factories[EnumToUint(type)];
    };

    /**
     *  Parse map object to content
     *
     * @param {*} content - content info
     * @return {Content}
     */
    Content.parse = function (content) {
        if (!content) {
            return null;
        } else if (ns.Interface.conforms(content, Content)) {
            return content;
        }
        content = ns.type.Wrapper.fetchMap(content);
        var type = Content.getType(content);
        var factory = Content.getFactory(type);
        if (!factory) {
            factory = Content.getFactory(0);  // unknown
        }
        return factory.parseContent(content);
    };

    //-------- namespace --------
    ns.protocol.Content = Content;

    ns.protocol.registers('Content');

})(DaoKeDao);
