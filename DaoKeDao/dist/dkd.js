/**
 * DaoKeDao - Message Module (v0.1.0)
 *
 * @author    moKy <albert.moky at gmail.com>
 * @date      June. 3, 2021
 * @copyright (c) 2021 Albert Moky
 * @license   {@link https://mit-license.org | MIT License}
 */;
if (typeof DaoKeDao !== "object") {
    DaoKeDao = new MingKeMing.Namespace()
}
(function(ns, base) {
    base.exports(ns);
    if (typeof ns.protocol !== "object") {
        ns.protocol = new ns.Namespace()
    }
    if (typeof ns.dkd !== "object") {
        ns.dkd = new ns.Namespace()
    }
    ns.registers("protocol");
    ns.registers("dkd")
})(DaoKeDao, MingKeMing);
(function(ns) {
    var ContentType = ns.type.Enum(null, {
        TEXT: (1),
        FILE: (16),
        IMAGE: (18),
        AUDIO: (20),
        VIDEO: (22),
        PAGE: (32),
        QUOTE: (55),
        MONEY: (64),
        TRANSFER: (65),
        LUCKY_MONEY: (66),
        CLAIM_PAYMENT: (72),
        SPLIT_BILL: (73),
        COMMAND: (136),
        HISTORY: (137),
        FORWARD: (255)
    });
    ns.protocol.ContentType = ContentType;
    ns.protocol.registers("ContentType")
})(DaoKeDao);
(function(ns) {
    var map = ns.type.Map;
    var ID = ns.protocol.ID;
    var Content = function() {};
    ns.Interface(Content, [map]);
    Content.prototype.getType = function() {
        console.assert(false, "implement me!");
        return 0
    };
    Content.getType = function(content) {
        return content["type"]
    };
    Content.prototype.getSerialNumber = function() {
        console.assert(false, "implement me!");
        return 0
    };
    Content.getSerialNumber = function(content) {
        return content["sn"]
    };
    Content.prototype.getTime = function() {
        console.assert(false, "implement me!");
        return null
    };
    Content.getTime = function(content) {
        var timestamp = content["time"];
        if (timestamp) {
            return new Date(timestamp * 1000)
        } else {
            return null
        }
    };
    Content.prototype.getGroup = function() {
        console.assert(false, "implement me!");
        return null
    };
    Content.prototype.setGroup = function(identifier) {
        console.assert(false, "implement me!")
    };
    Content.getGroup = function(content) {
        return ID.parse(content["group"])
    };
    Content.setGroup = function(group, content) {
        if (group) {
            content["group"] = group.toString()
        } else {
            delete content["group"]
        }
    };
    ns.protocol.Content = Content;
    ns.protocol.registers("Content")
})(DaoKeDao);
(function(ns) {
    var map = ns.type.Map;
    var ContentType = ns.protocol.ContentType;
    var Content = ns.protocol.Content;
    var ContentFactory = function() {};
    ns.Interface(ContentFactory, null);
    ContentFactory.prototype.parseContent = function(content) {
        console.assert(false, "implement me!");
        return null
    };
    Content.Factory = ContentFactory;
    var s_factories = {};
    Content.register = function(type, factory) {
        if (type instanceof ContentType) {
            type = type.valueOf()
        }
        s_factories[type] = factory
    };
    Content.getFactory = function(type) {
        if (type instanceof ContentType) {
            type = type.valueOf()
        }
        return s_factories[type]
    };
    Content.parse = function(content) {
        if (!content) {
            return null
        } else {
            if (ns.Interface.conforms(content, Content)) {
                return content
            } else {
                if (ns.Interface.conforms(content, map)) {
                    content = content.getMap()
                }
            }
        }
        var type = Content.getType(content);
        var factory = Content.getFactory(type);
        if (!factory) {
            factory = Content.getFactory(0)
        }
        return factory.parseContent(content)
    }
})(DaoKeDao);
(function(ns) {
    var map = ns.type.Map;
    var ID = ns.protocol.ID;
    var ContentType = ns.protocol.ContentType;
    var Envelope = function() {};
    ns.Interface(Envelope, [map]);
    Envelope.prototype.getSender = function() {
        console.assert(false, "implement me!");
        return null
    };
    Envelope.getSender = function(env) {
        return ns.protocol.ID.parse(env["sender"])
    };
    Envelope.prototype.getReceiver = function() {
        console.assert(false, "implement me!");
        return null
    };
    Envelope.getReceiver = function(env) {
        return ID.parse(env["receiver"])
    };
    Envelope.prototype.getTime = function() {
        console.assert(false, "implement me!");
        return null
    };
    Envelope.getTime = function(env) {
        var timestamp = env["time"];
        if (timestamp) {
            return new Date(timestamp * 1000)
        } else {
            return null
        }
    };
    Envelope.prototype.getGroup = function() {
        console.assert(false, "implement me!");
        return null
    };
    Envelope.prototype.setGroup = function(identifier) {
        console.assert(false, "implement me!")
    };
    Envelope.getGroup = function(env) {
        return ID.parse(env["group"])
    };
    Envelope.setGroup = function(group, env) {
        if (group) {
            env["group"] = group.toString()
        } else {
            delete env["group"]
        }
    };
    Envelope.prototype.getType = function() {
        console.assert(false, "implement me!");
        return null
    };
    Envelope.prototype.setType = function(type) {
        console.assert(false, "implement me!")
    };
    Envelope.getType = function(env) {
        var type = env["type"];
        if (type) {
            return type
        } else {
            return 0
        }
    };
    Envelope.setType = function(type, env) {
        if (type) {
            if (type instanceof ContentType) {
                type = type.valueOf()
            }
            env["type"] = type
        } else {
            delete env["type"]
        }
    };
    ns.protocol.Envelope = Envelope;
    ns.protocol.registers("Envelope")
})(DaoKeDao);
(function(ns) {
    var map = ns.type.Map;
    var Envelope = ns.protocol.Envelope;
    var EnvelopeFactory = function() {};
    ns.Interface(EnvelopeFactory, null);
    EnvelopeFactory.prototype.createEnvelope = function(from, to, when) {
        console.assert(false, "implement me!");
        return null
    };
    EnvelopeFactory.prototype.parseEnvelope = function(env) {
        console.assert(false, "implement me!");
        return null
    };
    Envelope.Factory = EnvelopeFactory;
    var s_factory = null;
    Envelope.getFactory = function() {
        return s_factory
    };
    Envelope.setFactory = function(factory) {
        s_factory = factory
    };
    Envelope.create = function(from, to, when) {
        return Envelope.getFactory().createEnvelope(from, to, when)
    };
    Envelope.parse = function(env) {
        if (!env) {
            return null
        } else {
            if (ns.Interface.conforms(env, Envelope)) {
                return env
            } else {
                if (ns.Interface.conforms(env, map)) {
                    env = env.getMap()
                }
            }
        }
        return Envelope.getFactory().parseEnvelope(env)
    }
})(DaoKeDao);
(function(ns) {
    var map = ns.type.Map;
    var Envelope = ns.protocol.Envelope;
    var Message = function() {};
    ns.Interface(Message, [map]);
    Message.prototype.getDelegate = function() {
        console.assert(false, "implement me!");
        return null
    };
    Message.prototype.setDelegate = function(delegate) {
        console.assert(false, "implement me!")
    };
    Message.prototype.getEnvelope = function() {
        console.assert(false, "implement me!");
        return null
    };
    Message.getEnvelope = function(msg) {
        return Envelope.parse(msg)
    };
    Message.prototype.getSender = function() {
        console.assert(false, "implement me!");
        return null
    };
    Message.prototype.getReceiver = function() {
        console.assert(false, "implement me!");
        return null
    };
    Message.prototype.getTime = function() {
        console.assert(false, "implement me!");
        return null
    };
    Message.prototype.getGroup = function() {
        console.assert(false, "implement me!");
        return null
    };
    Message.prototype.getType = function() {
        console.assert(false, "implement me!");
        return null
    };
    ns.protocol.Message = Message;
    ns.protocol.registers("Message")
})(DaoKeDao);
(function(ns) {
    var Message = ns.protocol.Message;
    var MessageDelegate = function() {};
    ns.Interface(MessageDelegate, null);
    Message.Delegate = MessageDelegate
})(DaoKeDao);
(function(ns) {
    var Content = ns.protocol.Content;
    var Message = ns.protocol.Message;
    var InstantMessage = function() {};
    ns.Interface(InstantMessage, [Message]);
    InstantMessage.prototype.getContent = function() {
        console.assert(false, "implement me!");
        return null
    };
    InstantMessage.getContent = function(msg) {
        return Content.parse(msg["content"])
    };
    InstantMessage.prototype.encrypt = function(password, members) {
        console.assert(false, "implement me!");
        return null
    };
    ns.protocol.InstantMessage = InstantMessage;
    ns.protocol.registers("InstantMessage")
})(DaoKeDao);
(function(ns) {
    var Message = ns.protocol.Message;
    var InstantMessage = ns.protocol.InstantMessage;
    var InstantMessageDelegate = function() {};
    ns.Interface(InstantMessageDelegate, [Message.Delegate]);
    InstantMessageDelegate.prototype.serializeContent = function(content, pwd, iMsg) {
        console.assert(false, "implement me!");
        return null
    };
    InstantMessageDelegate.prototype.encryptContent = function(data, pwd, iMsg) {
        console.assert(false, "implement me!");
        return null
    };
    InstantMessageDelegate.prototype.encodeData = function(data, iMsg) {
        console.assert(false, "implement me!");
        return null
    };
    InstantMessageDelegate.prototype.serializeKey = function(pwd, iMsg) {
        console.assert(false, "implement me!");
        return null
    };
    InstantMessageDelegate.prototype.encryptKey = function(data, receiver, iMsg) {
        console.assert(false, "implement me!");
        return null
    };
    InstantMessageDelegate.prototype.encodeKey = function(data, iMsg) {
        console.assert(false, "implement me!");
        return null
    };
    InstantMessage.Delegate = InstantMessageDelegate
})(DaoKeDao);
(function(ns) {
    var map = ns.type.Map;
    var InstantMessage = ns.protocol.InstantMessage;
    var InstantMessageFactory = function() {};
    ns.Interface(InstantMessageFactory, null);
    InstantMessageFactory.prototype.createInstantMessage = function(head, body) {
        console.assert(false, "implement me!");
        return null
    };
    InstantMessageFactory.prototype.parseInstantMessage = function(msg) {
        console.assert(false, "implement me!");
        return null
    };
    InstantMessage.Factory = InstantMessageFactory;
    var s_factory = null;
    InstantMessage.getFactory = function() {
        return s_factory
    };
    InstantMessage.setFactory = function(factory) {
        s_factory = factory
    };
    InstantMessage.create = function(head, body) {
        return InstantMessage.getFactory().createInstantMessage(head, body)
    };
    InstantMessage.parse = function(msg) {
        if (!msg) {
            return null
        } else {
            if (ns.Interface.conforms(msg, InstantMessage)) {
                return msg
            } else {
                if (ns.Interface.conforms(msg, map)) {
                    msg = msg.getMap()
                }
            }
        }
        return InstantMessage.getFactory().parseInstantMessage(msg)
    }
})(DaoKeDao);
(function(ns) {
    var Message = ns.protocol.Message;
    var SecureMessage = function() {};
    ns.Interface(SecureMessage, [Message]);
    SecureMessage.prototype.getData = function() {
        console.assert(false, "implement me!");
        return null
    };
    SecureMessage.prototype.getEncryptedKey = function() {
        console.assert(false, "implement me!");
        return null
    };
    SecureMessage.prototype.getEncryptedKeys = function() {
        console.assert(false, "implement me!");
        return null
    };
    SecureMessage.prototype.decrypt = function() {
        console.assert(false, "implement me!");
        return null
    };
    SecureMessage.prototype.sign = function() {
        console.assert(false, "implement me!");
        return null
    };
    SecureMessage.prototype.split = function(members) {
        console.assert(false, "implement me!");
        return null
    };
    SecureMessage.prototype.trim = function(member) {
        console.assert(false, "implement me!");
        return null
    };
    ns.protocol.SecureMessage = SecureMessage;
    ns.protocol.registers("SecureMessage")
})(DaoKeDao);
(function(ns) {
    var Message = ns.protocol.Message;
    var SecureMessage = ns.protocol.SecureMessage;
    var SecureMessageDelegate = function() {};
    ns.Interface(SecureMessageDelegate, [Message.Delegate]);
    SecureMessageDelegate.prototype.decodeKey = function(key, sMsg) {
        console.assert(false, "implement me!");
        return null
    };
    SecureMessageDelegate.prototype.decryptKey = function(data, sender, receiver, sMsg) {
        console.assert(false, "implement me!");
        return null
    };
    SecureMessageDelegate.prototype.deserializeKey = function(data, sender, receiver, sMsg) {
        console.assert(false, "implement me!");
        return null
    };
    SecureMessageDelegate.prototype.decodeData = function(data, sMsg) {
        console.assert(false, "implement me!");
        return null
    };
    SecureMessageDelegate.prototype.decryptContent = function(data, pwd, sMsg) {
        console.assert(false, "implement me!");
        return null
    };
    SecureMessageDelegate.prototype.deserializeContent = function(data, pwd, sMsg) {
        console.assert(false, "implement me!");
        return null
    };
    SecureMessageDelegate.prototype.signData = function(data, sender, sMsg) {
        console.assert(false, "implement me!");
        return null
    };
    SecureMessageDelegate.prototype.encodeSignature = function(signature, sMsg) {
        console.assert(false, "implement me!");
        return null
    };
    SecureMessage.Delegate = SecureMessageDelegate
})(DaoKeDao);
(function(ns) {
    var map = ns.type.Map;
    var SecureMessage = ns.protocol.SecureMessage;
    var SecureMessageFactory = function() {};
    ns.Interface(SecureMessageFactory, null);
    SecureMessageFactory.prototype.parseSecureMessage = function(msg) {
        console.assert(false, "implement me!");
        return null
    };
    SecureMessage.Factory = SecureMessageFactory;
    var s_factory = null;
    SecureMessage.getFactory = function() {
        return s_factory
    };
    SecureMessage.setFactory = function(factory) {
        s_factory = factory
    };
    SecureMessage.parse = function(msg) {
        if (!msg) {
            return null
        } else {
            if (ns.Interface.conforms(msg, SecureMessage)) {
                return msg
            } else {
                if (ns.Interface.conforms(msg, map)) {
                    msg = msg.getMap()
                }
            }
        }
        return SecureMessage.getFactory().parseSecureMessage(msg)
    }
})(DaoKeDao);
(function(ns) {
    var map = ns.type.Map;
    var Meta = ns.protocol.Meta;
    var Document = ns.protocol.Document;
    var SecureMessage = ns.protocol.SecureMessage;
    var ReliableMessage = function() {};
    ns.Interface(ReliableMessage, [SecureMessage]);
    ReliableMessage.prototype.getSignature = function() {
        console.assert(false, "implement me!");
        return null
    };
    ReliableMessage.prototype.getMeta = function() {
        console.assert(false, "implement me!");
        return null
    };
    ReliableMessage.prototype.setMeta = function(meta) {
        console.assert(false, "implement me!");
        return null
    };
    ReliableMessage.getMeta = function(msg) {
        return Meta.parse(msg["meta"])
    };
    ReliableMessage.setMeta = function(meta, msg) {
        if (meta) {
            msg["meta"] = meta.getMap()
        } else {
            delete msg["meta"]
        }
    };
    ReliableMessage.prototype.getVisa = function() {
        console.assert(false, "implement me!");
        return null
    };
    ReliableMessage.prototype.setVisa = function(doc) {
        console.assert(false, "implement me!");
        return null
    };
    ReliableMessage.getVisa = function(msg) {
        var doc = msg["visa"];
        if (!doc) {
            doc = msg["profile"]
        }
        return Document.parse(doc)
    };
    ReliableMessage.setVisa = function(doc, msg) {
        delete msg["visa"];
        if (doc) {
            msg["profile"] = doc.getMap()
        } else {
            delete msg["profile"]
        }
    };
    ReliableMessage.prototype.verify = function() {
        console.assert(false, "implement me!");
        return null
    };
    ns.protocol.ReliableMessage = ReliableMessage;
    ns.protocol.registers("ReliableMessage")
})(DaoKeDao);
(function(ns) {
    var SecureMessage = ns.protocol.SecureMessage;
    var ReliableMessage = ns.protocol.ReliableMessage;
    var ReliableMessageDelegate = function() {};
    ns.Interface(ReliableMessageDelegate, [SecureMessage.Delegate]);
    ReliableMessageDelegate.prototype.decodeSignature = function(signature, rMsg) {
        console.assert(false, "implement me!");
        return null
    };
    ReliableMessageDelegate.prototype.verifyDataSignature = function(data, signature, sender, rMsg) {
        console.assert(false, "implement me!");
        return false
    };
    ReliableMessage.Delegate = ReliableMessageDelegate
})(DaoKeDao);
(function(ns) {
    var map = ns.type.Map;
    var ReliableMessage = ns.protocol.ReliableMessage;
    var ReliableMessageFactory = function() {};
    ns.Interface(ReliableMessageFactory, null);
    ReliableMessageFactory.prototype.parseReliableMessage = function(msg) {
        console.assert(false, "implement me!");
        return null
    };
    ReliableMessage.Factory = ReliableMessageFactory;
    var s_factory = null;
    ReliableMessage.getFactory = function() {
        return s_factory
    };
    ReliableMessage.setFactory = function(factory) {
        s_factory = factory
    };
    ReliableMessage.parse = function(msg) {
        if (!msg) {
            return null
        } else {
            if (ns.Interface.conforms(msg, ReliableMessage)) {
                return msg
            } else {
                if (ns.Interface.conforms(msg, map)) {
                    msg = msg.getMap()
                }
            }
        }
        return ReliableMessage.getFactory().parseReliableMessage(msg)
    }
})(DaoKeDao);
(function(ns) {
    var Dictionary = ns.type.Dictionary;
    var ContentType = ns.protocol.ContentType;
    var Content = ns.protocol.Content;
    var MAX_LONG = 4294967295;
    var randomPositiveInteger = function() {
        var sn = Math.ceil(Math.random() * MAX_LONG);
        if (sn > 0) {
            return sn
        } else {
            if (sn < 0) {
                return -sn
            }
        }
        return 9527 + 9394
    };
    var BaseContent = function(info) {
        var content, type, sn, time;
        if (info instanceof ContentType) {
            type = info.valueOf();
            sn = null;
            time = null;
            content = {
                "type": type
            }
        } else {
            if (typeof info === "number") {
                type = info;
                sn = null;
                time = null;
                content = {
                    "type": type
                }
            } else {
                content = info;
                type = Content.getType(content);
                sn = Content.getSerialNumber(content);
                time = Content.getTime(content)
            }
        }
        if (!sn) {
            sn = randomPositiveInteger();
            content["sn"] = sn
        }
        if (!time) {
            time = new Date();
            content["time"] = time.getTime() / 1000
        }
        Dictionary.call(this, content);
        this.__type = type;
        this.__sn = sn;
        this.__time = time
    };
    ns.Class(BaseContent, Dictionary, [Content]);
    BaseContent.prototype.getType = function() {
        return this.__type
    };
    BaseContent.prototype.getSerialNumber = function() {
        return this.__sn
    };
    BaseContent.prototype.getTime = function() {
        return this.__time
    };
    BaseContent.prototype.getGroup = function() {
        return Content.getGroup(this.getMap())
    };
    BaseContent.prototype.setGroup = function(identifier) {
        Content.setGroup(identifier, this.getMap())
    };
    ns.dkd.BaseContent = BaseContent;
    ns.dkd.registers("BaseContent")
})(DaoKeDao);
(function(ns) {
    var Dictionary = ns.type.Dictionary;
    var Envelope = ns.protocol.Envelope;
    var MessageEnvelope = function() {
        var from, to, when;
        var env;
        if (arguments.length === 1) {
            env = arguments[0];
            from = Envelope.getSender(env);
            to = Envelope.getReceiver(env);
            when = Envelope.getTime(env)
        } else {
            if (arguments.length === 2) {
                from = arguments[0];
                to = arguments[1];
                when = new Date();
                env = {
                    "sender": from.toString(),
                    "receiver": to.toString(),
                    "time": Math.ceil(when.getTime() / 1000)
                }
            } else {
                if (arguments.length === 3) {
                    from = arguments[0];
                    to = arguments[1];
                    if (arguments[2] instanceof Date) {
                        when = arguments[2]
                    } else {
                        when = new Date(arguments[2] * 1000)
                    }
                    env = {
                        "sender": from.toString(),
                        "receiver": to.toString(),
                        "time": Math.ceil(when.getTime() / 1000)
                    }
                } else {
                    throw new SyntaxError("envelope arguments error: " + arguments)
                }
            }
        }
        Dictionary.call(this, env);
        this.__sender = from;
        this.__receiver = to;
        this.__time = when
    };
    ns.Class(MessageEnvelope, Dictionary, [Envelope]);
    MessageEnvelope.prototype.getSender = function() {
        return this.__sender
    };
    MessageEnvelope.prototype.getReceiver = function() {
        return this.__receiver
    };
    MessageEnvelope.prototype.getTime = function() {
        return this.__time
    };
    MessageEnvelope.prototype.getGroup = function() {
        return Envelope.getGroup(this.getMap())
    };
    MessageEnvelope.prototype.setGroup = function(identifier) {
        Envelope.setGroup(identifier, this.getMap())
    };
    MessageEnvelope.prototype.getType = function() {
        return Envelope.getType(this.getMap())
    };
    MessageEnvelope.prototype.setType = function(type) {
        Envelope.setType(type, this.getMap())
    };
    ns.dkd.MessageEnvelope = MessageEnvelope;
    ns.dkd.registers("MessageEnvelope")
})(DaoKeDao);
(function(ns) {
    var Dictionary = ns.type.Dictionary;
    var Envelope = ns.protocol.Envelope;
    var Message = ns.protocol.Message;
    var BaseMessage = function(msg) {
        var env;
        if (ns.Interface.conforms(msg, Envelope)) {
            env = msg;
            msg = env.getMap()
        } else {
            env = Message.getEnvelope(msg)
        }
        Dictionary.call(this, msg);
        this.__envelope = env;
        this.__delegate = null
    };
    ns.Class(BaseMessage, Dictionary, [Message]);
    BaseMessage.prototype.getDelegate = function() {
        return this.__delegate
    };
    BaseMessage.prototype.setDelegate = function(delegate) {
        this.__delegate = delegate
    };
    BaseMessage.prototype.getEnvelope = function() {
        return this.__envelope
    };
    BaseMessage.prototype.getSender = function() {
        return this.getEnvelope().getSender()
    };
    BaseMessage.prototype.getReceiver = function() {
        return this.getEnvelope().getReceiver()
    };
    BaseMessage.prototype.getTime = function() {
        return this.getEnvelope().getTime()
    };
    BaseMessage.prototype.getGroup = function() {
        return this.getEnvelope().getGroup()
    };
    BaseMessage.prototype.getType = function() {
        return this.getEnvelope().getTime()
    };
    ns.dkd.BaseMessage = BaseMessage;
    ns.dkd.registers("BaseMessage")
})(DaoKeDao);
(function(ns) {
    var Message = ns.protocol.Message;
    var InstantMessage = ns.protocol.InstantMessage;
    var SecureMessage = ns.protocol.SecureMessage;
    var BaseMessage = ns.dkd.BaseMessage;
    var PlainMessage = function() {
        var msg, head, body;
        if (arguments.length === 1) {
            msg = arguments[0];
            head = Message.getEnvelope(msg);
            body = InstantMessage.getContent(msg)
        } else {
            if (arguments.length === 2) {
                head = arguments[0];
                body = arguments[1];
                msg = head.getMap();
                msg["content"] = body.getMap()
            } else {
                throw new SyntaxError("message arguments error: " + arguments)
            }
        }
        BaseMessage.call(this, msg);
        this.__envelope = head;
        this.__content = body
    };
    ns.Class(PlainMessage, BaseMessage, [InstantMessage]);
    PlainMessage.prototype.getContent = function() {
        return this.__content
    };
    PlainMessage.prototype.getTime = function() {
        var time = this.getContent().getTime();
        if (!time) {
            time = this.getEnvelope().getTime()
        }
        return time
    };
    PlainMessage.prototype.getGroup = function() {
        return this.getContent().getGroup()
    };
    PlainMessage.prototype.getType = function() {
        return this.getContent().getType()
    };
    PlainMessage.prototype.encrypt = function(password, members) {
        if (members && members.length > 0) {
            return encrypt_group_message.call(this, password, members)
        } else {
            return encrypt_message.call(this, password)
        }
    };
    var encrypt_message = function(password) {
        var delegate = this.getDelegate();
        var msg = prepare_data.call(this, password);
        var key = delegate.serializeKey(password, this);
        if (!key) {
            return SecureMessage.parse(msg)
        }
        var data = delegate.encryptKey(key, this.getReceiver(), this);
        if (!data) {
            return null
        }
        msg["key"] = delegate.encodeKey(data, this);
        return SecureMessage.parse(msg)
    };
    var encrypt_group_message = function(password, members) {
        var delegate = this.getDelegate();
        var msg = prepare_data.call(this, password);
        var key = delegate.serializeKey(password, this);
        if (!key) {
            return SecureMessage.parse(msg)
        }
        var keys = {};
        var count = 0;
        var member;
        var data;
        for (var i = 0; i < members.length; ++i) {
            member = members[i];
            data = delegate.encryptKey(key, member, this);
            if (!data) {
                continue
            }
            keys[member] = delegate.encodeKey(data, this);
            ++count
        }
        if (count > 0) {
            msg["keys"] = keys
        }
        return SecureMessage.parse(msg)
    };
    var prepare_data = function(password) {
        var delegate = this.getDelegate();
        var data = delegate.serializeContent(this.__content, password, this);
        data = delegate.encryptContent(data, password, this);
        var base64 = delegate.encodeData(data, this);
        var msg = this.copyMap();
        delete msg["content"];
        msg["data"] = base64;
        return msg
    };
    ns.dkd.PlainMessage = PlainMessage;
    ns.dkd.registers("PlainMessage")
})(DaoKeDao);
(function(ns) {
    var map = ns.type.Map;
    var InstantMessage = ns.protocol.InstantMessage;
    var SecureMessage = ns.protocol.SecureMessage;
    var ReliableMessage = ns.protocol.ReliableMessage;
    var BaseMessage = ns.dkd.BaseMessage;
    var EncryptedMessage = function(msg) {
        BaseMessage.call(this, msg);
        this.__data = null;
        this.__key = null;
        this.__keys = null
    };
    ns.Class(EncryptedMessage, BaseMessage, [SecureMessage]);
    EncryptedMessage.prototype.getData = function() {
        if (!this.__data) {
            var base64 = this.getValue("data");
            this.__data = this.getDelegate().decodeData(base64, this)
        }
        return this.__data
    };
    EncryptedMessage.prototype.getEncryptedKey = function() {
        if (!this.__key) {
            var base64 = this.getValue("key");
            if (!base64) {
                var keys = this.getEncryptedKeys();
                if (keys) {
                    var receiver = this.getReceiver();
                    base64 = keys[receiver.toString()]
                }
            }
            if (base64) {
                this.__key = this.getDelegate().decodeKey(base64, this)
            }
        }
        return this.__key
    };
    EncryptedMessage.prototype.getEncryptedKeys = function() {
        if (!this.__keys) {
            this.__keys = this.getValue("keys")
        }
        return this.__keys
    };
    EncryptedMessage.prototype.decrypt = function() {
        var sender = this.getSender();
        var receiver;
        var group = this.getGroup();
        if (group) {
            receiver = group
        } else {
            receiver = this.getReceiver()
        }
        var delegate = this.getDelegate();
        var key = this.getEncryptedKey();
        if (key) {
            key = delegate.decryptKey(key, sender, receiver, this);
            if (!key) {
                throw new Error("failed to decrypt key in msg: " + this)
            }
        }
        var password = delegate.deserializeKey(key, sender, receiver, this);
        if (!password) {
            throw new Error("failed to get msg key: " + sender + " -> " + receiver + ", " + key)
        }
        var data = this.getData();
        if (!data) {
            throw new Error("failed to decode content data: " + this)
        }
        data = delegate.decryptContent(data, password, this);
        if (!data) {
            throw new Error("failed to decrypt data with key: " + password)
        }
        var content = delegate.deserializeContent(data, password, this);
        if (!content) {
            throw new Error("failed to deserialize content: " + data)
        }
        var msg = this.copyMap();
        delete msg["key"];
        delete msg["keys"];
        delete msg["data"];
        msg["content"] = content.getMap();
        return InstantMessage.parse(msg)
    };
    EncryptedMessage.prototype.sign = function() {
        var delegate = this.getDelegate();
        var signature = delegate.signData(this.getData(), this.getSender(), this);
        var base64 = delegate.encodeSignature(signature, this);
        var msg = this.copyMap();
        msg["signature"] = base64;
        return ReliableMessage.parse(msg)
    };
    EncryptedMessage.prototype.split = function(members) {
        var msg = this.copyMap();
        var keys = this.getEncryptedKeys();
        if (keys) {
            delete msg["keys"]
        } else {
            keys = {}
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
                msg["key"] = base64
            } else {
                delete msg["key"]
            }
            item = SecureMessage.parse(map.copyMap(msg));
            if (item) {
                messages.push(item)
            }
        }
        return messages
    };
    EncryptedMessage.prototype.trim = function(member) {
        var msg = this.copyMap();
        var keys = this.getEncryptedKeys();
        if (keys) {
            var base64 = keys[member.toString()];
            if (base64) {
                msg["key"] = base64
            }
            delete msg["keys"]
        }
        var group = this.getGroup();
        if (!group) {
            msg["group"] = this.getReceiver().toString()
        }
        msg["receiver"] = member.toString();
        return SecureMessage.parse(msg)
    };
    ns.dkd.EncryptedMessage = EncryptedMessage;
    ns.dkd.registers("EncryptedMessage")
})(DaoKeDao);
(function(ns) {
    var SecureMessage = ns.protocol.SecureMessage;
    var ReliableMessage = ns.protocol.ReliableMessage;
    var EncryptedMessage = ns.dkd.EncryptedMessage;
    var NetworkMessage = function(msg) {
        EncryptedMessage.call(this, msg);
        this.__signature = null;
        this.__meta = null;
        this.__visa = null
    };
    ns.Class(NetworkMessage, EncryptedMessage, [ReliableMessage]);
    NetworkMessage.prototype.getSignature = function() {
        if (!this.__signature) {
            var base64 = this.getValue("signature");
            this.__signature = this.getDelegate().decodeSignature(base64, this)
        }
        return this.__signature
    };
    NetworkMessage.prototype.setMeta = function(meta) {
        ReliableMessage.setMeta(meta, this.getMap());
        this.__meta = meta
    };
    NetworkMessage.prototype.getMeta = function() {
        if (!this.__meta) {
            this.__meta = ReliableMessage.getMeta(this.getMap())
        }
        return this.__meta
    };
    NetworkMessage.prototype.setVisa = function(visa) {
        ReliableMessage.setVisa(visa, this.getMap());
        this.__visa = visa
    };
    NetworkMessage.prototype.getVisa = function() {
        if (!this.__visa) {
            this.__visa = ReliableMessage.getVisa(this.getMap())
        }
        return this.__visa
    };
    NetworkMessage.prototype.verify = function() {
        var data = this.getData();
        if (!data) {
            throw new Error("failed to decode content data: " + this)
        }
        var signature = this.getSignature();
        if (!signature) {
            throw new Error("failed to decode message signature: " + this)
        }
        if (this.getDelegate().verifyDataSignature(data, signature, this.getSender(), this)) {
            var msg = this.copyMap();
            delete msg["signature"];
            return SecureMessage.parse(msg)
        } else {
            return null
        }
    };
    ns.dkd.NetworkMessage = NetworkMessage;
    ns.dkd.registers("NetworkMessage")
})(DaoKeDao);
(function(ns) {
    var obj = ns.type.Object;
    var Envelope = ns.protocol.Envelope;
    var MessageEnvelope = ns.dkd.MessageEnvelope;
    var EnvelopeFactory = function() {
        obj.call(this)
    };
    ns.Class(EnvelopeFactory, obj, [Envelope.Factory]);
    EnvelopeFactory.prototype.createEnvelope = function(from, to, when) {
        if (!when) {
            when = new Date()
        }
        return new MessageEnvelope(from, to, when)
    };
    EnvelopeFactory.prototype.parseEnvelope = function(env) {
        if (!env || !env["sender"]) {
            return null
        }
        return new MessageEnvelope(env)
    };
    Envelope.setFactory(new EnvelopeFactory());
    ns.dkd.EnvelopeFactory = EnvelopeFactory;
    ns.dkd.registers("EnvelopeFactory")
})(DaoKeDao);
(function(ns) {
    var obj = ns.type.Object;
    var InstantMessage = ns.protocol.InstantMessage;
    var PlainMessage = ns.dkd.PlainMessage;
    var InstantMessageFactory = function() {
        obj.call(this)
    };
    ns.Class(InstantMessageFactory, obj, [InstantMessage.Factory]);
    InstantMessageFactory.prototype.createInstantMessage = function(head, body) {
        return new PlainMessage(head, body)
    };
    InstantMessageFactory.prototype.parseInstantMessage = function(msg) {
        return new PlainMessage(msg)
    };
    InstantMessage.setFactory(new InstantMessageFactory());
    ns.dkd.InstantMessageFactory = InstantMessageFactory;
    ns.dkd.registers("InstantMessageFactory")
})(DaoKeDao);
(function(ns) {
    var obj = ns.type.Object;
    var SecureMessage = ns.protocol.SecureMessage;
    var EncryptedMessage = ns.dkd.EncryptedMessage;
    var SecureMessageFactory = function() {
        obj.call(this)
    };
    ns.Class(SecureMessageFactory, obj, [SecureMessage.Factory]);
    SecureMessageFactory.prototype.parseSecureMessage = function(msg) {
        return new EncryptedMessage(msg)
    };
    SecureMessage.setFactory(new SecureMessageFactory());
    ns.dkd.SecureMessageFactory = SecureMessageFactory;
    ns.dkd.registers("SecureMessageFactory")
})(DaoKeDao);
(function(ns) {
    var obj = ns.type.Object;
    var ReliableMessage = ns.protocol.ReliableMessage;
    var NetworkMessage = ns.dkd.NetworkMessage;
    var ReliableMessageFactory = function() {
        obj.call(this)
    };
    ns.Class(ReliableMessageFactory, obj, [ReliableMessage.Factory]);
    ReliableMessageFactory.prototype.parseReliableMessage = function(msg) {
        return new NetworkMessage(msg)
    };
    ReliableMessage.setFactory(new ReliableMessageFactory());
    ns.dkd.ReliableMessageFactory = ReliableMessageFactory;
    ns.dkd.registers("ReliableMessageFactory")
})(DaoKeDao);
