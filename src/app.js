'use strict';

// ------------------------------------------------------------------
// APP INITIALIZATION
// ------------------------------------------------------------------

const { App } = require('jovo-framework');
const { Alexa } = require('jovo-platform-alexa');
const { GoogleAssistant } = require('jovo-platform-googleassistant');
const { JovoDebugger } = require('jovo-plugin-debugger');
const { FileDb } = require('jovo-db-filedb');
const { GoogleSheetsCMS } = require('jovo-cms-googlesheets');

const app = new App();

app.use(
  new Alexa(),
  new GoogleAssistant(),
  new JovoDebugger(),
  new FileDb(),
  new GoogleSheetsCMS()
);


// ------------------------------------------------------------------
// APP LOGIC
// ------------------------------------------------------------------

function getNextLineAndAskItOrEndSession() {
  if (this.$session.$data.lineIndex in this.$session.$data.lines) {
    const line = this.$session.$data.lines[this.$session.$data.lineIndex].line;
    this.ask(line, line);
  } else {
    const speech = `Il n'y a plus de répliques, au revoir!`;
    this.tell(speech);
  }
}

app.setHandler({
  LAUNCH() {
    this.$session.$data.lineIndex = 0;
    if (this.$cms.lines) {
      this.$session.$data.lines = this.$cms.lines;
    } else {
      this.$session.$data.lines = [];
    }
    this.$session.$data.repeatCount = 0;

    this.$speech.addT(`welcome`)
      .addT(`please-say-the-first-line`);

    this.ask(this.$speech);
  },
  Unhandled() {

    if (this.$session.$data.lineIndex in this.$session.$data.lines) {
      const currentLineText = this.$session.$data.lines[this.$session.$data.lineIndex].line;
      this.$speech.addText(currentLineText);
      this.$session.$data.lineIndex++;
      this.ask(this.$speech);
    } else {
      this.$speech.addT(`there-are-no-more-lines`)
        .addT(`goodbye`);
      this.tell(this.$speech);
    }

  },
  ExitIntent() {
    this.$speech.addT(`goodbye`);
    this.tell(this.$speech);
  },
  RepeatIntent() {
    this.$speech.addT(`ok-ill-repeat`);
    this.$session.$data.lineIndex--;

    this.ask(this.$speech);
  },
});

module.exports.app = app;
