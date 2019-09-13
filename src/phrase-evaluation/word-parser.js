/**
 * Parses individual words out of a string of words.
 * @param {string} wordString The string of words.
 */
exports.wordParser = function(wordString) {
  const words = wordString.match(/\w+/g);

  /**
   * Converts a word to a lowercase word.
   * @param {string} word
   * @return {string}
   */
  const convertToLowercase = (word) => word.toLowerCase();
  return words.map(convertToLowercase);
};
