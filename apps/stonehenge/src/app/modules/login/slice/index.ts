import { createSlice } from '@reduxjs/toolkit';

export interface LoginProps {
  loginPop: boolean;
  title: string;
  registerPop: boolean;
}

const initialLoginProps: LoginProps = {
  loginPop: false,
  registerPop: false,
  title: '',
};

export const LoginSlice = createSlice({
  name: 'login-pop',
  initialState: initialLoginProps,
  reducers: {
    handleLoginModal: (state, action) => {
      state = {
        registerPop: false,
        loginPop: action.payload,
        title: 'Sign In',
      };
      return state;
    },
    handleRegisterModal: (state, action) => {
      state = {
        loginPop: false,
        registerPop: action.payload,
        title: 'Register',
      };
      return state;
    },
  },
});

export const { handleLoginModal, handleRegisterModal } = LoginSlice.actions;
