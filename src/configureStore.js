import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import monitorReducersEnhancer from './utils/monitorReducers';
import actionLoggerMiddleware from './utils/actionLogger';
import rootReducer from './reducers';
import dynamicReducers from './utils/dynamicReducers';

let composeEnhanchers = compose;
if (process.env.NODE_ENV !== 'production') {
  composeEnhanchers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
}

export default function configureStore(preloadedState) {
  const middlewares = [thunk];
  if (process.env.NODE_ENV !== 'production')
    middlewares.push(actionLoggerMiddleware);
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer, dynamicReducers];
  if (process.env.NODE_ENV !== 'production')
    enhancers.push(monitorReducersEnhancer);
  const composedEnhancers = composeEnhanchers(...enhancers);

  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  // hot reloading - only reset the code changed reducer, https://redux.js.org/usage/configuring-your-store#hot-reloading
  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer));
  }

  return store;
}
