import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'axios';
import _ from 'lodash';
import routes from '../routes';
import { initialization } from '../actions';

export const postMessage = createAsyncThunk(
  'postMessageStatus',
  async ({ channelId, message, nickName }, { getState, requestId }) => {
    // const { currentRequestId, loading } = getState().users;
    // if (loading !== 'pending' || requestId !== currentRequestId) {
    //   return null;
    // }
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
    createPost(state, action) {
      return {
        ...state,
        values: action.payload,
      };
    },
    addMessage(state, { payload: { data } }) {
      const { byId, allIds } = state;
      return {
        byId: { ...byId, [data.id]: data.attributes },
        allIds: [...allIds, data.id],
      };
    },
  },
  extraReducers: {
    [initialization]: (state, action) => ({
      byId: action.payload.entities.messages,
      allIds: action.payload.result.messages,
    }),
    [postMessage.pending]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending';
        state.currentRequestId = action.meta.requestId;
      }
    },
    [postMessage.fulfilled]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.entities.push(action.payload);
        state.currentRequestId = undefined;
      }
    },
    [postMessage.rejected]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.error = action.error;
        state.currentRequestId = undefined;
      }
    },
  },
});

export const { actions } = messagesSlice;
export default messagesSlice.reducer;
