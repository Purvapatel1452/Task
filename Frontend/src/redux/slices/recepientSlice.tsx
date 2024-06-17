import { BASE_URL } from '@env';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchRecepientData = createAsyncThunk(
  'recepient/fetchRecepientData',
  async (recepientId, { rejectWithValue }) => {
    try {
      console.log(BASE_URL,"Z#rgtrdhguyettfewergd#")
    
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
        console.log(BASE_URL,"{ikfdgguodherfgte6^")

        const response = await axios.get(`${BASE_URL}/expense/userExpenses/${userId}/${recepientId}`);
       
     
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

const recepientSlice = createSlice({
  name: 'recepient',
  initialState: {
    recepientDatas: null,
    userExpense:[],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecepientData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRecepientData.fulfilled, (state, action) => {
        state.loading = false;
        state.recepientDatas = action.payload;
      })
      .addCase(fetchRecepientData.rejected, (state, action) => {
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

export default recepientSlice.reducer;
