/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'axios';
import _ from 'lodash';
import routes from '../routes';
import { actions as channelActions } from './channels';


export const postMessage = createAsyncThunk(
  'postMessageStatus',
  async ({ channelId, message, nickName }, { getState, requestId }) => {
    const { currentRequestId, statusRequest } = getState().messages;
    if (statusRequest !== 'pending' || requestId !== currentRequestId) {
      return null;
    }
    const response = await Axios.post(routes.channelMessagesPath(channelId), {
      data: {
        attributes: {
          channelId,
          message,
          nickName,
          id: _.uniqueId(),
        },
        id: channelId,
      },
    });
    return response.data;
  },
);
const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
  },
  reducers: {
    addMessage(state, { payload: { data: { attributes } } }) {
      state.entities.push(attributes);
    },
  },
  extraReducers: {
    [postMessage.pending]: (state, action) => {
      if (state.statusRequest === 'idle') {
        state.statusRequest = 'pending';
        state.error = null;
        state.currentRequestId = action.meta.requestId;
      }
    },
    [postMessage.fulfilled]: (state, action) => {
      const { meta: { requestId } } = action;
      if (state.statusRequest === 'pending' && state.currentRequestId === requestId) {
        state.statusRequest = 'idle';
        state.error = null;
        state.currentRequestId = null;
      }
    },
    [postMessage.rejected]: (state, action) => {
      const { meta: { requestId } } = action;
      if (state.statusRequest === 'pending' && state.currentRequestId === requestId) {
        state.statusRequest = 'idle';
        state.error = action.error;
        state.currentRequestId = null;
      }
    },
    [channelActions.removeChannel]: (state, { payload: { data } }) => {
      state.entities = state.entities.filter((item) => item.channelId !== data.id);
    },

  },
});

export const { actions } = messagesSlice;
export default messagesSlice.reducer;
