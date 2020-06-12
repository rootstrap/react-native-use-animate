import { StyleSheet } from 'react-native';
import { GREY, RED } from './src/constants/colors';

export default StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    backgroundColor: RED,
  },
  container: {
    flex: 1,
    alignSelf: 'stretch',
  },
  safeAreaView: {
    backgroundColor: GREY,
    flex: 1,
  },
});
