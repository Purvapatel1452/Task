import { BASE_URL } from '@env';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPaymentIntent = createAsyncThunk(
  'payment/fetchPaymentIntent',
  async ({amount}, { rejectWithValue }) => {
    try {
      console.log(BASE_URL,"ZZgergjhuysrtgtrdsveydewuX")
      const response = await fetch(`${BASE_URL}/payments/intents`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount}),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create payment intent');
      }

      return data.paymentIntent;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createPaymentIntent = createAsyncThunk(
  'payment/createPaymentIntent',
  async ({amount}, { rejectWithValue }) => {
    try {
      console.log(BASE_URL,"VkjsdvergfyhrvdrgtFgeR")
      const response = await fetch(`${BASE_URL}/payments/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      });

      const { client_secret } = await response.json();
      return client_secret;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    loading: false,
    error: null,
    paymentIntentClientSecret: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaymentIntent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPaymentIntent.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentIntentClientSecret = action.payload;
      })
      .addCase(fetchPaymentIntent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createPaymentIntent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPaymentIntent.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentIntentClientSecret = action.payload;
      })
      .addCase(createPaymentIntent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default paymentSlice.reducer;
