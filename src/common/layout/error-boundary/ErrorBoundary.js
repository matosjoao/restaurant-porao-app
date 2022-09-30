import React, {PureComponent} from 'react';
import {Text, View, StyleSheet} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../../Config';
//import Logger from '../../services/Logger';

class ErrorBoundary extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {hasError: false, error: null};
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return {hasError: true};
  }

  componentDidCatch(error, errorInfo) {
    //TODO: Improve
    //Logger.error(LOGGER_LOG_TYPE.APP_CRASH, 'Application crashed', { error: this.state.error });
    return {hasError: true, error: {error, errorInfo}};
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <View style={styles.container}>
          <Icon name="close-circle" style={styles.icon} />
          <Text style={styles.oops}>Ooops</Text>
          <Text style={styles.title}>
            Erro interno, por favor contacte o administrador
          </Text>
        </View>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#cc3132',
    padding: 50,
  },
  icon: {
    color: COLORS.white,
    marginBottom: 10,
    fontSize: 99,
  },
  oops: {
    fontFamily: 'Roboto-Bold',
    fontSize: 28,
    color: COLORS.white,
    marginBottom: 10,
    textAlign: 'center',
  },
  title: {
    fontFamily: 'Roboto-Light',
    fontSize: 22,
    color: COLORS.white,
    marginBottom: 10,
    textAlign: 'center',
  },
});
