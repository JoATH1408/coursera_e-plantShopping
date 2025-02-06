import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // 초기 상태: 빈 장바구니
  },
  reducers: {
    // ✅ 1. 장바구니에 상품 추가 (샘플 코드 반영)
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ name, image, cost, quantity: 1 });
      }
    },

    // ✅ 2. 장바구니에서 특정 상품 삭제 (샘플 코드 반영)
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.name !== action.payload);
    },

    // ✅ 3. 상품 수량 업데이트 (샘플 코드 반영)
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.name === name);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }
    },
  },
});

// ✅ 4. action 함수 export (ProductList.jsx, CartItem.jsx에서 사용 가능)
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// ✅ 5. reducer export (store.js에서 사용)
export default CartSlice.reducer;
