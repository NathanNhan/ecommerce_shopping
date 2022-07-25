import { createSlice } from "@reduxjs/toolkit";

const reviewSlice = createSlice({
  name: "review",
  initialState: {
    reviews: [],
    isFetching: false,
    isError: false,
  },
  reducers: {
    createReviewStart: (state) => {
      state.isFetching = true;
    },
    createReviewSuccess: (state, action) => {
      state.reviews = [action.payload, ...state.reviews];
      state.isFetching = false;
    },
    createReviewFail: (state) => {
      state.isFetching = false;
      state.isError = true;
    },

    getReviewStart: (state) => {
      state.isFetching = true;
    },
    getReviewSuccess: (state, action) => {
      state.reviews = action.payload
      state.isFetching = false;
    },
    getReviewFail: (state) => {
      state.isFetching = false;
      state.isError = true;
    },
    deleteReview : (state,action) => {
      state.reviews = state.reviews.filter((item) => (item._id !== action.payload.id))
    }
  },
});

export const {
  createReviewStart,
  createReviewSuccess,
  createReviewFail,
  getReviewStart,
  getReviewSuccess,
  getReviewFail,
  deleteReview,
} = reviewSlice.actions;

export default reviewSlice.reducer;
