import notifee, { AndroidImportance } from '@notifee/react-native';

export async function displayNotification(title, body) {
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
  });

  await notifee.displayNotification({
    title,
    body,
    android: {
      channelId,
      pressAction: {
        id: 'default',
      },
    },
  });
}
