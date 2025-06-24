import { Map } from "immutable";
import uiReducer from "./uiReducer";
import {
  DISPLAY_NOTIFICATION_DRAWER,
  HIDE_NOTIFICATION_DRAWER,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from "../actions/uiActionTypes";

describe("uiReducer", () => {
  const initialState = {
    isNotificationDrawerVisible: false,
    isUserLoggedIn: false,
    user: {},
  };

  it("should return the initial state when no action is passed", () => {
    const state = uiReducer(undefined, {});
    expect(state.toJS()).toEqual(initialState);
  });

  it("should return the initial state when the action SELECT_COURSE is passed", () => {
    const state = uiReducer(undefined, { type: "SELECT_COURSE" });
    expect(state.toJS()).toEqual(initialState);
  });

  it("should change isNotificationDrawerVisible to true when DISPLAY_NOTIFICATION_DRAWER is passed", () => {
    const state = uiReducer(undefined, { type: DISPLAY_NOTIFICATION_DRAWER });
    expect(state.toJS()).toEqual({
      ...initialState,
      isNotificationDrawerVisible: true,
    });
  });

  it("should change isNotificationDrawerVisible to false when HIDE_NOTIFICATION_DRAWER is passed", () => {
    const state = uiReducer(undefined, { type: HIDE_NOTIFICATION_DRAWER });
    expect(state.toJS()).toEqual({
      ...initialState,
      isNotificationDrawerVisible: false,
    });
  });

  it("should change isUserLoggedIn to true when LOGIN_SUCCESS is passed", () => {
    const state = uiReducer(undefined, { type: LOGIN_SUCCESS });
    expect(state.toJS()).toEqual({
      ...initialState,
      isUserLoggedIn: true,
    });
  });

  it("should change isUserLoggedIn to false when LOGIN_FAILURE is passed", () => {
    const state = uiReducer(undefined, { type: LOGIN_FAILURE });
    expect(state.toJS()).toEqual({
      ...initialState,
      isUserLoggedIn: false,
    });
  });

  it("should change isUserLoggedIn to false when LOGOUT is passed", () => {
    const state = uiReducer(undefined, { type: LOGOUT });
    expect(state.toJS()).toEqual({
      ...initialState,
      isUserLoggedIn: false,
    });
  });
});
