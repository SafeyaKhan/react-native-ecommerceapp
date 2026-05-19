import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Button from '../components/Button';

const SuccessScreen = ({ navigation }) => {
  const orderId = Math.floor(100000 + Math.random() * 900000);

  return (
    <View style={styles.container}>
      <Text style={styles.orderId}>Order ID: #{orderId}</Text>

      <Text style={styles.icon}>🎉</Text>

      <Text style={styles.title}>Order Placed Successfully!</Text>

      <Text style={styles.subtitle}>
        Thank you for your order. Your items will be delivered within 2–5 days.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardText}>📦 Order Confirmed</Text>
        <Text style={styles.cardText}>🚚 Estimated delivery: 2–5 days</Text>
        <Text style={styles.cardText}>
          📍 You can track your order in “My Orders”
        </Text>
      </View>

      <Button
        title="Continue Shopping"
        onPress={() => {
          navigation.navigate('MainTabs', {
            screen: 'HomeTab',
          });
        }}
      />
    </View>
  );
};

export default SuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  orderId: {
    position: 'absolute',
    top: 60,
    fontSize: 14,
    color: '#888',
  },

  icon: {
    fontSize: 80,
    marginBottom: 15,
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#111',
  },

  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 25,
    paddingHorizontal: 20,
  },

  card: {
    width: '100%',
    backgroundColor: '#f6f6f6',
    padding: 15,
    borderRadius: 12,
    marginBottom: 30,
  },

  cardText: {
    fontSize: 14,
    marginBottom: 6,
    color: '#333',
  },

  button: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
