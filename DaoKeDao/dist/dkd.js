/**
 * DaoKeDao - Message Module (v0.1.0)
 *
 * @author    moKy <albert.moky at gmail.com>
 * @date      Apr. 10, 2020
 * @copyright (c) 2020 Albert Moky
 * @license   {@link https://mit-license.org | MIT License}
 */
if (typeof DaoKeDao !== "object") {
    DaoKeDao = {}
}! function(ns) {
    DIMP.exports(ns);
    if (typeof ns.protocol !== "object") {
        ns.protocol = {}
    }
    DIMP.Namespace(ns.protocol);
    ns.register("protocol")
}(DaoKeDao);
! function(ns) {
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
}(DaoKeDao);
! function(ns) {
    var Dictionary = ns.type.Dictionary;
    var ContentType = ns.protocol.ContentType;
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
    var Content = function(info) {
        if ((typeof info === "number") || info instanceof ContentType) {
            info = {
                "type": info,
                "sn": randomPositiveInteger()
            }
        }
        Dictionary.call(this, info);
        var type = info["type"];
        if (type instanceof ContentType) {
            type = type.valueOf()
        }
        this.type = type;
        this.sn = info["sn"]
    };
    ns.Class(Content, Dictionary, null);
    Content.prototype.getGroup = function() {
        return this.getValue("group")
    };
    Content.prototype.setGroup = function(identifier) {
        this.setValue("group", identifier)
    };
    var content_classes = {};
    Content.register = function(type, clazz) {
        var value;
        if (type instanceof ContentType) {
            value = type.valueOf()
        } else {
            value = type
        }
        content_classes[value] = clazz
    };
    Content.getInstance = function(content) {
        if (!content) {
            return null
        } else {
            if (content instanceof Content) {
                return content
            }
        }
        var type = content["type"];
        if (type instanceof ContentType) {
            type = type.valueOf()
        }
        var clazz = content_classes[type];
        if (typeof clazz === "function") {
            return Content.createInstance(clazz, content)
        }
        return new Content(content)
    };
    Content.createInstance = function(clazz, map) {
        if (typeof clazz.getInstance === "function") {
            return clazz.getInstance(map)
        } else {
            return new clazz(map)
        }
    };
    ns.Content = Content;
    ns.register("Content")
}(DaoKeDao);
! function(ns) {
    var Dictionary = ns.type.Dictionary;
    var ContentType = ns.protocol.ContentType;
    var Envelope = function(env) {
        Dictionary.call(this, env);
        this.sender = env["sender"];
        this.receiver = env["receiver"];
        this.time = env["time"]
    };
    ns.Class(Envelope, Dictionary, null);
    Envelope.prototype.getTime = function() {
        var time = this.time;
        if (time) {
            return new Date(time * 1000)
        } else {
            return null
        }
    };
    Envelope.newEnvelope = function(sender, receiver, time) {
        var env = {
            "sender": sender,
            "receiver": receiver
        };
        if (!time) {
            time = new Date();
            env["time"] = Math.ceil(time.getTime() / 1000)
        } else {
            if (time instanceof Date) {
                env["time"] = Math.ceil(time.getTime() / 1000)
            } else {
                env["time"] = time
            }
        }
        return new Envelope(env)
    };
    Envelope.getInstance = function(env) {
        if (!env) {
            return null
        } else {
            if (env instanceof Envelope) {
                return env
            }
        }
        return new Envelope(env)
    };
    Envelope.prototype.getGroup = function() {
        return this.getValue("group")
    };
    Envelope.prototype.setGroup = function(identifier) {
        this.setValue("group", identifier)
    };
    Envelope.prototype.getType = function() {
        var type = this.getValue("type");
        if (type instanceof ContentType) {
            return type.valueOf()
        } else {
            return type
        }
    };
    Envelope.prototype.setType = function(type) {
        if (type instanceof ContentType) {
            this.setValue("type", type.valueOf())
        } else {
            this.setValue("type", type)
        }
    };
    ns.Envelope = Envelope;
    ns.register("Envelope")
}(DaoKeDao);
! function(ns) {
    var MessageDelegate = function() {};
    ns.Interface(MessageDelegate, null);
    var InstantMessageDelegate = function() {};
    ns.Interface(InstantMessageDelegate, [MessageDelegate]);
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
    var SecureMessageDelegate = function() {};
    ns.Interface(SecureMessageDelegate, [MessageDelegate]);
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
    var ReliableMessageDelegate = function() {};
    ns.Interface(ReliableMessageDelegate, [SecureMessageDelegate]);
    ReliableMessageDelegate.prototype.decodeSignature = function(signature, rMsg) {
        console.assert(false, "implement me!");
        return null
    };
    ReliableMessageDelegate.prototype.verifyDataSignature = function(data, signature, sender, rMsg) {
        console.assert(false, "implement me!");
        return false
    };
    ns.InstantMessageDelegate = InstantMessageDelegate;
    ns.SecureMessageDelegate = SecureMessageDelegate;
    ns.ReliableMessageDelegate = ReliableMessageDelegate;
    ns.register("InstantMessageDelegate");
    ns.register("SecureMessageDelegate");
    ns.register("ReliableMessageDelegate")
}(DaoKeDao);
! function(ns) {
    var Dictionary = ns.type.Dictionary;
    var Envelope = ns.Envelope;
    var Message = function(msg) {
        Dictionary.call(this, msg);
        this.envelope = Envelope.getInstance(msg);
        this.delegate = null
    };
    ns.Class(Message, Dictionary, null);
    Message.getInstance = function(msg) {
        if (!msg) {
            return null
        }
        if (msg.hasOwnProperty("content")) {
            return ns.InstantMessage.getInstance(msg)
        }
        if (msg.hasOwnProperty("signature")) {
            return ns.ReliableMessage.getInstance(msg)
        }
        if (msg.hasOwnProperty("data")) {
            return ns.SecureMessage.getInstance(msg)
        }
        if (msg instanceof Message) {
            return msg
        }
        return new Message(msg)
    };
    ns.Message = Message;
    ns.register("Message")
}(DaoKeDao);
! function(ns) {
    var Envelope = ns.Envelope;
    var Content = ns.Content;
    var Message = ns.Message;
    var InstantMessage = function(msg) {
        Message.call(this, msg);
        this.content = Content.getInstance(msg["content"])
    };
    ns.Class(InstantMessage, Message, null);
    InstantMessage.newMessage = function(content, heads) {
        var msg;
        var count = arguments.length;
        if (count === 2) {
            var env = Envelope.getInstance(heads);
            msg = env.getMap(true)
        } else {
            if (count === 3 || count === 4) {
                var sender = arguments[1];
                var receiver = arguments[2];
                var time = (count === 4) ? arguments[3] : 0;
                msg = {
                    "sender": sender,
                    "receiver": receiver,
                    "time": time
                }
            } else {
                throw Error("instant message arguments error: " + arguments)
            }
        }
        msg["content"] = content;
        return new InstantMessage(msg)
    };
    InstantMessage.getInstance = function(msg) {
        if (!msg) {
            return null
        }
        if (msg instanceof InstantMessage) {
            return msg
        }
        return new InstantMessage(msg)
    };
    InstantMessage.prototype.encrypt = function(password, members) {
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
            return new ns.SecureMessage(msg)
        }
        var receiver = this.envelope.receiver;
        var data = this.delegate.encryptKey(key, receiver, this);
        if (!data) {
            return null
        }
        msg["key"] = this.delegate.encodeKey(data, this);
        return new ns.SecureMessage(msg)
    };
    var encrypt_group_message = function(password, members) {
        var msg = prepare_data.call(this, password);
        var key = this.delegate.serializeKey(password, this);
        if (!key) {
            return new ns.SecureMessage(msg)
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
        return new ns.SecureMessage(msg)
    };
    var prepare_data = function(password) {
        var data = this.delegate.serializeContent(this.content, password, this);
        data = this.delegate.encryptContent(data, password, this);
        var base64 = this.delegate.encodeData(data, this);
        var msg = this.getMap(true);
        delete msg["content"];
        msg["data"] = base64;
        return msg
    };
    ns.InstantMessage = InstantMessage;
    ns.register("InstantMessage")
}(DaoKeDao);
! function(ns) {
    var Message = ns.Message;
    var SecureMessage = function(msg) {
        Message.call(this, msg)
    };
    ns.Class(SecureMessage, Message, null);
    SecureMessage.prototype.getData = function() {
        var base64 = this.getValue("data");
        return this.delegate.decodeData(base64, this)
    };
    SecureMessage.prototype.getKey = function() {
        var base64 = this.getValue("key");
        if (!base64) {
            var keys = this.getKeys();
            if (keys) {
                base64 = keys[this.envelope.receiver]
            }
        }
        if (base64) {
            return this.delegate.decodeKey(base64, this)
        } else {
            return null
        }
    };
    SecureMessage.prototype.getKeys = function() {
        return this.getValue("keys")
    };
    SecureMessage.getInstance = function(msg) {
        if (!msg) {
            return null
        }
        if (msg.hasOwnProperty("signature")) {
            return ns.ReliableMessage.getInstance(msg)
        }
        if (msg instanceof SecureMessage) {
            return msg
        }
        return new SecureMessage(msg)
    };
    SecureMessage.prototype.decrypt = function() {
        var sender = this.envelope.sender;
        var receiver;
        var group = this.envelope.getGroup();
        if (group) {
            receiver = group
        } else {
            receiver = this.envelope.receiver
        }
        var key = this.getKey();
        if (key) {
            key = this.delegate.decryptKey(key, sender, receiver, this);
            if (!key) {
                throw Error("failed to decrypt key in msg: " + this)
            }
        }
        var password = this.delegate.deserializeKey(key, sender, receiver, this);
        if (!password) {
            throw Error("failed to get msg key: " + sender + " -> " + receiver + ", " + key)
        }
        var data = this.getData();
        if (!data) {
            throw Error("failed to decode content data: " + this)
        }
        data = this.delegate.decryptContent(data, password, this);
        if (!data) {
            throw Error("failed to decrypt data with key: " + password)
        }
        var content = this.delegate.deserializeContent(data, password, this);
        if (!content) {
            throw Error("failed to deserialize content: " + data)
        }
        var msg = this.getMap(true);
        delete msg["key"];
        delete msg["keys"];
        delete msg["data"];
        msg["content"] = content;
        return new ns.InstantMessage(msg)
    };
    SecureMessage.prototype.sign = function() {
        var sender = this.envelope.sender;
        var signature = this.delegate.signData(this.getData(), sender, this);
        var base64 = this.delegate.encodeSignature(signature, this);
        var msg = this.getMap(true);
        msg["signature"] = base64;
        return new ns.ReliableMessage(msg)
    };
    SecureMessage.prototype.split = function(members) {
        var reliable = this instanceof ns.ReliableMessage;
        var keys = this.getKeys();
        var group = this.envelope.receiver;
        var messages = [];
        var msg;
        var receiver;
        for (var i = 0; i < members.length; ++i) {
            receiver = members[i];
            msg = this.getMap(true);
            msg["receiver"] = receiver;
            msg["group"] = group;
            if (keys) {
                delete msg["keys"];
                msg["key"] = keys[receiver]
            }
            if (reliable) {
                messages.push(new ns.ReliableMessage(msg))
            } else {
                messages.push(new SecureMessage(msg))
            }
        }
        return messages
    };
    SecureMessage.prototype.trim = function(member) {
        var msg = this.getMap(true);
        msg["receiver"] = member;
        var keys = this.getKeys();
        if (keys) {
            var base64 = keys[member];
            if (base64) {
                msg["key"] = base64
            }
            delete msg["keys"]
        }
        var group = this.envelope.getGroup();
        if (!group) {
            msg["group"] = this.envelope.receiver
        }
        var reliable = this instanceof ns.ReliableMessage;
        if (reliable) {
            return new ns.ReliableMessage(msg)
        } else {
            return new SecureMessage(msg)
        }
    };
    ns.SecureMessage = SecureMessage;
    ns.register("SecureMessage")
}(DaoKeDao);
! function(ns) {
    var SecureMessage = ns.SecureMessage;
    var ReliableMessage = function(msg) {
        SecureMessage.call(this, msg)
    };
    ns.Class(ReliableMessage, SecureMessage, null);
    ReliableMessage.prototype.getSignature = function() {
        var base64 = this.getValue("signature");
        return this.delegate.decodeSignature(base64, this)
    };
    ReliableMessage.prototype.setMeta = function(meta) {
        this.setValue("meta", meta)
    };
    ReliableMessage.prototype.getMeta = function() {
        return this.getValue("meta")
    };
    ReliableMessage.getInstance = function(msg) {
        if (!msg) {
            return null
        }
        if (msg instanceof ReliableMessage) {
            return msg
        }
        return new ReliableMessage(msg)
    };
    ReliableMessage.prototype.verify = function() {
        var sender = this.envelope.sender;
        var data = this.getData();
        if (!data) {
            throw Error("failed to decode content data: " + this)
        }
        var signature = this.getSignature();
        if (!signature) {
            throw Error("failed to decode message signature: " + this)
        }
        if (this.delegate.verifyDataSignature(data, signature, sender, this)) {
            var msg = this.getMap(true);
            delete msg["signature"];
            return new SecureMessage(msg)
        } else {
            return null
        }
    };
    ns.ReliableMessage = ReliableMessage;
    ns.register("ReliableMessage")
}(DaoKeDao);
! function(ns) {
    var ContentType = ns.protocol.ContentType;
    var Content = ns.Content;
    var Message = ns.Message;
    var ForwardContent = function(info) {
        var secret = null;
        if (!info) {
            info = ContentType.FORWARD
        } else {
            if (info instanceof Message) {
                secret = info;
                info = ContentType.FORWARD
            }
        }
        Content.call(this, info);
        if (secret) {
            this.setMessage(secret)
        } else {
            if (info.hasOwnProperty("forward")) {
                this.getMessage()
            } else {
                this.forward = null
            }
        }
    };
    ns.Class(ForwardContent, Content, null);
    ForwardContent.prototype.getMessage = function() {
        if (!this.forward) {
            var forward = this.getValue("forward");
            this.forward = Message.getInstance(forward)
        }
        return this.forward
    };
    ForwardContent.prototype.setMessage = function(secret) {
        this.setValue("forward", secret);
        this.forward = secret
    };
    Content.register(ContentType.FORWARD, ForwardContent);
    ns.protocol.ForwardContent = ForwardContent;
    ns.protocol.register("ForwardContent")
}(DaoKeDao);
