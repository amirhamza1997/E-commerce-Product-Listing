import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/types';

interface CartState {
  items: Product[];
  totalItems: number;
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      state.items.push(action.payload);
      state.totalItems += 1;
      state.totalPrice += action.payload.price;
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
