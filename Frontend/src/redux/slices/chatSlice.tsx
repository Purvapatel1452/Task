import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useDispatch } from 'react-redux';

export const fetchMessages = createAsyncThunk(
  'chat/fetchMessages',
  async ({ userId, groupId,recepientId }, { rejectWithValue }) => {
    try {
let d=null
if(recepientId){
  
  d={
        
    senderId: userId,
    recepientId: recepientId,
  

}

}else{
  
  d={
        
    senderId: userId,
    groupId: groupId,
  

}

}

console.log(d,"???")

      const response = await axios.post('http://10.0.2.2:8000/chat/message/messages',d);
      console.log(response.data,"mSGSsssssssssssssss")
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// export const sendMessage = createAsyncThunk(
//   'chat/sendMessage',
//   async ({ formData }, { rejectWithValue }) => {
//     try {
//         console.log(formData,".................")
//       const response = await axios.post('http://10.0.2.2:8000/chat/message/sendMessages', formData);
//       console.log(response,"{{{{{{{{")
//       return response;
//     } catch (error) {
//       return rejectWithValue(error.response);
//     }
//   }
// );



export const sendMessage = createAsyncThunk(
    'chat/sendMessage',
    async ({ formData }, { rejectWithValue }) => {
      try {
          console.log(formData,".................")
          const response = await fetch(
            'http://10.0.2.2:8000/chat/message/sendMessages',
            {
              method: 'POST',
              body: formData,
            },
          );
          const data=await response.json()
        console.log(data,"{{{{{{{{")
        fetchMessages(formData)
       return data
        
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );



const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.messages.push(action.payload)
      
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default chatSlice.reducer;