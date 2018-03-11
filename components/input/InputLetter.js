import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

import styles from './styles.js';

const InputLetter = (props) => (
  <TouchableHighlight onPress={props.onPress} underlayColor="white">
    <View style={styles.inputItem}>
        <Text style={styles.inputItemText}>
          {props.letter.toUpperCase()}
        </Text>
    </View>
  </TouchableHighlight>
);

export default InputLetter;
