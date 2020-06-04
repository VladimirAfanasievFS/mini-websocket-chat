/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'axios';
import routes from '../routes';

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
    addChannel(state, { payload: { data: { attributes } } }) {
      state.entities.push(attributes);
    },
    changeChannel(state, { payload: { id } }) {
      state.currentChannelId = id;
    },
    renameChannel(state, { payload: { data } }) {
      state.entities = state.entities.map((item) => (
        (item.id === data.id) ? data.attributes : item));
    },
    removeChannel(state, { payload: { data } }) {
      state.entities = state.entities.filter((item) => item.id !== data.id);
      state.currentChannelId = 1;
    },
  },
  extraReducers: {
    [postChannel.fulfilled]: (state) => { state.error = null; },
    [postChannel.rejected]: (state, action) => { state.error = action.error; },
    [renameChannel.fulfilled]: (state) => { state.error = null; },
    [renameChannel.rejected]: (state, action) => { state.error = action.error; },
    [removeChannel.fulfilled]: (state) => { state.error = null; },
    [removeChannel.rejected]: (state, action) => { state.error = action.error; },
  },
});

export const asyncActions = { postChannel, renameChannel, removeChannel };
export const { actions } = channelsSlice;
export default channelsSlice.reducer;
