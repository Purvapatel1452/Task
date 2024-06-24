import { BASE_URL } from '@env';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Helper function to get token
const getToken = async () => {
  return await AsyncStorage.getItem('authToken');
};

export const addExpense = createAsyncThunk(
  'expense/addExpense',
  async (expenseData, { rejectWithValue }) => {
    try {
      console.log(BASE_URL, 'gg;gjuiktgflkj9y8gg;N');
      const token = await getToken();
      const response = await axios.post(`${BASE_URL}/expense/addExpense`, expenseData, {
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

export const fetchExpenses = createAsyncThunk(
  'expense/fetchExpenses',
  async ({ userId, expenseType, type }, { rejectWithValue }) => {
    try {
      console.log(BASE_URL, 'gg;gjuiktgfg5hfgg;N');
      const token = await getToken();
      console.log(BASE_URL, "??bgtbtgrtfv");
      if (type !== undefined) {
        expenseType = '';
      }

      const response = await axios.get(`${BASE_URL}/expense/expenses/${userId}?expenseType=${expenseType}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      let list = [];
      if (type == 'settled') {
        response.data.expenses.map(expense => {
          if (expense.settled) {
            list.push(expense);
          }
        });
      } else {
        response.data.expenses.map(expense => {
          list.push(expense);
        });
      }

      return list;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const expensesSlice = createSlice({
  name: 'expenses',
  initialState: {
    expenses: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addExpense.pending, (state) => {
        state.loading = true;
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses.push(action.payload);
      })
      .addCase(addExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchExpenses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = action.payload;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  },
  reducers: undefined
});

export default expensesSlice.reducer;























// import { BASE_URL } from '@env';
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// export const addExpense = createAsyncThunk(
//   'expense/addExpense',
//   async (expenseData, { rejectWithValue }) => {
//     try {
//       console.log(BASE_URL,"N3rgrthrfrtbfytgr8fewhtrvgrdr>>")
//       const response = await axios.post(`${BASE_URL}/expense/addExpense`, expenseData);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );


// export const fetchExpenses = createAsyncThunk(
//     'expense/fetchExpenses',
//     async ({ userId, expenseType,type }, { rejectWithValue }) => {
//       try {
//         console.log(BASE_URL,"??bgtbtgrtfv")
//         if(type!==undefined){
//           expenseType=''

//         }

//         const response = await axios.get(`${BASE_URL}/expense/expenses/${userId}?expenseType=${expenseType}`);
 
//         let list=[];
//             if(type=='settled'){
              
      
//               response.data.expenses.map(expense=>{
//                 if(expense.settled){
//                   list.push(expense)
//                 }
//               })
      
//             }else{
//               response.data.expenses.map(expense=>{
               
//                   list.push(expense)
                
//               })
              
//             }


           
//         return list;
//       } catch (error) {
//         return rejectWithValue(error.response.data);
//       }
//     }
//   );


// const expensesSlice = createSlice({
//     name: 'expenses',
//     initialState: {
//         expenses: [],
//         loading: false,
//         error: null,
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(addExpense.pending, (state) => {
//                 state.loading = true;
//             })
//             .addCase(addExpense.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.expenses.push(action.payload);
//             })
//             .addCase(addExpense.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//             })
//             .addCase(fetchExpenses.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(fetchExpenses.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.expenses = action.payload;
//             })
//             .addCase(fetchExpenses.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//             });

//     },
//     reducers: undefined
// });

// export default expensesSlice.reducer;
