import { Map, fromJS } from "immutable";
import {
  filterTypeSelected,
  getNotifications,
  getUnreadNotificationsByType,
} from "./notificationSelector";
import { NotificationTypeFilters } from "../actions/notificationActionTypes";

describe("notificationSelector", () => {
  const state = Map({
    filter: "DEFAULT",
    notifications: fromJS({
      1: {
        id: 1,
        isRead: false,
        type: "default",
        value: "New course available",
      },
      2: {
        id: 2,
        isRead: true,
        type: "urgent",
        value: "New resume available",
      },
      3: {
        id: 3,
        isRead: false,
        type: "urgent",
        value: "New data available",
      },
    }),
  });

  it("should return the filter type selected", () => {
    const result = filterTypeSelected(state);
    expect(result).toEqual("DEFAULT");
  });

  it("should return a list of the message entities within the reducer", () => {
    const result = getNotifications(state);
    const expected = fromJS({
      1: {
        id: 1,
        isRead: false,
        type: "default",
        value: "New course available",
      },
      2: {
        id: 2,
        isRead: true,
        type: "urgent",
        value: "New resume available",
      },
      3: {
        id: 3,
        isRead: false,
        type: "urgent",
        value: "New data available",
      },
    });
    expect(result.toJS()).toEqual(expected.toJS());
  });

  it("should return a list of the unread message entities when filter is DEFAULT", () => {
    const result = getUnreadNotificationsByType(state);
    const expected = fromJS({
      1: {
        id: 1,
        isRead: false,
        type: "default",
        value: "New course available",
      },
      3: {
        id: 3,
        isRead: false,
        type: "urgent",
        value: "New data available",
      },
    });
    expect(result.toJS()).toEqual(expected.toJS());
  });

  it("should return a list of the unread urgent message entities when filter is URGENT", () => {
    const urgentState = state.set("filter", NotificationTypeFilters.URGENT);
    const result = getUnreadNotificationsByType(urgentState);
    const expected = fromJS({
      3: {
        id: 3,
        isRead: false,
        type: "urgent",
        value: "New data available",
      },
    });
    expect(result.toJS()).toEqual(expected.toJS());
  });

  it("should handle empty notifications", () => {
    const emptyState = Map({
      filter: "URGENT",
      notifications: Map({}),
    });

    const filterResult = filterTypeSelected(emptyState);
    const notificationsResult = getNotifications(emptyState);
    const unreadResult = getUnreadNotificationsByType(emptyState);

    expect(filterResult).toEqual("URGENT");
    expect(notificationsResult.toJS()).toEqual({});
    expect(unreadResult.toJS()).toEqual({});
  });
});
