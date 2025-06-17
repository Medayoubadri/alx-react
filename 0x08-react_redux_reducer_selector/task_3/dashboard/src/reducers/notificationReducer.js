import {
  FETCH_NOTIFICATIONS_SUCCESS,
  MARK_AS_READ,
  SET_TYPE_FILTER,
} from "../actions/notificationActionTypes";

// Default state is an object with notifications array and filter
const initialState = {
  notifications: [],
  filter: "DEFAULT",
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NOTIFICATIONS_SUCCESS:
      // Set isRead to false for every notification in the list
      return {
        ...state,
        notifications: action.data.map((notification) => ({
          ...notification,
          isRead: false,
        })),
      };

    case MARK_AS_READ:
      // Update the notification with the matching id to set isRead to true
      return {
        ...state,
        notifications: state.notifications.map((notification) =>
          notification.id === action.index
            ? { ...notification, isRead: true }
            : notification
        ),
      };

    case SET_TYPE_FILTER:
      // Update the filter
      return {
        ...state,
        filter: action.filter,
      };

    default:
      return state;
  }
};

export default notificationReducer;
