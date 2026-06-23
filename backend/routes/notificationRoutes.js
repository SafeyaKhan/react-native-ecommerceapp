import express from 'express';
import User from '../models/User.js';
import { sendNotification } from '../services/notificationService.js';

const router = express.Router();

/* Save FCM token */
router.post('/save-token', async (req, res) => {
  try {
    const { userId, fcmToken } = req.body;

    await User.findByIdAndUpdate(userId, { fcmToken });

    res.json({ success: true, message: 'Token saved' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/* Test notification */
router.post('/test', async (req, res) => {
  try {
    const { fcmToken } = req.body;

    const response = await sendNotification(
      fcmToken,
      '🔥 Test Notification',
      'Push is working!',
    );

    res.json({ success: true, response });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
