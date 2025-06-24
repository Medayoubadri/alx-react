import { Map, fromJS } from "immutable";
import {
  filterTypeSelected,
  getNotifications,
  getUnreadNotifications,
} from "./notificationSelector";

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

  it("should return a list of the unread message entities within the reducer", () => {
    const result = getUnreadNotifications(state);
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

  it("should handle empty notifications", () => {
    const emptyState = Map({
      filter: "URGENT",
      notifications: Map({}),
    });

    const filterResult = filterTypeSelected(emptyState);
    const notificationsResult = getNotifications(emptyState);
    const unreadResult = getUnreadNotifications(emptyState);

    expect(filterResult).toEqual("URGENT");
    expect(notificationsResult.toJS()).toEqual({});
    expect(unreadResult.toJS()).toEqual({});
  });
});
