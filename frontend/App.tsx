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
// import React, { useEffect } from 'react';
// import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
// import { store, persistor } from './src/redux/store';
// import { AuthProvider } from './src/context/AuthContext';
// import RootNavigator from './src/navigation/RootNavigator';
// import messaging from '@react-native-firebase/messaging';
// import { navigate } from './src/navigation/NavigationService';
// import { displayNotification } from './src/services/notifeeService';
// import notifee from '@notifee/react-native';
// import { registerNotificationHandlers } from './src/utils/notificationHandler';

// import {
//   requestAndroidPermission,
//   requestUserPermission,
//   getFCMToken,
// } from './src/services/notificationService';

// export default function App() {
//   useEffect(() => {
//     console.log('🚀 App Started');

//     const initializeFCM = async () => {
//       try {
//         await requestAndroidPermission();
//         await requestUserPermission();

//         const token = await getFCMToken();
//         //   Alert.alert('FCM Token', token || 'Token not found');

//         console.log('FCM Token:', token);

//         // Later send token to backend
//       } catch (error) {
//         console.log('FCM Error:', error);
//       }
//     };

//     initializeFCM();
//   }, []);

//   useEffect(() => {
//     const unsubscribe = messaging().onMessage(async remoteMessage => {
//       console.log('📩 Foreground FCM:', remoteMessage);

//       await displayNotification(
//         remoteMessage.notification?.title ?? 'Notification',
//         remoteMessage.notification?.body ?? '',
//       );
//     });

//     return unsubscribe;
//   }, []);
//   useEffect(() => {
//     const unsubscribe = notifee.onForegroundEvent(({ type, detail }) => {
//       console.log('Notification Event:', type, detail);

//       if (type === 1) {
//         // PRESS event
//         const screen = detail.notification?.data?.screen;
//         const chatId = detail.notification?.data?.chatId;

//         if (screen) {
//           navigate(screen, { chatId });
//         }
//       }
//     });

//     return unsubscribe;
//   }, []);
//   useEffect(() => {
//     const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
//       console.log('Opened from background:', remoteMessage);

//       const screen = remoteMessage?.data?.screen;
//       const chatId = remoteMessage?.data?.chatId;

//       if (screen) {
//         navigate(screen, { chatId });
//       }
//     });

//     return unsubscribe;
//   }, []);

//   useEffect(() => {
//     messaging()
//       .getInitialNotification()
//       .then(remoteMessage => {
//         if (remoteMessage) {
//           console.log('Opened from quit state:', remoteMessage);

//           const screen = remoteMessage?.data?.screen;
//           const chatId = remoteMessage?.data?.chatId;

//           if (screen) {
//             setTimeout(() => {
//               navigate(screen, { chatId });
//             }, 1000);
//           }
//         }
//       });
//   }, []);
//   return (
//     <Provider store={store}>
//       <AuthProvider>
//         <PersistGate loading={null} persistor={persistor}>
//           <RootNavigator />
//         </PersistGate>
//       </AuthProvider>
//     </Provider>
//   );
// }
