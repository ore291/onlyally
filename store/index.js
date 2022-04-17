import { applyMiddleware, createStore } from 'redux'
import { createWrapper } from 'next-redux-wrapper';
import {Action} from 'redux'
import createSagaMiddleware from 'redux-saga';
import userReducer from './slices/userSlice';
import creatorReducer from './slices/creatorSlice';
import navReducer from "./slices/NavSlice";
import homeReducer from './slices/homeSlice';
import postReducer from './slices/postSlice';
import mySaga from "./sagas";
import { combineReducers } from "redux";

const reducers = combineReducers({
  user: userReducer,
  creators: creatorReducer,
  navbar: navReducer,
  home: homeReducer,
  post: postReducer,
})

// const saga = createSagaMiddleware();
// const middlewares = [saga];
// const middleware = [...getDefaultMiddleware({thunk : false}), ...middlewares]

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

export const makeStore = (context) => {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(reducers, bindMiddleware([sagaMiddleware]))

  store.sagaTask = sagaMiddleware.run(mySaga)

  return store;
}

export const wrapper = createWrapper(makeStore, {debug : false});

// let store;
// export const initialiseStore = (preloadedState) => {
//   let _store = store ?? createStore(preloadedState);

//   if (preloadedState && store) {
//    _store = createStore({ ...store.getState(), ...preloadedState });
//     store = undefined;
//   }

//   // For SSG and SSR always create a new store
//   if (typeof window === 'undefined') return _store;
//   // Create the store once in the client
//   if (!store) store = _store;

//   return _store;
// };