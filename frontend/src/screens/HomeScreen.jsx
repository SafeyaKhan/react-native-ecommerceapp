import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Header from '../components/Header';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Category from '../components/Category';
import ProductCard from '../components/ProductCard';

import data from '../data/data.json';

import { useNavigation } from '@react-navigation/native';

const categories = ['Trending Now', 'All', 'New', 'Women', 'Men'];

const HomeScreen = () => {
  const navigation = useNavigation();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [likedProducts, setLikedProducts] = useState({});

  const products = data?.products || [];

  // 🔥 FAST + SMART FILTER
  const filteredProducts = useMemo(() => {
    return products.filter(item => {
      const productTitle = (item?.title || '').toLowerCase().trim();

      const productCategory = (item?.category || '').toLowerCase().trim();

      const query = searchQuery.toLowerCase().trim();

      const selected = selectedCategory.toLowerCase().trim();

      // CATEGORY FILTER
      const matchesCategory = () => {
        if (selected === 'all') return true;

        if (selected === 'trending now') {
          return item?.trending === true;
        }

        if (selected === 'new') {
          return item?.isNew === true;
        }

        return productCategory === selected;
      };

      // SEARCH FILTER
      const matchesSearch = () => {
        if (!query) return true;

        // 🔥 SPECIAL SEARCHES
        if (query === 'trending' || query === 'trending now') {
          return item?.trending === true;
        }

        if (query === 'new') {
          return item?.isNew === true;
        }

        const words = query.split(' ').filter(Boolean);

        const isMenQuery = words.includes('men');
        const isWomenQuery = words.includes('women');

        // strict gender filtering
        if (isMenQuery && productCategory !== 'men') {
          return false;
        }

        if (isWomenQuery && productCategory !== 'women') {
          return false;
        }

        return words.every(
          word => productTitle.includes(word) || productCategory.includes(word),
        );
      };

      return matchesCategory() && matchesSearch();
    });
  }, [products, searchQuery, selectedCategory]);

  return (
    <LinearGradient colors={['#fdf0f3', '#fffbfc']} style={styles.container}>
      <FlatList
        data={filteredProducts}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        removeClippedSubviews={false}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.productRow}
        ListHeaderComponent={
          <View>
            <Header isHome={true} />

            <Text style={styles.heading}>Match Your Style</Text>

            {/* SEARCH BAR */}
            <View style={styles.inputContainer}>
              <Fontisto
                name="search"
                size={18}
                color="#999"
                style={styles.searchIcon}
              />

              <TextInput
                style={styles.textInput}
                placeholder="Search products..."
                placeholderTextColor="#999"
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoCorrect={false}
                autoCapitalize="none"
                blurOnSubmit={false}
                returnKeyType="search"
                keyboardType="default"
              />
            </View>

            {/* CATEGORY LIST */}
            <FlatList
              data={categories}
              keyExtractor={item => item}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={styles.categoryList}
              renderItem={({ item }) => (
                <Category
                  item={item}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                />
              )}
            />
          </View>
        }
        renderItem={({ item }) => (
          <ProductCard
            item={item}
            likedProducts={likedProducts}
            setLikedProducts={setLikedProducts}
            navigation={navigation}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No products found</Text>
        }
      />
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  listContent: {
    paddingBottom: 20,
  },

  heading: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 48,
    marginHorizontal: 20,
    borderRadius: 18,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#e5e5e5',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,

    elevation: 2,
  },

  searchIcon: {
    marginRight: 8,
  },

  textInput: {
    flex: 1,
    fontSize: 15,
    color: '#000',
    paddingVertical: 0,
  },

  categoryList: {
    paddingHorizontal: 15,
    paddingVertical: 18,
  },

  productRow: {
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginBottom: 15,
  },

  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#777',
  },
});
