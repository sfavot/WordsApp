import React from 'react';
import { View } from 'react-native';

import styles from './styles.js';
import DeckLetter from './DeckLetter';
import DeckShuffle from './DeckShuffle';

const Deck = (props) => {
  if (!props.deck || !props.deck.length) {
    return null;
  }

  return (
    <View style={styles.deck}>
      {props.deck.map((letter, idx) => (
        <DeckLetter
          key={`deck-${idx}`}
          letter={letter}
          onPress={letter !== '' ? props.onPressLetter(letter) : null}
        />
      ))}
      <DeckShuffle
        onPress={props.shuffleDeck}
      />
    </View>
  );
}

export default Deck;
