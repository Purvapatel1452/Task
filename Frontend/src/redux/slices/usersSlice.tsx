import { BASE_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getToken = async () => {
  return await AsyncStorage.getItem('authToken');
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (userId, { rejectWithValue }) => {
    try {
      console.log(BASE_URL,"{djyuggewd")
      const token = await getToken();
      const response = await axios.get(`${BASE_URL}/user/users/${userId}`, {
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

export const fetchUserDetails = createAsyncThunk(
  'profile/fetchUserDetails',
  async (userId, { rejectWithValue }) => {
    try {
      console.log(BASE_URL,"{djgegwuy8d")
      const token = await getToken();
      const response = await axios.get(`${BASE_URL}/user/userDetails/${userId}`, {
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

export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async ({ userId, name, mobile }, { rejectWithValue }) => {
    try {
      console.log(BASE_URL,"{kjhwd")
      const token = await getToken();
      const response = await axios.post(`${BASE_URL}/user/editProfile`, {
        userId,
        name,
        mobile,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteUserAccount = createAsyncThunk(
  'users/deleteUserAccount',
  async ({ userId }, { rejectWithValue }) => {
    try {
      console.log(BASE_URL,"{djgewkjghd")
      const token = await getToken();
      const response = await axios.delete(`${BASE_URL}/user/deleteUser/${userId}`, {
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

export const recoverUserAccount = createAsyncThunk(
  'users/recoverUserAccount',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      console.log(BASE_URL,"{ddiuy8")
      const token = await getToken();
      const response = await axios.post(`${BASE_URL}/recoverUser`, { email, password }, {
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
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.details = action.payload;
        state.loading = false;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default usersSlice.reducer;















// import { BASE_URL } from '@env';
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// export const fetchUsers = createAsyncThunk(
//   'users/fetchUsers',
//   async (userId, { rejectWithValue }) => {
//     try {
//       console.log(BASE_URL,"gtwerhyt34fgjghtbftu43454ht*")
//       const response = await axios.get(`${BASE_URL}/user/users/${userId}`);
//       return response.data; // Assuming the API response structure is correct
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );


// export const fetchUserDetails = createAsyncThunk(
//     'profile/fetchUserDetails',
//     async (userId, { rejectWithValue }) => {
//       try {
//         console.log(BASE_URL,"Mthgthbfhttyufrwtgthef<rg5xxdwe")
//         const response = await axios.get(`${BASE_URL}/user/userDetails/${userId}`);
//         return response.data;
//       } catch (error) {
//         return rejectWithValue(error.response.data);
//       }
//     }
//   );


//   export const updateUserProfile = createAsyncThunk(
//     'user/updateProfile',
//     async ({ userId, name, mobile }, { rejectWithValue }) => {
//       try {
//         console.log(BASE_URL,"LDK")
//         const response = await axios.post(`${BASE_URL}/user/editProfile`, {
//           userId,
//           name,
//           mobile,
//         });
//         return response.data.user;
//       } catch (error) {
//         return rejectWithValue(error.response.data);
//       }
//     }
//   );

//   export const deleteUserAccount = createAsyncThunk(
//     'users/deleteUserAccount',
//     async ({ userId }, { rejectWithValue }) => {
//       try {
//         console.log(BASE_URL,"CDSFWdscw")
//         const response = await axios.delete(`${BASE_URL}/user/deleteUser/${userId}`);
//         console.log(response.data,":::")
//         return response.data;
//       } catch (error) {
//         return rejectWithValue(error.response.data);
//       }
//     }
//   );
  
//   // Thunk for recovering user account
//   export const recoverUserAccount = createAsyncThunk(
//     'users/recoverUserAccount',
//     async ({ email,password }, { rejectWithValue }) => {
//       try {
//         console.log(BASE_URL,"CDfvjkfhuif")
//         const response = await axios.post(`${BASE_URL}/recoverUser`,{email,password});
//         return response.data;
//       } catch (error) {
//         return rejectWithValue(error.response.data);
//       }
//     }
//   );

// const usersSlice = createSlice({
//   name: 'users', 
//   initialState: {
//     users: [],
//     details: {},
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUsers.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchUsers.fulfilled, (state, action) => {
//         state.loading = false;
//         state.users = action.payload;
//       })
//       .addCase(fetchUsers.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(fetchUserDetails.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchUserDetails.fulfilled, (state, action) => {
//         state.loading = false;
//         state.details = action.payload;
//       })
//       .addCase(fetchUserDetails.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(updateUserProfile.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(updateUserProfile.fulfilled, (state, action) => {
//         state.details = action.payload;
//         state.loading = false;
//       })
//       .addCase(updateUserProfile.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default usersSlice.reducer;