import { useReducer, useRef, useCallback, useEffect } from 'react';

export default function useCustomReducer(
  reducerFn,
  initialState,
  enableLogger,
) {
  const [state, dispatch] = useReducer(reducerFn, initialState);

  const preState = useRef();

  const dispatchWithLogging = useCallback(action => {
    preState.current = {
      ...preState.current,
      actionType: action.type || action,
      action,
    };

    dispatch(action);
  }, []);

  const customDispatch = enableLogger ? dispatchWithLogging : dispatch;

  useEffect(
    () =>
      function logStateAfterChange() {
        if (!enableLogger || !preState.current) return;

        const { actionType, state: previousState, action } = preState.current;

        console.groupCollapsed(`${actionType}`);
        console.log('%c Previous State', 'color: red;', state);
        console.log('%c Action', 'color: blue;', action);
        console.log('%c Current State', 'color: green;', previousState);
        console.groupEnd();
      },
    [state, enableLogger],
  );

  preState.current = { ...preState.current, state };

  return [state, customDispatch];
}
