/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'axios';
import _ from 'lodash';
import routes from '../routes';
import { actions as channelActions } from './channels';


export const postMessage = createAsyncThunk(
  'postMessageStatus',
  async ({ channelId, message, nickName, avatar, timestamp }) => {
    const response = await Axios.post(routes.channelMessagesPath(channelId), {
      data: {
        attributes: {
          channelId,
          message,
          nickName,
          avatar,
          timestamp,
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
    [channelActions.removeChannel]: (state, { payload: { data } }) => {
      state.entities = state.entities.filter((item) => item.channelId !== data.id);
    },

  },
});

export const { actions } = messagesSlice;
export default messagesSlice.reducer;
