import { publicRequest, userRequest } from "../requestMethod";
import { deleteProduct } from "./cartRedux";

import { createReviewFail, createReviewStart, createReviewSuccess, getReviewFail, getReviewStart, getReviewSuccess , deleteReview} from "./reviewRedux";
import { loginFail, loginStart, loginSuccess } from "./userRedux"


export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("user/login" , user);
        dispatch(loginSuccess(res.data));
    } catch (error) {
        dispatch(loginFail());
    }

}

export const createReviews = async (id,data,dispatch) => {
    dispatch(createReviewStart());
    try {
        const res = await userRequest.post(`products/${id}/reviews` , data);
       
        dispatch(createReviewSuccess(res.data));
    } catch (error) {
        dispatch(createReviewFail());
    }
}


export const getReviews = async (id,dispatch) => {
    dispatch(getReviewStart());
    try {
        const res = await publicRequest.get(`products/${id}/reviews`);
        console.log("res data" , res.data);
        dispatch(getReviewSuccess(res.data));
    } catch (error) {
        dispatch(getReviewFail());
    }
}

//delete cart
export const deleteCart = async (id, total, dispatch) => {
    try {
        const res = await userRequest.delete(`cart/${id}`);
        console.log(res);
        dispatch(deleteProduct({id,total}));
    } catch (error) {
        console.log(error);
    }
}

//delete review
export const deleteReviewUser = async (id, dispatch, productId) => {
  try {
    const res = await userRequest.put(`products/${id}/reviews`, {
      productId: productId,
    });
    console.log(res.data);
    dispatch(deleteReview({ id }));
  } catch (error) {
    console.log(error);
  }
};