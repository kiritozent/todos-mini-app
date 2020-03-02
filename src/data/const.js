export const DEFAULT_REDUCERS = {
  payload: null,
  error: false,
  fetching: false,
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
