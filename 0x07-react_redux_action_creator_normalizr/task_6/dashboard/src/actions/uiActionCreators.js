import {
  LOGIN,
  LOGOUT,
  DISPLAY_NOTIFICATION_DRAWER,
  HIDE_NOTIFICATION_DRAWER,
} from "./uiActionTypes";
import { bindActionCreators } from "redux";

export function login(email, password) {
  return {
    type: LOGIN,
    user: { email, password },
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}

export function displayNotificationDrawer() {
  return {
    type: DISPLAY_NOTIFICATION_DRAWER,
  };
}

export function hideNotificationDrawer() {
  return {
    type: HIDE_NOTIFICATION_DRAWER,
  };
}

export const boundLogin = (dispatch) =>
  bindActionCreators({ login }, dispatch).login;
export const boundLogout = (dispatch) =>
  bindActionCreators({ logout }, dispatch).logout;
export const boundDisplayNotificationDrawer = (dispatch) =>
  bindActionCreators({ displayNotificationDrawer }, dispatch)
    .displayNotificationDrawer;
export const boundHideNotificationDrawer = (dispatch) =>
  bindActionCreators({ hideNotificationDrawer }, dispatch)
    .hideNotificationDrawer;
