import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles.js';

const DeckShuffle = (props) => (
  <TouchableHighlight onPress={props.onPress} underlayColor="white">
    <View style={styles.deckItem}>
      <Icon style={styles.deckItemText} name="random" />
    </View>
  </TouchableHighlight>
);

export default DeckShuffle;
