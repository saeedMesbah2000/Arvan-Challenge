const calculateFirstWords = (numberOfWords, wordsString) => {
  const words = wordsString.split(" ").slice(0, 20);

  let stringWords = "";
  for (let index = 0; index < words.length; index++) {
    stringWords = stringWords + " " + words[index];
  }

  return stringWords;
};

export default calculateFirstWords;
