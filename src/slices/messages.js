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
    addMessage(state, { payload: { data } }) {
      const { byId, allIds } = state;
      return {
        ...state,
        byId: { ...byId, [data.id]: data.attributes },
        allIds: [...allIds, data.id],
      };
    },
  },
  extraReducers: {
    [postMessage.pending]: (state, action) => {
      console.log('pending', action);

      return (state.statusRequest === 'idle') ? {
        ...state,
        statusRequest: 'pending',
        error: null,
        currentRequestId: action.meta.requestId,
      } : state;
    },
    [postMessage.fulfilled]: (state, action) => {
      const { meta: { requestId } } = action;
      return (state.statusRequest === 'pending' && state.currentRequestId === requestId) ? {
        ...state,
        statusRequest: 'idle',
        error: null,
        currentRequestId: null,
      } : state;
    },
    [postMessage.rejected]: (state, action) => {
      const { meta: { requestId } } = action;
      return (state.statusRequest === 'pending' && state.currentRequestId === requestId) ? {
        ...state,
        statusRequest: 'idle',
        error: action.error,
        currentRequestId: null,
      } : state;
    },
    [channelActions.removeChannel]: (state, { payload: { data } }) => {
      const { byId } = state;
      const filtered = _.filter(byId, (item) => item.channelId !== data.id);
      const byIdResult = _.keyBy(filtered, 'id');
      const allIdsResult = Object.keys(byIdResult).map(Number);
      return {
        ...state,
        byId: byIdResult,
        allIds: allIdsResult,
      };
    },

  },
});

export const { actions } = messagesSlice;
export default messagesSlice.reducer;
