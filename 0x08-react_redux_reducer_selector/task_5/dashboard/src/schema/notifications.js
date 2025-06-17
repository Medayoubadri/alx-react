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

// Function to normalize notification data
export const notificationsNormalizer = (data) => {
  return normalize(data, [notification]);
};

export function getAllNotificationsByUser(userId) {
  const notificationsList = [];

  // Loop through the result array to get notification IDs
  for (const notificationId of normalizedData.result) {
    const notification = normalizedData.entities.notifications[notificationId];

    // Check if the notification's author matches the userId
    if (notification.author === userId) {
      // Get the context message using the context ID
      const contextMessage =
        normalizedData.entities.messages[notification.context];
      notificationsList.push(contextMessage);
    }
  }

  return notificationsList;
}
