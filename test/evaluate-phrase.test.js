'use strict';

const {evaluatePhrase} = require("../src/phrase-evaluation/evaluate-phrase");

describe(`evaluatePhrase`, () => {
  it(`should return a score of 1, when it receives two matching arrays of words`, () => {
    const expectedWords = ["here", "are", "some", "words"];
    const receivedWords = ["here", "are", "some", "words"];
    const score = evaluatePhrase(expectedWords, receivedWords);
    expect(score).toBe(1);
  });

  it(`should return a score of 1, when it receives two arrays of words with the same words, ` +
    `but in a different order`, () => {
    const expectedWords = ["here", "are", "some", "words"];
    const receivedWords = ["are", "here", "some", "words"];
    const score = evaluatePhrase(expectedWords, receivedWords);
    expect(score).toBe(1);
  });

  it(`should return a score of less than 1, when there are fewer received words than expected words`, () => {
    const expectedWords = ["here", "are", "some", "words"];
    const receivedWords = ["here", "some", "words"];
    const score = evaluatePhrase(expectedWords, receivedWords);
    expect(score < 1).toBe(true);
  });

  it(`should return a score of less than 1, when there are more received words than expected words`, () => {
    const expectedWords = ["here", "some", "words"];
    const receivedWords = ["here", "are", "some", "words"];
    const score = evaluatePhrase(expectedWords, receivedWords);
    expect(score < 1).toBe(true);
  });
});



