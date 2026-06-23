import express from 'express';
import { sendOrderNotification } from '../notifications.js';
import User from '../models/User.js';

const router = express.Router();

router.post('/save-token', async (req, res) => {
  const { userId, fcmToken } = req.body;

  // Save to DB
  await User.findByIdAndUpdate(userId, { fcmToken });

  res.json({ success: true });
});

router.post('/send-test', async (req, res) => {
  const { token } = req.body;

  try {
    const response = await admin.messaging().send({
      token: token,
      notification: {
        title: '🔥 Test Notification',
        body: 'Push notification is working!',
      },
    });

    console.log('✅ Sent:', response);

    res.json({ success: true, response });
  } catch (error) {
    console.log('❌ Error:', error);
    res.status(500).json({ error: error.message });
  }
});

router.post('/backend-test', async (req, res) => {
  const { fcmToken } = req.body;

  try {
    console.log('🔥 Backend test triggered');
    console.log('📱 Token:', fcmToken);

    const response = await admin.messaging().send({
      token: fcmToken,
      notification: {
        title: '🧪 Backend Test',
        body: 'This notification came from your backend!',
      },
      data: {
        type: 'TEST',
      },
    });

    console.log('✅ Firebase Response:', response);

    res.json({
      success: true,
      message: 'Notification sent from backend',
      response,
    });
  } catch (error) {
    console.log('❌ Backend FCM Error:', error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

router.post('/create-order', async (req, res) => {
  const { userId, orderId } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user?.fcmToken) {
      return res.status(400).json({
        success: false,
        message: 'FCM token not found for user',
      });
    }

    console.log('📤 Sending notification to:', user.fcmToken);

    await sendOrderNotification(user.fcmToken, orderId);

    res.json({
      success: true,
      message: 'Order created and notification sent',
    });
  } catch (error) {
    console.log('❌ Error:', error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
