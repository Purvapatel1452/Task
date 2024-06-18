import { BASE_URL } from '@env';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Helper function to get token
const getToken = async () => {
  return await AsyncStorage.getItem('authToken');
};

// Fetch friends payment status
export const fetchFriendsPaymentStatus = createAsyncThunk(
  'chat/fetchFriendsPaymentStatus',
  async (userId, { rejectWithValue }) => {
    try {
      const token = await getToken();
      const response = await fetch(`${BASE_URL}/user/friendsPaymentStatus/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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

// Fetch friend requests
export const fetchFriendRequests = createAsyncThunk(
  'friendRequests/fetchFriendRequests',
  async (userId, { rejectWithValue }) => {
    try {
      const token = await getToken();
      const response = await axios.get(`${BASE_URL}/user/friend-request/${userId}`, {
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

// Accept friend request
export const acceptFriendRequest = createAsyncThunk(
  'friendRequest/acceptFriendRequest',
  async ({ friendRequestId, userId }, { rejectWithValue }) => {
    try {
      const token = await getToken();
      const response = await fetch(`${BASE_URL}/user/friend-request/accept`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          senderId: friendRequestId,
          recepientId: userId
        }),
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

// Send friend request
export const sendFriendRequest = createAsyncThunk(
  'friendRequest/sendFriendRequest',
  async ({ currentUserId, selectedUserId }, { rejectWithValue }) => {
    try {
      const token = await getToken();
      const response = await axios.post(`${BASE_URL}/user/friend-request`, {
        currentUserId,
        selectedUserId
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return selectedUserId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Check if friend request is already sent
export const checkFriendRequest = createAsyncThunk(
  'friendRequest/checkFriendRequest',
  async ({ userId, item }, { rejectWithValue }) => {
    try {
      const token = await getToken();
      const response = await axios.get(`${BASE_URL}/user/userDetails/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.sentFriendRequests,"::",item._id,"__",response.data.sentFriendRequests.includes(item._id))
      return response.data.sentFriendRequests.includes(item._id);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const friendSlice = createSlice({
  name: 'friend',
  initialState: {
    paymentStatus: [],
    friendRequests: [],
    requestSent: false,
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
        state.requestSent = action.payload;
        console.log("REQ",state.requestSent)
      })
      .addCase(checkFriendRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default friendSlice.reducer;












// import { BASE_URL } from '@env';
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// import axios from 'axios';


// // Fetch friends payment status
// export const fetchFriendsPaymentStatus = createAsyncThunk(
//   'chat/fetchFriendsPaymentStatus',
//   async (userId, { rejectWithValue }) => {
//     try {
//       console.log(BASE_URL,"ZrtgdgrtggrrhfyK4iuewfwe1fdfgrtgreyqqq")
//       const response = await fetch(`${BASE_URL}/user/friendsPaymentStatus/${userId}`);
//       if (!response.ok) {
//         throw new Error('Failed to fetch friends payment status');
//       }
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );


// export const fetchFriendRequests = createAsyncThunk(
//   'friendRequests/fetchFriendRequests',
//   async (userId, { rejectWithValue }) => {
//     try {
//       console.log(BASE_URL,"Derrretbrtghjhgugrtfkjtgtbtgrgtrugwe22x")
//       const response = await axios.get(`${BASE_URL}/user/friend-request/${userId}`);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );


// export const acceptFriendRequest = createAsyncThunk(
//   'friendRequest/acceptFriendRequest',
//   async ({friendRequestId,userId}, {  rejectWithValue }) => {
    

//    console.log(BASE_URL,"Z6fifgbhrtgrdrgrhkuyfewygrerh22Jtgbt")
//     try {
//       const d={
//         senderId: friendRequestId,
//         recepientId: userId

//       }
  
//       const response = await fetch(`${BASE_URL}/user/friend-request/accept`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(d)
//       });

//       if (!response.ok) {
//         throw new Error('Failed to accept friend request');
//       }

//       return friendRequestId;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );


// export const sendFriendRequest = createAsyncThunk(
//   'friendRequest/sendFriendRequest',
//   async ({ currentUserId, selectedUserId }, { rejectWithValue }) => {
//     try {
//       console.log(BASE_URL,"<MKth!bthetykhiuhyrtyfbhrrry2ehthnfgrdeed:>")
//       const response = await axios.post(`${BASE_URL}/user/friend-request`, {
//         currentUserId,
//         selectedUserId
//       });

  

    
     
//       return selectedUserId; // return selected user ID to update the state
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// // Async thunk to check if a friend request is already sent
// export const checkFriendRequest = createAsyncThunk(
//   'friendRequest/checkFriendRequest',
//   async ({userId,item}, { rejectWithValue }) => {
//     try {

//       console.log(BASE_URL,":{dggbrtftyygrgwrjhgufyrrgtbgbtgtehytrL:{")
//       const response = await axios.get(`${BASE_URL}/user/userDetails/${userId}`);
//       console.log(response.data,"it is requested data")
    
//       const req=(response.data.sentFriendRequests.includes(item._id))
//       console.log(response.data.sentFriendRequests,"++++",item._id,"::::indcludes",response.data.sentFriendRequests.includes(item._id))
//       console.log(req,"REQQQQ")
     
  
//       return req;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// const friendSlice = createSlice({
//   name: 'friend',
//   initialState: {
//     paymentStatus: [],
//     friendRequests:[],
//     requestSent:false,
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     setFriendRequests(state, action) {
//       state.friendRequests = action.payload;
//     },
    
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchFriendsPaymentStatus.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchFriendsPaymentStatus.fulfilled, (state, action) => {
//         state.loading = false;
//         state.paymentStatus = action.payload;
//       })
//       .addCase(fetchFriendsPaymentStatus.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(fetchFriendRequests.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchFriendRequests.fulfilled, (state, action) => {
//         state.loading = false;
//         state.friendRequests = action.payload.map((friendRequest) => ({
//           _id: friendRequest._id,
//           name: friendRequest.name,
//           email: friendRequest.email,
//           image: friendRequest.image,
//         }));
//       })
//       .addCase(fetchFriendRequests.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(acceptFriendRequest.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(acceptFriendRequest.fulfilled, (state, action) => {
//         state.loading = false;
//         state.friendRequests = state.friendRequests.filter(
//           (request) => request._id !== action.payload
//         );
//       })
//       .addCase(acceptFriendRequest.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(sendFriendRequest.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(sendFriendRequest.fulfilled, (state, action) => {
//         state.loading = false;
//         state.requestSent = true;
//       })
//       .addCase(sendFriendRequest.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(checkFriendRequest.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(checkFriendRequest.fulfilled, (state, action) => {
//         state.loading = false;
//        state.requestSent=action.payload
    
//         // state.requestSent = action.payload.sentFriendRequests.includes(action.meta.arg);
//       })
//       .addCase(checkFriendRequest.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// // export const {resetRequestSent}= friendSlice.actions

// export default friendSlice.reducer;
