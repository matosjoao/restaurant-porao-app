import React, {PureComponent} from 'react';
import {Text, View, StyleSheet} from 'react-native';
/* import {LOGGER_LOG_TYPE} from '../../../Config';
import Logger from '../../services/Logger'; */

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
    console.log(error);
    //Logger.error(LOGGER_LOG_TYPE.APP_CRASH, 'Application crashed', { error: this.state.error });
    return {hasError: true, error: {error, errorInfo}};
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <View style={styles.container}>
          {/* <Icon name="times" style={styles.icon} /> */}
          <Text style={styles.oops}>erro</Text>
          <Text style={styles.title}>desc</Text>
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
    backgroundColor: '#cc3132', // '#cc3132',
    //padding: vw(5),
  },
  icon: {
    color: '#fff',
    marginBottom: 10,
    fontSize: 99,
  },
  oops: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  title: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
});
