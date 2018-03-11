import langData from '../lang_data';
import difference from 'lodash/difference';
import intersection from 'lodash/intersection';
import uniq from 'lodash/uniq';

export const checkWord = (language, word) => {
  const firstLetter = word.charAt(0);
  const data = langData[language].data[firstLetter];

  return data.indexOf(word) >= 0;
};

export const getUnusedLetters = (deck) => {
  return difference(langData.alphabet.letters, deck);
}

export const getPossibleWords = (language, deck) => {
  const data = langData[language].data;

  const unusedLetters = getUnusedLetters(deck);
  let impossibleWords = [];
  unusedLetters.forEach(letter => {
    impossibleWords = impossibleWords.concat(data[letter]);
  });

  return difference(data.words, impossibleWords);
};

export const getPossibleWordsSortedByLength = (language, deck) => {
  const possibleWords = getPossibleWords(language, deck);

  return possibleWords.sort((a, b) => {
    return b.length - a.length;
  });
};
