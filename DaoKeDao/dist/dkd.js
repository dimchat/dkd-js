/**
 * DaoKeDao - Message Module (v2.0.0)
 *
 * @author    moKy <albert.moky at gmail.com>
 * @date      Aug. 17, 2025
 * @copyright (c) 2020-2025 Albert Moky
 * @license   {@link https://mit-license.org | MIT License}
 */;
if (typeof DaoKeDao !== 'object') {
    DaoKeDao = {}
}
(function (dkd, mk) {
    'use strict';
    if (typeof dkd.protocol !== 'object') {
        dkd.protocol = {}
    }
    if (typeof dkd.ext !== 'object') {
        dkd.ext = {}
    }
    var Interface = mk.type.Interface;
    var Mapper = mk.type.Mapper;
    'use strict';
    dkd.protocol.Content = Interface(null, [Mapper]);
    var Content = dkd.protocol.Content;
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
    Content.convert = function (array) {
        var contents = [];
        var msg;
        for (var i = 0; i < array.length; ++i) {
            msg = Content.parse(array[i]);
            if (msg) {
                contents.push(msg)
            }
        }
        return contents
    };
    Content.revert = function (contents) {
        var array = [];
        var msg;
        for (var i = 0; i < contents.length; ++i) {
            msg = contents[i];
            if (Interface.conforms(msg, Mapper)) {
                array.push(msg.toMap())
            } else {
                array.push(msg)
            }
        }
        return array
    };
    Content.parse = function (content) {
        var helper = MessageExtensions.getContentHelper();
        return helper.parseContent(content)
    };
    Content.setFactory = function (type, factory) {
        var helper = MessageExtensions.getContentHelper();
        helper.setContentFactory(type, factory)
    };
    Content.getFactory = function (type) {
        var helper = MessageExtensions.getContentHelper();
        return helper.getContentFactory(type)
    };
    Content.Factory = Interface(null, null);
    var ContentFactory = Content.Factory;
    ContentFactory.prototype.parseContent = function (content) {
    };
    'use strict';
    dkd.protocol.Envelope = Interface(null, [Mapper]);
    var Envelope = dkd.protocol.Envelope;
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
    Envelope.create = function (from, to, when) {
        var helper = MessageExtensions.getEnvelopeHelper();
        return helper.createEnvelope(from, to, when)
    };
    Envelope.parse = function (env) {
        var helper = MessageExtensions.getEnvelopeHelper();
        return helper.parseEnvelope(env)
    };
    Envelope.getFactory = function () {
        var helper = MessageExtensions.getEnvelopeHelper();
        return helper.getEnvelopeFactory()
    };
    Envelope.setFactory = function (factory) {
        var helper = MessageExtensions.getEnvelopeHelper();
        helper.setEnvelopeFactory(factory)
    };
    Envelope.Factory = Interface(null, null);
    var EnvelopeFactory = Envelope.Factory;
    EnvelopeFactory.prototype.createEnvelope = function (from, to, when) {
    };
    EnvelopeFactory.prototype.parseEnvelope = function (env) {
    };
    'use strict';
    dkd.protocol.Message = Interface(null, [Mapper]);
    var Message = dkd.protocol.Message;
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
    'use strict';
    dkd.protocol.InstantMessage = Interface(null, [Message]);
    var InstantMessage = dkd.protocol.InstantMessage;
    InstantMessage.prototype.getContent = function () {
    };
    InstantMessage.convert = function (array) {
        var messages = [];
        var msg;
        for (var i = 0; i < array.length; ++i) {
            msg = InstantMessage.parse(array[i]);
            if (msg) {
                messages.push(msg)
            }
        }
        return messages
    };
    InstantMessage.revert = function (messages) {
        var array = [];
        var msg;
        for (var i = 0; i < messages.length; ++i) {
            msg = messages[i];
            if (Interface.conforms(msg, Mapper)) {
                array.push(msg.toMap())
            } else {
                array.push(msg)
            }
        }
        return array
    };
    InstantMessage.generateSerialNumber = function (type, now) {
        var helper = MessageExtensions.getInstantHelper();
        return helper.generateSerialNumber(type, now)
    };
    InstantMessage.create = function (head, body) {
        var helper = MessageExtensions.getInstantHelper();
        return helper.createInstantMessage(head, body)
    };
    InstantMessage.parse = function (msg) {
        var helper = MessageExtensions.getInstantHelper();
        return helper.parseInstantMessage(msg)
    };
    InstantMessage.getFactory = function () {
        var helper = MessageExtensions.getInstantHelper();
        return helper.getInstantMessageFactory()
    };
    InstantMessage.setFactory = function (factory) {
        var helper = MessageExtensions.getInstantHelper();
        helper.setInstantMessageFactory(factory)
    };
    InstantMessage.Factory = Interface(null, null);
    var InstantMessageFactory = InstantMessage.Factory;
    InstantMessageFactory.prototype.generateSerialNumber = function (msgType, now) {
    };
    InstantMessageFactory.prototype.createInstantMessage = function (head, body) {
    };
    InstantMessageFactory.prototype.parseInstantMessage = function (msg) {
    };
    'use strict';
    dkd.protocol.SecureMessage = Interface(null, [Message]);
    var SecureMessage = dkd.protocol.SecureMessage;
    SecureMessage.prototype.getData = function () {
    };
    SecureMessage.prototype.getEncryptedKey = function () {
    };
    SecureMessage.prototype.getEncryptedKeys = function () {
    };
    SecureMessage.parse = function (msg) {
        var helper = MessageExtensions.getSecureHelper();
        return helper.parseSecureMessage(msg)
    };
    SecureMessage.getFactory = function () {
        var helper = MessageExtensions.getSecureHelper();
        return helper.getSecureMessageFactory()
    };
    SecureMessage.setFactory = function (factory) {
        var helper = MessageExtensions.getSecureHelper();
        helper.setSecureMessageFactory(factory)
    };
    SecureMessage.Factory = Interface(null, null);
    var SecureMessageFactory = SecureMessage.Factory;
    SecureMessageFactory.prototype.parseSecureMessage = function (msg) {
    };
    'use strict';
    dkd.protocol.ReliableMessage = Interface(null, [SecureMessage]);
    var ReliableMessage = dkd.protocol.ReliableMessage;
    ReliableMessage.prototype.getSignature = function () {
    };
    ReliableMessage.convert = function (array) {
        var messages = [];
        var msg;
        for (var i = 0; i < array.length; ++i) {
            msg = ReliableMessage.parse(array[i]);
            if (msg) {
                messages.push(msg)
            }
        }
        return messages
    };
    ReliableMessage.revert = function (messages) {
        var array = [];
        var msg;
        for (var i = 0; i < messages.length; ++i) {
            msg = messages[i];
            if (Interface.conforms(msg, Mapper)) {
                array.push(msg.toMap())
            } else {
                array.push(msg)
            }
        }
        return array
    };
    ReliableMessage.parse = function (msg) {
        var helper = MessageExtensions.getReliableHelper();
        return helper.parseReliableMessage(msg)
    };
    ReliableMessage.getFactory = function () {
        var helper = MessageExtensions.getReliableHelper();
        return helper.getReliableMessageFactory()
    };
    ReliableMessage.setFactory = function (factory) {
        var helper = MessageExtensions.getReliableHelper();
        helper.setReliableMessageFactory(factory)
    };
    ReliableMessage.Factory = Interface(null, null);
    var ReliableMessageFactory = ReliableMessage.Factory;
    ReliableMessageFactory.prototype.parseReliableMessage = function (msg) {
    };
    'use strict';
    dkd.ext.ContentHelper = Interface(null, null);
    var ContentHelper = dkd.ext.ContentHelper;
    ContentHelper.prototype = {
        setContentFactory: function (msg_type, factory) {
        }, getContentFactory: function (msg_type) {
        }, parseContent: function (content) {
        }
    };
    dkd.ext.EnvelopeHelper = Interface(null, null);
    var EnvelopeHelper = dkd.ext.EnvelopeHelper;
    EnvelopeHelper.prototype = {
        setEnvelopeFactory: function (factory) {
        }, getEnvelopeFactory: function () {
        }, createEnvelope: function (sender, receiver, time) {
        }, parseEnvelope: function (env) {
        }
    };
    dkd.ext.InstantMessageHelper = Interface(null, null);
    var InstantMessageHelper = dkd.ext.InstantMessageHelper;
    InstantMessageHelper.prototype = {
        setInstantMessageFactory: function (factory) {
        }, getInstantMessageFactory: function () {
        }, createInstantMessage: function (head, body) {
        }, parseInstantMessage: function (msg) {
        }, generateSerialNumber: function (msg_type, when) {
        }
    };
    dkd.ext.SecureMessageHelper = Interface(null, null);
    var SecureMessageHelper = dkd.ext.SecureMessageHelper;
    SecureMessageHelper.prototype = {
        setSecureMessageFactory: function (factory) {
        }, getSecureMessageFactory: function () {
        }, parseSecureMessage: function (msg) {
        }
    };
    dkd.ext.ReliableMessageHelper = Interface(null, null);
    var ReliableMessageHelper = dkd.ext.ReliableMessageHelper;
    ReliableMessageHelper.prototype = {
        setReliableMessageFactory: function (factory) {
        }, getReliableMessageFactory: function () {
        }, parseReliableMessage: function (msg) {
        }
    };
    dkd.ext.MessageExtensions = {
        setContentHelper: function (helper) {
            contentHelper = helper
        }, getContentHelper: function () {
            return contentHelper
        }, setEnvelopeHelper: function (helper) {
            envelopeHelper = helper
        }, getEnvelopeHelper: function () {
            return envelopeHelper
        }, setInstantHelper: function (helper) {
            instantHelper = helper
        }, getInstantHelper: function () {
            return instantHelper
        }, setSecureHelper: function (helper) {
            secureHelper = helper
        }, getSecureHelper: function () {
            return secureHelper
        }, setReliableHelper: function (helper) {
            reliableHelper = helper
        }, getReliableHelper: function () {
            return reliableHelper
        }
    };
    var MessageExtensions = dkd.ext.MessageExtensions;
    var contentHelper = null;
    var envelopeHelper = null;
    var instantHelper = null;
    var secureHelper = null;
    var reliableHelper = null;
    'use strict';
    dkd.ext.GeneralMessageHelper = Interface(null, null);
    var GeneralMessageHelper = dkd.ext.GeneralMessageHelper;
    GeneralMessageHelper.prototype = {
        getContentType: function (content, defaultValue) {
        }
    };
    dkd.ext.SharedMessageExtensions = {
        setContentHelper: function (helper) {
            MessageExtensions.setContentHelper(helper)
        }, getContentHelper: function () {
            return MessageExtensions.getContentHelper()
        }, setEnvelopeHelper: function (helper) {
            MessageExtensions.setEnvelopeHelper(helper)
        }, getEnvelopeHelper: function () {
            return MessageExtensions.getEnvelopeHelper()
        }, setInstantHelper: function (helper) {
            MessageExtensions.setInstantHelper(helper)
        }, getInstantHelper: function () {
            return MessageExtensions.getInstantHelper()
        }, setSecureHelper: function (helper) {
            MessageExtensions.setSecureHelper(helper)
        }, getSecureHelper: function () {
            return MessageExtensions.getSecureHelper()
        }, setReliableHelper: function (helper) {
            MessageExtensions.setReliableHelper(helper)
        }, getReliableHelper: function () {
            return MessageExtensions.getReliableHelper()
        }, setHelper: function (helper) {
            generalMessageHelper = helper
        }, getHelper: function () {
            return generalMessageHelper
        }
    };
    var SharedMessageExtensions = dkd.ext.SharedMessageExtensions;
    var generalMessageHelper = null
})(DaoKeDao, MONKEY);
