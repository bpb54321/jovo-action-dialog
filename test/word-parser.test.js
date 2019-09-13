'use strict';

const {wordParser} = require("../src/phrase-evaluation/word-parser");

describe(`Word Parser`, () => {
  it(`should return an array of words, given a string with words separated by whitespace`, () => {
    const phrase = `here are some words`;
    const wordArray = wordParser(phrase);
    expect(wordArray).toEqual([`here`, `are`, `some`, `words`]);
  });

  it(`show return an array of words without comma, period, dash, question mark, colon, semicolon or exclamation point, ` +
    `when those punctutation marks appear in the string`, () => {
    let phrase = `here are, some words.`;
    let wordArray = wordParser(phrase);
    expect(wordArray).toEqual([`here`, `are`, `some`, `words`]);

    phrase = `here are. - some words?`;
    wordArray = wordParser(phrase);
    expect(wordArray).toEqual([`here`, `are`, `some`, `words`]);

    phrase = `here are some: words!`;
    wordArray = wordParser(phrase);
    expect(wordArray).toEqual([`here`, `are`, `some`, `words`]);

    phrase = `here; are some-- words!`;
    wordArray = wordParser(phrase);
    expect(wordArray).toEqual([`here`, `are`, `some`, `words`]);
  });

  it(`should return an array of lowercase words, given a string where some words are capitalized`, () => {
    const phrase = `Here are some Words.`;
    const wordArray = wordParser(phrase);
    expect(wordArray).toEqual([`here`, `are`, `some`, `words`]);
  });

});



