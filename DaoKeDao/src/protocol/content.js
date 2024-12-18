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

//! require 'types.js'

(function (ns) {
    'use strict';

    var Interface = ns.type.Interface;
    var Mapper    = ns.type.Mapper;

    /**
     *  Message Content
     *  ~~~~~~~~~~~~~~~
     *  This class is for creating message content
     *
     *  data format: {
     *      'type'    : 0x00,            // message type
     *      'sn'      : 0,               // serial number
     *
     *      'time'    : 123,             // message time
     *      'group'   : 'Group ID',      // for group message
     *
     *      //-- message info
     *      'text'    : 'text',          // for text message
     *      'command' : 'Command Name'   // for system command
     *      //...
     *  }
     */
    var Content = Interface(null, [Mapper]);

    /**
     *  Get content type
     *
     * @return {uint}
     */
    Content.prototype.getType = function () {};

    /**
     *  Get serial number (message id)
     *
     * @return {uint}
     */
    Content.prototype.getSerialNumber = function () {};

    /**
     *  Get message time
     *
     * @return {Date}
     */
    Content.prototype.getTime = function () {};

    /**
     *  Group ID/string for group message
     *  if field 'group' exists, it means this is a group message
     *
     * @param {ID} identifier
     */
    Content.prototype.setGroup = function (identifier) {};
    Content.prototype.getGroup = function () {};

    //
    //  Factory method
    //

    var general_factory = function () {
        var man = ns.dkd.MessageFactoryManager;
        return man.generalFactory;
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
     *  Content Factory
     *  ~~~~~~~~~~~~~~~
     */
    var ContentFactory = Interface(null, null);

    /**
     *  Parse map object to content
     *
     * @param {*} content - content info
     * @return {Content}
     */
    ContentFactory.prototype.parseContent = function (content) {};

    Content.Factory = ContentFactory;

    //-------- namespace --------
    ns.protocol.Content = Content;
    // ns.protocol.ContentFactory = ContentFactory;

})(DaoKeDao);
