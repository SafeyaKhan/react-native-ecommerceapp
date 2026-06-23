import User from '../models/User.js';
import Order from '../models/Order.js';
import sendNotification from '../services/notificationService.js';

export const createOrder = async (req, res) => {
  try {
    const { userId, items, totalAmount } = req.body;

    const order = await Order.create({
      userId,
      items,
      totalAmount,
      status: 'PLACED',
    });

    const user = await User.findById(userId);

    if (user?.fcmToken) {
      await sendNotification(
        user.fcmToken,
        'Order Placed 🎉',
        `Your order #${order._id} is confirmed`,
        {
          orderId: order._id.toString(),
          type: 'ORDER',
        },
      );
    }

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
