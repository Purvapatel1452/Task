import { BASE_URL } from '@env';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchRecipientData = createAsyncThunk(
  'recipient/fetchRecipientData',
  async (recepientId, { rejectWithValue }) => {
    try {
      console.log(BASE_URL,"Z##")
      const response = await axios.get(`${BASE_URL}/message/user/${recepientId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const fetchUserExpenses = createAsyncThunk(
    'expenses/fetchUserExpenses',
    async ({ userId, recepientId }, { rejectWithValue }) => {
      try {
        console.log(BASE_URL,"{B^")

        const response = await axios.get(`${BASE_URL}/expense/userExpenses/${userId}/${recepientId}`);
       
     
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

const recipientSlice = createSlice({
  name: 'recipient',
  initialState: {
    recipientDatas: null,
    userExpense:[],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipientData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRecipientData.fulfilled, (state, action) => {
        state.loading = false;
        state.recipientDatas = action.payload;
      })
      .addCase(fetchRecipientData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserExpenses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.userExpense = action.payload;
      })
      .addCase(fetchUserExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default recipientSlice.reducer;
