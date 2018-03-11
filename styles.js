import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 30,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightWord: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 25,
  },
  wrongWord: {
    color: 'red',
    fontWeight: 'bold',
    textDecorationLine: 'line-through',
    fontSize: 25,
  },
  simpleText: {
    fontWeight: 'bold',
    fontSize: 50,
  }
});
