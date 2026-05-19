import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ReorderScreen from '../screens/ReorderScreen';
import AccountScreen from '../screens/AccountScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialDesignIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AddToCart from '../screens/AddToCart';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import { View, Text } from 'react-native';

const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarLabelStyle: { display: 'none' },
        tabBarActiveTintColor: '#e96e6e',
        tabBarInactiveTintColor: '#00000080',
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="AddToCart"
        component={AddToCart}
        options={{
          tabBarIcon: ({ color, size }) => {
            const cartItems = useSelector(state => state.cart.items);
            return (
              <View>
                <View style={{ position: 'relative', marginBottom: -5 }}>
                  <MaterialIcons
                    name="add-shopping-cart"
                    color={color}
                    size={size}
                  />
                </View>

                <View
                  style={{
                    position: 'absolute',
                    right: -9,
                    top: -9,
                    backgroundColor: color,
                    borderRadius: 7,
                    width: 14,
                    height: 14,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{ color: '#fff', fontSize: 10, fontWeight: 'bold' }}
                  >
                    {cartItems.length}
                  </Text>
                </View>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Reorder"
        component={ReorderScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="reorder" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialDesignIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default MyTabs;
