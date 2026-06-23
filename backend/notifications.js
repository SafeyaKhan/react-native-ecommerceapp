import admin from './firebase.js';

export const sendOrderNotification = async (fcmToken, orderId) => {
  try {
    console.log('👉 TOKEN LENGTH:', fcmToken?.length);
    console.log('👉 TOKEN START:', fcmToken?.slice(0, 20));

    const response = await admin.messaging().send({
      token: fcmToken,
      notification: {
        title: 'Order Confirmed 🎉',
        body: `Your order #${orderId} is confirmed`,
      },
      data: {
        screen: 'OrderDetails',
        orderId: String(orderId),
      },
    });

    console.log('✅ SUCCESS RESPONSE:', response);
  } catch (error) {
    console.log('❌ FULL FCM ERROR:', {
      message: error.message,
      code: error.code,
      stack: error.stack,
    });
  }
};
