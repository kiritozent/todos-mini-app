import types from './actionTypes';

export const useActions = (state, dispatch) => ({
  getUsersRequest: params => {
    dispatch({ type: types.GET_USERS_REQUEST, payload: params });
  },
});
