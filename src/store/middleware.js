import types from './actionTypes';
import api from '../services/api';

const apiUrl = api.create(process.env.REACT_APP_API_URL);

export const applyMiddleware = dispatch => async action => {
  dispatch(action);

  switch (action.type) {
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
