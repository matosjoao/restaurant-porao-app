import React, {useEffect, useRef, useState} from 'react';
import EventListener from '../../services/EventListener';
import LoadingSpinner from './LoadingSpinner';

function LoadingProvider({children}) {
  const [isLoading, setIsLoading] = useState(false);
  const isComponentMounted = useRef(false);

  useEffect(() => {
    isComponentMounted.current = true;

    EventListener.addListener('loading', loading => {
      if (isComponentMounted.current && isLoading !== loading) {
        setIsLoading(loading);
      }
    });

    return () => {
      // If the component is unmounted, cancel the request
      isComponentMounted.current = false;
    };
  }, [isLoading]);

  return (
    <>
      {children}
      {isLoading && <LoadingSpinner />}
    </>
  );
}

export default LoadingProvider;

/*
//TODO:: Remove
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
*/
