import _ from 'lodash';
import Immutable from 'seamless-immutable';
import { reducer } from './reducers';
import type from './actionTypes';
import {
  DEFAULT_REDUCER_STATE,
  GET_USERS_SUCCESS_MOCK,
  GET_TODO_LIST_SUCCESS_MOCK,
  GET_TODO_LIST_SUCCESS_DATA,
  POST_TODO_LIST_SUCCESS_MOCK,
  POST_TODO_LIST_SUCCESS_DATA,
  PATCH_TODO_LIST_REQUEST_MOCK,
  DELETE_TODO_LIST_SUCCESS_DATA,
  PATCH_TODO_LIST_SUCCESS_DATA,
} from '../data/const';

describe('get users reducer', () => {
  it('should handle GET_USERS_REQUEST', () => {
    expect(
      reducer(undefined, { type: type.GET_USERS_REQUEST, payload: undefined }),
    ).toEqual({
      ...DEFAULT_REDUCER_STATE,
      getUsers: { fetching: true, payload: null, error: false },
    });
  });

  it('should handle GET_USERS_SUCCESS', () => {
    expect(
      reducer(undefined, {
        type: type.GET_USERS_SUCCESS,
        payload: GET_USERS_SUCCESS_MOCK,
      }),
    ).toEqual({
      ...DEFAULT_REDUCER_STATE,
      getUsers: {
        fetching: false,
        payload: GET_USERS_SUCCESS_MOCK,
        error: false,
      },
      userList: GET_USERS_SUCCESS_MOCK.data,
    });
  });

  it('should handle GET_USERS_FAILURE', () => {
    expect(
      reducer(undefined, { type: type.GET_USERS_FAILURE, payload: undefined }),
    ).toEqual({
      ...DEFAULT_REDUCER_STATE,
      getUsers: { fetching: false, payload: null, error: true },
    });
  });
});

describe('get todos reducer', () => {
  it('should handle GET_TODO_LIST_REQUEST', () => {
    expect(
      reducer(undefined, {
        type: type.GET_TODO_LIST_REQUEST,
        payload: { userId: 1 },
      }),
    ).toEqual({
      ...DEFAULT_REDUCER_STATE,
      getTodos: { fetching: true, payload: { userId: 1 }, error: false },
    });
  });

  it('should handle GET_TODO_LIST_SUCCESS', () => {
    expect(
      reducer(undefined, {
        type: type.GET_TODO_LIST_SUCCESS,
        payload: GET_TODO_LIST_SUCCESS_MOCK,
      }),
    ).toEqual({
      ...DEFAULT_REDUCER_STATE,
      getTodos: {
        fetching: false,
        payload: GET_TODO_LIST_SUCCESS_MOCK,
        error: false,
      },
      todoList: GET_TODO_LIST_SUCCESS_DATA,
    });
  });

  it('should handle GET_TODO_LIST_FAILURE', () => {
    expect(
      reducer(undefined, {
        type: type.GET_TODO_LIST_FAILURE,
        payload: undefined,
      }),
    ).toEqual({
      ...DEFAULT_REDUCER_STATE,
      getTodos: { fetching: false, payload: null, error: true },
    });
  });
});

describe('post todos reducer', () => {
  it('should handle POST_TODO_LIST_REQUEST', () => {
    expect(
      reducer(undefined, {
        type: type.POST_TODO_LIST_REQUEST,
        payload: { userId: 1 },
      }),
    ).toEqual({
      ...DEFAULT_REDUCER_STATE,
      postTodos: { fetching: true, payload: { userId: 1 }, error: false },
    });
  });

  it('should handle POST_TODO_LIST_SUCCESS', () => {
    expect(
      reducer(
        Immutable({
          ...DEFAULT_REDUCER_STATE,
          todoList: GET_TODO_LIST_SUCCESS_DATA,
        }),
        {
          type: type.POST_TODO_LIST_SUCCESS,
          payload: POST_TODO_LIST_SUCCESS_MOCK,
        },
      ),
    ).toEqual({
      ...DEFAULT_REDUCER_STATE,
      postTodos: {
        fetching: false,
        payload: POST_TODO_LIST_SUCCESS_MOCK,
        error: false,
      },
      todoList: POST_TODO_LIST_SUCCESS_DATA,
    });
  });

  it('should handle POST_TODO_LIST_FAILURE', () => {
    expect(
      reducer(undefined, {
        type: type.POST_TODO_LIST_FAILURE,
        payload: undefined,
      }),
    ).toEqual({
      ...DEFAULT_REDUCER_STATE,
      postTodos: { fetching: false, payload: null, error: true },
    });
  });
});

describe('patch todos reducer', () => {
  it('should handle PATCH_TODO_LIST_REQUEST', () => {
    expect(
      reducer(undefined, {
        type: type.PATCH_TODO_LIST_REQUEST,
        payload: PATCH_TODO_LIST_REQUEST_MOCK.data,
      }),
    ).toEqual({
      ...DEFAULT_REDUCER_STATE,
      patchTodos: {
        fetching: true,
        payload: PATCH_TODO_LIST_REQUEST_MOCK.data,
        error: false,
      },
    });
  });

  it('should handle PATCH_TODO_LIST_SUCCESS', () => {
    expect(
      reducer(
        Immutable({
          ...DEFAULT_REDUCER_STATE,
          todoList: GET_TODO_LIST_SUCCESS_DATA,
        }),
        {
          type: type.PATCH_TODO_LIST_SUCCESS,
          payload: PATCH_TODO_LIST_REQUEST_MOCK,
        },
      ),
    ).toEqual({
      ...DEFAULT_REDUCER_STATE,
      patchTodos: {
        fetching: false,
        payload: PATCH_TODO_LIST_REQUEST_MOCK,
        error: false,
      },
      todoList: PATCH_TODO_LIST_SUCCESS_DATA,
    });
  });

  it('should handle PATCH_TODO_LIST_FAILURE', () => {
    expect(
      reducer(undefined, {
        type: type.PATCH_TODO_LIST_FAILURE,
        payload: undefined,
      }),
    ).toEqual({
      ...DEFAULT_REDUCER_STATE,
      patchTodos: { fetching: false, payload: null, error: true },
    });
  });
});

describe('delete todos reducer', () => {
  it('should handle DELETE_TODO_LIST_REQUEST', () => {
    expect(
      reducer(undefined, {
        type: type.DELETE_TODO_LIST_REQUEST,
        payload: { id: 1 },
      }),
    ).toEqual({
      ...DEFAULT_REDUCER_STATE,
      deleteTodos: {
        fetching: true,
        payload: { id: 1 },
        error: false,
      },
    });
  });

  it('should handle DELETE_TODO_LIST_SUCCESS', () => {
    expect(
      reducer(
        Immutable({
          ...DEFAULT_REDUCER_STATE,
          todoList: GET_TODO_LIST_SUCCESS_DATA,
        }),
        {
          type: type.DELETE_TODO_LIST_SUCCESS,
          payload: { id: 1 },
        },
      ),
    ).toEqual({
      ...DEFAULT_REDUCER_STATE,
      deleteTodos: {
        fetching: false,
        payload: { id: 1 },
        error: false,
      },
      todoList: DELETE_TODO_LIST_SUCCESS_DATA,
    });
  });

  it('should handle PATCH_TODO_LIST_FAILURE', () => {
    expect(
      reducer(undefined, {
        type: type.DELETE_TODO_LIST_FAILURE,
        payload: undefined,
      }),
    ).toEqual({
      ...DEFAULT_REDUCER_STATE,
      deleteTodos: { fetching: false, payload: null, error: true },
    });
  });
});
