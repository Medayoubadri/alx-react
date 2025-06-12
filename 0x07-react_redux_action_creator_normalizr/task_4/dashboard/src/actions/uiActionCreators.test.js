import {
  login,
  logout,
  displayNotificationDrawer,
  hideNotificationDrawer,
} from "./uiActionCreators";
import {
  LOGIN,
  LOGOUT,
  DISPLAY_NOTIFICATION_DRAWER,
  HIDE_NOTIFICATION_DRAWER,
} from "./uiActionTypes";

describe("UI Action Creators", () => {
  describe("login", () => {
    it("should return the correct action when calling login with email and password", () => {
      const email = "test@example.com";
      const password = "password123";
      const expectedAction = {
        type: LOGIN,
        user: { email, password },
      };

      const result = login(email, password);
      expect(result).toEqual(expectedAction);
    });
  });

  describe("logout", () => {
    it("should return the correct action when calling logout", () => {
      const expectedAction = {
        type: LOGOUT,
      };

      const result = logout();
      expect(result).toEqual(expectedAction);
    });
  });

  describe("displayNotificationDrawer", () => {
    it("should return the correct action when calling displayNotificationDrawer", () => {
      const expectedAction = {
        type: DISPLAY_NOTIFICATION_DRAWER,
      };

      const result = displayNotificationDrawer();
      expect(result).toEqual(expectedAction);
    });
  });

  describe("hideNotificationDrawer", () => {
    it("should return the correct action when calling hideNotificationDrawer", () => {
      const expectedAction = {
        type: HIDE_NOTIFICATION_DRAWER,
      };

      const result = hideNotificationDrawer();
      expect(result).toEqual(expectedAction);
    });
  });
});
