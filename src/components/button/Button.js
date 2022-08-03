import React from 'react';
import {Pressable, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {COLORS} from '../../Config';
import styles from './Button.style';

//export type ButtonSize = 'small' | 'normal';
//export type ButtonPosition = 'normal' | 'left-screen' | 'right-screen';

function Button({
  text,
  color = 'primary',
  textColor = 'white',
  style,
  textStyle,
  onPress,
  disabled,
  children,
  size = 'normal',
  iconName,
  iconComponent = Icon,
  position = 'normal',
}) {
  // Container
  const containerStyles = [styles.container];

  if (color) {
    containerStyles.push({backgroundColor: COLORS[color]});
  }

  if (size === 'small') {
    containerStyles.push(styles.containerSmall);
  } else {
    containerStyles.push(styles.containerNormal);
  }

  if (position === 'left-screen') {
    containerStyles.push(styles.containerLeftScreenPosition);
  } else if (position === 'right-screen') {
    containerStyles.push(styles.containerRightScreenPosition);
  }

  if (style) {
    containerStyles.push(style);
  }

  // Text
  const textStyles = [styles.text];

  if (textColor) {
    textStyles.push({color: COLORS[textColor]});
  }

  if (size === 'small') {
    textStyles.push(styles.textSmall);
  } else {
    textStyles.push(styles.textNormal);
  }

  if (textStyle) {
    textStyles.push(textStyle);
  }

  // Icon
  const IconComponent = iconComponent;
  let iconSize = 26;

  if (size === 'small') {
    iconSize = 12;
  }

  return (
    <Pressable
      onPress={!disabled ? onPress : () => undefined}
      style={({pressed}) =>
        pressed && !disabled
          ? [containerStyles, styles.pressed]
          : containerStyles
      }>
      {iconName && (
        <IconComponent
          name={iconName}
          color={COLORS[textColor]}
          size={iconSize}
          style={text && styles.icon}
        />
      )}

      {text && <Text style={textStyles}>{text}</Text>}

      {children}
    </Pressable>
  );
}

export default Button;
