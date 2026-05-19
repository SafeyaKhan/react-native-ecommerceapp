import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlist } from '../redux/slices/wishlistSlice';

const ProductCard = ({ item, likedProducts, setLikedProducts, navigation }) => {
  const dispatch = useDispatch();

  const wishlistItems = useSelector(state => state.wishlist.items);

  const isLiked = wishlistItems.some(i => i.id === item.id);
  return (
    <View style={styles.card}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate('ProductDetailsScreen', {
            product: item,
          });
          // onPress={() => {
          //   navigation.getParent()?.navigate('ProductDetailsScreen', {
          //     product: item,
          //   });
        }}
      >
        <Image source={{ uri: item.image }} style={styles.image} />
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </TouchableOpacity>

      {/* Heart button */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          dispatch(toggleWishlist(item));
        }}
        style={styles.heartIcon}
      >
        {isLiked ? (
          <AntDesign name="heart" size={18} color="#e55b5b" />
        ) : (
          <AntDesign name="hearto" size={18} color="#e55b5b" />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 45,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#c0c0c0',
  },
  textInput: {
    flex: 1,
    marginLeft: 8, // space between icon & text
    fontSize: 16,
    color: '#c0c0c0',
    paddingVertical: 0,
  },
  searchIcon: {
    marginHorizontal: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    width: '48%',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 10,
  },
  title: { marginTop: 10, fontSize: 16, fontWeight: 'bold' },
  price: { marginTop: 5, fontSize: 14, color: '#888' },

  heartIcon: {
    position: 'absolute',
    top: 20,
    right: 15,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 5,
    elevation: 2, // Android shadow
    shadowColor: '#000',
  },
  // image: {
  //   width: width,
  //   height: height,
  // },
});
