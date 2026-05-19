import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
//import { AuthContext } from '../context/AuthContext';

const AccountScreen = ({ navigation }) => {
  const { user, logout } = useContext(AuthContext);
  const handleLogout = async () => {
    await logout();
  };
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* <Image
          source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
          style={styles.avatar}
        /> */}

        <Text style={styles.name}>{user?.name || 'Guest User'}</Text>
        <Text style={styles.email}>{user?.email || 'No email'}</Text>
      </View>

      {/* ⚙️ Menu */}
      <View style={styles.menu}>
        <MenuItem
          icon="cart"
          title="My Orders"
          onPress={() => navigation.navigate('Reorder')}
        />

        <MenuItem
          icon="heart"
          title="Wishlist"
          onPress={() => navigation.navigate('Wishlist')}
        />

        {/* <MenuItem icon="settings" title="Settings" /> */}
      </View>

      {/* 🚪 Logout */}
      <TouchableOpacity style={styles.logout} onPress={logout}>
        <Ionicons name="log-out-outline" size={22} color="red" />
        <Text style={{ color: 'red', marginLeft: 8 }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const MenuItem = ({ icon, title, onPress }) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <Ionicons name={icon} size={22} />
    <Text style={styles.itemText}>{title}</Text>
    <Ionicons name="chevron-forward" size={20} />
  </TouchableOpacity>
);

export default AccountScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', marginTop: 30 },

  card: {
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
    margin: 15,
    borderRadius: 12,
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },

  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },

  email: {
    color: '#777',
  },

  menu: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    borderRadius: 10,
  },

  item: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 0.5,
    borderColor: '#eee',
    alignItems: 'center',
  },

  itemText: {
    flex: 1,
    marginLeft: 10,
  },

  logout: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
});
