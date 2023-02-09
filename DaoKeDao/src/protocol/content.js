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
 *      'cmd'     : 'Command Name',  // for system command
 *      //...
 *  }
 */

//! require 'types.js'

(function (ns) {
    'use strict';

    var Interface = ns.type.Interface;
    var Mapper    = ns.type.Mapper;

    var general_factory = function () {
        var man = ns.dkd.FactoryManager;
        return man.generalFactory;
    };

    var Content = Interface(null, [Mapper]);

    /**
     *  Get content type
     *
     * @return {uint}
     */
    Content.prototype.getType = function () {
        throw new Error('NotImplemented');
    };

    /**
     *  Get serial number (message id)
     *
     * @return {uint}
     */
    Content.prototype.getSerialNumber = function () {
        throw new Error('NotImplemented');
    };

    /**
     *  Get message time
     *
     * @return {Date}
     */
    Content.prototype.getTime = function () {
        throw new Error('NotImplemented');
    };

    // Group ID/string for group message
    //    if field 'group' exists, it means this is a group message
    Content.prototype.getGroup = function () {
        throw new Error('NotImplemented');
    };
    Content.prototype.setGroup = function (identifier) {
        throw new Error('NotImplemented');
    };

    /**
     *  Content Factory
     *  ~~~~~~~~~~~~~~~
     */
    var ContentFactory = Interface(null, null);

    ContentFactory.prototype.parseContent = function (content) {
        throw new Error('NotImplemented');
    };

    Content.Factory = ContentFactory;

    /**
     *  Register content factory with type
     *
     * @param {ContentType|uint} type
     * @param {ContentFactory} factory
     */
    Content.setFactory = function (type, factory) {
        var gf = general_factory();
        gf.setContentFactory(type, factory);
    };
    Content.getFactory = function (type) {
        var gf = general_factory();
        return gf.getContentFactory(type);
    };

    /**
     *  Parse map object to content
     *
     * @param {*} content - content info
     * @return {Content}
     */
    Content.parse = function (content) {
        var gf = general_factory();
        return gf.parseContent(content);
    };

    //-------- namespace --------
    ns.protocol.Content = Content;

})(DaoKeDao);
