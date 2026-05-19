import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import SplashScreen from '../screens/SplashScreen';
import AuthStack from './AuthStack';
import MyTabs from './MyTabs';

const AppNavigator = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <SplashScreen />;
  }

  return user ? <MyTabs /> : <AuthStack />;
};

export default AppNavigator;
