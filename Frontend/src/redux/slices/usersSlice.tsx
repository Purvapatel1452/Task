import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://10.0.2.2:8000/chat/user/users/${userId}`);
      return response.data; // Assuming the API response structure is correct
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const fetchUserDetails = createAsyncThunk(
    'profile/fetchUserDetails',
    async (userId, { rejectWithValue }) => {
      try {
        const response = await axios.get(`http://10.0.2.2:8000/chat/user/userDetails/${userId}`);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

const usersSlice = createSlice({
  name: 'users', 
  initialState: {
    users: [],
    details: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.details = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default usersSlice.reducer;