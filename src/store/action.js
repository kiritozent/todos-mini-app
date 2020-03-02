import types from './actionTypes';

export const useActions = (state, dispatch) => ({
  getUsersRequest: params => {
    dispatch({ type: types.GET_USERS_REQUEST, payload: params });
  },
  getTodosRequest: params => {
    dispatch({ type: types.GET_TODO_LIST_REQUEST, payload: params });
  },
  postTodosRequest: params => {
    dispatch({ type: types.POST_TODO_LIST_REQUEST, payload: params });
  },
  patchTodosRequest: params => {
    dispatch({ type: types.PATCH_TODO_LIST_REQUEST, payload: params });
  },
  deleteTodosRequest: params => {
    dispatch({ type: types.DELETE_TODO_LIST_REQUEST, payload: params });
  },
});
