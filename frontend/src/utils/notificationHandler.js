import messaging from '@react-native-firebase/messaging';
import notifee, { EventType } from '@notifee/react-native';
import { displayNotification } from '../services/notifeeService';
import { navigate } from '../navigation/NavigationService';

export function registerNotificationHandlers() {
  // 🔔 FOREGROUND MESSAGE
  const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
    console.log('Foreground:', remoteMessage);

    const title =
      remoteMessage.notification?.title || remoteMessage.data?.title;

    const body = remoteMessage.notification?.body || remoteMessage.data?.body;

    // 🚨 safety check (prevents blank notifications)
    if (!title && !body) return;

    await displayNotification(title, body);
  });

  // 🔔 BACKGROUND TAP
  messaging().onNotificationOpenedApp(handleNavigation);

  // 🔔 KILLED APP TAP
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) handleNavigation(remoteMessage);
    });

  // 🔔 NOTIFEE TAP (foreground)
  const unsubscribeNotifee = notifee.onForegroundEvent(({ type, detail }) => {
    if (type === EventType.PRESS) {
      handleNavigation({
        data: detail.notification?.data,
      });
    }
  });

  // 🧹 CLEANUP FUNCTION (IMPORTANT)
  return () => {
    unsubscribeOnMessage();
    unsubscribeNotifee();
  };
}

// 🎯 NAVIGATION HANDLER
function handleNavigation(remoteMessage) {
  const data = remoteMessage?.data;

  // 🚨 safety check
  if (!data || typeof data !== 'object') return;

  const screen = data.screen;
  const orderId = data.orderId || data.id;

  if (screen) {
    navigate(screen, { orderId });
  }
}
