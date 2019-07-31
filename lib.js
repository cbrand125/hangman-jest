const readlineSync = require('readline-sync');

/**
 * Checks if passed in array contains any blanks
 * @param {string[]} wordArray array of letters and blanks
 * @returns {boolean}
 */
function isWordSolved(wordArray) {
  return wordArray.every(letter => letter !== '_');
}

/**
 * Randomly selects a word from array of words
 * @param {string[]} words array of words
 * @returns {string}
 */
function randomlySelectWord(words) {
  return words[Math.floor(Math.random() * words.length)];
}

/**
 * Creates array full of blank spaces (underscores)
 * @param {number} length length of target word
 * @returns {string[]}
 */
function createBlankWordArray(length) {
  return new Array(length).fill('_');
}

/**
 * Fills in any properly guessed letters (while mainting previously guessed letters)
 * @param {string} guessedLetter guessed character
 * @param {string[]} guessedWord array filled with proper guesses and blanks
 * @param {string} targetWord the word to match
 * @returns {string[]}
 */
function fillInGuessedLetters(guessedLetter, guessedWord, targetWord) {
  return guessedWord.map((char, i) =>
    guessedLetter === targetWord[i] ? guessedLetter : char
  );
}

/**
 * Transforms string array into a string
 * @param {string[]} wordArray array of characters
 * @returns {string}
 */
function stringify(wordArray = []) {
  return wordArray.join('');
}

/**
 * Checks if `letter` is in `word`
 * @param {string} word the word to check
 * @param {string} letter a single character
 * @returns {boolean}
 */
function wordIncludesLetter(word, letter) {
  return word.includes(letter);
}

/**
 * Uses `readline-sync` library to ask for user input from command line
 * @returns {string} the inputted string
 */
function askForALetter() {
  return readlineSync.question(`Guess a letter: `);
}

/**
 * Ouputs `output` to the console
 * @param {string} output
 */
function print(output) {
  console.log(output);
}

module.exports = {
  isWordSolved,
  randomlySelectWord,
  createBlankWordArray,
  fillInGuessedLetters,
  print,
  stringify,
  askForALetter,
  wordIncludesLetter,
};
