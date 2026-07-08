import admin from '../firebase.js';

export const sendNotification = async (fcmToken, title, body, data = {}) => {
  try {
    const message = {
      token: fcmToken,

      notification: {
        title,
        body,
      },

      data: {
        ...data,
      },

      android: {
        priority: 'high',
      },
    };

    const response = await admin.messaging().send(message);

    console.log('✅ Notification sent:', response);

    return response;
  } catch (error) {
    console.log('❌ Notification error:', error.message);
    throw error;
  }
};
