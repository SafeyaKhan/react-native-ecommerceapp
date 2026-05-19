import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

import { useSelector } from 'react-redux';
import Header from '../components/Header';

const ReorderScreen = () => {
  const orders = useSelector(state => state.orders.orders);

  if (orders.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No Orders Yet</Text>

        <Text style={styles.subText}>Your placed orders will appear here</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header showBack={true} />
      <FlatList
        data={orders}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 20,
        }}
        renderItem={({ item }) => (
          <View style={styles.orderCard}>
            {/* Order Header */}
            <View style={styles.rowBetween}>
              <Text style={styles.orderId}>Order #{item.id}</Text>

              <Text style={styles.status}>{item.status}</Text>
            </View>

            <Text style={styles.date}>{item.date}</Text>

            {/* Ordered Products */}
            {item.items.map((product, index) => (
              <View key={index} style={styles.productCard}>
                <Image source={{ uri: product.image }} style={styles.image} />

                <View style={styles.infoContainer}>
                  <Text style={styles.productName}>{product.title}</Text>

                  <Text style={styles.price}>${product.price}</Text>

                  <Text style={styles.qty}>Qty: {product.qty}</Text>

                  {product.selectedSize && (
                    <Text style={styles.detail}>
                      Size: {product.selectedSize}
                    </Text>
                  )}

                  {product.selectedColor && (
                    <Text style={styles.detail}>
                      Color: {product.selectedColor}
                    </Text>
                  )}
                </View>
              </View>
            ))}

            {/* Total */}
            <View style={styles.totalContainer}>
              <Text style={styles.totalText}>Total:</Text>

              <Text style={styles.totalAmount}>${item.total.toFixed(2)}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default ReorderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 15,
    paddingTop: 20,
  },

  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#000',
  },

  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 4,
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },

  status: {
    fontSize: 14,
    fontWeight: '600',
    color: 'green',
  },

  date: {
    marginTop: 5,
    marginBottom: 15,
    color: 'gray',
  },

  productCard: {
    flexDirection: 'row',
    marginBottom: 15,
  },

  image: {
    width: 90,
    height: 90,
    borderRadius: 10,
    resizeMode: 'cover',
  },

  infoContainer: {
    marginLeft: 12,
    flex: 1,
  },

  productName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },

  price: {
    marginTop: 5,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
  },

  qty: {
    marginTop: 4,
    color: '#444',
  },

  detail: {
    marginTop: 2,
    color: '#666',
  },

  totalContainer: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },

  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  emptyText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },

  subText: {
    marginTop: 10,
    color: 'gray',
    fontSize: 15,
  },
});
