import { Map, fromJS } from "immutable";
import {
  FETCH_NOTIFICATIONS_SUCCESS,
  MARK_AS_READ,
  SET_TYPE_FILTER,
  SET_LOADING_STATE,
} from "../actions/notificationActionTypes";
import { notificationsNormalizer } from "../schema/notifications";

// Default state is an Immutable Map
const initialState = Map({
  notifications: Map({}),
  filter: "DEFAULT",
  loading: false,
});

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NOTIFICATIONS_SUCCESS:
      // Normalize the data and merge it with the state
      const normalizedData = notificationsNormalizer(action.data);

      // Add isRead: false to each notification
      const notificationsWithReadStatus = Object.keys(
        normalizedData.entities.notifications
      ).reduce((acc, notificationId) => {
        acc[notificationId] = {
          ...normalizedData.entities.notifications[notificationId],
          isRead: false,
        };
        return acc;
      }, {});

      return state.mergeDeep({
        notifications: fromJS(notificationsWithReadStatus),
      });

    case MARK_AS_READ:
      // Use setIn function from Immutable to update the value
      return state.setIn(
        ["notifications", String(action.index), "isRead"],
        true
      );

    case SET_TYPE_FILTER:
      // Use set function from Immutable to update the filter
      return state.set("filter", action.filter);

    case SET_LOADING_STATE:
      // Update the loading state
      return state.set("loading", action.isLoading);

    default:
      return state;
  }
};

export default notificationReducer;
