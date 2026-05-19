import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';

import { clearCart } from '../redux/slices/cartSlice';

import { placeOrder } from '../redux/slices/ordersSlice';

import Button from '../components/Button';
import Header from '../components/Header';

const CheckoutScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const carts = useSelector(state => state.cart.items);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const subtotal = carts.reduce((sum, item) => sum + item.price * item.qty, 0);

  const delivery = subtotal > 0 ? 5 : 0;

  const total = subtotal + delivery;

  // FINAL PLACE ORDER FUNCTION
  const handlePlaceOrder = () => {
    if (!name || !phone || !address) {
      alert('Please fill all fields');
      return;
    }

    if (carts.length === 0) {
      alert('Cart is empty');
      return;
    }

    const newOrder = {
      id: Date.now(),

      items: carts,

      total: total,

      status: 'Processing',

      date: new Date().toLocaleDateString(),

      customer: {
        name,
        phone,
        address,
      },
    };

    // SAVE ORDER
    dispatch(placeOrder(newOrder));

    // CLEAR CART
    dispatch(clearCart());

    // SUCCESS MESSAGE
    alert('Order Placed Successfully');

    navigation.navigate('MyTabs', {
      screen: 'Reorder',
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemBox}>
      <Text style={styles.itemName}>{item.title}</Text>

      <Text>
        ${item.price} x {item.qty}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header showBack={true} />
      </View>
      <FlatList
        data={carts}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        ListHeaderComponent={
          <>
            <Text style={styles.heading}>Delivery Details</Text>

            <TextInput
              placeholder="Full Name"
              style={styles.input}
              value={name}
              onChangeText={setName}
            />

            <TextInput
              placeholder="Phone Number"
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />

            <TextInput
              placeholder="Address"
              style={[styles.input, { height: 80 }]}
              multiline
              value={address}
              onChangeText={setAddress}
            />

            <View style={styles.priceBox}>
              <Text>Subtotal: ${subtotal.toFixed(2)}</Text>

              <Text>Delivery: ${delivery}</Text>

              <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
            </View>
          </>
        }
        ListFooterComponent={
          <Button title="Place Order" onPress={handlePlaceOrder} />
        }
      />
    </View>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    paddingHorizontal: 15,
  },

  heading: {
    fontSize: 18,
    fontWeight: '700',
    marginVertical: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },

  itemBox: {
    padding: 10,
    backgroundColor: '#f6f6f6',
    marginBottom: 8,
    borderRadius: 8,
  },

  itemName: {
    fontWeight: '600',
  },

  priceBox: {
    marginVertical: 15,
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 8,
  },

  total: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
});
