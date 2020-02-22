;

//
//  Test Cases
//
dkd_tests = [];

!function (ns) {
    'use strict';

    var ContentType = ns.protocol.ContentType;

    var Envelope = ns.Envelope;
    var Content = ns.Content;
    var InstantMessage = ns.InstantMessage;

    var envelope, content, message;

    var test_envelope = function () {
        envelope = Envelope.newEnvelope('moky', 'hulk');
        log('envelope: ', envelope);
        assert(envelope.sender === 'moky', 'failed to create envelope');
    };
    dkd_tests.push(test_envelope);

    var test_content = function () {
        content = new Content(ContentType.TEXT);
        content.setValue('text', 'Hello world!');
        log('content: ', content);
        assert(ContentType.TEXT.equals(content.type) === true, 'failed to create content');
    };
    dkd_tests.push(test_content);

    var test_message = function () {
        message = InstantMessage.newMessage(content, envelope);
        log('message: ', message);
        assert(message.content === content, 'message.content error');
    };
    dkd_tests.push(test_message);

}(DaoKeDao);

!function (ns) {
    'use strict';

}(DaoKeDao);
