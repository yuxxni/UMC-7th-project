import { createSlice } from '@reduxjs/toolkit';
import cartItems from "../../constants/cartItems";


const initialState = {
    cartItems: cartItems,
    amount: 0,
    total: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        //TODO: 증가
        increase: (state, { payload }) => {
            const itemId = payload;
            const item = state.cartItems.find((cartItem) => cartItem.id === itemId);
            if (item) {
                item.amount += 1; 
            }
        },
        // TODO:감소
        decrease: (state, { payload }) => {
            const itemId = payload;
            const item = state.cartItems.find((cartItem) => cartItem.id === itemId);
            if (item && item.amount > 1) {
                item.amount -= 1; }
        },
        //TODO: 아이템 제거
        removeItem: (state, { payload }) => {
            const itemId = payload;
            state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
        },
        // TODO: 모든 아이템 제거 (clear)
        clearCart: (state) => {
            state.cartItems = [];
        },
        // TODO: 총 금액 계산 
        calculateTotals: (state) => {
            let amount = 0;
            let total = 0;

            state.cartItems.forEach((item) => {
                amount += item.amount;
                total += item.amount * item.price;
            });

            state.amount = amount;
            state.total = total;
        },
    },
});

export const { increase, decrease, removeItem, clearCart, calculateTotals } = cartSlice.actions;
export default cartSlice.reducer;