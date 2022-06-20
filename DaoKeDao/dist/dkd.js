/**
 * DaoKeDao - Message Module (v0.2.0)
 *
 * @author    moKy <albert.moky at gmail.com>
 * @date      Jun. 20, 2022
 * @copyright (c) 2022 Albert Moky
 * @license   {@link https://mit-license.org | MIT License}
 */;
if (typeof DaoKeDao !== "object") {
    DaoKeDao = new MingKeMing.Namespace();
}
(function (ns, base) {
    base.exports(ns);
    if (typeof ns.assert !== "function") {
        ns.assert = console.assert;
    }
    if (typeof ns.protocol !== "object") {
        ns.protocol = new ns.Namespace();
    }
    if (typeof ns.dkd !== "object") {
        ns.dkd = new ns.Namespace();
    }
    ns.registers("protocol");
    ns.registers("dkd");
})(DaoKeDao, MingKeMing);
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
        CUSTOMIZED: 204,
        FORWARD: 255
    });
    ns.protocol.ContentType = ContentType;
    ns.protocol.registers("ContentType");
})(DaoKeDao);
(function (ns) {
    var Mapper = ns.type.Mapper;
    var ID = ns.protocol.ID;
    var ContentType = ns.protocol.ContentType;
    var Content = function () {};
    ns.Interface(Content, [Mapper]);
    Content.prototype.getType = function () {
        ns.assert(false, "implement me!");
        return 0;
    };
    Content.getType = function (content) {
        return content["type"];
    };
    Content.prototype.getSerialNumber = function () {
        ns.assert(false, "implement me!");
        return 0;
    };
    Content.getSerialNumber = function (content) {
        return content["sn"];
    };
    Content.prototype.getTime = function () {
        ns.assert(false, "implement me!");
        return null;
    };
    Content.getTime = function (content) {
        var timestamp = content["time"];
        if (timestamp) {
            return new Date(timestamp * 1000);
        } else {
            return null;
        }
    };
    Content.prototype.getGroup = function () {
        ns.assert(false, "implement me!");
        return null;
    };
    Content.prototype.setGroup = function (identifier) {
        ns.assert(false, "implement me!");
    };
    Content.getGroup = function (content) {
        return ID.parse(content["group"]);
    };
    Content.setGroup = function (group, content) {
        if (group) {
            content["group"] = group.toString();
        } else {
            delete content["group"];
        }
    };
    var EnumToUint = function (type) {
        if (typeof type === "number") {
            return type;
        } else {
            return type.valueOf();
        }
    };
    var ContentFactory = function () {};
    ns.Interface(ContentFactory, null);
    ContentFactory.prototype.parseContent = function (content) {
        ns.assert(false, "implement me!");
        return null;
    };
    Content.Factory = ContentFactory;
    var s_content_factories = {};
    Content.setFactory = function (type, factory) {
        s_content_factories[EnumToUint(type)] = factory;
    };
    Content.getFactory = function (type) {
        return s_content_factories[EnumToUint(type)];
    };
    Content.parse = function (content) {
        if (!content) {
            return null;
        } else {
            if (ns.Interface.conforms(content, Content)) {
                return content;
            }
        }
        content = ns.type.Wrapper.fetchMap(content);
        var type = Content.getType(content);
        var factory = Content.getFactory(type);
        if (!factory) {
            factory = Content.getFactory(0);
        }
        return factory.parseContent(content);
    };
    ns.protocol.Content = Content;
    ns.protocol.registers("Content");
})(DaoKeDao);
(function (ns) {
    var Mapper = ns.type.Mapper;
    var ID = ns.protocol.ID;
    var ContentType = ns.protocol.ContentType;
    var Envelope = function () {};
    ns.Interface(Envelope, [Mapper]);
    Envelope.prototype.getSender = function () {
        ns.assert(false, "implement me!");
        return null;
    };
    Envelope.getSender = function (env) {
        return ID.parse(env["sender"]);
    };
    Envelope.prototype.getReceiver = function () {
        ns.assert(false, "implement me!");
        return null;
    };
    Envelope.getReceiver = function (env) {
        return ID.parse(env["receiver"]);
    };
    Envelope.prototype.getTime = function () {
        ns.assert(false, "implement me!");
        return null;
    };
    Envelope.getTime = function (env) {
        var timestamp = env["time"];
        if (timestamp) {
            return new Date(timestamp * 1000);
        } else {
            return null;
        }
    };
    Envelope.prototype.getGroup = function () {
        ns.assert(false, "implement me!");
        return null;
    };
    Envelope.prototype.setGroup = function (identifier) {
        ns.assert(false, "implement me!");
    };
    Envelope.getGroup = function (env) {
        return ID.parse(env["group"]);
    };
    Envelope.setGroup = function (group, env) {
        if (group) {
            env["group"] = group.toString();
        } else {
            delete env["group"];
        }
    };
    Envelope.prototype.getType = function () {
        ns.assert(false, "implement me!");
        return null;
    };
    Envelope.prototype.setType = function (type) {
        ns.assert(false, "implement me!");
    };
    Envelope.getType = function (env) {
        var type = env["type"];
        if (type) {
            return type;
        } else {
            return 0;
        }
    };
    Envelope.setType = function (type, env) {
        if (type) {
            if (type instanceof ContentType) {
                type = type.valueOf();
            }
            env["type"] = type;
        } else {
            delete env["type"];
        }
    };
    var EnvelopeFactory = function () {};
    ns.Interface(EnvelopeFactory, null);
    EnvelopeFactory.prototype.createEnvelope = function (from, to, when) {
        ns.assert(false, "implement me!");
        return null;
    };
    EnvelopeFactory.prototype.parseEnvelope = function (env) {
        ns.assert(false, "implement me!");
        return null;
    };
    Envelope.Factory = EnvelopeFactory;
    var s_envelope_factory = null;
    Envelope.getFactory = function () {
        return s_envelope_factory;
    };
    Envelope.setFactory = function (factory) {
        s_envelope_factory = factory;
    };
    Envelope.create = function (from, to, when) {
        var factory = Envelope.getFactory();
        return factory.createEnvelope(from, to, when);
    };
    Envelope.parse = function (env) {
        if (!env) {
            return null;
        } else {
            if (ns.Interface.conforms(env, Envelope)) {
                return env;
            }
        }
        env = ns.type.Wrapper.fetchMap(env);
        var factory = Envelope.getFactory();
        return factory.parseEnvelope(env);
    };
    ns.protocol.Envelope = Envelope;
    ns.protocol.registers("Envelope");
})(DaoKeDao);
(function (ns) {
    var Mapper = ns.type.Mapper;
    var Envelope = ns.protocol.Envelope;
    var Message = function () {};
    ns.Interface(Message, [Mapper]);
    Message.prototype.getDelegate = function () {
        ns.assert(false, "implement me!");
        return null;
    };
    Message.prototype.setDelegate = function (delegate) {
        ns.assert(false, "implement me!");
    };
    Message.prototype.getEnvelope = function () {
        ns.assert(false, "implement me!");
        return null;
    };
    Message.getEnvelope = function (msg) {
        return Envelope.parse(msg);
    };
    Message.prototype.getSender = function () {
        ns.assert(false, "implement me!");
        return null;
    };
    Message.prototype.getReceiver = function () {
        ns.assert(false, "implement me!");
        return null;
    };
    Message.prototype.getTime = function () {
        ns.assert(false, "implement me!");
        return null;
    };
    Message.prototype.getGroup = function () {
        ns.assert(false, "implement me!");
        return null;
    };
    Message.prototype.getType = function () {
        ns.assert(false, "implement me!");
        return null;
    };
    var MessageDelegate = function () {};
    ns.Interface(MessageDelegate, null);
    Message.Delegate = MessageDelegate;
    ns.protocol.Message = Message;
    ns.protocol.registers("Message");
})(DaoKeDao);
(function (ns) {
    var Content = ns.protocol.Content;
    var Message = ns.protocol.Message;
    var InstantMessage = function () {};
    ns.Interface(InstantMessage, [Message]);
    InstantMessage.prototype.getContent = function () {
        ns.assert(false, "implement me!");
        return null;
    };
    InstantMessage.getContent = function (msg) {
        return Content.parse(msg["content"]);
    };
    InstantMessage.prototype.encrypt = function (password, members) {
        ns.assert(false, "implement me!");
        return null;
    };
    var InstantMessageDelegate = function () {};
    ns.Interface(InstantMessageDelegate, [Message.Delegate]);
    InstantMessageDelegate.prototype.serializeContent = function (
        content,
        pwd,
        iMsg
    ) {
        ns.assert(false, "implement me!");
        return null;
    };
    InstantMessageDelegate.prototype.encryptContent = function (data, pwd, iMsg) {
        ns.assert(false, "implement me!");
        return null;
    };
    InstantMessageDelegate.prototype.encodeData = function (data, iMsg) {
        ns.assert(false, "implement me!");
        return null;
    };
    InstantMessageDelegate.prototype.serializeKey = function (pwd, iMsg) {
        ns.assert(false, "implement me!");
        return null;
    };
    InstantMessageDelegate.prototype.encryptKey = function (
        data,
        receiver,
        iMsg
    ) {
        ns.assert(false, "implement me!");
        return null;
    };
    InstantMessageDelegate.prototype.encodeKey = function (data, iMsg) {
        ns.assert(false, "implement me!");
        return null;
    };
    InstantMessage.Delegate = InstantMessageDelegate;
    var InstantMessageFactory = function () {};
    ns.Interface(InstantMessageFactory, null);
    InstantMessageFactory.prototype.generateSerialNumber = function (
        msgType,
        now
    ) {
        ns.assert(false, "implement me!");
        return 0;
    };
    InstantMessageFactory.prototype.createInstantMessage = function (head, body) {
        ns.assert(false, "implement me!");
        return null;
    };
    InstantMessageFactory.prototype.parseInstantMessage = function (msg) {
        ns.assert(false, "implement me!");
        return null;
    };
    InstantMessage.Factory = InstantMessageFactory;
    var s_instant_factory = null;
    InstantMessage.getFactory = function () {
        return s_instant_factory;
    };
    InstantMessage.setFactory = function (factory) {
        s_instant_factory = factory;
    };
    InstantMessage.generateSerialNumber = function (msgType, now) {
        var factory = InstantMessage.getFactory();
        return factory.generateSerialNumber(msgType, now);
    };
    InstantMessage.create = function (head, body) {
        var factory = InstantMessage.getFactory();
        return factory.createInstantMessage(head, body);
    };
    InstantMessage.parse = function (msg) {
        if (!msg) {
            return null;
        } else {
            if (ns.Interface.conforms(msg, InstantMessage)) {
                return msg;
            }
        }
        msg = ns.type.Wrapper.fetchMap(msg);
        var factory = InstantMessage.getFactory();
        return factory.parseInstantMessage(msg);
    };
    ns.protocol.InstantMessage = InstantMessage;
    ns.protocol.registers("InstantMessage");
})(DaoKeDao);
(function (ns) {
    var Message = ns.protocol.Message;
    var SecureMessage = function () {};
    ns.Interface(SecureMessage, [Message]);
    SecureMessage.prototype.getData = function () {
        ns.assert(false, "implement me!");
        return null;
    };
    SecureMessage.prototype.getEncryptedKey = function () {
        ns.assert(false, "implement me!");
        return null;
    };
    SecureMessage.prototype.getEncryptedKeys = function () {
        ns.assert(false, "implement me!");
        return null;
    };
    SecureMessage.prototype.decrypt = function () {
        ns.assert(false, "implement me!");
        return null;
    };
    SecureMessage.prototype.sign = function () {
        ns.assert(false, "implement me!");
        return null;
    };
    SecureMessage.prototype.split = function (members) {
        ns.assert(false, "implement me!");
        return null;
    };
    SecureMessage.prototype.trim = function (member) {
        ns.assert(false, "implement me!");
        return null;
    };
    var SecureMessageDelegate = function () {};
    ns.Interface(SecureMessageDelegate, [Message.Delegate]);
    SecureMessageDelegate.prototype.decodeKey = function (key, sMsg) {
        ns.assert(false, "implement me!");
        return null;
    };
    SecureMessageDelegate.prototype.decryptKey = function (
        data,
        sender,
        receiver,
        sMsg
    ) {
        ns.assert(false, "implement me!");
        return null;
    };
    SecureMessageDelegate.prototype.deserializeKey = function (
        data,
        sender,
        receiver,
        sMsg
    ) {
        ns.assert(false, "implement me!");
        return null;
    };
    SecureMessageDelegate.prototype.decodeData = function (data, sMsg) {
        ns.assert(false, "implement me!");
        return null;
    };
    SecureMessageDelegate.prototype.decryptContent = function (data, pwd, sMsg) {
        ns.assert(false, "implement me!");
        return null;
    };
    SecureMessageDelegate.prototype.deserializeContent = function (
        data,
        pwd,
        sMsg
    ) {
        ns.assert(false, "implement me!");
        return null;
    };
    SecureMessageDelegate.prototype.signData = function (data, sender, sMsg) {
        ns.assert(false, "implement me!");
        return null;
    };
    SecureMessageDelegate.prototype.encodeSignature = function (signature, sMsg) {
        ns.assert(false, "implement me!");
        return null;
    };
    SecureMessage.Delegate = SecureMessageDelegate;
    var SecureMessageFactory = function () {};
    ns.Interface(SecureMessageFactory, null);
    SecureMessageFactory.prototype.parseSecureMessage = function (msg) {
        ns.assert(false, "implement me!");
        return null;
    };
    SecureMessage.Factory = SecureMessageFactory;
    var s_secure_factory = null;
    SecureMessage.getFactory = function () {
        return s_secure_factory;
    };
    SecureMessage.setFactory = function (factory) {
        s_secure_factory = factory;
    };
    SecureMessage.parse = function (msg) {
        if (!msg) {
            return null;
        } else {
            if (ns.Interface.conforms(msg, SecureMessage)) {
                return msg;
            }
        }
        msg = ns.type.Wrapper.fetchMap(msg);
        var factory = SecureMessage.getFactory();
        return factory.parseSecureMessage(msg);
    };
    ns.protocol.SecureMessage = SecureMessage;
    ns.protocol.registers("SecureMessage");
})(DaoKeDao);
(function (ns) {
    var Meta = ns.protocol.Meta;
    var Document = ns.protocol.Document;
    var SecureMessage = ns.protocol.SecureMessage;
    var ReliableMessage = function () {};
    ns.Interface(ReliableMessage, [SecureMessage]);
    ReliableMessage.prototype.getSignature = function () {
        ns.assert(false, "implement me!");
        return null;
    };
    ReliableMessage.prototype.getMeta = function () {
        ns.assert(false, "implement me!");
        return null;
    };
    ReliableMessage.prototype.setMeta = function (meta) {
        ns.assert(false, "implement me!");
        return null;
    };
    ReliableMessage.getMeta = function (msg) {
        return Meta.parse(msg["meta"]);
    };
    ReliableMessage.setMeta = function (meta, msg) {
        if (meta) {
            msg["meta"] = meta.toMap();
        } else {
            delete msg["meta"];
        }
    };
    ReliableMessage.prototype.getVisa = function () {
        ns.assert(false, "implement me!");
        return null;
    };
    ReliableMessage.prototype.setVisa = function (doc) {
        ns.assert(false, "implement me!");
        return null;
    };
    ReliableMessage.getVisa = function (msg) {
        return Document.parse(msg["visa"]);
    };
    ReliableMessage.setVisa = function (doc, msg) {
        if (doc) {
            msg["visa"] = doc.toMap();
        } else {
            delete msg["visa"];
        }
    };
    ReliableMessage.prototype.verify = function () {
        ns.assert(false, "implement me!");
        return null;
    };
    var ReliableMessageDelegate = function () {};
    ns.Interface(ReliableMessageDelegate, [SecureMessage.Delegate]);
    ReliableMessageDelegate.prototype.decodeSignature = function (
        signature,
        rMsg
    ) {
        ns.assert(false, "implement me!");
        return null;
    };
    ReliableMessageDelegate.prototype.verifyDataSignature = function (
        data,
        signature,
        sender,
        rMsg
    ) {
        ns.assert(false, "implement me!");
        return false;
    };
    ReliableMessage.Delegate = ReliableMessageDelegate;
    var ReliableMessageFactory = function () {};
    ns.Interface(ReliableMessageFactory, null);
    ReliableMessageFactory.prototype.parseReliableMessage = function (msg) {
        ns.assert(false, "implement me!");
        return null;
    };
    ReliableMessage.Factory = ReliableMessageFactory;
    var s_reliable_factory = null;
    ReliableMessage.getFactory = function () {
        return s_reliable_factory;
    };
    ReliableMessage.setFactory = function (factory) {
        s_reliable_factory = factory;
    };
    ReliableMessage.parse = function (msg) {
        if (!msg) {
            return null;
        } else {
            if (ns.Interface.conforms(msg, ReliableMessage)) {
                return msg;
            }
        }
        msg = ns.type.Wrapper.fetchMap(msg);
        var factory = ReliableMessage.getFactory();
        return factory.parseReliableMessage(msg);
    };
    ns.protocol.ReliableMessage = ReliableMessage;
    ns.protocol.registers("ReliableMessage");
})(DaoKeDao);
(function (ns) {
    var Dictionary = ns.type.Dictionary;
    var ContentType = ns.protocol.ContentType;
    var Content = ns.protocol.Content;
    var InstantMessage = ns.protocol.InstantMessage;
    var BaseContent = function (info) {
        if (info instanceof ContentType) {
            info = info.valueOf();
        }
        var content, type, sn, time;
        if (typeof info === "number") {
            type = info;
            time = new Date();
            sn = InstantMessage.generateSerialNumber(type, time);
            content = { type: type, sn: sn, time: time.getTime() / 1000 };
        } else {
            content = info;
            type = Content.getType(content);
            sn = Content.getSerialNumber(content);
            time = Content.getTime(content);
        }
        Dictionary.call(this, content);
        this.__type = type;
        this.__sn = sn;
        this.__time = time;
    };
    ns.Class(BaseContent, Dictionary, [Content], {
        getType: function () {
            return this.__type;
        },
        getSerialNumber: function () {
            return this.__sn;
        },
        getTime: function () {
            return this.__time;
        },
        getGroup: function () {
            var dict = this.toMap();
            return Content.getGroup(dict);
        },
        setGroup: function (identifier) {
            var dict = this.toMap();
            Content.setGroup(identifier, dict);
        }
    });
    ns.dkd.BaseContent = BaseContent;
    ns.dkd.registers("BaseContent");
})(DaoKeDao);
(function (ns) {
    var Dictionary = ns.type.Dictionary;
    var Envelope = ns.protocol.Envelope;
    var MessageEnvelope = function () {
        var from, to, when;
        var env;
        if (arguments.length === 1) {
            env = arguments[0];
            from = Envelope.getSender(env);
            to = Envelope.getReceiver(env);
            when = Envelope.getTime(env);
        } else {
            if (arguments.length === 2) {
                from = arguments[0];
                to = arguments[1];
                when = new Date();
                env = {
                    sender: from.toString(),
                    receiver: to.toString(),
                    time: when.getTime() / 1000
                };
            } else {
                if (arguments.length === 3) {
                    from = arguments[0];
                    to = arguments[1];
                    when = arguments[2];
                    if (!when) {
                        when = new Date();
                    } else {
                        if (typeof when === "number") {
                            when = new Date(when * 1000);
                        }
                    }
                    env = {
                        sender: from.toString(),
                        receiver: to.toString(),
                        time: when.getTime() / 1000
                    };
                } else {
                    throw new SyntaxError("envelope arguments error: " + arguments);
                }
            }
        }
        Dictionary.call(this, env);
        this.__sender = from;
        this.__receiver = to;
        this.__time = when;
    };
    ns.Class(MessageEnvelope, Dictionary, [Envelope], {
        getSender: function () {
            return this.__sender;
        },
        getReceiver: function () {
            return this.__receiver;
        },
        getTime: function () {
            return this.__time;
        },
        getGroup: function () {
            var dict = this.toMap();
            return Envelope.getGroup(dict);
        },
        setGroup: function (identifier) {
            var dict = this.toMap();
            Envelope.setGroup(identifier, dict);
        },
        getType: function () {
            var dict = this.toMap();
            return Envelope.getType(dict);
        },
        setType: function (type) {
            var dict = this.toMap();
            Envelope.setType(type, dict);
        }
    });
    ns.dkd.MessageEnvelope = MessageEnvelope;
    ns.dkd.registers("MessageEnvelope");
})(DaoKeDao);
(function (ns) {
    var Dictionary = ns.type.Dictionary;
    var Envelope = ns.protocol.Envelope;
    var Message = ns.protocol.Message;
    var BaseMessage = function (msg) {
        var env;
        if (ns.Interface.conforms(msg, Envelope)) {
            env = msg;
            msg = env.toMap();
        } else {
            env = Message.getEnvelope(msg);
        }
        Dictionary.call(this, msg);
        this.__envelope = env;
        this.__delegate = null;
    };
    ns.Class(BaseMessage, Dictionary, [Message], null);
    BaseMessage.prototype.getDelegate = function () {
        return this.__delegate;
    };
    BaseMessage.prototype.setDelegate = function (delegate) {
        this.__delegate = delegate;
    };
    BaseMessage.prototype.getEnvelope = function () {
        return this.__envelope;
    };
    BaseMessage.prototype.getSender = function () {
        var env = this.getEnvelope();
        return env.getSender();
    };
    BaseMessage.prototype.getReceiver = function () {
        var env = this.getEnvelope();
        return env.getReceiver();
    };
    BaseMessage.prototype.getTime = function () {
        var env = this.getEnvelope();
        return env.getTime();
    };
    BaseMessage.prototype.getGroup = function () {
        var env = this.getEnvelope();
        return env.getGroup();
    };
    BaseMessage.prototype.getType = function () {
        var env = this.getEnvelope();
        return env.getTime();
    };
    ns.dkd.BaseMessage = BaseMessage;
    ns.dkd.registers("BaseMessage");
})(DaoKeDao);
(function (ns) {
    var Message = ns.protocol.Message;
    var InstantMessage = ns.protocol.InstantMessage;
    var SecureMessage = ns.protocol.SecureMessage;
    var BaseMessage = ns.dkd.BaseMessage;
    var PlainMessage = function () {
        var msg, head, body;
        if (arguments.length === 1) {
            msg = arguments[0];
            head = Message.getEnvelope(msg);
            body = InstantMessage.getContent(msg);
        } else {
            if (arguments.length === 2) {
                head = arguments[0];
                body = arguments[1];
                msg = head.toMap();
                msg["content"] = body.toMap();
            } else {
                throw new SyntaxError("message arguments error: " + arguments);
            }
        }
        BaseMessage.call(this, msg);
        this.__envelope = head;
        this.__content = body;
    };
    ns.Class(PlainMessage, BaseMessage, [InstantMessage], {
        getContent: function () {
            return this.__content;
        },
        getTime: function () {
            var content = this.getContent();
            var time = content.getTime();
            if (!time) {
                var env = this.getEnvelope();
                time = env.getTime();
            }
            return time;
        },
        getGroup: function () {
            var content = this.getContent();
            return content.getGroup();
        },
        getType: function () {
            var content = this.getContent();
            return content.getType();
        },
        encrypt: function (password, members) {
            if (members && members.length > 0) {
                return encrypt_group_message.call(this, password, members);
            } else {
                return encrypt_message.call(this, password);
            }
        }
    });
    var encrypt_message = function (password) {
        var delegate = this.getDelegate();
        var msg = prepare_data.call(this, password);
        var key = delegate.serializeKey(password, this);
        if (!key) {
            return SecureMessage.parse(msg);
        }
        var data = delegate.encryptKey(key, this.getReceiver(), this);
        if (!data) {
            return null;
        }
        msg["key"] = delegate.encodeKey(data, this);
        return SecureMessage.parse(msg);
    };
    var encrypt_group_message = function (password, members) {
        var delegate = this.getDelegate();
        var msg = prepare_data.call(this, password);
        var key = delegate.serializeKey(password, this);
        if (!key) {
            return SecureMessage.parse(msg);
        }
        var keys = {};
        var count = 0;
        var member;
        var data;
        for (var i = 0; i < members.length; ++i) {
            member = members[i];
            data = delegate.encryptKey(key, member, this);
            if (!data) {
                continue;
            }
            keys[member] = delegate.encodeKey(data, this);
            ++count;
        }
        if (count > 0) {
            msg["keys"] = keys;
        }
        return SecureMessage.parse(msg);
    };
    var prepare_data = function (password) {
        var delegate = this.getDelegate();
        var data = delegate.serializeContent(this.__content, password, this);
        data = delegate.encryptContent(data, password, this);
        var base64 = delegate.encodeData(data, this);
        var msg = this.copyMap();
        delete msg["content"];
        msg["data"] = base64;
        return msg;
    };
    ns.dkd.PlainMessage = PlainMessage;
    ns.dkd.registers("PlainMessage");
})(DaoKeDao);
(function (ns) {
    var Copier = ns.type.Copier;
    var InstantMessage = ns.protocol.InstantMessage;
    var SecureMessage = ns.protocol.SecureMessage;
    var ReliableMessage = ns.protocol.ReliableMessage;
    var BaseMessage = ns.dkd.BaseMessage;
    var EncryptedMessage = function (msg) {
        BaseMessage.call(this, msg);
        this.__data = null;
        this.__key = null;
        this.__keys = null;
    };
    ns.Class(EncryptedMessage, BaseMessage, [SecureMessage], {
        getData: function () {
            if (!this.__data) {
                var base64 = this.getValue("data");
                var delegate = this.getDelegate();
                this.__data = delegate.decodeData(base64, this);
            }
            return this.__data;
        },
        getEncryptedKey: function () {
            if (!this.__key) {
                var base64 = this.getValue("key");
                if (!base64) {
                    var keys = this.getEncryptedKeys();
                    if (keys) {
                        var receiver = this.getReceiver();
                        base64 = keys[receiver.toString()];
                    }
                }
                if (base64) {
                    var delegate = this.getDelegate();
                    this.__key = delegate.decodeKey(base64, this);
                }
            }
            return this.__key;
        },
        getEncryptedKeys: function () {
            if (!this.__keys) {
                this.__keys = this.getValue("keys");
            }
            return this.__keys;
        },
        decrypt: function () {
            var sender = this.getSender();
            var receiver;
            var group = this.getGroup();
            if (group) {
                receiver = group;
            } else {
                receiver = this.getReceiver();
            }
            var delegate = this.getDelegate();
            var key = this.getEncryptedKey();
            if (key) {
                key = delegate.decryptKey(key, sender, receiver, this);
                if (!key) {
                    throw new Error("failed to decrypt key in msg: " + this);
                }
            }
            var password = delegate.deserializeKey(key, sender, receiver, this);
            if (!password) {
                throw new Error(
                    "failed to get msg key: " + sender + " -> " + receiver + ", " + key
                );
            }
            var data = this.getData();
            if (!data) {
                throw new Error("failed to decode content data: " + this);
            }
            data = delegate.decryptContent(data, password, this);
            if (!data) {
                throw new Error("failed to decrypt data with key: " + password);
            }
            var content = delegate.deserializeContent(data, password, this);
            if (!content) {
                throw new Error("failed to deserialize content: " + data);
            }
            var msg = this.copyMap(false);
            delete msg["key"];
            delete msg["keys"];
            delete msg["data"];
            msg["content"] = content.toMap();
            return InstantMessage.parse(msg);
        },
        sign: function () {
            var delegate = this.getDelegate();
            var signature = delegate.signData(this.getData(), this.getSender(), this);
            var base64 = delegate.encodeSignature(signature, this);
            var msg = this.copyMap(false);
            msg["signature"] = base64;
            return ReliableMessage.parse(msg);
        },
        split: function (members) {
            var msg = this.copyMap(false);
            var keys = this.getEncryptedKeys();
            if (keys) {
                delete msg["keys"];
            } else {
                keys = {};
            }
            msg["group"] = this.getReceiver().toString();
            var messages = [];
            var base64;
            var item;
            var receiver;
            for (var i = 0; i < members.length; ++i) {
                receiver = members[i].toString();
                msg["receiver"] = receiver;
                base64 = keys[receiver];
                if (base64) {
                    msg["key"] = base64;
                } else {
                    delete msg["key"];
                }
                item = SecureMessage.parse(Copier.copyMap(msg));
                if (item) {
                    messages.push(item);
                }
            }
            return messages;
        },
        trim: function (member) {
            var msg = this.copyMap(false);
            var keys = this.getEncryptedKeys();
            if (keys) {
                var base64 = keys[member.toString()];
                if (base64) {
                    msg["key"] = base64;
                }
                delete msg["keys"];
            }
            var group = this.getGroup();
            if (!group) {
                msg["group"] = this.getReceiver().toString();
            }
            msg["receiver"] = member.toString();
            return SecureMessage.parse(msg);
        }
    });
    ns.dkd.EncryptedMessage = EncryptedMessage;
    ns.dkd.registers("EncryptedMessage");
})(DaoKeDao);
(function (ns) {
    var SecureMessage = ns.protocol.SecureMessage;
    var ReliableMessage = ns.protocol.ReliableMessage;
    var EncryptedMessage = ns.dkd.EncryptedMessage;
    var NetworkMessage = function (msg) {
        EncryptedMessage.call(this, msg);
        this.__signature = null;
        this.__meta = null;
        this.__visa = null;
    };
    ns.Class(NetworkMessage, EncryptedMessage, [ReliableMessage], {
        getSignature: function () {
            if (!this.__signature) {
                var base64 = this.getValue("signature");
                var delegate = this.getDelegate();
                this.__signature = delegate.decodeSignature(base64, this);
            }
            return this.__signature;
        },
        setMeta: function (meta) {
            var dict = this.toMap();
            ReliableMessage.setMeta(meta, dict);
            this.__meta = meta;
        },
        getMeta: function () {
            if (!this.__meta) {
                var dict = this.toMap();
                this.__meta = ReliableMessage.getMeta(dict);
            }
            return this.__meta;
        },
        setVisa: function (visa) {
            var dict = this.toMap();
            ReliableMessage.setVisa(visa, dict);
            this.__visa = visa;
        },
        getVisa: function () {
            if (!this.__visa) {
                var dict = this.toMap();
                this.__visa = ReliableMessage.getVisa(dict);
            }
            return this.__visa;
        },
        verify: function () {
            var data = this.getData();
            if (!data) {
                throw new Error("failed to decode content data: " + this);
            }
            var signature = this.getSignature();
            if (!signature) {
                throw new Error("failed to decode message signature: " + this);
            }
            var delegate = this.getDelegate();
            if (
                delegate.verifyDataSignature(data, signature, this.getSender(), this)
            ) {
                var msg = this.copyMap(false);
                delete msg["signature"];
                return SecureMessage.parse(msg);
            } else {
                return null;
            }
        }
    });
    ns.dkd.NetworkMessage = NetworkMessage;
    ns.dkd.registers("NetworkMessage");
})(DaoKeDao);
(function (ns) {
    var Envelope = ns.protocol.Envelope;
    var MessageEnvelope = ns.dkd.MessageEnvelope;
    var EnvelopeFactory = function () {
        Object.call(this);
    };
    ns.Class(EnvelopeFactory, Object, [Envelope.Factory], null);
    EnvelopeFactory.prototype.createEnvelope = function (from, to, when) {
        if (!when) {
            when = new Date();
        }
        return new MessageEnvelope(from, to, when);
    };
    EnvelopeFactory.prototype.parseEnvelope = function (env) {
        if (!env["sender"]) {
            return null;
        }
        return new MessageEnvelope(env);
    };
    Envelope.setFactory(new EnvelopeFactory());
    ns.dkd.EnvelopeFactory = EnvelopeFactory;
    ns.dkd.registers("EnvelopeFactory");
})(DaoKeDao);
(function (ns) {
    var InstantMessage = ns.protocol.InstantMessage;
    var PlainMessage = ns.dkd.PlainMessage;
    var InstantMessageFactory = function () {
        Object.call(this);
    };
    ns.Class(InstantMessageFactory, Object, [InstantMessage.Factory], null);
    var MAX_LONG = 4294967295;
    InstantMessageFactory.prototype.generateSerialNumber = function (
        msgType,
        now
    ) {
        var sn = Math.ceil(Math.random() * MAX_LONG);
        if (sn > 0) {
            return sn;
        } else {
            if (sn < 0) {
                return -sn;
            }
        }
        return 9527 + 9394;
    };
    InstantMessageFactory.prototype.createInstantMessage = function (head, body) {
        return new PlainMessage(head, body);
    };
    InstantMessageFactory.prototype.parseInstantMessage = function (msg) {
        return new PlainMessage(msg);
    };
    InstantMessage.setFactory(new InstantMessageFactory());
    ns.dkd.InstantMessageFactory = InstantMessageFactory;
    ns.dkd.registers("InstantMessageFactory");
})(DaoKeDao);
(function (ns) {
    var SecureMessage = ns.protocol.SecureMessage;
    var EncryptedMessage = ns.dkd.EncryptedMessage;
    var NetworkMessage = ns.dkd.NetworkMessage;
    var SecureMessageFactory = function () {
        Object.call(this);
    };
    ns.Class(SecureMessageFactory, Object, [SecureMessage.Factory], null);
    SecureMessageFactory.prototype.parseSecureMessage = function (msg) {
        if (msg["signature"]) {
            return new NetworkMessage(msg);
        }
        return new EncryptedMessage(msg);
    };
    SecureMessage.setFactory(new SecureMessageFactory());
    ns.dkd.SecureMessageFactory = SecureMessageFactory;
    ns.dkd.registers("SecureMessageFactory");
})(DaoKeDao);
(function (ns) {
    var ReliableMessage = ns.protocol.ReliableMessage;
    var NetworkMessage = ns.dkd.NetworkMessage;
    var ReliableMessageFactory = function () {
        Object.call(this);
    };
    ns.Class(ReliableMessageFactory, Object, [ReliableMessage.Factory], null);
    ReliableMessageFactory.prototype.parseReliableMessage = function (msg) {
        if (!msg["sender"] || !msg["data"] || !msg["signature"]) {
            return null;
        }
        return new NetworkMessage(msg);
    };
    ReliableMessage.setFactory(new ReliableMessageFactory());
    ns.dkd.ReliableMessageFactory = ReliableMessageFactory;
    ns.dkd.registers("ReliableMessageFactory");
})(DaoKeDao);
