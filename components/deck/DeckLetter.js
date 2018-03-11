import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

import styles from './styles.js';

const DeckLetter = (props) => (
  <TouchableHighlight onPress={props.onPress} underlayColor="white">
    <View style={styles.deckItem}>
        <Text style={styles.deckItemText}>{props.letter.toUpperCase()}</Text>
    </View>
  </TouchableHighlight>
);

export default DeckLetter;
