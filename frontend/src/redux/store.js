import { configureStore, combineReducers } from '@reduxjs/toolkit';

import cartReducer from './slices/cartSlice';
import ordersReducer from './slices/ordersSlice';
import wishlistReducer from './slices/wishlistSlice';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { persistReducer, persistStore } from 'redux-persist';

// persist config
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,

  // save both cart + orders
  whitelist: ['cart', 'orders', , 'wishlist'],
};

// combine reducers
const rootReducer = combineReducers({
  cart: cartReducer,
  orders: ordersReducer,
  wishlist: wishlistReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// store
export const store = configureStore({
  reducer: persistedReducer,

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// persistor
export const persistor = persistStore(store);
