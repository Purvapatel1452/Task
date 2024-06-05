// features/group/groupSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchGroups = createAsyncThunk(
  'group/fetchGroups',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://10.0.2.2:8000/chat/group/groups/${userId}`);
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
      const response = await axios.post('http://10.0.2.2:8000/chat/group/createGroup', groupData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const fetchFriends = createAsyncThunk('groups/fetchFriends', async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://10.0.2.2:8000/chat/user/accepted-friends/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  });


  export const fetchGroupExpenses = createAsyncThunk(
    'expense/fetchGroupExpenses',
    async (groupId, { rejectWithValue }) => {
      console.log(groupId,"?????????????")
      try {
        console.log(groupId,"--------------")
        const response = await axios.get(`http://10.0.2.2:8000/chat/expense/groupExpenses/${groupId}`);
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
        const response = await axios.get(`http://10.0.2.2:8000/chat/message/group/${groupId}`);
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
              });
    },
    reducers:undefined
    
});

export default groupSlice.reducer;
