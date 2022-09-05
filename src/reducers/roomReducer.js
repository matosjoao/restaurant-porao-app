import {ROOM_ACTION_TYPES} from '../actions/roomActionTypes';

export const INITIAL_STATE = {
  isFetching: false,
  rooms: [],
};

// The reducer function
export const roomReducer = (state, action) => {
  switch (action.type) {
    case ROOM_ACTION_TYPES.FETCH_ROOMS:
      return {
        isFetching: false,
        rooms: action.payload,
      };
    case ROOM_ACTION_TYPES.START_FETCHING:
      return {
        ...state,
        isFetching: true,
      };
    case ROOM_ACTION_TYPES.STOP_FETCHING:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return {state};
  }
};
