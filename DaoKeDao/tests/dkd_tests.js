;

//
//  Test Cases
//
dkd_tests = [];

!function (ns) {
    'use strict';

    var Class          = ns.type.Class;
    var Dictionary     = ns.type.Dictionary;

    var Content = ns.protocol.Content;

    var BaseContent = function (content) {
        Dictionary.call(this, content);
    };
    Class(BaseContent, Dictionary, [Content], null);

    BaseContent.prototype.getType = function () {
        var man = ns.dkd.MessageFactoryManager;
        return  man.generalFactory.getContentType(this.toMap(), 0);
    };

    BaseContent.fromType = function (type) {
        var info = {
            'type': type.valueOf()
        };
        return new BaseContent(info);
    };

    //-------- namespace --------
    ns.dkd.BaseContent = BaseContent;

}(DaoKeDao);

!function (ns) {
    'use strict';

    var ContentType = ns.protocol.ContentType;

    var Envelope = ns.protocol.Envelope;
    var InstantMessage = ns.protocol.InstantMessage;
    var BaseContent = ns.dkd.BaseContent;

    var envelope, content, message;

    var test_envelope = function () {
        envelope = Envelope.create('moky', 'hulk', null);
        log('envelope: ', envelope);
        assert(envelope.getSender() === 'moky', 'failed to create envelope');
    };
    dkd_tests.push(test_envelope);

    var test_content = function () {
        content = BaseContent.fromType(ContentType.TEXT);
        content.setValue('text', 'Hello world!');
        log('content: ', content);
        assert(ContentType.TEXT.equals(content.getType()) === true, 'failed to create content');
    };
    dkd_tests.push(test_content);

    var test_message = function () {
        message = InstantMessage.create(envelope, content);
        log('message: ', message);
        assert(message.getContent() === content, 'message.content error');
    };
    dkd_tests.push(test_message);

}(DaoKeDao);
