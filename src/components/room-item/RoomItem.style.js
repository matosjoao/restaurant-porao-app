import {StyleSheet} from 'react-native';

import {COLORS, GENERAL_DIMENSIONS} from '../../Config';

export default StyleSheet.create({
  container: {
    minHeight: 180,
    padding: 10,
    marginVertical: 20,
    marginHorizontal: 50,
    backgroundColor: 'white',
    borderRadius: GENERAL_DIMENSIONS.cardBorderRadius,
    elevation: 8,
    borderLeftColor: COLORS.primary100,
    borderLeftWidth: 2,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Roboto-Bold',
    fontSize: 50,
    textAlign: 'center',
    color: COLORS.primary,
  },
  subTitle: {
    fontFamily: 'Roboto-Light',
    fontSize: 18,
    textAlign: 'center',
    color: COLORS.gray,
  },
  icon: {
    height: 70,
    width: 70,
    borderRadius: 70,
    borderColor: COLORS.primary100,
    borderWidth: 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -30,
    elevation: 6,
  },
  pressed: {
    opacity: 0.75,
  },
});
