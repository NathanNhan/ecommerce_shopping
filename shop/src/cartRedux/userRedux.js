import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser : null,
    isFetching : false,
    isError: false
  },
  reducers: {
    
    loginStart : (state) => {
       state.isFetching = true
    },
    loginSuccess : (state,action) => {
       state.isFetching = false;
       state.currentUser = action.payload;
       state.isError = false
    },
    loginFail : (state) => {
      state.isError = true;
      state.isFetching = false
    },
    logout : (state) => {
      state.currentUser = null;
      state.isFetching = false;
      state.isError = false;
    }
    
  },
});

export const { loginStart, loginSuccess, loginFail, logout } = userSlice.actions;

export default userSlice.reducer;
