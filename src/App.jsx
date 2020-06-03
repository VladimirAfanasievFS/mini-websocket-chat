// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '../assets/application.scss';


// @ts-ignore
import gon from 'gon';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { normalize, schema } from 'normalizr';
import MainForm from './components/MainForm';
import NickNameContext from './lib/context';
import nickName from './lib/nickName';
import reducers from './slices';

const App = () => {
  console.log('it works!');
  console.log('gon', gon);

  const channels = new schema.Entity('channels');
  const messages = new schema.Entity('messages');
  const mySchema2 = {
    channels: [channels],
    messages: [messages],
  };

  const normalizedData = normalize(gon, mySchema2);

  const middleware = getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
    thunk: true,
  });

  const store = configureStore({
    reducer: reducers,
    middleware,
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: {
      channels: {
        byId: normalizedData.entities.channels,
        allIds: normalizedData.result.channels,
        currentChannelId: normalizedData.result.currentChannelId,
        statusRequest: 'idle',
        currentRequestId: null,
        error: null,
      },
      messages: {
        byId: normalizedData.entities.messages,
        allIds: normalizedData.result.messages,
        statusRequest: 'idle',
        currentRequestId: null,
        error: null,
      },
    },
  });

  // @ts-ignore
  // store.dispatch(initialization(normalizedData));


  ReactDOM.render(
    <Provider store={store}>
      <NickNameContext.Provider value={nickName}>
        <MainForm />
      </NickNameContext.Provider>
    </Provider>,
    document.getElementById('chat'),
  );

  if (process.env.NODE_ENV !== 'production') {
    localStorage.debug = 'chat:*';
  }
};

export default App;
