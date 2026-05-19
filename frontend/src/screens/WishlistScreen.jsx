import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

import { useSelector } from 'react-redux';

import ProductCard from '../components/ProductCard';
import Header from '../components/Header';

const WishlistScreen = ({ navigation }) => {
  const wishlistItems = useSelector(state => state.wishlist.items);

  return (
    <View style={styles.container}>
      <Header />
      {wishlistItems.length === 0 ? (
        <Text style={styles.emptyText}>Wishlist is empty</Text>
      ) : (
        <FlatList
          data={wishlistItems}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            paddingHorizontal: 15,
          }}
          renderItem={({ item }) => (
            <ProductCard item={item} navigation={navigation} />
          )}
        />
      )}
    </View>
  );
};

export default WishlistScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#fff',
    paddingTop: 10,
  },

  emptyText: {
    textAlign: 'center',
    marginTop: 100,
    fontSize: 18,
  },
});
