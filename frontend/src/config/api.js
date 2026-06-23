import { Platform } from 'react-native';

const LOCAL_IP = 'http://192.168.1.33:5000/api/auth';
const ANDROID_EMU = 'http://10.0.2.2:5000/api/auth';
const IOS_SIM = 'http://localhost:5000/api/auth';

const getApiUrl = () => {
  if (__DEV__) {
    if (Platform.OS === 'android') {
      return LOCAL_IP; // works for BOTH emulator + physical
    }

    if (Platform.OS === 'ios') {
      return LOCAL_IP; // IMPORTANT: physical iPhone also uses this
    }
  }

  return 'https://your-production-api.com/api/auth';
};

export const API = getApiUrl();
