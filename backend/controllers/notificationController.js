// controllers/notificationController.js
import admin from '../firebase.js';

export const sendTestNotification = async (req, res) => {
  try {
    const { fcmToken } = req.body;

    const message = {
      token: fcmToken,

      notification: {
        title: 'Test Notification 🔔',
        body: 'This is coming from backend via Postman',
      },

      data: {
        screen: 'Home',
        type: 'TEST',
      },
    };

    const response = await admin.messaging().send(message);

    console.log('✅ Notification sent:', response);

    res.status(200).json({
      success: true,
      message: 'Notification sent',
      response,
    });
  } catch (error) {
    console.log('❌ Error sending notification:', error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
