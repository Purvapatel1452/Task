import { BASE_URL } from '@env';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Helper function to get token
const getToken = async () => {
  return await AsyncStorage.getItem('authToken');
};

export const fetchRecepientData = createAsyncThunk(
  'recepient/fetchRecepientData',
  async (recepientId, { rejectWithValue }) => {
    try {
      console.log(BASE_URL,"KKbhihjgytg")
      const token = await getToken();
      const response = await axios.get(`${BASE_URL}/message/user/${recepientId}`, {
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

export const fetchUserExpenses = createAsyncThunk(
  'expenses/fetchUserExpenses',
  async ({ userId, recepientId }, { rejectWithValue }) => {
    try {
      const token = await getToken();
      const response = await axios.get(
        `${BASE_URL}/expense/userExpenses/${userId}/${recepientId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
    userExpense: [],
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















// import { BASE_URL } from '@env';
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';


// export const fetchRecepientData = createAsyncThunk(
//   'recepient/fetchRecepientData',
//   async (recepientId, { rejectWithValue }) => {
//     try {
//       console.log(BASE_URL,"Z#bgtfrgtrdhguybtfghettfewergd#")
    
//       const response = await axios.get(`${BASE_URL}/message/user/${recepientId}`);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );


// export const fetchUserExpenses = createAsyncThunk(
//     'expenses/fetchUserExpenses',
//     async ({ userId, recepientId }, { rejectWithValue }) => {
//       try {
//         console.log(BASE_URL,"{ikfdgbgguodherfhthgte6^")

//         const response = await axios.get(`${BASE_URL}/expense/userExpenses/${userId}/${recepientId}`);
       
     
//         return response.data;
//       } catch (error) {
//         return rejectWithValue(error.response.data);
//       }
//     }
//   );

// const recepientSlice = createSlice({
//   name: 'recepient',
//   initialState: {
//     recepientDatas: null,
//     userExpense:[],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchRecepientData.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchRecepientData.fulfilled, (state, action) => {
//         state.loading = false;
//         state.recepientDatas = action.payload;
//       })
//       .addCase(fetchRecepientData.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(fetchUserExpenses.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchUserExpenses.fulfilled, (state, action) => {
//         state.loading = false;
//         state.userExpense = action.payload;
//       })
//       .addCase(fetchUserExpenses.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default recepientSlice.reducer;
