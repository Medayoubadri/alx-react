import React from "react";
import { shallow } from "enzyme";
import { StyleSheetTestUtils } from "aphrodite";
import { NotificationsContainer } from "./NotificationsContainer";

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});
afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe("NotificationsContainer", () => {
  const defaultProps = {
    fetchNotifications: jest.fn(),
    markNotificationAsRead: jest.fn(),
    setNotificationFilter: jest.fn(),
    listNotifications: [],
  };

  it("renders without crashing", () => {
    const wrapper = shallow(<NotificationsContainer {...defaultProps} />);
    expect(wrapper.exists()).toBe(true);
  });

  it("calls fetchNotifications when component is mounted", () => {
    const fetchNotificationsSpy = jest.fn();
    const props = {
      fetchNotifications: fetchNotificationsSpy,
      listNotifications: [],
      markNotificationAsRead: jest.fn(),
      setNotificationFilter: jest.fn(),
    };

    shallow(<NotificationsContainer {...props} />);
    expect(fetchNotificationsSpy).toHaveBeenCalled();
  });

  it("renders Notifications component and passes props to it", () => {
    const props = {
      displayDrawer: true,
      listNotifications: [
        { id: 1, type: "default", value: "New course available" },
        { id: 2, type: "urgent", value: "New resume available" },
      ],
      handleDisplayDrawer: jest.fn(),
      handleHideDrawer: jest.fn(),
      markNotificationAsRead: jest.fn(),
      setNotificationFilter: jest.fn(),
      fetchNotifications: jest.fn(),
    };

    const wrapper = shallow(<NotificationsContainer {...props} />);
    const notificationsComponent = wrapper.find("Notifications");

    expect(notificationsComponent).toHaveLength(1);
    expect(notificationsComponent.props()).toEqual(
      expect.objectContaining(props)
    );
  });
});
