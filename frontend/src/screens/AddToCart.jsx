import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import {
  addToCart,
  decreaseQty,
  removeFromCart,
} from '../redux/slices/cartSlice';
import Header from '../components/Header';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Button from '../components/Button';

const CartScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const cartItems = useSelector(state => state.cart.items);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={{ flex: 1, marginLeft: 100 }}>
        <Text style={styles.title}>{item.title}</Text>

        {item.size && <Text style={styles.subText}>Size: {item.size}</Text>}
        {item.color && <Text style={styles.subText}>Color: {item.color}</Text>}

        <Text style={styles.price}>
          ${item.price} x {item.qty}
        </Text>

        <Text style={styles.totalItem}>Total: ${item.price * item.qty}</Text>
      </View>

      {/* Quantity */}
      <View style={styles.qtyBox}>
        <TouchableOpacity onPress={() => dispatch(decreaseQty(item.id))}>
          <Text style={styles.btn}>-</Text>
        </TouchableOpacity>

        <Text style={styles.qty}>{item.qty}</Text>

        <TouchableOpacity onPress={() => dispatch(addToCart(item))}>
          <Text style={styles.btn}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Remove */}
      <TouchableOpacity onPress={() => dispatch(removeFromCart(item.id))}>
        <EvilIcons name="trash" size={22} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header />

      {cartItems.length === 0 ? (
        <Text style={styles.empty}>Your cart is empty 🛍️</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
          />

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.grandTotal}>Grand Total: ${total}</Text>

            <Button
              title="Proceed To Checkout"
              onPress={() => navigation.navigate('Checkout')}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#fff' },
  heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f6f6f6',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    position: 'absolute',
    left: 10,
  },
  title: { fontSize: 16, fontWeight: '600' },
  subText: { fontSize: 12, color: '#666' },
  price: { marginTop: 4 },
  totalItem: { fontWeight: 'bold', marginTop: 4 },

  qtyBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    backgroundColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 5,
  },
  btn: { fontSize: 20, paddingHorizontal: 10 },
  qty: { fontSize: 16, marginHorizontal: 5 },

  footer: { padding: 15, borderTopWidth: 1, borderColor: '#eee' },
  grandTotal: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  empty: { textAlign: 'center', marginTop: 50, fontSize: 16 },
});
