import { compose, applyMiddleware,legacy_createStore as createStore } from 'redux';
import { rootReducer } from './root-reducer';

const loggerMiddlewares = (store) => (next) => (action) => {
  if(!action.type) {
    return next(action)
  }

  console.log('type: ', action.type);
  console.log('payload: ', action.payload);
  console.log('currentState: ', store.getState());

  next(action)
  console.log('nextState: ', store.getState());
}

const middleWares = [loggerMiddlewares].filter(
  Boolean
);

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);