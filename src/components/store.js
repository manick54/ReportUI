import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './reducerIndex';

export const store = configureStore({
  reducer: reducer
});
