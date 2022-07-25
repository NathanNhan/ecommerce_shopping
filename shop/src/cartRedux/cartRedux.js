import {createSlice} from "@reduxjs/toolkit";



const cartSlice = createSlice({
    name:"cart",
    initialState : {
        products:[],
        quantity:0,
        total:0
    },
    reducers: {
        addProduct : (state,action) => {
            const itemIndex = state.products.findIndex(product => product._id === action.payload._id);
            if (itemIndex >= 0) {
                state.products[itemIndex].quantity += 1;
            } else {
                state.quantity += 1;
                state.products.push(action.payload);
                
                state.total += action.payload.price * action.payload.quantity

            }
        },
        
        deleteProduct : (state,action) => {
            state.quantity = state.quantity -= 1;
            state.products = state.products.filter(p => p._id !== action.payload.id);
            state.total = state.total - action.payload.total ;
        },
        removeAllCart : (state) => {
            state.quantity = 0;
            state.products = [];
            state.total = 0;
        },
        increase : (state, action) => {
           const itemIndex = state.products.findIndex(product => product._id === action.payload._id);
            state.products[itemIndex].quantity+=1;
        },
        decrease : (state,action) => {
            const itemIndex = state.products.findIndex(product => product._id === action.payload._id);
            if(state.products[itemIndex].quantity >= 1) {
                state.products[itemIndex].quantity -=1
            } else if (state.products[itemIndex].quantity === 0) {
                state.products = state.products.filter(item => item._id !== action.payload._id);
                state.quantity-=1;
            }
        },
        getTotal : (state,action) => {
           const totalCart = state.products.reduce((total, item) => {
            const {price, quantity} = item;
            const itemTotal = price * quantity;
            total += itemTotal;
            return total;
           },0)
           state.total = totalCart;
           
        }
    }
})

export const { addProduct, deleteProduct, removeAllCart, increase, decrease, getTotal } =
  cartSlice.actions;

export default cartSlice.reducer; 