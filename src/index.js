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
import FirstComponent from './FirstComponent';

ReactDOM.render(
  // eslint-disable-next-line react/jsx-filename-extension
  <FirstComponent gon={gon} />,
  document.querySelector('#chat'),
);

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

console.log('it works!');
console.log('gon', gon);
