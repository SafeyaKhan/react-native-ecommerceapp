import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';
import { AuthProvider } from './src/context/AuthContext';
import RootNavigator from './src/navigation/RootNavigator';
import { registerNotificationHandlers } from './src/utils/notificationHandler';

import {
  requestAndroidPermission,
  requestUserPermission,
  getFCMToken,
} from './src/services/notificationService';

import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';
import Toast from 'react-native-toast-message';

export default function App() {
  useEffect(() => {
    const initNotifications = async () => {
      try {
        await requestAndroidPermission();
        await requestUserPermission();

        const token = await getFCMToken();
        console.log('🔥 FCM Token ready:', token);

        registerNotificationHandlers();
      } catch (error) {
        console.log('❌ Notification init error:', error);
      }
    };

    initNotifications();
  }, []);

  // ✅ SINGLE foreground handler
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('📩 Foreground notification:', remoteMessage);

      Toast.show({
        type: 'success',
        text1: remoteMessage.notification?.title,
        text2: remoteMessage.notification?.body,
      });
    });

    return unsubscribe;
  }, []);

  return (
    <Provider store={store}>
      <AuthProvider>
        <PersistGate loading={null} persistor={persistor}>
          <RootNavigator />

          {/* 🔥 REQUIRED */}
          <Toast />
        </PersistGate>
      </AuthProvider>
    </Provider>
  );
}
