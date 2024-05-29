import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userId: null,
    token: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.userId = action.payload.userid;
      state.token = action.payload.token;
    },
    clearUser: (state) => {
      state.userId = null;
      state.token = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice;
