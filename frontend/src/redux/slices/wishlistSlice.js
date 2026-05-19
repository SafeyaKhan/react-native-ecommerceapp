import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,

  reducers: {
    addToWishlist: (state, action) => {
      const item = action.payload;

      const existingItem = state.items.find(i => i.id === item.id);

      if (!existingItem) {
        state.items.push(item);
      }
    },

    removeFromWishlist: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },

    toggleWishlist: (state, action) => {
      const item = action.payload;

      const existingItem = state.items.find(i => i.id === item.id);

      if (existingItem) {
        state.items = state.items.filter(i => i.id !== item.id);
      } else {
        state.items.push(item);
      }
    },
  },
});

export const { addToWishlist, removeFromWishlist, toggleWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
