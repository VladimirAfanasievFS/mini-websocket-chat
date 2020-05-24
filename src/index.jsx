// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '../assets/application.scss';


// @ts-ignore
import gon from 'gon';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import io from 'socket.io-client';
import ReactDOM from 'react-dom';
import React from 'react';
import { Provider, useDispatch } from 'react-redux';
import { normalize, schema } from 'normalizr';
import App from './components/App';
import nickNameContext from './lib/context';
// import store from './lib/store';
import nickName from './lib/nickName';
import reducers, { actions } from './slices';
import { initialization } from './actions';

console.log('it works!');
console.log('gon', gon);

const channels = new schema.Entity('channels');
const messages = new schema.Entity('messages');
const mySchema2 = {
  channels: [channels],
  messages: [messages],
};
const normalizedData = normalize(gon, mySchema2);
console.log('normalizedData', normalizedData);

const middleware = getDefaultMiddleware({
  immutableCheck: false,
  serializableCheck: false,
  thunk: true,
});

const store = configureStore({
  reducer: reducers,
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
});

store.dispatch(initialization(normalizedData));


ReactDOM.render(
  <Provider store={store}>
    <nickNameContext.Provider value={nickName}>
      <App gon={gon} />
    </nickNameContext.Provider>
  </Provider>,
  document.getElementById('chat'),
);

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}
