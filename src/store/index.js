/* eslint-disable react/prop-types */
import React, { createContext } from 'react';
import { reducer, initialState } from './reducers';
import { useActions } from './action';
import { applyMiddleware } from './middleware';
import useCustomReducer from '../services/useCustomReducer';

const StoreContext = createContext(initialState);

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useCustomReducer(reducer, initialState, true);
  // Attach middleware to capture every dispatch
  const enhancedDispatch = applyMiddleware(dispatch);

  const actions = useActions(state, enhancedDispatch);

  return (
    <StoreContext.Provider value={{ state, actions }}>
      {children}
    </StoreContext.Provider>
  );
};

export { StoreContext, StoreProvider };
