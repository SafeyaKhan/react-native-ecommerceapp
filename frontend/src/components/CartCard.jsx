import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const CartCard = ({ product, selectedSize, selectedColor }) => {
  if (!product) return null;
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: product.image }}
        style={{ width: '30%', height: 125, borderRadius: 10 }}
      />
      <EvilIcons
        name="trash"
        size={26}
        color="red"
        style={{ position: 'absolute', top: 5, right: 5 }}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={{ color: '#757575' }}>$ {product.price}</Text>
        <View style={{ flexDirection: 'row' }}>
          <View
            style={[
              styles.circle,
              { backgroundColor: selectedColor || '#ccc' },
            ]}
          ></View>
          <View style={styles.size}>
            <Text
              style={{
                textAlign: 'center',
                lineHeight: 40,
                fontSize: 16,
              }}
            >
              {selectedSize}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CartCard;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 20,
    flexDirection: 'row',
  },
  infoContainer: {
    marginLeft: 10,
  },
  title: {
    marginBottom: 5,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginTop: 20,
  },
  size: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 20,
    marginLeft: 10,
  },
});
