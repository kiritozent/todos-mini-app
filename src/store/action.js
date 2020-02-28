import types from './actionTypes';

export const useActions = (state, dispatch) => ({
  getUsersRequest: params => {
    dispatch({ type: types.GET_USERS_REQUEST, payload: params });
  },
  getTodosRequest: params => {
    dispatch({ type: types.GET_TODO_LIST_REQUEST, payload: params });
  },
});
