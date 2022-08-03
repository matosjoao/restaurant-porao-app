import {StyleSheet} from 'react-native';

import {COLORS, GENERAL_DIMENSIONS} from '../../Config';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoContainer: {
    flex: 0.65,
    padding: 10,
    backgroundColor: COLORS.gray,
    borderRadius: GENERAL_DIMENSIONS.cardBorderRadius,
  },
  actionsContainer: {
    flex: 0.35,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 6,
  },
  itemName: {
    fontFamily: 'Roboto-Bold',
    color: COLORS.white,
  },
  itemPrice: {
    fontFamily: 'Roboto-Light',
    color: COLORS.white,
    paddingLeft: 20,
  },
  icon: {
    padding: 4,
  },
  quantity: {
    minWidth: 32,
    textAlign: 'center',
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
    paddingBottom: 10,
    paddingHorizontal: 4,
  },
});
