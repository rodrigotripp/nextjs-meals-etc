import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '@/app/_state/counterSlice';
import userReducer from '@/app/_state/userSlice';
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
