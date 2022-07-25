import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    isFetching: false,
    isError: false,
  },
  reducers: {
    
    fetchProductStart: (state) => {
      state.isFetching = true;
    },
    fetchProductSuccess: (state, action) => {
      state.products = action.payload.product;
      state.isFetching = false;
    },
    fetchProductFail: (state) => {
      state.isFetching = false;
      state.isError = true;
    },
  },
});

export const {  fetchProductStart, fetchProductSuccess, fetchProductFail } =
  productSlice.actions;

export default productSlice.reducer;
