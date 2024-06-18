import { BASE_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getToken = async () => {
  return await AsyncStorage.getItem('authToken');
};

export const fetchGroups = createAsyncThunk(
  'group/fetchGroups',
  async (userId, { rejectWithValue }) => {
    try {
      const token = await getToken();
      const response = await axios.get(`${BASE_URL}/group/groups/${userId}`, {
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

export const createGroup = createAsyncThunk(
  'group/createGroup',
  async (groupData, { rejectWithValue }) => {
    try {
      const token = await getToken();
      const response = await axios.post(`${BASE_URL}/group/createGroup`, groupData, {
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

export const fetchFriends = createAsyncThunk('groups/fetchFriends', async (userId, { rejectWithValue }) => {
  try {
    const token = await getToken();
    const response = await axios.get(`${BASE_URL}/user/accepted-friends/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

export const fetchGroupExpenses = createAsyncThunk(
  'expense/fetchGroupExpenses',
  async (groupId, { rejectWithValue }) => {
    try {
      const token = await getToken();
      const response = await axios.get(`${BASE_URL}/expense/groupExpenses/${groupId}`, {
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

export const fetchGroupData = createAsyncThunk(
  'group/fetchGroupData',
  async (groupId, { rejectWithValue }) => {
    try {
      const token = await getToken();
      const response = await axios.get(`${BASE_URL}/message/group/${groupId}`, {
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

export const fetchGroupPaymentStatus = createAsyncThunk(
  'group/fetchGroupPaymentStatus',
  async (userId, { rejectWithValue }) => {
    try {
      const token = await getToken();
      const response = await axios.get(`${BASE_URL}/group/groupPaymentStatus/${userId}`, {
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

export const editGroup = createAsyncThunk(
  'group/editGroup',
  async ({ groupId, groupData, userId }, { rejectWithValue }) => {
    try {
      const token = await getToken();
      const response = await axios.put(`${BASE_URL}/group/editGroup/${groupId}`, {
        ...groupData,
        adminId: userId,
      }, {
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

const groupSlice = createSlice({
  name: 'group',
  initialState: {
    groups: [],
    friends: [],
    groupExpenses: [],
    groupPaymentStatus: [],
    groupData: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroups.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.loading = false;
        state.groups = action.payload;
      })
      .addCase(fetchGroups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createGroup.pending, (state) => {
        state.loading = true;
      })
      .addCase(createGroup.fulfilled, (state, action) => {
        state.loading = false;
        state.groups.push(action.payload);
      })
      .addCase(createGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchFriends.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFriends.fulfilled, (state, action) => {
        state.loading = false;
        state.friends = action.payload;
      })
      .addCase(fetchFriends.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchGroupExpenses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGroupExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.groupExpenses = action.payload;
      })
      .addCase(fetchGroupExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchGroupData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGroupData.fulfilled, (state, action) => {
        state.loading = false;
        state.groupData = action.payload;
      })
      .addCase(fetchGroupData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchGroupPaymentStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGroupPaymentStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.groupPaymentStatus = action.payload;
      })
      .addCase(fetchGroupPaymentStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editGroup.pending, (state) => {
        state.loading = true;
      })
      .addCase(editGroup.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.groups.findIndex((group) => group._id === action.payload._id);
        if (index !== -1) {
          state.groups[index] = action.payload;
        }
      })
      .addCase(editGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
  reducers: {}
});

export default groupSlice.reducer;






















// // features/group/groupSlice.js
// import  {BASE_URL}  from '@env';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// const getToken = async () => {
//   return await AsyncStorage.getItem('authToken');
// };

// export const fetchGroups = createAsyncThunk(
//   'group/fetchGroups',
//   async (userId, { rejectWithValue }) => {
//     try {
//       const token = await getToken();
//       console.log("U:'yhtbpRL",BASE_URL,"tg5bgftg33ed3erxjhgy::")
//       const response = await axios.get(`${BASE_URL}/group/groups/${userId}`,{
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const createGroup = createAsyncThunk(
//   'group/createGroup',
//   async (groupData, { rejectWithValue }) => {
//     try {
//       console.log(BASE_URL,"Voitcjbgfrtghdews3girgihfdvfddwefe(_")
//       const response = await axios.post(`${BASE_URL}/group/createGroup`, groupData);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );


// export const fetchFriends = createAsyncThunk('groups/fetchFriends', async (userId, { rejectWithValue }) => {
//     try {
//       console.log(BASE_URL,"hg4edfhbfgg43rtyfwuy8d34r7hfgbfgthged")
//       const response = await axios.get(`${BASE_URL}/user/accepted-friends/${userId}`);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data.message);
//     }
//   });


//   export const fetchGroupExpenses = createAsyncThunk(
//     'expense/fetchGroupExpenses',
//     async (groupId, { rejectWithValue }) => {
   
//       try {
//         console.log(BASE_URL,"0=wed34sdgeghfbfgggfywgrgfreg34f6f^")
//         const response = await axios.get(`${BASE_URL}/expense/groupExpenses/${groupId}`);
//         return response.data;
//       } catch (error) {
//         return rejectWithValue(error.response.data);
//       }
//     }
//   );


//   export const fetchGroupData = createAsyncThunk(
//     'group/fetchGroupData',
//     async (groupId, { rejectWithValue }) => {
//       try {
//         console.log(BASE_URL,"{hrbfggedbgfhr43ghfthwgdhbtgh34fjgG")
//         const response = await axios.get(`${BASE_URL}/message/group/${groupId}`);
      
//         return response.data;
//       } catch (error) {
//         return rejectWithValue(error.response.data);
//       }
//     }
//   );


// export const fetchGroupPaymentStatus = createAsyncThunk(
//   'group/fetchGroupPaymentStatus',
//   async (userId, { rejectWithValue }) => {
//     try {
//       console.log(BASE_URL,"/hbff")
//       console.log(BASE_URL)
//       const response = await axios.get(`${BASE_URL}/group/groupPaymentStatus/${userId}`);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );



// export const editGroup = createAsyncThunk(
//   'group/editGroup',
//   async ({ groupId, groupData, userId }, { rejectWithValue }) => {
//     try {
//       console.log(BASE_URL,"KLSDrhdebtd34EhgfFWFffjhd3hgbd43fyg7weg")
 
//       const response = await axios.put(`${BASE_URL}/group/editGroup/${groupId}`, {
//         ...groupData,
//         adminId:userId,
//       });
  
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );





// const groupSlice = createSlice({
//     name: 'group',
//     initialState: {
//         groups: [],
//         friends:[],
//         groupExpenses:[],
//         groupPaymentStatus:[],
//         groupData:null,
//         loading: false,
//         error: null,
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchGroups.pending, (state) => {
//                 state.loading = true;
//             })
//             .addCase(fetchGroups.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.groups = action.payload;
//             })
//             .addCase(fetchGroups.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//             })
//             .addCase(createGroup.pending, (state) => {
//                 state.loading = true;
//             })
//             .addCase(createGroup.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.groups.push(action.payload);
//             })
//             .addCase(createGroup.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//             })
//             .addCase(fetchFriends.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//               })
//               .addCase(fetchFriends.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.friends = action.payload;
//               })
//               .addCase(fetchFriends.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//               })
//               .addCase(fetchGroupExpenses.pending, (state) => {
//                 state.loading = true;
//               })
//               .addCase(fetchGroupExpenses.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.groupExpenses = action.payload;
//               })
//               .addCase(fetchGroupExpenses.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//               })
//               .addCase(fetchGroupData.pending, (state) => {
//                 state.loading = true;
//               })
//               .addCase(fetchGroupData.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.groupData = action.payload;
//               })
//               .addCase(fetchGroupData.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//               })
//               .addCase(fetchGroupPaymentStatus.pending, (state) => {
//                 state.loading = true;
//               })
//               .addCase(fetchGroupPaymentStatus.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.groupPaymentStatus = action.payload;
//               })
//               .addCase(fetchGroupPaymentStatus.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//               })
//               .addCase(editGroup.pending, (state) => {
//                 state.loading = true;
//               })
//               .addCase(editGroup.fulfilled, (state, action) => {
//                 state.loading = false;
//                 const index = state.groups.findIndex((group) => group._id === action.payload._id);
//                 if (index !== -1) {
//                   state.groups[index] = action.payload;
//                 }
//               })
//               .addCase(editGroup.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//               });
//     },
//     reducers:{}
    
// });

// export default groupSlice.reducer;
