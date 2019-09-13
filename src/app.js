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
  if (this.$session.$data.lineIndex in this.$cms.lines) {
    const line = this.$cms.lines[this.$session.$data.lineIndex].line;
    this.ask(line, line);
  } else {
    const speech = `Il n'y a plus de répliques, au revoir!`;
    this.tell(speech);
  }
}

app.setHandler({
  LAUNCH() {
    this.$session.$data.lineIndex = 0;
    getNextLineAndAskItOrEndSession.call(this);
  },
  Unhandled() {
    this.$session.$data.lineIndex++;
    getNextLineAndAskItOrEndSession.call(this);
  },
  ExitIntent() {
    const speech = "Au revoir!";
    this.tell(speech);
  },
});

module.exports.app = app;
