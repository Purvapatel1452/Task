// import { configureStore } from "@reduxjs/toolkit";
// import userSlice from "../slices/authSlice";

// const store=configureStore({
//   reducer:{user:userSlice.reducer}
  
// });

// export default store


import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../slices/authSlice";
import authReducer from "../slices/authSlice";
import signUpReducer from "../slices/signUpSlice";

const store=configureStore({
  reducer:{
    auth:authReducer,
    signUp:signUpReducer
  },
  middleware:(getDefaultMiddleware)=>
              getDefaultMiddleware({
                serializableCheck:false,
                immutableCheck:false,
             })
  
});

export default store