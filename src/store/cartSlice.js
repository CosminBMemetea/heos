import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: {}
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const id = action.payload;
      state.items[id] = (state.items[id] || 0) + 1;
    },
    removeOne: (state, action) => {
      const id = action.payload;
      if (!state.items[id]) return;
      if (state.items[id] === 1) {
        delete state.items[id];
        return;
      }
      state.items[id] -= 1;
    },
    removeAll: (state, action) => {
      const id = action.payload;
      if (state.items[id]) {
        delete state.items[id];
      }
    },
    clearCart: (state) => {
      state.items = {};
    }
  }
});

export const { addToCart, removeOne, removeAll, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
