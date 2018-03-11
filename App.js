import React from 'react';
import { Text, View } from 'react-native';
import shuffle from 'lodash/shuffle';

import styles from './styles';
import createDeck from './utils/deck';
import { checkWord, getPossibleWords } from './utils/dictionary';
import Deck from './components/deck';
import Input from './components/input';
import Navbar from './components/navbar';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      lang: 'en',
      initialDeck: [],
      deck: [],
      input: [],
      words: [],
      possibleWords: [],
    };
  }

  componentWillMount() {
    this.reset();
  }

  getCleanInput = () => {
    return ['', '', '', '', '', ''];
  }

  isNewWord = (word) => {
    const { words } = this.state;

    return words.indexOf(word) < 0;
  }

  handlePressInputLetter = (letter) => () => {
    const { initialDeck } = this.state;
    let deck = this.state.deck.slice();
    let input = this.state.input.slice();

    input[input.indexOf(letter)] = '';

    for (let i=0; i<initialDeck.length; i++) {
      if (initialDeck[i] === letter) {
        deck[i] = letter;
        break;
      }
    }

    this.setState({
      deck,
      input,
    });
  }

  handlePressDeckLetter = (letter) => () => {
    const { initialDeck } = this.state;
    let deck = this.state.deck.slice();
    let input = this.state.input.slice();
    const words = this.state.words.slice();

    if (letter !== false) {
      deck[deck.indexOf(letter)] = '';

      for (let i=0; i<input.length; i++) {
        if (input[i] === '') {
          input[i] = letter;
          break;
        }
      }
    }

    const word = input.join('');

    if (word.length === input.length || (letter === false && word.length > 2)) {
      const isValidWord = checkWord(this.state.lang, word);
      const isNewWord = this.isNewWord(word);

      words.push({
        word,
        status: isValidWord && isNewWord,
      });

      deck = initialDeck.slice();
      input = this.getCleanInput();
    }

    this.setState({
      words,
      deck,
      input,
    });
  }

  shuffleDeck = () => {
    const { deck } = this.state;
    let initialDeck = shuffle(this.state.initialDeck.slice());

    const newDeck = this.getCleanInput();
    Object.keys(initialDeck).forEach(key => {
      const letter = initialDeck[key];
      if (deck.indexOf(letter) >= 0) {
        newDeck[key] = letter;
      }
    });

    this.setState({
      deck: newDeck,
      initialDeck,
    });

  }

  reset = (lang) => {
    if (!lang) {
      lang = this.state.lang;
    }

    const deck = createDeck(lang);
    const possibleWords = getPossibleWords(lang, deck);

    this.setState({
      lang,
      initialDeck: deck,
      deck: deck.slice(),
      input: this.getCleanInput(),
      words: [],
      possibleWords,
    });
  }

  switchLang = () => {
    const { lang } = this.state;

    if (lang === 'fr') {
      this.reset('en');
      return;
    }

    this.reset('fr');
  }

  render() {
    return (
      <View style={styles.container}>
        <Navbar onSwitchLang={this.switchLang} lang={this.state.lang} />
        <View style={styles.content}>
          {this.state.words.length === 0 && (
            <Text style={styles.simpleText}>
              GO!
            </Text>
          )}
          {this.state.words.map((word, idx) => (
            <Text
              key={`word-${idx}`}
              style={word.status ? styles.rightWord : styles.wrongWord}
            >
              {word.word.toUpperCase()}
            </Text>
          ))}
        </View>
        <Input
          input={this.state.input}
          onSubmit={this.handlePressDeckLetter(false)}
          onPressLetter={this.handlePressInputLetter}
        />
        <Deck
          deck={this.state.deck}
          onPressLetter={this.handlePressDeckLetter}
          shuffleDeck={this.shuffleDeck}
        />
      </View>
    );
  }
}
