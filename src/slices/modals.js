import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  modalType: null,
  modalProps: {},
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    showModal(state, action) {
      return {
        modalType: action.payload.modalType,
        modalProps: action.payload.modalProps,
      };
    },
    hideModal() {
      return initialState;
    },
  },
});

export const { actions } = modalsSlice;
export default modalsSlice.reducer;
