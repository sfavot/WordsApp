import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

import styles from './styles.js';

const Navbar = (props) => (
  <View style={styles.navbar}>
    <TouchableHighlight onPress={props.onSwitchLang} underlayColor="white">
      <View style={styles.navbarLangButton}>
        <Text style={styles.navbarLangButtonText}>
          {props.lang.toUpperCase()}
        </Text>
      </View>
    </TouchableHighlight>
  </View>
);

export default Navbar;
