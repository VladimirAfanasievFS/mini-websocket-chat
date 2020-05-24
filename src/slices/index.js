import { combineReducers } from 'redux';

import messages, { actions as messagesActions, postMessage } from './messages';
import channels, { actions as channelsActions, asyncActions as channelsAsyncActions } from './channels';
import modals, { actions as modalsActions } from './modals';
import { initialization } from '../actions';

export default combineReducers({
  messages,
  channels,
  modals,
});

const actions = {
  ...messagesActions,
  ...channelsActions,
  ...modalsActions,
  initialization,
};

const asyncActions = {
  postMessage,
  ...channelsAsyncActions,
};

export {
  actions,
  asyncActions,
};
