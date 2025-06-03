import { configureStore } from '@reduxjs/toolkit';
import formReducer from './formSlice';
import uiReducer from './uiSlice';

export const store = configureStore({
  reducer: {
    form: formReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;