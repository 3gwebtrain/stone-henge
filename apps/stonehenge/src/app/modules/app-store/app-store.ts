import { configureStore } from '@reduxjs/toolkit';
import { LoginSlice } from '../login/slice';

const appStore = configureStore({
  reducer: {
    LoginStore: LoginSlice.reducer,
  },
});

export type AppState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
export default appStore;
