import {Dimensions} from 'react-native';

const {height, width} = Dimensions.get('screen');

const trueWidth = () => (width < height ? width : height);
const trueHeight = () => (width > height ? width : height);

export const vw = vwN => Math.ceil((vwN / 100) * trueWidth());
export const vh = vhN => Math.ceil((vhN / 100) * trueHeight());

export const circleSize = () =>
  Math.round(Dimensions.get('window').width + Dimensions.get('window').height) /
  2;
