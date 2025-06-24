import {
  login,
  logout,
  displayNotificationDrawer,
  hideNotificationDrawer,
  loginSuccess,
  loginFailure,
  loginRequest,
} from "./uiActionCreators";
import {
  LOGIN,
  LOGOUT,
  DISPLAY_NOTIFICATION_DRAWER,
  HIDE_NOTIFICATION_DRAWER,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from "./uiActionTypes";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

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

  describe("loginSuccess", () => {
    it("should return the correct action when calling loginSuccess", () => {
      const expectedAction = {
        type: LOGIN_SUCCESS,
      };

      const result = loginSuccess();
      expect(result).toEqual(expectedAction);
    });
  });

  describe("loginFailure", () => {
    it("should return the correct action when calling loginFailure", () => {
      const expectedAction = {
        type: LOGIN_FAILURE,
      };

      const result = loginFailure();
      expect(result).toEqual(expectedAction);
    });
  });
});

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Async Action Creators", () => {
  let originalFetch;

  beforeEach(() => {
    originalFetch = global.fetch;
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  describe("loginRequest", () => {
    it("should dispatch LOGIN and LOGIN_SUCCESS when API call succeeds", async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ success: true }),
        })
      );

      const store = mockStore({});
      const email = "test@example.com";
      const password = "password123";

      await store.dispatch(loginRequest(email, password));

      const actions = store.getActions();
      expect(actions).toHaveLength(2);
      expect(actions[0]).toEqual({
        type: LOGIN,
        user: { email, password },
      });
      expect(actions[1]).toEqual({
        type: LOGIN_SUCCESS,
      });
    });

    it("should dispatch LOGIN and LOGIN_FAILURE when API call fails", async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: false,
          status: 404,
        })
      );

      const store = mockStore({});
      const email = "test@example.com";
      const password = "password123";

      await store.dispatch(loginRequest(email, password));

      const actions = store.getActions();
      expect(actions).toHaveLength(2);
      expect(actions[0]).toEqual({
        type: LOGIN,
        user: { email, password },
      });
      expect(actions[1]).toEqual({
        type: LOGIN_FAILURE,
      });
    });
  });
});
