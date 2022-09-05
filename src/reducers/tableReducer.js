import {TABLE_ACTION_TYPES} from '../actions/tableActionTypes';

export const INITIAL_STATE = {
  isFetching: false,
  tables: [],
};

// The reducer function
export const tableReducer = (state, action) => {
  switch (action.type) {
    case TABLE_ACTION_TYPES.FETCH_TABLES:
      return {
        isFetching: false,
        tables: action.payload,
      };
    case TABLE_ACTION_TYPES.START_FETCHING:
      return {
        ...state,
        isFetching: true,
      };
    case TABLE_ACTION_TYPES.STOP_FETCHING:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return {state};
  }
};
