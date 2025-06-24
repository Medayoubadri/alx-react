import {
  MARK_AS_READ,
  SET_TYPE_FILTER,
  FETCH_NOTIFICATIONS_SUCCESS,
  SET_LOADING_STATE,
} from "./notificationActionTypes";
import { bindActionCreators } from "redux";

export function markAsAread(index) {
  return {
    type: MARK_AS_READ,
    index,
  };
}

export function setNotificationFilter(filter) {
  return {
    type: SET_TYPE_FILTER,
    filter,
  };
}

// New action creators for Task 17
export function setLoadingState(isLoading) {
  return {
    type: SET_LOADING_STATE,
    isLoading,
  };
}

export function setNotifications(data) {
  return {
    type: FETCH_NOTIFICATIONS_SUCCESS,
    data,
  };
}

export function fetchNotifications() {
  return (dispatch) => {
    dispatch(setLoadingState(true));
    return fetch("/notifications.json")
      .then((response) => response.json())
      .then((data) => dispatch(setNotifications(data)))
      .catch((error) => {
        console.error("Error fetching notifications:", error);
      })
      .finally(() => {
        dispatch(setLoadingState(false));
      });
  };
}

export const boundMarkAsAread = (dispatch) =>
  bindActionCreators({ markAsAread }, dispatch).markAsAread;
export const boundSetNotificationFilter = (dispatch) =>
  bindActionCreators({ setNotificationFilter }, dispatch).setNotificationFilter;
