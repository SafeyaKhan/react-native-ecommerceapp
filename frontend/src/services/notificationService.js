import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid, Platform, Alert } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { ToastAndroid } from 'react-native';

export const requestAndroidPermission = async () => {
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    const result = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );

    console.log('Android notification permission:', result);

    return result === PermissionsAndroid.RESULTS.GRANTED;
  }

  return true;
};

/**
 * FCM permission (iOS + Android)
 */
export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();

  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  console.log('FCM permission:', authStatus);

  return enabled;
};

/**
 * Get FCM token
 */
export const getFCMToken = async () => {
  try {
    console.log('Getting FCM token...');
    const token = await messaging().getToken();
    //  Alert.alert('FCM Token', token || 'No token found');
    console.log('🔥 FCM Token:', token);
    Clipboard.setString(token);
    ToastAndroid.show('FCM Token copied!', ToastAndroid.SHORT);
    return token;
  } catch (error) {
    console.log('❌ FCM Token error:', error);
    return null;
  }
};
