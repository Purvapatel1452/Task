import {BASE_URL} from '@env';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {useDispatch} from 'react-redux';

export const fetchMessages = createAsyncThunk(
  'chat/fetchMessages',
  async ({userId, groupId, recepientId}, {rejectWithValue}) => {
    try {
      let d = null;
      console.log(BASE_URL, 'KeffetewfedovjfwnjZ');
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

      const response = await axios.post(`${BASE_URL}/message/messages`, d);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

// export const sendMessage = createAsyncThunk(
//   'chat/sendMessage',
//   async ({ formData }, { rejectWithValue }) => {
//     try {
//         console.log(formData,".................")
//       const response = await axios.post('http://10.0.2.2:8000/chat/message/sendMessages', formData);
//       console.log(response,"{{{{{{{{")
//       return response;
//     } catch (error) {
//       return rejectWithValue(error.response);
//     }
//   }
// );

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async ({formData}, {rejectWithValue}) => {
    try {
      console.log(BASE_URL, 'M3edfwiertgrhi;edwerfw4td;N');
      const response = await fetch(`${BASE_URL}/message/sendMessages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      fetchMessages({formData});
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
  extraReducers: builder => {
    builder
      .addCase(fetchMessages.pending, state => {
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
      .addCase(sendMessage.pending, state => {
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
