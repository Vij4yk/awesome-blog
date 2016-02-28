import React from 'react';
import {applyMiddleware, createStore, combineReducers} from 'redux';
import { compose } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { browserHistory } from 'react-router';

export function createOnClient(reducerRegistry, DevTools, initialState) {

  const middleware = [thunk, logger()];

  const reducer = combineReducers(reducerRegistry.getReducers());

  const finalCreateStore = compose(
    applyMiddleware(...middleware),
    DevTools.instrument()
  )(createStore);

  const store = finalCreateStore(reducer, initialState);

  // Reconfigure the store's reducer when the reducer registry is changed - we
  // depend on this for loading reducers via code splitting and for hot
  // reloading reducer modules.
  reducerRegistry.setChangeListener((reducers) => {
    store.replaceReducer(combineReducers(reducers))
  });

  return store;
}

export function createOnServer(reducerRegistry, initialState) {
  const middleware = [thunk];

  const reducer = combineReducers(reducerRegistry.getReducers());

  const finalCreateStore = compose(
    applyMiddleware(...middleware)
  )(createStore);

  const store = finalCreateStore(reducer, initialState);

  // Reconfigure the store's reducer when the reducer registry is changed - we
  // depend on this for loading reducers via code splitting and for hot
  // reloading reducer modules.
  reducerRegistry.setChangeListener((reducers) => {
    store.replaceReducer(combineReducers(reducers))
  });

  return store;
}