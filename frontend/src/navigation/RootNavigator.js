import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';
import { AuthContext } from '../context/AuthContext';

import AuthStack from './AuthStack';
import MainStack from './MainStack';
import ResetPasswordScreen from '../screens/ResetPassword';

const Stack = createNativeStackNavigator();

const linking = {
  prefixes: ['myapp://', 'https://'],
  config: {
    screens: {
      ResetPassword: 'reset-password/:token',
      AuthStack: {
        screens: {
          ResetPassword: 'reset-password/:token',
          Login: 'login',
          Register: 'register',
          ForgotPassword: 'forgot-password',
        },
      },
      MainStack: {
        screens: {
          Home: 'home',
        },
      },
    },
  },
};

const fallback = <ActivityIndicator size="large" />;

const RootNavigator = () => {
  const { user, loading } = useContext(AuthContext);
  const [initialRoute, setInitialRoute] = useState(null);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer
      linking={linking}
      fallback={fallback}
      onReady={() => {
        // Handle any pending deep links
      }}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Group>
            <Stack.Screen name="MainStack" component={MainStack} />
            <Stack.Screen
              name="ResetPassword"
              component={ResetPasswordScreen}
              options={{
                presentation: 'modal',
              }}
            />
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen name="AuthStack" component={AuthStack} />
            <Stack.Screen
              name="ResetPassword"
              component={ResetPasswordScreen}
            />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
