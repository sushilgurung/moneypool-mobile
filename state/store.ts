// store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
/**
 *  Rootstate contains all the states
 */
export type RootState = ReturnType<typeof store.getState>;
/**
 *  contains all the dispatch action types
 */
export type AppDispatch = typeof store.dispatch;
