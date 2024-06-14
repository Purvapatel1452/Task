// features/group/groupSlice.js
import  {BASE_URL}  from '@env';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchGroups = createAsyncThunk(
  'group/fetchGroups',
  async (userId, { rejectWithValue }) => {
    try {
      console.log("U:'ppRL",BASE_URL,"33dkjdxiue::")
      const response = await axios.get(`${BASE_URL}/group/groups/${userId}`);
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
      console.log(BASE_URL,"Ve4wdwe))(_")
      const response = await axios.post(`${BASE_URL}/group/createGroup`, groupData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const fetchFriends = createAsyncThunk('groups/fetchFriends', async (userId, { rejectWithValue }) => {
    try {
      console.log(BASE_URL,"hxu3dihui'd")
      const response = await axios.get(`${BASE_URL}/user/accepted-friends/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  });


  export const fetchGroupExpenses = createAsyncThunk(
    'expense/fetchGroupExpenses',
    async (groupId, { rejectWithValue }) => {
   
      try {
        console.log(BASE_URL,"0=-8e2emkdlc,,%^")
        const response = await axios.get(`${BASE_URL}/expense/groupExpenses/${groupId}`);
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
        console.log(BASE_URL,"{{+xuVG")
        const response = await axios.get(`${BASE_URL}/message/group/${groupId}`);
        console.log(response.data,"???/////")
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
      console.log(BASE_URL,"::6{sjewoi893t}:swde")
      const response = await axios.get(`${BASE_URL}/group/groupPaymentStatus/${userId}`);
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
        friends:[],
        groupExpenses:[],
        groupPaymentStatus:[],
        groupData:null,
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
              });
    },
    reducers:undefined
    
});

export default groupSlice.reducer;
