// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '../assets/application.scss';

// import faker from 'faker';
// @ts-ignore
import gon from 'gon';
// import cookies from 'js-cookie';
// import io from 'socket.io-client';
import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';

import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import * as reducers from './reducers';
import App from './components/App';

const middleware = getDefaultMiddleware({
  immutableCheck: false,
  serializableCheck: false,
  thunk: true,
});

const store = configureStore({
  reducer: { ...reducers },
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
});

ReactDOM.render(
  <Provider store={store}>
    <App gon={gon} />
  </Provider>,
  document.getElementById('chat'),
);

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

console.log('it works!');
console.log('gon', gon);
