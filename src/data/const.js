export const DEFAULT_REDUCERS = {
  payload: null,
  error: false,
  fetching: false,
};

export const DEFAULT_REDUCER_STATE = {
  getTodos: DEFAULT_REDUCERS,
  postTodos: DEFAULT_REDUCERS,
  deleteTodos: DEFAULT_REDUCERS,
  patchTodos: DEFAULT_REDUCERS,
  getUsers: DEFAULT_REDUCERS,
  userList: [],
  todoList: [],
};

export const DEFAULT_FUZZY_OPTIONS = {
  shouldSort: true,
  threshold: 0.6,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: ['title'],
};

export const GET_USERS_SUCCESS_MOCK = {
  data: [
    {
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz',
      address: {
        street: 'Kulas Light',
        suite: 'Apt. 556',
        city: 'Gwenborough',
        zipcode: '92998-3874',
        geo: {
          lat: '-37.3159',
          lng: '81.1496',
        },
      },
      phone: '1-770-736-8031 x56442',
      website: 'hildegard.org',
      company: {
        name: 'Romaguera-Crona',
        catchPhrase: 'Multi-layered client-server neural-net',
        bs: 'harness real-time e-markets',
      },
    },
  ],
};

export const GET_TODO_LIST_SUCCESS_MOCK = {
  data: [
    {
      userId: 1,
      id: 1,
      title: 'delectus aut autem',
      completed: false,
    },
    {
      userId: 1,
      id: 2,
      title: 'quis ut nam facilis et officia qui',
      completed: false,
    },
    {
      userId: 1,
      id: 3,
      title: 'fugiat veniam minus',
      completed: false,
    },
  ],
};

export const GET_TODO_LIST_SUCCESS_DATA = [
  {
    userId: 1,
    id: 3,
    title: 'fugiat veniam minus',
    completed: false,
  },

  {
    userId: 1,
    id: 2,
    title: 'quis ut nam facilis et officia qui',
    completed: false,
  },
  {
    userId: 1,
    id: 1,
    title: 'delectus aut autem',
    completed: false,
  },
];

export const POST_TODO_LIST_SUCCESS_MOCK = {
  data: {
    userId: 1,
    id: 4,
    title: 'lorem ipsum',
    completed: false,
  },
};

export const POST_TODO_LIST_SUCCESS_DATA = [
  {
    userId: 1,
    id: 4,
    title: 'lorem ipsum',
    completed: false,
  },
  {
    userId: 1,
    id: 3,
    title: 'fugiat veniam minus',
    completed: false,
  },
  {
    userId: 1,
    id: 2,
    title: 'quis ut nam facilis et officia qui',
    completed: false,
  },
  {
    userId: 1,
    id: 1,
    title: 'delectus aut autem',
    completed: false,
  },
];

export const PATCH_TODO_LIST_REQUEST_MOCK = {
  data: {
    userId: 1,
    id: 3,
    title: 'dolor sit amet',
    completed: true,
  },
};

export const PATCH_TODO_LIST_SUCCESS_DATA = [
  {
    userId: 1,
    id: 3,
    title: 'dolor sit amet',
    completed: true,
  },
  {
    userId: 1,
    id: 2,
    title: 'quis ut nam facilis et officia qui',
    completed: false,
  },
  {
    userId: 1,
    id: 1,
    title: 'delectus aut autem',
    completed: false,
  },
];

export const DELETE_TODO_LIST_SUCCESS_DATA = [
  {
    userId: 1,
    id: 3,
    title: 'fugiat veniam minus',
    completed: false,
  },
  {
    userId: 1,
    id: 2,
    title: 'quis ut nam facilis et officia qui',
    completed: false,
  },
];
