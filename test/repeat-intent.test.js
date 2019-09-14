'use strict';
const { App, Util } = require('jovo-framework');
const { GoogleAssistant } = require('jovo-platform-googleassistant');
const { Alexa } = require('jovo-platform-alexa');

const googleAssistant = new GoogleAssistant();
const testSuite = googleAssistant.makeTestSuite();

describe(`User Repeats Phrases` , () => {
  it('should tell the user that the line was not correct, when they say the line', async () => {
    const conversation = testSuite.conversation({ locale: 'keys-only' });
    let request;
    let response;

    request = await testSuite.requestBuilder.intent(`Default Fallback Intent`);
    response = await conversation.send(request);
    expect(response.getSpeech()).toBe(`that-line-was-not-correct`);

  });

  it('should tell the user what the correct line was, and to repeat the line, when the user says a line', async () => {
    const conversation = testSuite.conversation({ locale: 'keys-only' });
    const lines = [
      {
        line: `This is line 0`,
      },
      {
        line: `This is line 1`,
      },
    ];

    const request = await testSuite.requestBuilder.intent(`Default Fallback Intent`);
    request.addSessionData("lines", lines);
    request.addSessionData("lineIndex", 0);
    request.addSessionData("repeatCount", 0);

    const response = await conversation.send(request);

    expect(response.getSpeech()).toBe(
      [
        `that-line-was-not-correct`,
        `the-correct-line-was`,
        `<break time="500ms"/>`,
        lines[0].line,
        `<break time="500ms"/>`,
        `please-repeat-the-line`
      ].join(` `)
    );

  });
});

