import types from './actionTypes';
import api from '../services/api';

const apiUrl = api.create(process.env.REACT_APP_API_URL);

export const applyMiddleware = dispatch => async action => {
  dispatch(action);

  switch (action.type) {
    case types.GET_TODO_LIST_REQUEST: {
      const { payload } = action;
      try {
        const response = await apiUrl.getTodos(payload.userId);
        if (response.ok) {
          dispatch({
            type: types.GET_TODO_LIST_SUCCESS,
            payload: response,
          });
        } else {
          dispatch({ type: types.GET_TODO_LIST_FAILURE });
        }
      } catch (err) {
        dispatch({ type: types.GET_TODO_LIST_FAILURE });
      }
      break;
    }
    case types.POST_TODO_LIST_REQUEST: {
      const { payload } = action;
      try {
        const response = await apiUrl.postTodos(payload);
        if (response.ok) {
          dispatch({
            type: types.POST_TODO_LIST_SUCCESS,
            payload: response,
          });
        } else {
          dispatch({ type: types.POST_TODO_LIST_FAILURE });
        }
      } catch (err) {
        dispatch({ type: types.POST_TODO_LIST_FAILURE });
      }
      break;
    }
    case types.PATCH_TODO_LIST_REQUEST: {
      const { payload } = action;
      try {
        const response = await apiUrl.patchTodos(payload);
        if (response.ok) {
          dispatch({
            type: types.PATCH_TODO_LIST_SUCCESS,
            payload: response,
          });
        } else {
          dispatch({ type: types.PATCH_TODO_LIST_FAILURE });
        }
      } catch (err) {
        dispatch({ type: types.PATCH_TODO_LIST_FAILURE });
      }
      break;
    }
    case types.DELETE_TODO_LIST_REQUEST: {
      const { payload } = action;
      try {
        const response = await apiUrl.deleteTodos(payload.id);
        if (response.ok) {
          dispatch({
            type: types.DELETE_TODO_LIST_SUCCESS,
            payload,
          });
        } else {
          dispatch({ type: types.DELETE_TODO_LIST_FAILURE });
        }
      } catch (err) {
        dispatch({ type: types.DELETE_TODO_LIST_FAILURE });
      }
      break;
    }
    case types.GET_USERS_REQUEST: {
      try {
        const response = await apiUrl.getUsers();
        if (response.ok) {
          dispatch({ type: types.GET_USERS_SUCCESS, payload: response });
        } else {
          dispatch({ type: types.GET_USERS_FAILURE });
        }
      } catch (err) {
        dispatch({ type: types.GET_USERS_FAILURE });
      }
      break;
    }
    default:
      break;
  }
};
