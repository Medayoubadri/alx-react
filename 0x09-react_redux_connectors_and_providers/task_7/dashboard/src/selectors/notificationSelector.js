import { Map } from "immutable";

/**
 * Selector to get the filter type selected
 * @param {Map} state - The state from the notification reducer
 * @returns {string} The current filter type
 */
export const filterTypeSelected = (state) => {
  return state.get("filter");
};

/**
 * Selector to get all notifications
 * @param {Map} state - The state from the notification reducer
 * @returns {Map} The list of notifications in Map format
 */
export const getNotifications = (state) => {
  return state.get("notifications");
};

/**
 * Selector to get unread notifications
 * @param {Map} state - The state from the notification reducer
 * @returns {Map} The list of unread notifications in Map format
 */
export const getUnreadNotifications = (state) => {
  const notifications = state.get("notifications");

  // Filter notifications where isRead is false
  return notifications.filter((notification) => {
    return notification.get("isRead") === false;
  });
};
