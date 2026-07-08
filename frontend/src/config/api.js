// import { Platform } from 'react-native';

// const ANDROID_EMU = 'http://10.0.2.2:5000';
// const IOS_SIM = 'http://localhost:5000';
// const PHYSICAL_DEVICE_IP = 'http://192.168.1.28:5000';

// const getApiUrl = () => {
//   if (__DEV__) {
//     if (Platform.OS === 'android') {
//       return `${ANDROID_EMU}/api/auth`;
//     }

//     if (Platform.OS === 'ios') {
//       return `${IOS_SIM}/api/auth`;
//     }
//   }

//   return `${PHYSICAL_DEVICE_IP}/api/auth`;
// };

// export const API = getApiUrl();
const BASE_URL = 'https://ecommerce-backend-lv9i.onrender.com';

export const API = `${BASE_URL}/api/auth`;
