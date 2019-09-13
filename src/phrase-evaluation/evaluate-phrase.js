/**
 * Return a score of how close the receivedWords were to the expectedWords.
 * @param {string[]} expectedWords
 * @param {string[]} receivedWords
 * @return {number} The score: the number words from the shorter array that appear in the longer array divided by
 * the length of the longer array.
 */
exports.evaluatePhrase = function(expectedWords, receivedWords) {

  // Figure out which array is shorter and which is longer.
  /**
   * @type {string[]}
   */
  let shorterWordArray;

  /**
   * @type{string[]}
   */
  let longerWordArray;

  if (expectedWords.length > receivedWords.length) {
    longerWordArray = expectedWords;
    shorterWordArray = receivedWords;
  } else {
    longerWordArray = receivedWords;
    shorterWordArray = expectedWords;
  }

  // Find how many words from shorterWordArray are found in longerWordArray
  let cumulativeFoundWords = 0;
  for (const currentSearchedForWord of shorterWordArray) {
    if (longerWordArray.includes(currentSearchedForWord)) {
      cumulativeFoundWords++;
    }
  }

  return (cumulativeFoundWords / longerWordArray.length);

};
