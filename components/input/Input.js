import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles.js';
import InputLetter from './InputLetter';
import InputSubmit from './InputSubmit';

const Input = (props) => (
  <View style={styles.input}>
    {props.input.map((letter, idx) => (
      <InputLetter onPress={props.onPressLetter(letter)} key={`input-${idx}`} letter={letter} />
    ))}
    <InputSubmit onPress={props.onSubmit} />
  </View>
);

export default Input;
