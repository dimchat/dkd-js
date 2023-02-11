/**
 * DaoKeDao - Message Module (v0.2.2)
 *
 * @author    moKy <albert.moky at gmail.com>
 * @date      Feb. 9, 2023
 * @copyright (c) 2023 Albert Moky
 * @license   {@link https://mit-license.org | MIT License}
 */;
if (typeof DaoKeDao !== "object") {
    DaoKeDao = {};
}
(function (ns) {
    if (typeof ns.type !== "object") {
        ns.type = MONKEY.type;
    }
    if (typeof ns.format !== "object") {
        ns.format = MONKEY.format;
    }
    if (typeof ns.digest !== "object") {
        ns.digest = MONKEY.digest;
    }
    if (typeof ns.crypto !== "object") {
        ns.crypto = MONKEY.crypto;
    }
    if (typeof ns.protocol !== "object") {
        ns.protocol = MingKeMing.protocol;
    }
    if (typeof ns.mkm !== "object") {
        ns.mkm = MingKeMing.mkm;
    }
    if (typeof ns.dkd !== "object") {
        ns.dkd = {};
    }
})(DaoKeDao);
(function (ns) {
    var ContentType = ns.type.Enum(null, {
        TEXT: 1,
        FILE: 16,
        IMAGE: 18,
        AUDIO: 20,
        VIDEO: 22,
        PAGE: 32,
        QUOTE: 55,
        MONEY: 64,
        TRANSFER: 65,
        LUCKY_MONEY: 66,
        CLAIM_PAYMENT: 72,
        SPLIT_BILL: 73,
        COMMAND: 136,
        HISTORY: 137,
        APPLICATION: 160,
        ARRAY: 202,
        CUSTOMIZED: 204,
        FORWARD: 255
    });
    ns.protocol.ContentType = ContentType;
})(DaoKeDao);
(function (ns) {
    var Interface = ns.type.Interface;
    var Mapper = ns.type.Mapper;
    var Content = Interface(null, [Mapper]);
    Content.prototype.getType = function () {
        throw new Error("NotImplemented");
    };
    Content.prototype.getSerialNumber = function () {
        throw new Error("NotImplemented");
    };
    Content.prototype.getTime = function () {
        throw new Error("NotImplemented");
    };
    Content.prototype.getGroup = function () {
        throw new Error("NotImplemented");
    };
    Content.prototype.setGroup = function (identifier) {
        throw new Error("NotImplemented");
    };
    var ContentFactory = Interface(null, null);
    ContentFactory.prototype.parseContent = function (content) {
        throw new Error("NotImplemented");
    };
    Content.Factory = ContentFactory;
    var general_factory = function () {
        var man = ns.dkd.FactoryManager;
        return man.generalFactory;
    };
    Content.setFactory = function (type, factory) {
        var gf = general_factory();
        gf.setContentFactory(type, factory);
    };
    Content.getFactory = function (type) {
        var gf = general_factory();
        return gf.getContentFactory(type);
    };
    Content.parse = function (content) {
        var gf = general_factory();
        return gf.parseContent(content);
    };
    ns.protocol.Content = Content;
})(DaoKeDao);
(function (ns) {
    var Interface = ns.type.Interface;
    var Mapper = ns.type.Mapper;
    var Envelope = Interface(null, [Mapper]);
    Envelope.prototype.getSender = function () {
        throw new Error("NotImplemented");
    };
    Envelope.prototype.getReceiver = function () {
        throw new Error("NotImplemented");
    };
    Envelope.prototype.getTime = function () {
        throw new Error("NotImplemented");
    };
    Envelope.prototype.getGroup = function () {
        throw new Error("NotImplemented");
    };
    Envelope.prototype.setGroup = function (identifier) {
        throw new Error("NotImplemented");
    };
    Envelope.prototype.getType = function () {
        throw new Error("NotImplemented");
    };
    Envelope.prototype.setType = function (type) {
        throw new Error("NotImplemented");
    };
    var EnvelopeFactory = Interface(null, null);
    EnvelopeFactory.prototype.createEnvelope = function (from, to, when) {
        throw new Error("NotImplemented");
    };
    EnvelopeFactory.prototype.parseEnvelope = function (env) {
        throw new Error("NotImplemented");
    };
    Envelope.Factory = EnvelopeFactory;
    var general_factory = function () {
        var man = ns.dkd.FactoryManager;
        return man.generalFactory;
    };
    Envelope.getFactory = function () {
        var gf = general_factory();
        return gf.getEnvelopeFactory();
    };
    Envelope.setFactory = function (factory) {
        var gf = general_factory();
        gf.setEnvelopeFactory(factory);
    };
    Envelope.create = function (from, to, when) {
        var gf = general_factory();
        return gf.createEnvelope(from, to, when);
    };
    Envelope.parse = function (env) {
        var gf = general_factory();
        return gf.parseEnvelope(env);
    };
    ns.protocol.Envelope = Envelope;
})(DaoKeDao);
(function (ns) {
    var Interface = ns.type.Interface;
    var Mapper = ns.type.Mapper;
    var Message = Interface(null, [Mapper]);
    Message.prototype.getDelegate = function () {
        throw new Error("NotImplemented");
    };
    Message.prototype.setDelegate = function (delegate) {
        throw new Error("NotImplemented");
    };
    Message.prototype.getEnvelope = function () {
        throw new Error("NotImplemented");
    };
    Message.prototype.getSender = function () {
        throw new Error("NotImplemented");
    };
    Message.prototype.getReceiver = function () {
        throw new Error("NotImplemented");
    };
    Message.prototype.getTime = function () {
        throw new Error("NotImplemented");
    };
    Message.prototype.getGroup = function () {
        throw new Error("NotImplemented");
    };
    Message.prototype.getType = function () {
        throw new Error("NotImplemented");
    };
    var MessageDelegate = Interface(null, null);
    Message.Delegate = MessageDelegate;
    ns.protocol.Message = Message;
})(DaoKeDao);
(function (ns) {
    var Interface = ns.type.Interface;
    var Message = ns.protocol.Message;
    var InstantMessage = Interface(null, [Message]);
    InstantMessage.prototype.getContent = function () {
        throw new Error("NotImplemented");
    };
    InstantMessage.prototype.encrypt = function (password, members) {
        throw new Error("NotImplemented");
    };
    var InstantMessageDelegate = Interface(null, [Message.Delegate]);
    InstantMessageDelegate.prototype.serializeContent = function (
        content,
        pwd,
        iMsg
    ) {
        throw new Error("NotImplemented");
    };
    InstantMessageDelegate.prototype.encryptContent = function (data, pwd, iMsg) {
        throw new Error("NotImplemented");
    };
    InstantMessageDelegate.prototype.encodeData = function (data, iMsg) {
        throw new Error("NotImplemented");
    };
    InstantMessageDelegate.prototype.serializeKey = function (pwd, iMsg) {
        throw new Error("NotImplemented");
    };
    InstantMessageDelegate.prototype.encryptKey = function (
        data,
        receiver,
        iMsg
    ) {
        throw new Error("NotImplemented");
    };
    InstantMessageDelegate.prototype.encodeKey = function (data, iMsg) {
        throw new Error("NotImplemented");
    };
    InstantMessage.Delegate = InstantMessageDelegate;
    var InstantMessageFactory = Interface(null, null);
    InstantMessageFactory.prototype.generateSerialNumber = function (
        msgType,
        now
    ) {
        throw new Error("NotImplemented");
    };
    InstantMessageFactory.prototype.createInstantMessage = function (head, body) {
        throw new Error("NotImplemented");
    };
    InstantMessageFactory.prototype.parseInstantMessage = function (msg) {
        throw new Error("NotImplemented");
    };
    InstantMessage.Factory = InstantMessageFactory;
    var general_factory = function () {
        var man = ns.dkd.FactoryManager;
        return man.generalFactory;
    };
    InstantMessage.getFactory = function () {
        var gf = general_factory();
        return gf.getInstantMessageFactory();
    };
    InstantMessage.setFactory = function (factory) {
        var gf = general_factory();
        gf.setInstantMessageFactory(factory);
    };
    InstantMessage.generateSerialNumber = function (type, now) {
        var gf = general_factory();
        return gf.generateSerialNumber(type, now);
    };
    InstantMessage.create = function (head, body) {
        var gf = general_factory();
        return gf.createInstantMessage(head, body);
    };
    InstantMessage.parse = function (msg) {
        var gf = general_factory();
        return gf.parseInstantMessage(msg);
    };
    ns.protocol.InstantMessage = InstantMessage;
})(DaoKeDao);
(function (ns) {
    var Interface = ns.type.Interface;
    var Message = ns.protocol.Message;
    var SecureMessage = Interface(null, [Message]);
    SecureMessage.prototype.getData = function () {
        throw new Error("NotImplemented");
    };
    SecureMessage.prototype.getEncryptedKey = function () {
        throw new Error("NotImplemented");
    };
    SecureMessage.prototype.getEncryptedKeys = function () {
        throw new Error("NotImplemented");
    };
    SecureMessage.prototype.decrypt = function () {
        throw new Error("NotImplemented");
    };
    SecureMessage.prototype.sign = function () {
        throw new Error("NotImplemented");
    };
    SecureMessage.prototype.split = function (members) {
        throw new Error("NotImplemented");
    };
    SecureMessage.prototype.trim = function (member) {
        throw new Error("NotImplemented");
    };
    var SecureMessageDelegate = Interface(null, [Message.Delegate]);
    SecureMessageDelegate.prototype.decodeKey = function (key, sMsg) {
        throw new Error("NotImplemented");
    };
    SecureMessageDelegate.prototype.decryptKey = function (
        data,
        sender,
        receiver,
        sMsg
    ) {
        throw new Error("NotImplemented");
    };
    SecureMessageDelegate.prototype.deserializeKey = function (
        data,
        sender,
        receiver,
        sMsg
    ) {
        throw new Error("NotImplemented");
    };
    SecureMessageDelegate.prototype.decodeData = function (data, sMsg) {
        throw new Error("NotImplemented");
    };
    SecureMessageDelegate.prototype.decryptContent = function (data, pwd, sMsg) {
        throw new Error("NotImplemented");
    };
    SecureMessageDelegate.prototype.deserializeContent = function (
        data,
        pwd,
        sMsg
    ) {
        throw new Error("NotImplemented");
    };
    SecureMessageDelegate.prototype.signData = function (data, sender, sMsg) {
        throw new Error("NotImplemented");
    };
    SecureMessageDelegate.prototype.encodeSignature = function (signature, sMsg) {
        throw new Error("NotImplemented");
    };
    SecureMessage.Delegate = SecureMessageDelegate;
    var SecureMessageFactory = Interface(null, null);
    SecureMessageFactory.prototype.parseSecureMessage = function (msg) {
        throw new Error("NotImplemented");
    };
    SecureMessage.Factory = SecureMessageFactory;
    var general_factory = function () {
        var man = ns.dkd.FactoryManager;
        return man.generalFactory;
    };
    SecureMessage.getFactory = function () {
        var gf = general_factory();
        return gf.getSecureMessageFactory();
    };
    SecureMessage.setFactory = function (factory) {
        var gf = general_factory();
        gf.setSecureMessageFactory(factory);
    };
    SecureMessage.parse = function (msg) {
        var gf = general_factory();
        return gf.parseSecureMessage(msg);
    };
    ns.protocol.SecureMessage = SecureMessage;
})(DaoKeDao);
(function (ns) {
    var Interface = ns.type.Interface;
    var SecureMessage = ns.protocol.SecureMessage;
    var ReliableMessage = Interface(null, [SecureMessage]);
    ReliableMessage.prototype.getSignature = function () {
        throw new Error("NotImplemented");
    };
    ReliableMessage.prototype.getMeta = function () {
        throw new Error("NotImplemented");
    };
    ReliableMessage.prototype.setMeta = function (meta) {
        throw new Error("NotImplemented");
    };
    ReliableMessage.prototype.getVisa = function () {
        throw new Error("NotImplemented");
    };
    ReliableMessage.prototype.setVisa = function (doc) {
        throw new Error("NotImplemented");
    };
    ReliableMessage.prototype.verify = function () {
        throw new Error("NotImplemented");
    };
    var ReliableMessageDelegate = Interface(null, [SecureMessage.Delegate]);
    ReliableMessageDelegate.prototype.decodeSignature = function (
        signature,
        rMsg
    ) {
        throw new Error("NotImplemented");
    };
    ReliableMessageDelegate.prototype.verifyDataSignature = function (
        data,
        signature,
        sender,
        rMsg
    ) {
        throw new Error("NotImplemented");
    };
    ReliableMessage.Delegate = ReliableMessageDelegate;
    var ReliableMessageFactory = Interface(null, null);
    ReliableMessageFactory.prototype.parseReliableMessage = function (msg) {
        throw new Error("NotImplemented");
    };
    ReliableMessage.Factory = ReliableMessageFactory;
    var general_factory = function () {
        var man = ns.dkd.FactoryManager;
        return man.generalFactory;
    };
    ReliableMessage.getFactory = function () {
        var gf = general_factory();
        return gf.getReliableMessageFactory();
    };
    ReliableMessage.setFactory = function (factory) {
        var gf = general_factory();
        gf.setReliableMessageFactory(factory);
    };
    ReliableMessage.parse = function (msg) {
        var gf = general_factory();
        return gf.parseReliableMessage(msg);
    };
    ns.protocol.ReliableMessage = ReliableMessage;
})(DaoKeDao);
(function (ns) {
    var Interface = ns.type.Interface;
    var Class = ns.type.Class;
    var Wrapper = ns.type.Wrapper;
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
        this.__reliableMessageFactory = null;
    };
    Class(GeneralFactory, null, null, null);
    var EnumToUint = function (type) {
        if (typeof type === "number") {
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
    GeneralFactory.prototype.getContentType = function (content) {
        return content["type"];
    };
    GeneralFactory.prototype.parseContent = function (content) {
        if (!content) {
            return null;
        } else {
            if (Interface.conforms(content, Content)) {
                return content;
            }
        }
        content = Wrapper.fetchMap(content);
        var type = this.getContentType(content);
        var factory = this.getContentFactory(type);
        if (!factory) {
            factory = this.getContentFactory(0);
        }
        return factory.parseContent(content);
    };
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
        } else {
            if (Interface.conforms(env, Envelope)) {
                return env;
            }
        }
        env = Wrapper.fetchMap(env);
        var factory = this.getEnvelopeFactory();
        return factory.parseEnvelope(env);
    };
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
        } else {
            if (Interface.conforms(msg, InstantMessage)) {
                return msg;
            }
        }
        msg = Wrapper.fetchMap(msg);
        var factory = this.getInstantMessageFactory();
        return factory.parseInstantMessage(msg);
    };
    GeneralFactory.prototype.generateSerialNumber = function (type, now) {
        var factory = this.getInstantMessageFactory();
        return factory.generateSerialNumber(type, now);
    };
    GeneralFactory.prototype.setSecureMessageFactory = function (factory) {
        this.__secureMessageFactory = factory;
    };
    GeneralFactory.prototype.getSecureMessageFactory = function () {
        return this.__secureMessageFactory;
    };
    GeneralFactory.prototype.parseSecureMessage = function (msg) {
        if (!msg) {
            return null;
        } else {
            if (Interface.conforms(msg, SecureMessage)) {
                return msg;
            }
        }
        msg = Wrapper.fetchMap(msg);
        var factory = this.getSecureMessageFactory();
        return factory.parseSecureMessage(msg);
    };
    GeneralFactory.prototype.setReliableMessageFactory = function (factory) {
        this.__reliableMessageFactory = factory;
    };
    GeneralFactory.prototype.getReliableMessageFactory = function () {
        return this.__reliableMessageFactory;
    };
    GeneralFactory.prototype.parseReliableMessage = function (msg) {
        if (!msg) {
            return null;
        } else {
            if (Interface.conforms(msg, ReliableMessage)) {
                return msg;
            }
        }
        msg = Wrapper.fetchMap(msg);
        var factory = this.getReliableMessageFactory();
        return factory.parseReliableMessage(msg);
    };
    var FactoryManager = { generalFactory: new GeneralFactory() };
    ns.dkd.GeneralFactory = GeneralFactory;
    ns.dkd.FactoryManager = FactoryManager;
})(DaoKeDao);
