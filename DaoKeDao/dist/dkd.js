/**
 * DaoKeDao - Message Module (v0.1.0)
 *
 * @author    moKy <albert.moky at gmail.com>
 * @date      June. 3, 2021
 * @copyright (c) 2021 Albert Moky
 * @license   {@link https://mit-license.org | MIT License}
 */;
if (typeof DaoKeDao !== "object") {
    DaoKeDao = {}
}
(function(ns, base) {
    base.exports(ns);
    if (typeof ns.protocol !== "object") {
        ns.protocol = {}
    }
    base.Namespace(ns.protocol);
    ns.register("protocol")
})(DaoKeDao, MingKeMing);
(function(ns) {
    var ContentType = ns.type.Enum(null, {
        UNKNOWN: (0),
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
    ns.protocol.register("ContentType")
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
    ns.protocol.register("Content")
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
            if (content instanceof Content) {
                return content
            } else {
                if (content instanceof map) {
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
    ns.protocol.register("Envelope")
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
            if (env instanceof Envelope) {
                return env
            } else {
                if (env instanceof map) {
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
    ns.protocol.register("Message")
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
    ns.protocol.register("InstantMessage")
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
            if (msg instanceof InstantMessage) {
                return msg
            } else {
                if (msg instanceof map) {
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
    ns.protocol.register("SecureMessage")
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
            if (msg instanceof SecureMessage) {
                return msg
            } else {
                if (msg instanceof map) {
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
        if (msg instanceof map) {
            msg = msg.getMap()
        }
        return Meta.parse(msg["meta"])
    };
    ReliableMessage.setMeta = function(meta, msg) {
        if (msg instanceof map) {
            msg = msg.getMap()
        }
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
        if (msg instanceof map) {
            msg = msg.getMap()
        }
        var doc = msg["visa"];
        if (!doc) {
            doc = msg["profile"]
        }
        return Document.parse(doc)
    };
    ReliableMessage.setVisa = function(doc, msg) {
        if (msg instanceof map) {
            msg = msg.getMap()
        }
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
    ns.protocol.register("ReliableMessage")
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
            if (msg instanceof ReliableMessage) {
                return msg
            } else {
                if (msg instanceof map) {
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
        this.type = type;
        this.sn = sn;
        this.time = time
    };
    ns.Class(BaseContent, Dictionary, [Content]);
    BaseContent.prototype.getType = function() {
        return this.type
    };
    BaseContent.prototype.getSerialNumber = function() {
        return this.sn
    };
    BaseContent.prototype.getTime = function() {
        return this.time
    };
    BaseContent.prototype.getGroup = function() {
        return Content.getGroup(this.getMap())
    };
    BaseContent.prototype.setGroup = function(identifier) {
        Content.setGroup(identifier, this.getMap())
    };
    ns.BaseContent = BaseContent;
    ns.register("BaseContent")
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
                    throw SyntaxError("envelope arguments error: " + arguments)
                }
            }
        }
        Dictionary.call(this, env);
        this.sender = from;
        this.receiver = to;
        this.time = when
    };
    ns.Class(MessageEnvelope, Dictionary, [Envelope]);
    MessageEnvelope.prototype.getSender = function() {
        return this.sender
    };
    MessageEnvelope.prototype.getReceiver = function() {
        return this.receiver
    };
    MessageEnvelope.prototype.getTime = function() {
        return this.time
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
    ns.MessageEnvelope = MessageEnvelope;
    ns.register("MessageEnvelope")
})(DaoKeDao);
(function(ns) {
    var Dictionary = ns.type.Dictionary;
    var Envelope = ns.protocol.Envelope;
    var Message = ns.protocol.Message;
    var BaseMessage = function(msg) {
        var env;
        if (msg instanceof Envelope) {
            env = msg;
            msg = env.getMap()
        } else {
            env = Message.getEnvelope(msg)
        }
        Dictionary.call(this, msg);
        this.envelope = env;
        this.delegate = null
    };
    ns.Class(BaseMessage, Dictionary, [Message]);
    BaseMessage.prototype.getDelegate = function() {
        return this.delegate
    };
    BaseMessage.prototype.setDelegate = function(delegate) {
        this.delegate = delegate
    };
    BaseMessage.prototype.getEnvelope = function() {
        return this.envelope
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
    ns.BaseMessage = BaseMessage;
    ns.register("BaseMessage")
})(DaoKeDao);
(function(ns) {
    var Message = ns.protocol.Message;
    var InstantMessage = ns.protocol.InstantMessage;
    var SecureMessage = ns.protocol.SecureMessage;
    var BaseMessage = ns.BaseMessage;
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
                throw SyntaxError("message arguments error: " + arguments)
            }
        }
        BaseMessage.call(this, msg);
        this.envelope = head;
        this.content = body
    };
    ns.Class(PlainMessage, BaseMessage, [InstantMessage]);
    PlainMessage.prototype.getContent = function() {
        return this.content
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
        var msg = prepare_data.call(this, password);
        var key = this.delegate.serializeKey(password, this);
        if (!key) {
            return SecureMessage.parse(msg)
        }
        var data = this.delegate.encryptKey(key, this.getReceiver(), this);
        if (!data) {
            return null
        }
        msg["key"] = this.delegate.encodeKey(data, this);
        return SecureMessage.parse(msg)
    };
    var encrypt_group_message = function(password, members) {
        var msg = prepare_data.call(this, password);
        var key = this.delegate.serializeKey(password, this);
        if (!key) {
            return SecureMessage.parse(msg)
        }
        var keys = {};
        var count = 0;
        var member;
        var data;
        for (var i = 0; i < members.length; ++i) {
            member = members[i];
            data = this.delegate.encryptKey(key, member, this);
            if (!data) {
                continue
            }
            keys[member] = this.delegate.encodeKey(data, this);
            ++count
        }
        if (count > 0) {
            msg["keys"] = keys
        }
        return SecureMessage.parse(msg)
    };
    var prepare_data = function(password) {
        var data = this.delegate.serializeContent(this.content, password, this);
        data = this.delegate.encryptContent(data, password, this);
        var base64 = this.delegate.encodeData(data, this);
        var msg = this.copyMap();
        delete msg["content"];
        msg["data"] = base64;
        return msg
    };
    ns.PlainMessage = PlainMessage;
    ns.register("PlainMessage")
})(DaoKeDao);
(function(ns) {
    var map = ns.type.Map;
    var InstantMessage = ns.protocol.InstantMessage;
    var SecureMessage = ns.protocol.SecureMessage;
    var ReliableMessage = ns.protocol.ReliableMessage;
    var BaseMessage = ns.BaseMessage;
    var EncryptedMessage = function(msg) {
        BaseMessage.call(this, msg);
        this.data = null;
        this.encryptedKey = null;
        this.encryptedKeys = null
    };
    ns.Class(EncryptedMessage, BaseMessage, [SecureMessage]);
    EncryptedMessage.prototype.getData = function() {
        if (!this.data) {
            var base64 = this.getValue("data");
            this.data = this.getDelegate().decodeData(base64, this)
        }
        return this.data
    };
    EncryptedMessage.prototype.getEncryptedKey = function() {
        if (!this.encryptedKey) {
            var base64 = this.getValue("key");
            if (!base64) {
                var keys = this.getEncryptedKeys();
                if (keys) {
                    var receiver = this.getReceiver();
                    base64 = keys[receiver.toString()]
                }
            }
            if (base64) {
                this.encryptedKey = this.getDelegate().decodeKey(base64, this)
            }
        }
        return this.encryptedKey
    };
    EncryptedMessage.prototype.getEncryptedKeys = function() {
        if (!this.encryptedKeys) {
            this.encryptedKeys = this.getValue("keys")
        }
        return this.encryptedKeys
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
                throw Error("failed to decrypt key in msg: " + this)
            }
        }
        var password = delegate.deserializeKey(key, sender, receiver, this);
        if (!password) {
            throw Error("failed to get msg key: " + sender + " -> " + receiver + ", " + key)
        }
        var data = this.getData();
        if (!data) {
            throw Error("failed to decode content data: " + this)
        }
        data = delegate.decryptContent(data, password, this);
        if (!data) {
            throw Error("failed to decrypt data with key: " + password)
        }
        var content = delegate.deserializeContent(data, password, this);
        if (!content) {
            throw Error("failed to deserialize content: " + data)
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
    ns.EncryptedMessage = EncryptedMessage;
    ns.register("EncryptedMessage")
})(DaoKeDao);
(function(ns) {
    var SecureMessage = ns.protocol.SecureMessage;
    var ReliableMessage = ns.protocol.ReliableMessage;
    var EncryptedMessage = ns.EncryptedMessage;
    var NetworkMessage = function(msg) {
        EncryptedMessage.call(this, msg);
        this.signature = null;
        this.meta = null;
        this.visa = null
    };
    ns.Class(NetworkMessage, EncryptedMessage, [ReliableMessage]);
    NetworkMessage.prototype.getSignature = function() {
        if (!this.signature) {
            var base64 = this.getValue("signature");
            this.signature = this.getDelegate().decodeSignature(base64, this)
        }
        return this.signature
    };
    NetworkMessage.prototype.setMeta = function(meta) {
        ReliableMessage.setMeta(meta, this.getMap());
        this.meta = meta
    };
    NetworkMessage.prototype.getMeta = function() {
        if (!this.meta) {
            this.meta = ReliableMessage.getMeta(this.getMap())
        }
        return this.meta
    };
    NetworkMessage.prototype.setVisa = function(visa) {
        ReliableMessage.setVisa(visa, this.getMap());
        this.visa = visa
    };
    NetworkMessage.prototype.getVisa = function() {
        if (!this.visa) {
            this.visa = ReliableMessage.getVisa(this.getMap())
        }
        return this.visa
    };
    NetworkMessage.prototype.verify = function() {
        var data = this.getData();
        if (!data) {
            throw Error("failed to decode content data: " + this)
        }
        var signature = this.getSignature();
        if (!signature) {
            throw Error("failed to decode message signature: " + this)
        }
        if (this.getDelegate().verifyDataSignature(data, signature, this.getSender(), this)) {
            var msg = this.copyMap();
            delete msg["signature"];
            return SecureMessage.parse(msg)
        } else {
            return null
        }
    };
    ns.NetworkMessage = NetworkMessage;
    ns.register("NetworkMessage")
})(DaoKeDao);
(function(ns) {
    var Envelope = ns.protocol.Envelope;
    var MessageEnvelope = ns.MessageEnvelope;
    var EnvelopeFactory = function() {};
    ns.Class(EnvelopeFactory, null, [Envelope.Factory]);
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
    ns.EnvelopeFactory = EnvelopeFactory;
    ns.register("EnvelopeFactory")
})(DaoKeDao);
(function(ns) {
    var InstantMessage = ns.protocol.InstantMessage;
    var PlainMessage = ns.PlainMessage;
    var InstantMessageFactory = function() {};
    ns.Class(InstantMessageFactory, null, [InstantMessage.Factory]);
    InstantMessageFactory.prototype.createInstantMessage = function(head, body) {
        return new PlainMessage(head, body)
    };
    InstantMessageFactory.prototype.parseInstantMessage = function(msg) {
        return new PlainMessage(msg)
    };
    InstantMessage.setFactory(new InstantMessageFactory());
    ns.InstantMessageFactory = InstantMessageFactory;
    ns.register("InstantMessageFactory")
})(DaoKeDao);
(function(ns) {
    var SecureMessage = ns.protocol.SecureMessage;
    var EncryptedMessage = ns.EncryptedMessage;
    var SecureMessageFactory = function() {};
    ns.Class(SecureMessageFactory, null, [SecureMessage.Factory]);
    SecureMessageFactory.prototype.parseSecureMessage = function(msg) {
        return new EncryptedMessage(msg)
    };
    SecureMessage.setFactory(new SecureMessageFactory());
    ns.SecureMessageFactory = SecureMessageFactory;
    ns.register("SecureMessageFactory")
})(DaoKeDao);
(function(ns) {
    var ReliableMessage = ns.protocol.ReliableMessage;
    var NetworkMessage = ns.NetworkMessage;
    var ReliableMessageFactory = function() {};
    ns.Class(ReliableMessageFactory, null, [ReliableMessage.Factory]);
    ReliableMessageFactory.prototype.parseReliableMessage = function(msg) {
        return new NetworkMessage(msg)
    };
    ReliableMessage.setFactory(new ReliableMessageFactory());
    ns.ReliableMessageFactory = ReliableMessageFactory;
    ns.register("ReliableMessageFactory")
})(DaoKeDao);
