import { combineReducers } from 'redux';

import { createAction } from '@reduxjs/toolkit';
import messages, { actions as messagesActions, postMessage } from './messages';
import channels, { actions as channelsActions, postChannel } from './channels';
import { initialization } from '../actions';

export default combineReducers({
  messages,
  channels,
});

const actions = {
  ...messagesActions,
  ...channelsActions,
  initialization,
};

const asyncActions = {
  postMessage,
  postChannel,
};

export {
  actions,
  asyncActions,
};
