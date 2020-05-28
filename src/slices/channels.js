import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'axios';
import _ from 'lodash';
import routes from '../routes';
import { initialization } from '../actions';

export const postChannel = createAsyncThunk(
  'postChannelStatus',
  async ({ name }) => {
    const response = await Axios.post(routes.channelsPath(), {
      data: {
        attributes: {
          name,
        },
      },
    });
    return response.data;
  },
);
export const renameChannel = createAsyncThunk(
  'renameChannelStatus',
  async ({ channelId, name }) => {
    const response = await Axios.patch(routes.channelPath(channelId), {
      data: {
        attributes: {
          name,
        },
        id: channelId,
      },
    });
    return response.data;
  },
);
export const removeChannel = createAsyncThunk(
  'removeChannelStatus',
  async ({ channelId }) => {
    const response = await Axios.delete(routes.channelPath(channelId), {
      data: {
        attributes: {
          id: channelId,
        },
        id: channelId,
      },
    });
    return response.data;
  },
);
const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
  },
  reducers: {
    addChannel(state, { payload: { data } }) {
      const { byId, allIds } = state;
      return {
        ...state,
        byId: { ...byId, [data.id]: data.attributes },
        allIds: [...allIds, data.id],
      };
    },
    changeChannel(state, { payload: { id } }) {
      return {
        ...state,
        currentChannelId: id,
      };
    },
    renameChannel(state, { payload: { data } }) {
      const { byId } = state;
      return {
        ...state,
        byId: { ...byId, [data.id]: data.attributes },
      };
    },
    removeChannel(state, { payload: { data } }) {
      const { byId, allIds } = state;
      return {
        byId: _.omit(byId, data.id),
        allIds: allIds.filter((item) => item !== data.id),
        currentChannelId: 1,
      };
    },
  },
  extraReducers: {
    [initialization]: (state, action) => ({
      byId: action.payload.entities.channels,
      allIds: action.payload.result.channels,
      currentChannelId: action.payload.result.currentChannelId,
      statusRequest: 'idle',
      currentRequestId: null,
      error: null,
    }),
    [postChannel.fulfilled]: (state) => ({
      ...state,
      error: null,
    }),
    [postChannel.rejected]: (state, action) => ({
      ...state,
      error: action.error,
    }),
    [renameChannel.fulfilled]: (state) => ({
      ...state,
      error: null,
    }),
    [renameChannel.rejected]: (state, action) => ({
      ...state,
      error: action.error,
    }),
    [removeChannel.fulfilled]: (state) => ({
      ...state,
      error: null,
    }),
    [removeChannel.rejected]: (state, action) => ({
      ...state,
      error: action.error,
    }),
  },
});

export const asyncActions = { postChannel, renameChannel, removeChannel };
export const { actions } = channelsSlice;
export default channelsSlice.reducer;
