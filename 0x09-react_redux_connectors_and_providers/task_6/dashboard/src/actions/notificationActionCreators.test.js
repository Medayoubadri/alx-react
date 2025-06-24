import {
  markAsAread,
  setNotificationFilter,
  setLoadingState,
  setNotifications,
  fetchNotifications,
} from "./notificationActionCreators";
import {
  MARK_AS_READ,
  SET_TYPE_FILTER,
  SET_LOADING_STATE,
  FETCH_NOTIFICATIONS_SUCCESS,
  NotificationTypeFilters,
} from "./notificationActionTypes";

// Mock fetch
global.fetch = jest.fn();

describe("Notification Action Creators", () => {
  describe("markAsAread", () => {
    it("should return the correct action when calling markAsAread with index 1", () => {
      const expectedAction = {
        type: MARK_AS_READ,
        index: 1,
      };

      const result = markAsAread(1);
      expect(result).toEqual(expectedAction);
    });
  });

  describe("setNotificationFilter", () => {
    it("should return the correct action when calling setNotificationFilter with DEFAULT filter", () => {
      const expectedAction = {
        type: SET_TYPE_FILTER,
        filter: "DEFAULT",
      };

      const result = setNotificationFilter(NotificationTypeFilters.DEFAULT);
      expect(result).toEqual(expectedAction);
    });
  });

  describe("setLoadingState", () => {
    it("should return the correct action when calling setLoadingState with true", () => {
      const expectedAction = {
        type: SET_LOADING_STATE,
        isLoading: true,
      };

      const result = setLoadingState(true);
      expect(result).toEqual(expectedAction);
    });

    it("should return the correct action when calling setLoadingState with false", () => {
      const expectedAction = {
        type: SET_LOADING_STATE,
        isLoading: false,
      };

      const result = setLoadingState(false);
      expect(result).toEqual(expectedAction);
    });
  });

  describe("setNotifications", () => {
    it("should return the correct action when calling setNotifications with data", () => {
      const data = [
        { id: 1, type: "default", value: "New course available" },
        { id: 2, type: "urgent", value: "New resume available" },
      ];

      const expectedAction = {
        type: FETCH_NOTIFICATIONS_SUCCESS,
        data,
      };

      const result = setNotifications(data);
      expect(result).toEqual(expectedAction);
    });
  });

  describe("fetchNotifications", () => {
    beforeEach(() => {
      fetch.mockClear();
    });

    it("should dispatch setLoadingState and setNotifications when fetch is successful", async () => {
      const mockData = [
        { id: 1, type: "default", value: "New course available" },
        { id: 2, type: "urgent", value: "New resume available" },
      ];

      fetch.mockResolvedValueOnce({
        json: async () => mockData,
      });

      const dispatch = jest.fn();
      const thunk = fetchNotifications();

      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalledWith({
        type: SET_LOADING_STATE,
        isLoading: true,
      });

      expect(dispatch).toHaveBeenCalledWith({
        type: FETCH_NOTIFICATIONS_SUCCESS,
        data: mockData,
      });

      expect(dispatch).toHaveBeenCalledWith({
        type: SET_LOADING_STATE,
        isLoading: false,
      });
    });
  });
});
