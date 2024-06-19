import { BASE_URL } from '@env';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Helper function to get token
const getToken = async () => {
  return await AsyncStorage.getItem('authToken');
};

export const fetchMessages = createAsyncThunk(
  'chat/fetchMessages',
  async ({ userId, groupId, recepientId }, { rejectWithValue }) => {
    try {
      let d = null;
      console.log(BASE_URL, 'fggrtgeh gr');
      if (recepientId) {
        d = {
          senderId: userId,
          recepientId: recepientId,
        };
      } else {
        d = {
          senderId: userId,
          groupId: groupId,
        };
      }

      const token = await getToken();
      const response = await axios.post(`${BASE_URL}/message/messages`, d, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async ({ formData }, { rejectWithValue }) => {
    try {
      console.log(BASE_URL, 'gg;gtgfgg;N');
      const token = await getToken();
      const response = await axios.post(`${BASE_URL}/message/sendMessages`, formData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;

      fetchMessages({ formData });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.messages.push(action.payload);
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default chatSlice.reducer;











