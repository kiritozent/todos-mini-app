import types from './actionTypes';
import { DEFAULT_REDUCERS } from '../data/const';

const initialState = {
  users: DEFAULT_REDUCERS,
  userList: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // users reducers
    case types.GET_USERS_REQUEST: {
      const newState = {
        ...state,
        users: { payload: null, fetching: true, error: false },
      };
      return newState;
    }
    case types.GET_USERS_SUCCESS: {
      const { payload } = action;
      return {
        ...state,
        users: { payload, fetching: false, error: false },
        userList: payload.data,
      };
    }
    case types.GET_USERS_FAILURE:
      return {
        ...state,
        users: { payload: null, fetching: false, error: true },
      };

    default:
      return { ...state };
  }
};
export { initialState, reducer };
