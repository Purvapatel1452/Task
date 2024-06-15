import { BASE_URL } from '@env';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';


// Fetch friends payment status
export const fetchFriendsPaymentStatus = createAsyncThunk(
  'chat/fetchFriendsPaymentStatus',
  async (userId, { rejectWithValue }) => {
    try {
      console.log(BASE_URL,"ZK4iuhuyf65er8K1qqq")
      const response = await fetch(`${BASE_URL}/user/friendsPaymentStatus/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch friends payment status');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const fetchFriendRequests = createAsyncThunk(
  'friendRequests/fetchFriendRequests',
  async (userId, { rejectWithValue }) => {
    try {
      console.log(BASE_URL,"DXrfiydrd5dce22x")
      const response = await axios.get(`${BASE_URL}/user/friend-request/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const acceptFriendRequest = createAsyncThunk(
  'friendRequest/acceptFriendRequest',
  async ({friendRequestId,userId}, {  rejectWithValue }) => {
    
   console.log(friendRequestId,userId,"ZHH")
   console.log(BASE_URL,"ZJdcdytg6fiy22J")
    try {
      const d={
        senderId: friendRequestId,
        recepientId: userId

      }
  
      const response = await fetch(`${BASE_URL}/user/friend-request/accept`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(d)
      });

      if (!response.ok) {
        throw new Error('Failed to accept friend request');
      }

      return friendRequestId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const sendFriendRequest = createAsyncThunk(
  'friendRequest/sendFriendRequest',
  async ({ currentUserId, selectedUserId }, { rejectWithValue }) => {
    try {
      console.log(BASE_URL,"<MK!!i43uhg6yr2eded:>")
      const response = await axios.post(`${BASE_URL}/user/friend-request`, {
        currentUserId,
        selectedUserId
      });

      console.log(response,"::::{{{{{{{")

    
     
      return selectedUserId; // return selected user ID to update the state
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to check if a friend request is already sent
export const checkFriendRequest = createAsyncThunk(
  'friendRequest/checkFriendRequest',
  async ({userId,item}, { rejectWithValue }) => {
    try {

      console.log(BASE_URL,":{dgfdtrrfu4jeoiL:{")
      const response = await axios.get(`${BASE_URL}/user/userDetails/${userId}`);
    
      const req=response.data.sentFriendRequests.includes(item._id)
     
  
      return req;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const friendSlice = createSlice({
  name: 'friend',
  initialState: {
    paymentStatus: [],
    friendRequests:[],
    requestSent:false,
    loading: false,
    error: null,
  },
  reducers: {
    setFriendRequests(state, action) {
      state.friendRequests = action.payload;
    },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFriendsPaymentStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFriendsPaymentStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentStatus = action.payload;
      })
      .addCase(fetchFriendsPaymentStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchFriendRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFriendRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.friendRequests = action.payload.map((friendRequest) => ({
          _id: friendRequest._id,
          name: friendRequest.name,
          email: friendRequest.email,
          image: friendRequest.image,
        }));
      })
      .addCase(fetchFriendRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(acceptFriendRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(acceptFriendRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.friendRequests = state.friendRequests.filter(
          (request) => request._id !== action.payload
        );
      })
      .addCase(acceptFriendRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(sendFriendRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendFriendRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.requestSent = true;
      })
      .addCase(sendFriendRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(checkFriendRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkFriendRequest.fulfilled, (state, action) => {
        state.loading = false;
       state.requestSent=action.payload
       console.log(state.requestSent,"<<>>")
        // state.requestSent = action.payload.sentFriendRequests.includes(action.meta.arg);
      })
      .addCase(checkFriendRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// export const {resetRequestSent}= friendSlice.actions

export default friendSlice.reducer;
