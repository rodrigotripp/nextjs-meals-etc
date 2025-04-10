import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  loggedIn: boolean;
  member: boolean;
}

const initialState: UserState = {
  loggedIn: false,
  member: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logIn: (state) => {
      state.loggedIn = true;
    },
    logOut: (state) => {
      state.loggedIn = false;
    },
    signIn: (state) => {
      state.member = true;
    },
  },
});

export const { logIn, logOut, signIn } = userSlice.actions;
export default userSlice.reducer;
