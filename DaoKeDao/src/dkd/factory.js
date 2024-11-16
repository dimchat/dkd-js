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

//!require 'protocol/envelope.js'
//!require 'protocol/instant.js'
//!require 'protocol/secure.js'
//!require 'protocol/reliable.js'

(function (ns) {
    'use strict';

    var Interface = ns.type.Interface;
    var Class     = ns.type.Class;
    var Wrapper   = ns.type.Wrapper;
    var Converter = ns.type.Converter;

    var Content         = ns.protocol.Content;
    var Envelope        = ns.protocol.Envelope;
    var InstantMessage  = ns.protocol.InstantMessage;
    var SecureMessage   = ns.protocol.SecureMessage;
    var ReliableMessage = ns.protocol.ReliableMessage;

    var GeneralFactory = function () {
        this.__contentFactories = {};  // type => Content.Factory
        this.__envelopeFactory = null;
        this.__instantMessageFactory = null;
        this.__secureMessageFactory = null;
        this.__reliableMessageFactory = null;
    };
    Class(GeneralFactory, null, null, null);

    //
    //  Content
    //

    var EnumToUint = function (type) {
        if (typeof type === 'number') {
            return type;
        } else {
            return type.valueOf();
        }
    };

    GeneralFactory.prototype.setContentFactory = function (type, factory) {
        type = EnumToUint(type);
        this.__contentFactories[type] = factory;
    };
    GeneralFactory.prototype.getContentFactory = function (type) {
        type = EnumToUint(type);
        return this.__contentFactories[type];
    };
    GeneralFactory.prototype.getContentType = function (content, defaultType) {
        return Converter.getInt(content['type'], defaultType);
    };
    GeneralFactory.prototype.parseContent = function (content) {
        if (!content) {
            return null;
        } else if (Interface.conforms(content, Content)) {
            return content;
        }
        var info = Wrapper.fetchMap(content);
        if (!info) {
            return null;
        }
        var type = this.getContentType(info, 0);
        var factory = this.getContentFactory(type);
        if (!factory) {
            factory = this.getContentFactory(0);  // unknown
        }
        return factory.parseContent(info);
    };

    //
    //  Envelope
    //

    GeneralFactory.prototype.setEnvelopeFactory = function (factory) {
        this.__envelopeFactory = factory;
    };
    GeneralFactory.prototype.getEnvelopeFactory = function () {
        return this.__envelopeFactory;
    };

    GeneralFactory.prototype.createEnvelope = function (from, to, when) {
        var factory = this.getEnvelopeFactory();
        return factory.createEnvelope(from, to, when);
    };
    GeneralFactory.prototype.parseEnvelope = function (env) {
        if (!env) {
            return null;
        } else if (Interface.conforms(env, Envelope)) {
            return env;
        }
        var info = Wrapper.fetchMap(env);
        if (!info) {
            return null;
        }
        var factory = this.getEnvelopeFactory();
        return factory.parseEnvelope(info);
    };

    //
    //  InstantMessage
    //

    GeneralFactory.prototype.setInstantMessageFactory = function (factory) {
        this.__instantMessageFactory = factory;
    };
    GeneralFactory.prototype.getInstantMessageFactory = function () {
        return this.__instantMessageFactory;
    };

    GeneralFactory.prototype.createInstantMessage = function (head, body) {
        var factory = this.getInstantMessageFactory();
        return factory.createInstantMessage(head, body);
    };
    GeneralFactory.prototype.parseInstantMessage = function (msg) {
        if (!msg) {
            return null;
        } else if (Interface.conforms(msg, InstantMessage)) {
            return msg;
        }
        var info = Wrapper.fetchMap(msg);
        if (!info) {
            return null;
        }
        var factory = this.getInstantMessageFactory();
        return factory.parseInstantMessage(info);
    };
    GeneralFactory.prototype.generateSerialNumber = function (type, now) {
        var factory = this.getInstantMessageFactory();
        return factory.generateSerialNumber(type, now);
    };

    //
    //  SecureMessage
    //

    GeneralFactory.prototype.setSecureMessageFactory = function (factory) {
        this.__secureMessageFactory = factory;
    };
    GeneralFactory.prototype.getSecureMessageFactory = function () {
        return this.__secureMessageFactory;
    };

    GeneralFactory.prototype.parseSecureMessage = function (msg) {
        if (!msg) {
            return null;
        } else if (Interface.conforms(msg, SecureMessage)) {
            return msg;
        }
        var info = Wrapper.fetchMap(msg);
        if (!info) {
            return null;
        }
        var factory = this.getSecureMessageFactory();
        return factory.parseSecureMessage(info);
    };

    //
    //  ReliableMessage
    //

    GeneralFactory.prototype.setReliableMessageFactory = function (factory) {
        this.__reliableMessageFactory = factory;
    };
    GeneralFactory.prototype.getReliableMessageFactory = function () {
        return this.__reliableMessageFactory;
    };

    GeneralFactory.prototype.parseReliableMessage = function (msg) {
        if (!msg) {
            return null;
        } else if (Interface.conforms(msg, ReliableMessage)) {
            return msg;
        }
        var info = Wrapper.fetchMap(msg);
        if (!info) {
            return null;
        }
        var factory = this.getReliableMessageFactory();
        return factory.parseReliableMessage(info);
    };

    var FactoryManager = {
        generalFactory: new GeneralFactory()
    };

    //-------- namespace --------
    ns.dkd.MessageGeneralFactory = GeneralFactory;
    ns.dkd.MessageFactoryManager = FactoryManager;

})(DaoKeDao);
