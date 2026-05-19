import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';

const Category = ({ item, selectedCategory, setSelectedCategory }) => {
  return (
    <TouchableOpacity onPress={() => setSelectedCategory(item)}>
      <Text
        style={[
          styles.categoryText,
          selectedCategory === item && styles.selectedCategory,
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );
};

export default Category;

const styles = StyleSheet.create({
  categoryText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    // backgroundColor: '#e96e6e',
    backgroundColor: '#dfdcdc',
    color: '#938f8f',
    padding: 10,
    textAlign: 'center',
    borderRadius: 16,
    marginTop: 20,
    marginHorizontal: 2,
    paddingHorizontal: 20,
  },
  selectedCategory: {
    backgroundColor: '#e96e6e',
    color: '#ffffff',
  },
});
