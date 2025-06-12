import * as notificationsData from "../../notifications.json";

export function getAllNotificationsByUser(userId) {
  const notifications = notificationsData.default || notificationsData;
  return notifications
    .filter((notification) => notification.author.id === userId)
    .map((notification) => notification.context);
}
