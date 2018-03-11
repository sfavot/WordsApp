import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  deck: {
    height: 70,
    backgroundColor: 'powderblue',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  deckItem: {
    backgroundColor: 'skyblue',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
  deckItemText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
