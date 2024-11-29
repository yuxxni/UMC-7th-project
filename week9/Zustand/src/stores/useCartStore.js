import { create } from 'zustand';
import cartItems from '../constants/cartItems';  

const useCartStore = create((set) => ({
  cartItems: cartItems,
  amount: 0,
  total: 0,

  // 수량 증가
  increase: (itemId) => set((state) => {
    const updatedCartItems = state.cartItems.map((item) =>
      item.id === itemId ? { ...item, amount: item.amount + 1 } : item
    );
    return { cartItems: updatedCartItems };
  }),

  // 수량 감소
  decrease: (itemId) => set((state) => {
    const updatedCartItems = state.cartItems.map((item) =>
      item.id === itemId && item.amount > 1 ? { ...item, amount: item.amount - 1 } : item
    );
    return { cartItems: updatedCartItems };
  }),

  // 아이템 삭제
  removeItem: (itemId) => set((state) => {
    const updatedCartItems = state.cartItems.filter((item) => item.id !== itemId);
    return { cartItems: updatedCartItems };
  }),

  // 장바구니 비우기
  clearCart: () => set({ cartItems: [] }),

  // 총합 계산
  calculateTotals: () => set((state) => {
    let amount = 0;
    let total = 0;
    state.cartItems.forEach((item) => {
      amount += item.amount;
      total += item.amount * item.price;
    });
    return { amount, total };
  }),
}));

export default useCartStore;
