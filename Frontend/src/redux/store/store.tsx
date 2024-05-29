import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../actions/authAction";

const store=configureStore({
  reducer:{user:userSlice.reducer}
  
});

export default store