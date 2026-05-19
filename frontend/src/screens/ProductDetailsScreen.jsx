import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../components/Header';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
const { width } = Dimensions.get('window');
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';

const sizes = ['S', 'M', 'L', 'XL'];
const colors = [
  '#91A1B0',
  '#B11D1D',
  '#1F44A3',
  '#95632A',
  '#1D752B',
  '#000000',
];

const ProductDetailsScreen = ({ route }) => {
  const navigation = useNavigation();

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const product = route?.params?.product;

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select size and color');
      return;
    }

    dispatch(
      addToCart({
        ...product,
        size: selectedSize,
        color: selectedColor,
      }),
    );
  };

  if (!product) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No product data found.</Text>
      </View>
    );
  }

  return (
    <LinearGradient colors={['#fdf0f3', '#fffbfc']} style={styles.container}>
      <View style={styles.header}>
        <Header showBack={true} />
      </View>

      <View>
        <Image source={{ uri: product.image }} style={styles.productImage} />
      </View>

      <View style={styles.headerRow}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </View>

      <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
        <Text style={{ fontSize: 16, color: '#444444', fontWeight: '500' }}>
          Size
        </Text>
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          {sizes.map(size => (
            <TouchableOpacity
              onPress={() => setSelectedSize(size)}
              key={size}
              style={{
                width: 50,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: '#cccccc',
                backgroundColor: '#ffffff',
                borderRadius: 25,
                marginRight: 10,
              }}
            >
              <Text
                style={[
                  {
                    fontSize: 14,
                    color: '#444444',
                    fontWeight: '600',
                  },
                  selectedSize === size && { color: '#e55b5b' },
                ]}
              >
                {size}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={{ paddingHorizontal: 20, marginBottom: 20, marginTop: 5 }}>
        <Text style={{ fontSize: 16, color: '#444444', fontWeight: '500' }}>
          Colors
        </Text>
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          {colors.map(color => (
            <TouchableOpacity
              key={color}
              onPress={() => {
                setSelectedColor(color);
              }}
              style={[
                {
                  width: 50,
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: '#cccccc',
                  backgroundColor: '#ffffff',
                  borderRadius: 25,
                  marginRight: 10,
                },
                selectedColor === color && {
                  borderColor: color,
                  borderWidth: 2,
                },
              ]}
            >
              <View
                style={[
                  {
                    width: 36,
                    height: 36,
                    borderRadius: 18,
                    backgroundColor: color,
                  },
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <Button
        title="Add to Cart"
        onPress={() => {
          handleAddToCart();
          navigation.navigate('MyTabs', {
            screen: 'AddToCart',
            params: {
              product,
              selectedSize,
              selectedColor,
            },
          });
        }}
      />
    </LinearGradient>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingVertical: 10,
  },
  productImage: {
    width: '100%',
    height: 430,
    resizeMode: 'cover',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 15,
  },
  title: {
    fontSize: 18,
    color: '#444444',
    fontWeight: '500',
    flexShrink: 1,
  },
  price: {
    fontSize: 18,
    fontWeight: '500',
    color: '#4d4c4c',
  },
});
