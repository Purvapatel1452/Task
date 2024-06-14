import { BASE_URL } from '@env';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk for fetching expense details
export const fetchExpense = createAsyncThunk('expense/fetchExpense', async (expenseId, { rejectWithValue }) => {
  try {console.log(BASE_URL,"ZMMsdw")
   
    const response = await axios.get(`${BASE_URL}/expense/expense/${expenseId}`);
    const expenseData = response.data;

    // Set current user's payment status as paid
    const updatedPayments = expenseData.payments.map((payment) => {
      if (payment.participant._id === expenseData.payerId._id) {
        return { ...payment, paid: true };
      }
      return payment;
    });

    return { ...expenseData, payments: updatedPayments };
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Thunk for updating payment status
export const updatePaymentStatus = createAsyncThunk('expense/updatePaymentStatus', async ({ expenseId, participantId, paid }, { rejectWithValue }) => {
  try {
    console.log(BASE_URL,"Hrt4[]")
    await axios.post(`${BASE_URL}/expense/paymentStatus`, { expenseId, participantId, paid });
    return { participantId, paid };
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const expenseSlice = createSlice({
  name: 'expense',
  initialState: {
    expens: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Expense
      .addCase(fetchExpense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExpense.fulfilled, (state, action) => {
        
        state.loading = false;
        state.expens = action.payload;
        console.log(state.expens,">>>>>>>>>>>>>>>>")
      
      })
      .addCase(fetchExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Payment Status
      .addCase(updatePaymentStatus.fulfilled, (state, action) => {
        if (state.expens) {
          state.expens.payments = state.expens.payments.map(payment =>
            payment.participant._id === action.payload.participantId
              ? { ...payment, paid: action.payload.paid }
              : payment
          );
        }
      });
  },
});

export default expenseSlice.reducer;
