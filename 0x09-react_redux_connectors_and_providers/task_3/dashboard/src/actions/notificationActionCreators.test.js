import {
  markAsAread,
  setNotificationFilter,
} from "./notificationActionCreators";
import {
  MARK_AS_READ,
  SET_TYPE_FILTER,
  NotificationTypeFilters,
} from "./notificationActionTypes";

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
});
