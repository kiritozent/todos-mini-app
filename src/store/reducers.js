import _ from 'lodash';
import Immutable from 'seamless-immutable';
import types from './actionTypes';
import { DEFAULT_REDUCER_STATE } from '../data/const';

const initialState = Immutable({ ...DEFAULT_REDUCER_STATE });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // getUsers reducers
    case types.GET_USERS_REQUEST: {
      return state.merge({
        ...state,
        getUsers: { payload: null, fetching: true, error: false },
      });
    }
    case types.GET_USERS_SUCCESS: {
      const { payload } = action;
      return state.merge({
        ...state,
        getUsers: { payload, fetching: false, error: false },
        userList: payload.data,
      });
    }
    case types.GET_USERS_FAILURE:
      return state.merge({
        ...state,
        getUsers: { payload: null, fetching: false, error: true },
      });

    // getTodos reducers
    case types.GET_TODO_LIST_REQUEST:
      return state.merge({
        ...state,
        getTodos: { payload: action.payload, fetching: true, error: false },
      });
    case types.GET_TODO_LIST_SUCCESS: {
      const { payload } = action;
      let userId;
      if (payload.data.length > 0) {
        userId = payload.data[0].userId;
      }
      const result = _.reverse(_.sortBy(payload.data, 'id'));
      if (typeof userId === 'number') {
        const user = state.userList.find(item => item.id === userId);
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
        }
      }
      return state.merge({
        ...state,
        getTodos: { payload, fetching: false, error: false },
        todoList: result,
      });
    }
    case types.GET_TODO_LIST_FAILURE:
      return state.merge({
        ...state,
        getTodos: { payload: null, fetching: false, error: true },
      });

    // postTodos reducers
    case types.POST_TODO_LIST_REQUEST:
      return state.merge({
        ...state,
        postTodos: { payload: action.payload, fetching: true, error: false },
      });
    case types.POST_TODO_LIST_SUCCESS: {
      const { payload } = action;
      const temp = [...state.todoList];
      const existedIndex = temp.findIndex(item => item.id === payload.data.id);
      if (existedIndex >= 0) {
        temp[existedIndex] = payload.data;
      } else {
        temp.unshift(payload.data);
      }
      const result = _.reverse(_.sortBy(temp, 'id'));
      return state.merge({
        ...state,
        postTodos: { payload, fetching: false, error: false },
        todoList: result,
      });
    }
    case types.POST_TODO_LIST_FAILURE:
      return state.merge({
        ...state,
        postTodos: { payload: null, fetching: false, error: true },
      });

    // patchTodos reducers
    case types.PATCH_TODO_LIST_REQUEST:
      return state.merge({
        ...state,
        patchTodos: { payload: action.payload, fetching: true, error: false },
      });
    case types.PATCH_TODO_LIST_SUCCESS: {
      const { payload } = action;
      const result = [...state.todoList];
      const patchedIndex = result.findIndex(
        item => item.id === payload.data.id,
      );
      if (patchedIndex >= 0) {
        result[patchedIndex] = payload.data;
      }
      return state.merge({
        ...state,
        patchTodos: { payload, fetching: false, error: false },
        todoList: result,
      });
    }
    case types.PATCH_TODO_LIST_FAILURE:
      return state.merge({
        ...state,
        patchTodos: { payload: null, fetching: false, error: true },
      });

    // deleteTodos reducers
    case types.DELETE_TODO_LIST_REQUEST:
      return state.merge({
        ...state,
        deleteTodos: { payload: action.payload, fetching: true, error: false },
      });
    case types.DELETE_TODO_LIST_SUCCESS: {
      const { payload } = action;
      const result = [...state.todoList];
      const deletedIndex = result.findIndex(item => item.id === payload.id);
      if (deletedIndex >= 0) {
        result.splice(deletedIndex, 1);
      }

      return state.merge({
        ...state,
        deleteTodos: { payload, fetching: false, error: false },
        todoList: result,
      });
    }
    case types.DELETE_TODO_LIST_FAILURE:
      return state.merge({
        ...state,
        deleteTodos: { payload: null, fetching: false, error: true },
      });

    default:
      return state;
  }
};
export { initialState, reducer };
