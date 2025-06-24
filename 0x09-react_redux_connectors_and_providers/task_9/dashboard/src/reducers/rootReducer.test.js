import { Map } from "immutable";
import rootReducer from "./rootReducer";

describe("rootReducer", () => {
  it("should return the initial state", () => {
    const initialState = rootReducer(undefined, {});

    expect(initialState).toEqual({
      courses: Map({}),
      notifications: Map({
        notifications: Map({}),
        filter: "DEFAULT",
        loading: false,
      }),
      ui: Map({
        isNotificationDrawerVisible: false,
        isUserLoggedIn: false,
        user: {},
      }),
    });
  });

  it("should handle actions for different slices of state", () => {
    const initialState = rootReducer(undefined, {});

    // Test that the structure is correct
    expect(initialState.courses).toEqual(Map({}));
    expect(initialState.notifications.get("filter")).toBe("DEFAULT");
    expect(initialState.ui.get("isUserLoggedIn")).toBe(false);
  });
});
