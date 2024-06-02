// import { createSlice } from '@reduxjs/toolkit';

// const userSlice = createSlice({
//   name: 'user',
//   initialState: {
//     userId: null,
//     token: null,
//   },
//   reducers: {
//     setUser: (state, action) => {
//       state.userId = action.payload.userid;
//       state.token = action.payload.token;
//     },
//     clearUser: (state) => {
//       state.userId = null;
//       state.token = null;
//     },
//   },
// });

// export const { setUser, clearUser } = userSlice.actions;
// export default userSlice;


import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { decode } from 'base-64';


export const login=createAsyncThunk("auth/login",async(userData,{rejectWithValue})=>{
  try{
    const response=await axios.post("http://10.0.2.2:8000/chat/user/login",userData);
    const token=response.data.data;

    if(token){
      const [_,payloadBase64, __]=token.split('.');
      const decodedPayload=decode(payloadBase64);
      const decodedToken=JSON.parse(decodedPayload);
      const userId=decodedToken.userId;

      await AsyncStorage.setItem('authToken',token);

      return {userId,token};

    }
  }
    catch(error){
      return rejectWithValue(error.response.data.message)
    }
  
})

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userId: null,
    token: null,
    loading:false,
    error:null
  },
  reducers: {
    clearUser: (state) => {
      state.userId = null;
      state.token = null;
    },
  },
  extraReducers:(builder)=>{
    builder
      .addCase(login.pending,(state)=>{
        state.loading=true;
        state.error=null;
      })
      .addCase(login.fulfilled,(state,action)=>{
        state.loading=false;
        state.userId=action.payload.userId;
        state.token=action.payload.token
      })
      .addCase(login.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload
      })
  },
});

export const { clearUser } = authSlice.actions;
export default authSlice.reducer;
