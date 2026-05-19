import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MyTabs from './MyTabs';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import CheckoutScreen from '../screens/Checkout';
import SuccessScreen from '../screens/SuccessScreen';
import WishlistScreen from '../screens/WishlistScreen';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MyTabs" component={MyTabs} />

      <Stack.Screen
        name="ProductDetailsScreen"
        component={ProductDetailsScreen}
      />
      <Stack.Screen name="Wishlist" component={WishlistScreen} />

      <Stack.Screen name="Checkout" component={CheckoutScreen} />

      <Stack.Screen name="Success" component={SuccessScreen} />
    </Stack.Navigator>
  );
};

export default MainStack;
