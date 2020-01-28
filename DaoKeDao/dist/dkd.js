/**
 * DaoKeDao - Message Module (v0.1.0)
 *
 * @author    moKy <albert.moky at gmail.com>
 * @date      Jan. 28, 2020
 * @copyright (c) 2020 Albert Moky
 * @license   {@link https://mit-license.org | MIT License}
 */
! function(ns) {
    var ContentType = ns.type.Enum({
        UNKNOWN: (0),
        TEXT: (1),
        FILE: (16),
        IMAGE: (18),
        AUDIO: (20),
        VIDEO: (22),
        PAGE: (32),
        QUOTE: (55),
        MONEY: (64),
        COMMAND: (136),
        HISTORY: (137),
        FORWARD: (255),
    });
    if (typeof ns.protocol !== "object") {
        ns.protocol = {}
    }
    ns.protocol.ContentType = ContentType
}(DIMP);
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
                "sn": randomPositiveInteger(),
            }
        }
        Dictionary.call(this, info);
        this.type = new ContentType(info["type"]);
        this.sn = info["sn"]
    };
    Content.inherits(Dictionary);
    Content.prototype.getGroup = function() {
        return this.getValue("group")
    };
    Content.prototype.setGroup = function(identifier) {
        this.setValue("group", identifier)
    };
    var content_classes = {};
    Content.register = function(type, clazz) {
        content_classes[type] = clazz
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
    ns.Content = Content
}(DIMP);
! function(ns) {
    var Dictionary = ns.type.Dictionary;
    var ContentType = ns.protocol.ContentType;
    var Envelope = function(env) {
        Dictionary.call(this, env);
        this.sender = env["sender"];
        this.receiver = env["receiver"];
        this.time = env["time"]
    };
    Envelope.inherits(Dictionary);
    Envelope.newEnvelope = function(sender, receiver, time) {
        var env = {
            "sender": sender,
            "receiver": receiver,
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
        if (type) {
            return new ContentType(type)
        } else {
            return null
        }
    };
    Envelope.prototype.setType = function(type) {
        this.setValue("type", type)
    };
    ns.Envelope = Envelope
}(DIMP);
! function(ns) {
    var MessageDelegate = function() {};
    var InstantMessageDelegate = function() {};
    InstantMessageDelegate.inherits(MessageDelegate);
    InstantMessageDelegate.prototype.encryptContent = function(content, pwd, msg) {
        console.assert(content !== null, "content empty");
        console.assert(pwd !== null, "key empty");
        console.assert(msg !== null, "msg empty");
        console.assert(false, "implement me!");
        return null
    };
    InstantMessageDelegate.prototype.encodeData = function(data, msg) {
        console.assert(data !== null, "msg data empty");
        console.assert(msg !== null, "msg empty");
        console.assert(false, "implement me!");
        return null
    };
    InstantMessageDelegate.prototype.encryptKey = function(pwd, receiver, msg) {
        console.assert(pwd !== null, "key empty");
        console.assert(receiver !== null, "receiver empty");
        console.assert(msg !== null, "msg empty");
        console.assert(false, "implement me!");
        return null
    };
    InstantMessageDelegate.prototype.encodeKey = function(key, msg) {
        console.assert(key !== null, "key data empty");
        console.assert(msg !== null, "msg empty");
        console.assert(false, "implement me!");
        return null
    };
    var SecureMessageDelegate = function() {};
    SecureMessageDelegate.inherits(MessageDelegate);
    SecureMessageDelegate.prototype.decodeKey = function(key, msg) {
        console.assert(key !== null, "key string empty");
        console.assert(msg !== null, "secure message empty");
        console.assert(false, "implement me!");
        return null
    };
    SecureMessageDelegate.prototype.decryptKey = function(key, sender, receiver, msg) {
        console.assert(key !== null, "key data empty");
        console.assert(sender !== null, "sender empty");
        console.assert(receiver !== null, "receiver empty");
        console.assert(msg !== null, "msg empty");
        console.assert(false, "implement me!");
        return null
    };
    SecureMessageDelegate.prototype.decodeData = function(data, msg) {
        console.assert(data !== null, "msg data empty");
        console.assert(msg !== null, "msg empty");
        console.assert(false, "implement me!");
        return null
    };
    SecureMessageDelegate.prototype.decryptContent = function(data, pwd, msg) {
        console.assert(data !== null, "msg data empty");
        console.assert(pwd !== null, "key empty");
        console.assert(msg !== null, "msg empty");
        console.assert(false, "implement me!");
        return null
    };
    SecureMessageDelegate.prototype.signData = function(data, sender, msg) {
        console.assert(data !== null, "msg data empty");
        console.assert(sender !== null, "sender empty");
        console.assert(msg !== null, "msg empty");
        console.assert(false, "implement me!");
        return null
    };
    SecureMessageDelegate.prototype.encodeSignature = function(signature, msg) {
        console.assert(signature !== null, "msg signature empty");
        console.assert(msg !== null, "msg empty");
        console.assert(false, "implement me!");
        return null
    };
    var ReliableMessageDelegate = function() {};
    ReliableMessageDelegate.inherits(SecureMessageDelegate);
    ReliableMessageDelegate.prototype.decodeSignature = function(signature, msg) {
        console.assert(msg !== null, "msg empty");
        console.assert(msg !== null, "msg empty");
        console.assert(false, "implement me!");
        return null
    };
    ReliableMessageDelegate.prototype.verifyDataSignature = function(data, signature, sender, msg) {
        console.assert(msg !== null, "msg empty");
        console.assert(msg !== null, "msg empty");
        console.assert(msg !== null, "msg empty");
        console.assert(msg !== null, "msg empty");
        console.assert(false, "implement me!");
        return false
    };
    ns.InstantMessageDelegate = InstantMessageDelegate;
    ns.SecureMessageDelegate = SecureMessageDelegate;
    ns.ReliableMessageDelegate = ReliableMessageDelegate
}(DIMP);
! function(ns) {
    var Dictionary = ns.type.Dictionary;
    var Envelope = ns.Envelope;
    var Message = function(msg) {
        Dictionary.call(this, msg);
        this.envelope = Envelope.getInstance(msg);
        this.delegate = null
    };
    Message.inherits(Dictionary);
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
    ns.Message = Message
}(DIMP);
! function(ns) {
    var Envelope = ns.Envelope;
    var Content = ns.Content;
    var Message = ns.Message;
    var SecureMessage = ns.SecureMessage;
    var InstantMessage = function(msg) {
        Message.call(this, msg);
        this.content = Content.getInstance(msg["content"])
    };
    InstantMessage.inherits(Message);
    InstantMessage.newMessage = function(content, sender, receiver, time) {
        var env = Envelope.newEnvelope(sender, receiver, time);
        var msg = env.getMap();
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
        var msg = this.getMap(true);
        var data = this.delegate.encryptContent(this.content, password, this);
        msg["data"] = this.delegate.encodeData(data, this);
        msg["content"] = null;
        var key;
        if (members && members.length > 0) {
            var keys = {};
            var member;
            for (var i = 0; i < members.length; ++i) {
                member = members[i];
                key = this.delegate.encryptKey(password, member, this);
                if (key) {
                    keys[member] = this.delegate.encodeKey(key, this)
                }
            }
            if (keys.length > 0) {
                msg["keys"] = keys
            }
            msg["group"] = this.content.getGroup()
        } else {
            var receiver = this.envelope.receiver;
            key = this.delegate.encryptKey(password, receiver, this);
            if (key) {
                msg["key"] = this.delegate.encodeKey(key, this)
            }
        }
        return new SecureMessage(msg)
    };
    ns.InstantMessage = InstantMessage
}(DIMP);
! function(ns) {
    var Message = ns.Message;
    var SecureMessage = function(msg) {
        Message.call(this, msg)
    };
    SecureMessage.inherits(Message);
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
        var receiver = this.envelope.receiver;
        var group = this.envelope.getGroup();
        var key = this.getKey();
        var password;
        if (group) {
            password = this.delegate.decryptKey(key, sender, group, this)
        } else {
            password = this.delegate.decryptKey(key, sender, receiver, this)
        }
        var data = this.getData();
        var content = this.delegate.decryptContent(data, password, this);
        if (!content) {
            throw Error("failed to decrypt message data: " + this)
        }
        var msg = this.getMap(true);
        msg["key"] = null;
        msg["keys"] = null;
        msg["data"] = null;
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
                msg["keys"] = null;
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
            msg["keys"] = null
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
    ns.SecureMessage = SecureMessage
}(DIMP);
! function(ns) {
    var SecureMessage = ns.SecureMessage;
    var ReliableMessage = function(msg) {
        SecureMessage.call(this, msg)
    };
    ReliableMessage.inherits(SecureMessage);
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
    SecureMessage.prototype.verify = function() {
        var sender = this.envelope.sender;
        var data = this.getData();
        var signature = this.getSignature();
        if (this.delegate.verifyDataSignature(data, signature, sender, this)) {
            var msg = this.getMap(true);
            msg["signature"] = null;
            return new SecureMessage(msg)
        } else {
            return null
        }
    };
    ns.ReliableMessage = ReliableMessage
}(DIMP);
! function(ns) {
    var ContentType = ns.protocol.ContentType;
    var Content = ns.Content;
    var Message = ns.Message;
    var ForwardContent = function(content) {
        var forward;
        if (content instanceof Message) {
            Content.call(this, ContentType.FORWARD);
            forward = content;
            this.setValue("forward", forward)
        } else {
            Content.call(this, content);
            forward = Message.getInstance(content["forward"])
        }
        this.forword = forward
    };
    ForwardContent.inherits(Content);
    Content.register(ContentType.FORWARD, ForwardContent);
    ns.protocol.ForwardContent = ForwardContent
}(DIMP);
