import React, {PureComponent} from 'react';
import EventListener from '../../services/EventListener';
import LoadingSpinner from './LoadingSpinner';

class LoadingProvider extends PureComponent {
  constructor(props) {
    super(props);

    this.isComponentMounted = false;

    this.state = {
      isLoading: false,
    };

    EventListener.addListener('loading', loading => {
      if (this.isComponentMounted && this.state.isLoading !== loading) {
        this.setState({isLoading: loading});
      }
    });
  }

  componentDidMount() {
    this.isComponentMounted = true;
  }

  componentWillUnmount() {
    this.isComponentMounted = false;
  }

  render() {
    const {isLoading} = this.state;
    return (
      <>
        {this.props.children}
        {isLoading && <LoadingSpinner />}
      </>
    );
  }
}

export default LoadingProvider;
