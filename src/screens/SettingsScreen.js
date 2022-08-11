import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';

import IconButton from '../components/icon-button/IconButton';
import {COLORS} from '../Config';
import {AuthContext} from '../store/auth-context';

function SettingsScreen() {
  const authCtx = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <IconButton
        icon="exit"
        color={COLORS.primary}
        size={50}
        onPress={() => {
          authCtx.logout();
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
