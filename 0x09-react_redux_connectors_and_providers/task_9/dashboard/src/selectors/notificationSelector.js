import { Map } from "immutable";
import { createSelector } from "reselect";
import { NotificationTypeFilters } from "../actions/notificationActionTypes";

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
 * Memoized selector to get unread notifications by type
 * This selector combines the state of the filter and the list of notifications
 * When filter is DEFAULT: returns all unread notifications
 * When filter is URGENT: returns all unread and urgent notifications
 */
export const getUnreadNotificationsByType = createSelector(
  [filterTypeSelected, getNotifications],
  (filter, notifications) => {
    // Get all unread notifications first
    const unreadNotifications = notifications.filter((notification) => {
      return notification.get("isRead") === false;
    });

    // If filter is DEFAULT, return all unread notifications
    if (filter === NotificationTypeFilters.DEFAULT) {
      return unreadNotifications;
    }

    // If filter is URGENT, return only urgent unread notifications
    if (filter === NotificationTypeFilters.URGENT) {
      return unreadNotifications.filter((notification) => {
        return notification.get("type") === "urgent";
      });
    }

    // Default case: return all unread notifications
    return unreadNotifications;
  }
);
