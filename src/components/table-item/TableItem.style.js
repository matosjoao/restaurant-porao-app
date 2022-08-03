import {StyleSheet} from 'react-native';

import {COLORS, GENERAL_DIMENSIONS} from '../../Config';

export default StyleSheet.create({
  container: {
    flex: 1,
    height: 100,
    padding: 4,
    marginVertical: 20,
    marginHorizontal: 20,
    borderRadius: GENERAL_DIMENSIONS.cardBorderRadius,
    elevation: 8,
    backgroundColor: 'white',
  },
  containerEmpty: {
    flex: 1,
    padding: 4,
    marginVertical: 20,
    marginHorizontal: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  status: {
    height: 10,
    borderRadius: GENERAL_DIMENSIONS.cardBorderRadius,
  },
  title: {
    fontFamily: 'Roboto-Bold',
    fontSize: 25,
    textAlign: 'center',
    color: COLORS.primary,
  },
  subTitle: {
    fontFamily: 'Roboto-Light',
    fontSize: 16,
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.75,
  },
});
