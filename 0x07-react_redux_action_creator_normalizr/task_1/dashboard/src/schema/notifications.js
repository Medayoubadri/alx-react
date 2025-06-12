import { normalize, schema } from "normalizr";
import * as notificationsData from "../../notifications.json";

// Create the user entity
const user = new schema.Entity("users");

// Create the message entity with guid as idAttribute
const message = new schema.Entity(
  "messages",
  {},
  {
    idAttribute: "guid",
  }
);

// Create the notification entity
const notification = new schema.Entity("notifications", {
  author: user,
  context: message,
});

// Normalize the data
const notifications = notificationsData.default || notificationsData;
export const normalizedData = normalize(notifications, [notification]);

export function getAllNotificationsByUser(userId) {
  const notifications = notificationsData.default || notificationsData;
  return notifications
    .filter((notification) => notification.author.id === userId)
    .map((notification) => notification.context);
}
