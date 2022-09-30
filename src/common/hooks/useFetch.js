import {useEffect, useCallback, useReducer} from 'react';
import Http from '../services/Http';
import axios from 'axios';
import Loading from '../services/Loading';
import {Alert} from '../services/Alert';

const initialState = {
  response: null,
  error: null,
  isLoading: false,
};

const ACTION_TYPES = {
  FETCH: 'FETCH',
  START_FETCHING: 'START_FETCHING',
  SET_ERROR: 'SET_ERROR',
};

function reducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.FETCH:
      return {...state, response: action.payload, isLoading: false};
    case ACTION_TYPES.START_FETCHING:
      return {...state, isLoading: false};
    case ACTION_TYPES.SET_ERROR:
      return {...state, error: action.payload, isLoading: false};
    default:
      return state;
  }
}

export function useFetch(request, params) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetch = useCallback(
    async signal => {
      Loading.start();
      dispatch({type: ACTION_TYPES.START_FETCHING});

      try {
        // Fetch data
        const result = await Http.get(request, params, signal);
        dispatch({type: ACTION_TYPES.FETCH, payload: result});

        Loading.stop();
      } catch (e) {
        // Aborted?
        if (signal?.aborted) {
          return;
        }

        /* if (axios.isCancel(e)) {
					return;
				} */

        // Alert error
        Alert.error(
          'Ocorreu um erro',
          'Por favor contacte o administrador.\n' +
            '[' +
            e.response?.data?.message +
            ']',
        );

        dispatch({type: ACTION_TYPES.SET_ERROR, payload: e});
        Loading.stop();
      }
    },
    [params, request],
  );

  useEffect(() => {
    // eslint-disable-next-line no-undef
    const abortController = new AbortController();

    fetch(abortController.signal);

    return () => {
      abortController.abort();
    };
  }, [fetch]);

  return {
    response: state.response,
    error: state.error,
    isLoading: state.isLoading,
    refresh: fetch,
  };
}
