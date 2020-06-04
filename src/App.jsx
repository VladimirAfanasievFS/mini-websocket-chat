// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '../assets/application.scss';


// @ts-ignore
import gon from 'gon';
import { configureStore } from '@reduxjs/toolkit';

import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import MainForm from './components/MainForm';
import NickNameContext from './lib/context';
import nickName from './lib/nickName';
import reducers, { actions } from './slices';
import connectSocket from './socket';

const App = () => {
  console.log('it works!');
  console.log('gon', gon);
  const preloadedState = {
    channels: {
      entities: gon.channels,
      currentChannelId: gon.currentChannelId,
      statusRequest: 'idle',
      currentRequestId: null,
      error: null,
    },
    messages: {
      entities: gon.messages,
      statusRequest: 'idle',
      currentRequestId: null,
      error: null,
    },
  };

  const store = configureStore({
    reducer: reducers,
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState,
  });

  const { dispatch } = store;
  const socket = connectSocket(document.URL);

  socket.on('newMessage', (data) => {
    dispatch(actions.addMessage(data));
  });
  socket.on('newChannel', (data) => {
    dispatch(actions.addChannel(data));
  });
  socket.on('renameChannel', (data) => {
    dispatch(actions.renameChannel(data));
  });
  socket.on('removeChannel', (data) => {
    dispatch(actions.removeChannel(data));
  });

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
