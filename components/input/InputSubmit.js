import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles.js';

const InputSubmit = (props) => (
  <TouchableHighlight onPress={props.onPress} underlayColor="white">
    <View style={styles.inputItem}>
      <Icon style={styles.inputItemText} name="arrow-right" />
    </View>
  </TouchableHighlight>
);

export default InputSubmit;
