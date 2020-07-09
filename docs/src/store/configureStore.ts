import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { createStore, compose, applyMiddleware } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import reduxThunk from 'redux-thunk';
import reducers from '../reducers';
import InitialState from '../reducers/InitialState';

export const history = createBrowserHistory();

function configureStoreProd() {
  const middlewares: any[] = [
    reduxThunk,
  ];
  const rootReducer = reducers(history);

  return createStore(
    rootReducer,
    InitialState,
    compose(
      applyMiddleware(
        routerMiddleware(history),
        ...middlewares
      )
    )
  );
}

function configureStoreDev() {
  const middlewares = [
    // Redux middleware that spits an error on you when you try to mutate your state either inside a dispatch or between dispatches.
    reduxImmutableStateInvariant(),
    reduxThunk,
  ];

  const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools
  const store = createStore(reducers, InitialState, composeEnhancers(
    applyMiddleware(...middlewares)
    )
  );

  if ((module as any).hot) {
    // Enable Webpack hot module replacement for reducers
    (module as any).hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}

export const configureStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev;

export default configureStore;
