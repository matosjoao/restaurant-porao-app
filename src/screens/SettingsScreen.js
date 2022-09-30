import React from 'react';
import {StyleSheet, View} from 'react-native';
import useAuth from '../common/hooks/useAuth';

import IconButton from '../components/icon-button/IconButton';
import {COLORS} from '../Config';

function SettingsScreen() {
  const {logout} = useAuth();

  return (
    <View style={styles.container}>
      <IconButton
        icon="exit"
        color={COLORS.primary}
        size={50}
        onPress={() => {
          logout();
        }}
      />
    </View>
  );
}

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
