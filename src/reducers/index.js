import { createAction, createReducer } from '@reduxjs/toolkit';

export const increment = createAction('increment');
export const decrement = createAction('decrement');

const counterReducer = createReducer(0, {
  [increment]: (state, action) => state + action.payload,
  [decrement.type]: (state, action) => state - action.payload,
});

export default counterReducer;
