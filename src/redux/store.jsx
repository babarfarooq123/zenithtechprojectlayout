import { configureStore } from '@reduxjs/toolkit'
import zenithReducer from './reducer';

export const store = configureStore({
  reducer: {
    zenithReducer
  },
})