/**
 * DaoKeDao - Message Module (v1.0.0)
 *
 * @author    moKy <albert.moky at gmail.com>
 * @date      Nov. 16, 2024
 * @copyright (c) 2024 Albert Moky
 * @license   {@link https://mit-license.org | MIT License}
 */;
if (typeof DaoKeDao !== 'object') {
    DaoKeDao = {}
}
(function (ns) {
    'use strict';
    if (typeof ns.type !== 'object') {
        ns.type = MONKEY.type
    }
    if (typeof ns.format !== 'object') {
        ns.format = MONKEY.format
    }
    if (typeof ns.digest !== 'object') {
        ns.digest = MONKEY.digest
    }
    if (typeof ns.crypto !== 'object') {
        ns.crypto = MONKEY.crypto
    }
    if (typeof ns.protocol !== 'object') {
        ns.protocol = MingKeMing.protocol
    }
    if (typeof ns.mkm !== 'object') {
        ns.mkm = MingKeMing.mkm
    }
    if (typeof ns.dkd !== 'object') {
        ns.dkd = {}
    }
})(DaoKeDao);
(function (ns) {
    'use strict';
    var ContentType = ns.type.Enum('ContentType', {
        ANY: (0x00),
        TEXT: (0x01),
        FILE: (0x10),
        IMAGE: (0x12),
        AUDIO: (0x14),
        VIDEO: (0x16),
        PAGE: (0x20),
        NAME_CARD: (0x33),
        QUOTE: (0x37),
        MONEY: (0x40),
        TRANSFER: (0x41),
        LUCKY_MONEY: (0x42),
        CLAIM_PAYMENT: (0x48),
        SPLIT_BILL: (0x49),
        COMMAND: (0x88),
        HISTORY: (0x89),
        APPLICATION: (0xA0),
        ARRAY: (0xCA),
        CUSTOMIZED: (0xCC),
        FORWARD: (0xFF)
    });
    ns.protocol.ContentType = ContentType
})(DaoKeDao);
(function (ns) {
    'use strict';
    var Interface = ns.type.Interface;
    var Mapper = ns.type.Mapper;
    var Content = Interface(null, [Mapper]);
    Content.prototype.getType = function () {
    };
    Content.prototype.getSerialNumber = function () {
    };
    Content.prototype.getTime = function () {
    };
    Content.prototype.setGroup = function (identifier) {
    };
    Content.prototype.getGroup = function () {
    };
    var general_factory = function () {
        var man = ns.dkd.MessageFactoryManager;
        return man.generalFactory
    };
    Content.parse = function (content) {
        var gf = general_factory();
        return gf.parseContent(content)
    };
    Content.setFactory = function (type, factory) {
        var gf = general_factory();
        gf.setContentFactory(type, factory)
    };
    Content.getFactory = function (type) {
        var gf = general_factory();
        return gf.getContentFactory(type)
    };
    var ContentFactory = Interface(null, null);
    ContentFactory.prototype.parseContent = function (content) {
    };
    Content.Factory = ContentFactory;
    ns.protocol.Content = Content
})(DaoKeDao);
(function (ns) {
    'use strict';
    var Interface = ns.type.Interface;
    var Mapper = ns.type.Mapper;
    var Envelope = Interface(null, [Mapper]);
    Envelope.prototype.getSender = function () {
    };
    Envelope.prototype.getReceiver = function () {
    };
    Envelope.prototype.getTime = function () {
    };
    Envelope.prototype.setGroup = function (identifier) {
    };
    Envelope.prototype.getGroup = function () {
    };
    Envelope.prototype.setType = function (type) {
    };
    Envelope.prototype.getType = function () {
    };
    var general_factory = function () {
        var man = ns.dkd.MessageFactoryManager;
        return man.generalFactory
    };
    Envelope.create = function (from, to, when) {
        var gf = general_factory();
        return gf.createEnvelope(from, to, when)
    };
    Envelope.parse = function (env) {
        var gf = general_factory();
        return gf.parseEnvelope(env)
    };
    Envelope.getFactory = function () {
        var gf = general_factory();
        return gf.getEnvelopeFactory()
    }
    Envelope.setFactory = function (factory) {
        var gf = general_factory();
        gf.setEnvelopeFactory(factory)
    };
    var EnvelopeFactory = Interface(null, null);
    EnvelopeFactory.prototype.createEnvelope = function (from, to, when) {
    };
    EnvelopeFactory.prototype.parseEnvelope = function (env) {
    };
    Envelope.Factory = EnvelopeFactory;
    ns.protocol.Envelope = Envelope
})(DaoKeDao);
(function (ns) {
    'use strict';
    var Interface = ns.type.Interface;
    var Mapper = ns.type.Mapper;
    var Message = Interface(null, [Mapper]);
    Message.prototype.getEnvelope = function () {
    };
    Message.prototype.getSender = function () {
    };
    Message.prototype.getReceiver = function () {
    };
    Message.prototype.getTime = function () {
    };
    Message.prototype.getGroup = function () {
    };
    Message.prototype.getType = function () {
    };
    ns.protocol.Message = Message
})(DaoKeDao);
(function (ns) {
    'use strict';
    var Interface = ns.type.Interface;
    var Message = ns.protocol.Message;
    var InstantMessage = Interface(null, [Message]);
    InstantMessage.prototype.getContent = function () {
    };
    var general_factory = function () {
        var man = ns.dkd.MessageFactoryManager;
        return man.generalFactory
    };
    InstantMessage.generateSerialNumber = function (type, now) {
        var gf = general_factory();
        return gf.generateSerialNumber(type, now)
    };
    InstantMessage.create = function (head, body) {
        var gf = general_factory();
        return gf.createInstantMessage(head, body)
    };
    InstantMessage.parse = function (msg) {
        var gf = general_factory();
        return gf.parseInstantMessage(msg)
    };
    InstantMessage.getFactory = function () {
        var gf = general_factory();
        return gf.getInstantMessageFactory()
    };
    InstantMessage.setFactory = function (factory) {
        var gf = general_factory();
        gf.setInstantMessageFactory(factory)
    };
    var InstantMessageFactory = Interface(null, null);
    InstantMessageFactory.prototype.generateSerialNumber = function (msgType, now) {
    };
    InstantMessageFactory.prototype.createInstantMessage = function (head, body) {
    };
    InstantMessageFactory.prototype.parseInstantMessage = function (msg) {
    };
    InstantMessage.Factory = InstantMessageFactory;
    ns.protocol.InstantMessage = InstantMessage
})(DaoKeDao);
(function (ns) {
    'use strict';
    var Interface = ns.type.Interface;
    var Message = ns.protocol.Message;
    var SecureMessage = Interface(null, [Message]);
    SecureMessage.prototype.getData = function () {
    };
    SecureMessage.prototype.getEncryptedKey = function () {
    };
    SecureMessage.prototype.getEncryptedKeys = function () {
    };
    var general_factory = function () {
        var man = ns.dkd.MessageFactoryManager;
        return man.generalFactory
    };
    SecureMessage.parse = function (msg) {
        var gf = general_factory();
        return gf.parseSecureMessage(msg)
    };
    SecureMessage.getFactory = function () {
        var gf = general_factory();
        return gf.getSecureMessageFactory()
    };
    SecureMessage.setFactory = function (factory) {
        var gf = general_factory();
        gf.setSecureMessageFactory(factory)
    };
    var SecureMessageFactory = Interface(null, null);
    SecureMessageFactory.prototype.parseSecureMessage = function (msg) {
    };
    SecureMessage.Factory = SecureMessageFactory;
    ns.protocol.SecureMessage = SecureMessage
})(DaoKeDao);
(function (ns) {
    'use strict';
    var Interface = ns.type.Interface;
    var SecureMessage = ns.protocol.SecureMessage;
    var ReliableMessage = Interface(null, [SecureMessage]);
    ReliableMessage.prototype.getSignature = function () {
    };
    var general_factory = function () {
        var man = ns.dkd.MessageFactoryManager;
        return man.generalFactory
    };
    ReliableMessage.parse = function (msg) {
        var gf = general_factory();
        return gf.parseReliableMessage(msg)
    };
    ReliableMessage.getFactory = function () {
        var gf = general_factory();
        return gf.getReliableMessageFactory()
    };
    ReliableMessage.setFactory = function (factory) {
        var gf = general_factory();
        gf.setReliableMessageFactory(factory)
    };
    var ReliableMessageFactory = Interface(null, null);
    ReliableMessageFactory.prototype.parseReliableMessage = function (msg) {
    };
    ReliableMessage.Factory = ReliableMessageFactory;
    ns.protocol.ReliableMessage = ReliableMessage
})(DaoKeDao);
(function (ns) {
    'use strict';
    var Interface = ns.type.Interface;
    var InstantMessage = ns.protocol.InstantMessage;
    var InstantMessageDelegate = Interface(null, null);
    InstantMessageDelegate.prototype.serializeContent = function (content, pwd, iMsg) {
    };
    InstantMessageDelegate.prototype.encryptContent = function (data, pwd, iMsg) {
    };
    InstantMessageDelegate.prototype.serializeKey = function (pwd, iMsg) {
    };
    InstantMessageDelegate.prototype.encryptKey = function (data, receiver, iMsg) {
    };
    InstantMessage.Delegate = InstantMessageDelegate
})(DaoKeDao);
(function (ns) {
    'use strict';
    var Interface = ns.type.Interface;
    var SecureMessage = ns.protocol.SecureMessage;
    var SecureMessageDelegate = Interface(null, null);
    SecureMessageDelegate.prototype.decryptKey = function (data, receiver, sMsg) {
    };
    SecureMessageDelegate.prototype.deserializeKey = function (data, sMsg) {
    };
    SecureMessageDelegate.prototype.decryptContent = function (data, pwd, sMsg) {
    };
    SecureMessageDelegate.prototype.deserializeContent = function (data, pwd, sMsg) {
    };
    SecureMessageDelegate.prototype.signData = function (data, sMsg) {
    };
    SecureMessage.Delegate = SecureMessageDelegate
})(DaoKeDao);
(function (ns) {
    'use strict';
    var Interface = ns.type.Interface;
    var ReliableMessage = ns.protocol.ReliableMessage;
    var ReliableMessageDelegate = Interface(null, null);
    ReliableMessageDelegate.prototype.verifyDataSignature = function (data, signature, rMsg) {
    };
    ReliableMessage.Delegate = ReliableMessageDelegate
})(DaoKeDao);
(function (ns) {
    'use strict';
    var Interface = ns.type.Interface;
    var Class = ns.type.Class;
    var Enum = ns.type.Enum;
    var Wrapper = ns.type.Wrapper;
    var Converter = ns.type.Converter;
    var Content = ns.protocol.Content;
    var Envelope = ns.protocol.Envelope;
    var InstantMessage = ns.protocol.InstantMessage;
    var SecureMessage = ns.protocol.SecureMessage;
    var ReliableMessage = ns.protocol.ReliableMessage;
    var GeneralFactory = function () {
        this.__contentFactories = {};
        this.__envelopeFactory = null;
        this.__instantMessageFactory = null;
        this.__secureMessageFactory = null;
        this.__reliableMessageFactory = null
    };
    Class(GeneralFactory, null, null, null);
    GeneralFactory.prototype.setContentFactory = function (type, factory) {
        type = Enum.getInt(type);
        this.__contentFactories[type] = factory
    };
    GeneralFactory.prototype.getContentFactory = function (type) {
        type = Enum.getInt(type);
        return this.__contentFactories[type]
    };
    GeneralFactory.prototype.getContentType = function (content, defaultType) {
        var type = content['type'];
        return Converter.getInt(type, defaultType)
    };
    GeneralFactory.prototype.parseContent = function (content) {
        if (!content) {
            return null
        } else if (Interface.conforms(content, Content)) {
            return content
        }
        var info = Wrapper.fetchMap(content);
        if (!info) {
            return null
        }
        var type = this.getContentType(info, 0);
        var factory = this.getContentFactory(type);
        if (!factory) {
            factory = this.getContentFactory(0)
        }
        return factory.parseContent(info)
    };
    GeneralFactory.prototype.setEnvelopeFactory = function (factory) {
        this.__envelopeFactory = factory
    };
    GeneralFactory.prototype.getEnvelopeFactory = function () {
        return this.__envelopeFactory
    };
    GeneralFactory.prototype.createEnvelope = function (from, to, when) {
        var factory = this.getEnvelopeFactory();
        return factory.createEnvelope(from, to, when)
    };
    GeneralFactory.prototype.parseEnvelope = function (env) {
        if (!env) {
            return null
        } else if (Interface.conforms(env, Envelope)) {
            return env
        }
        var info = Wrapper.fetchMap(env);
        if (!info) {
            return null
        }
        var factory = this.getEnvelopeFactory();
        return factory.parseEnvelope(info)
    };
    GeneralFactory.prototype.setInstantMessageFactory = function (factory) {
        this.__instantMessageFactory = factory
    };
    GeneralFactory.prototype.getInstantMessageFactory = function () {
        return this.__instantMessageFactory
    };
    GeneralFactory.prototype.createInstantMessage = function (head, body) {
        var factory = this.getInstantMessageFactory();
        return factory.createInstantMessage(head, body)
    };
    GeneralFactory.prototype.parseInstantMessage = function (msg) {
        if (!msg) {
            return null
        } else if (Interface.conforms(msg, InstantMessage)) {
            return msg
        }
        var info = Wrapper.fetchMap(msg);
        if (!info) {
            return null
        }
        var factory = this.getInstantMessageFactory();
        return factory.parseInstantMessage(info)
    };
    GeneralFactory.prototype.generateSerialNumber = function (type, now) {
        var factory = this.getInstantMessageFactory();
        return factory.generateSerialNumber(type, now)
    };
    GeneralFactory.prototype.setSecureMessageFactory = function (factory) {
        this.__secureMessageFactory = factory
    };
    GeneralFactory.prototype.getSecureMessageFactory = function () {
        return this.__secureMessageFactory
    };
    GeneralFactory.prototype.parseSecureMessage = function (msg) {
        if (!msg) {
            return null
        } else if (Interface.conforms(msg, SecureMessage)) {
            return msg
        }
        var info = Wrapper.fetchMap(msg);
        if (!info) {
            return null
        }
        var factory = this.getSecureMessageFactory();
        return factory.parseSecureMessage(info)
    };
    GeneralFactory.prototype.setReliableMessageFactory = function (factory) {
        this.__reliableMessageFactory = factory
    };
    GeneralFactory.prototype.getReliableMessageFactory = function () {
        return this.__reliableMessageFactory
    };
    GeneralFactory.prototype.parseReliableMessage = function (msg) {
        if (!msg) {
            return null
        } else if (Interface.conforms(msg, ReliableMessage)) {
            return msg
        }
        var info = Wrapper.fetchMap(msg);
        if (!info) {
            return null
        }
        var factory = this.getReliableMessageFactory();
        return factory.parseReliableMessage(info)
    };
    var FactoryManager = {generalFactory: new GeneralFactory()};
    ns.dkd.MessageGeneralFactory = GeneralFactory;
    ns.dkd.MessageFactoryManager = FactoryManager
})(DaoKeDao);
