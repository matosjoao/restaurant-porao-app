import {StyleSheet} from 'react-native';
import {vw} from '../../common/styles/mixins';
import {GENERAL_DIMENSIONS} from '../../Config';

const LAYOUT_DEFAULT_OUTSIDE_PADDING = 20;

export default StyleSheet.create({
  container: {
    borderRadius: GENERAL_DIMENSIONS.cardBorderRadius,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLeftScreenPosition: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    left: -LAYOUT_DEFAULT_OUTSIDE_PADDING,
    width: vw(65) + LAYOUT_DEFAULT_OUTSIDE_PADDING,
  },
  containerRightScreenPosition: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    right: -vw(35) - LAYOUT_DEFAULT_OUTSIDE_PADDING,
    width: vw(65) + LAYOUT_DEFAULT_OUTSIDE_PADDING,
  },
  containerNormal: {
    paddingVertical: 18,
    paddingHorizontal: 18,
  },
  containerSmall: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },

  text: {
    fontFamily: 'Roboto-Bold',
    color: '#fff',
  },
  textNormal: {
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
  },
  textSmall: {
    fontFamily: 'Roboto-Light',
    fontSize: 12,
  },
  icon: {
    paddingRight: 4,
  },
  pressed: {
    opacity: 0.7,
  },
});
