import { BASE_URL } from '@env';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Helper function to get token
const getToken = async () => {
  return await AsyncStorage.getItem('authToken');
};

// Async thunk for fetching user subscription
export const fetchUserSubscription = createAsyncThunk(
  'user/fetchSubscription',
  async (userId, { rejectWithValue }) => {
    try {
      const token = await getToken();
      const response = await axios.get(`${BASE_URL}/user/getSubscription/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for updating user subscription
export const updateUserSubscription = createAsyncThunk(
  'user/updateSubscription',
  async ({ userId, subscriptionType }, { rejectWithValue }) => {
    try {
      const token = await getToken();
      const response = await axios.post(`${BASE_URL}/user/setSubscription`, {
        userId,
        subscriptionType,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const subscriptionSlice = createSlice({
  name: 'sub',
  initialState: {
    subscription: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserSubscription.fulfilled, (state, action) => {
        state.loading = false;
        state.subscription = action.payload;
      })
      .addCase(fetchUserSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserSubscription.fulfilled, (state, action) => {
        state.loading = false;
        state.subscription = action.payload;
      })
      .addCase(updateUserSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default subscriptionSlice.reducer;









// // redux/userSlice.js
// import { BASE_URL } from '@env';
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';


// // Async thunk for fetching user subscription
// export const fetchUserSubscription = createAsyncThunk(
//   'user/fetchSubscription',
//   async (userId,  { rejectWithValue }) => {
//     try {
//         console.log(BASE_URL,"LEFfe")
//         console.log("FETCHSUB")
//       const response = await axios.get(`${BASE_URL}/user/getSubscription/${userId}`);
//       console.log(response.data)
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// // Async thunk for updating user subscription
// export const updateUserSubscription = createAsyncThunk(
//   'user/updateSubscription',
//   async ({ userId, subscriptionType },  { rejectWithValue }) => {
//     try {
//         console.log(BASE_URL,"edwdfhrek")
//         console.log(userId,subscriptionType)
//       const response = await axios.post(`${BASE_URL}/user/setSubscription`, {
//         userId,
//         subscriptionType,
//       });
//       console.log(response.data)
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// const subscriptionSlice = createSlice({
//   name: 'sub',
//   initialState: {
//     subscription: null,
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUserSubscription.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchUserSubscription.fulfilled, (state, action) => {
//         state.loading = false;
//         state.subscription = action.payload;
//       })
//       .addCase(fetchUserSubscription.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(updateUserSubscription.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(updateUserSubscription.fulfilled, (state, action) => {
//         state.loading = false;
//         state.subscription = action.payload;
//       })
//       .addCase(updateUserSubscription.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default subscriptionSlice.reducer;
