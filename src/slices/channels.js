import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'axios';
import _ from 'lodash';
import routes from '../routes';
import { initialization } from '../actions';

export const postChannel = createAsyncThunk(
  'postchannelstatus',
  async ({ name }, { getState, requestId }) => {
    // const { currentRequestId, loading } = getState().users;
    // if (loading !== 'pending' || requestId !== currentRequestId) {
    //   return null;
    // }
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
  },
  extraReducers: {
    [initialization]: (state, action) => ({
      byId: action.payload.entities.channels,
      allIds: action.payload.result.channels,
      currentChannelId: action.payload.result.currentChannelId,
    }),
  },
});

export const { actions } = channelsSlice;
export default channelsSlice.reducer;
