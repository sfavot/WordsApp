import langData from '../lang_data';
import uniq from 'lodash/uniq';
import intersection from 'lodash/intersection';

const NB_LETTERS = 6;

const randomLetter = (frequencies) => {
  const letters = langData.alphabet.letters;
  let random = Math.random() * 10000;
  let range = 0;
  for (let i = 0; i < letters.length; i++) {
    const letter = letters[i];
    range += frequencies[letter];
    if (random < range) {
      return letter;
    }
  }
}

const hasVowel = (deck) => {
  return intersection(deck, langData.alphabet.vowels).length >= 1;
};

const createDeck = (language, nbLetters = NB_LETTERS) => {
  const frequencies = langData[language].frequencies;
  let deck = [];
  for (let i = 0; i < nbLetters; i++) {
    deck.push(randomLetter(frequencies));
  }

  // We want at least one vowel
  let retries = 10
  while (!hasVowel(deck) && retries) {
    retries--;
    deck.pop();
    deck.push(randomLetter(frequencies));
  }


  // We don't want any duplicated letter
  retries = 10
  while (uniq(deck).length < nbLetters && retries) {
    retries--;
    deck = uniq(deck);
    deck.push(randomLetter(frequencies));
  }

  return deck;
}

export default createDeck;
