/**
 * this function return the sliced string with specific number of word from given string
 *
 * @param {the amount of words that it need to be sliced from the first of the string} numberOfWords
 * @param {the string that is needs to be sliced} wordsString
 * @returns it will return the requested string
 */

const calculateFirstWords = (numberOfWords, wordsString) => {
  const words = wordsString.split(" ").slice(0, 20);

  let stringWords = "";
  for (let index = 0; index < words.length; index++) {
    stringWords = stringWords + " " + words[index];
  }

  return stringWords;
};

export default calculateFirstWords;
