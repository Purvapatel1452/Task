import { BASE_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { decode } from 'base-64';

// Define interfaces for the state and the async thunk payload
interface AuthState {
  userId: string | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

interface LoginResponse {
  userId: string;
  token: string;
}

interface UserData {
  email: string;
  password: string;
}

// Async thunk for user login
export const login = createAsyncThunk<LoginResponse, UserData, { rejectValue: string }>(
  'auth/login',
  async (userData, { rejectWithValue }) => {
    try {
      console.log('LOGI');
      console.log(BASE_URL,';;;;;;erefrhfdhiyl');
   
      const response = await axios.post(`${BASE_URL}/user/login`, userData);
      const token = response.data.data;

      console.log(token, 'token');

      if (token) {
        const [_, payloadBase64, __] = token.split('.');
        const decodedPayload = decode(payloadBase64);
        const decodedToken = JSON.parse(decodedPayload);
        const userId = decodedToken.userId;

        await AsyncStorage.setItem('authToken', token);

        return { userId, token };
      }
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Initial state for the auth slice
const initialState: AuthState = {
  userId: null,
  token: null,
  loading: false,
  error: null,
};

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearUser: (state) => {
      state.userId = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
        state.loading = false;
        state.userId = action.payload.userId;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
      });
  },
});

export const { clearUser } = authSlice.actions;
export default authSlice.reducer;





















// import {BASE_URL} from '@env';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
// import axios from 'axios';
// import {decode} from 'base-64';

// export const login = createAsyncThunk(
//   'auth/login',
//   async (userData, {rejectWithValue}) => {
//     try {
//       console.log('LOGI');
//       console.log(BASE_URL, 'AA');
//       const response = await axios.post(`${BASE_URL}/user/login`, userData);
//       const token = response.data.data;

//       console.log(token, 'token');

//       if (token) {
//         const [_, payloadBase64, __] = token.split('.');
//         const decodedPayload = decode(payloadBase64);
//         const decodedToken = JSON.parse(decodedPayload);
//         const userId = decodedToken.userId;

//         await AsyncStorage.setItem('authToken', token);

//         return {userId, token};
//       }
//     } catch (error) {
//       return rejectWithValue(error.response.data.message);
//     }
//   },
// );

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     userId: null,
//     token: null,
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     clearUser: state => {
//       state.userId = null;
//       state.token = null;
//     },
//   },
//   extraReducers: builder => {
//     builder
//       .addCase(login.pending, state => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         state.loading = false;
//         state.userId = action.payload.userId;
//         state.token = action.payload.token;
//       })
//       .addCase(login.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const {clearUser} = authSlice.actions;
// export default authSlice.reducer;
