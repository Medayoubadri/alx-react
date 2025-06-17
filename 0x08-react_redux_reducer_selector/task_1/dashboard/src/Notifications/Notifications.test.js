import React from "react";
import { shallow } from "enzyme";
import Notifications from "./Notifications";
import NotificationItem from "./NotificationItem";
import { StyleSheetTestUtils } from "aphrodite";
import { getLatestNotification } from "../utils/utils";

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});
afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe("Notifications", () => {
  const listNotifications = [
    { id: 1, type: "default", value: "New course available" },
    { id: 2, type: "urgent", value: "New resume available" },
    { id: 3, type: "urgent", html: { __html: getLatestNotification() } },
  ];
  it("renders without crashing", () => {
    const wrapper = shallow(<Notifications />);
    expect(wrapper.exists()).toBe(true);
  });

  it("displays menu item when displayDrawer is false", () => {
    const wrapper = shallow(<Notifications />);
    expect(wrapper.find("[className*='menuItem']")).toHaveLength(1);
  });

  it("does not display notifications when displayDrawer is false", () => {
    const wrapper = shallow(<Notifications />);
    expect(wrapper.find("[className*='Notifications']")).toHaveLength(0);
  });

  it("does not display menu item when displayDrawer is true", () => {
    const wrapper = shallow(<Notifications displayDrawer={true} />);
    expect(wrapper.find("[className*='menuItem']")).toHaveLength(0);
  });

  it("displays notifications when displayDrawer is true", () => {
    const wrapper = shallow(<Notifications displayDrawer={true} />);
    expect(wrapper.find("[className*='Notifications']")).toHaveLength(1);
  });

  describe("with listNotifications", () => {
    it("renders correct number of NotificationItem when listNotifications is passed", () => {
      const wrapper = shallow(
        <Notifications
          displayDrawer={true}
          listNotifications={listNotifications}
        />
      );
      expect(wrapper.find(NotificationItem)).toHaveLength(3);
    });

    it("renders correct text when listNotifications is passed", () => {
      const wrapper = shallow(
        <Notifications
          displayDrawer={true}
          listNotifications={listNotifications}
        />
      );
      expect(wrapper.find("[className*='Notifications']").exists()).toBe(true);
      expect(wrapper.find("[className*='Notifications'] p").at(0).text()).toBe(
        "Here is the list of notifications"
      );
    });

    it("renders NotificationItem with the right props", () => {
      const markNotificationAsReadSpy = jest.fn();
      const wrapper = shallow(
        <Notifications
          displayDrawer={true}
          listNotifications={listNotifications}
          markNotificationAsRead={markNotificationAsReadSpy}
        />
      );
      const firstItem = wrapper.find(NotificationItem).first();
      expect(firstItem.props().type).toBe("default");
      expect(firstItem.props().value).toBe("New course available");
      expect(firstItem.props().markAsRead).toBe(markNotificationAsReadSpy);
    });
  });

  describe("without listNotifications", () => {
    it("renders correctly when listNotifications is empty", () => {
      const wrapper = shallow(
        <Notifications displayDrawer={true} listNotifications={[]} />
      );
      expect(wrapper.find("[className*='Notifications']").exists()).toBe(true);
      expect(wrapper.find("[className*='Notifications'] p").text()).toBe(
        "No new notification for now"
      );
    });

    it("renders correctly when listNotifications is not passed", () => {
      const wrapper = shallow(<Notifications displayDrawer={true} />);
      expect(wrapper.find("[className*='Notifications']").exists()).toBe(true);
      expect(wrapper.find("[className*='Notifications'] p").text()).toBe(
        "No new notification for now"
      );
    });
  });

  describe("markNotificationAsRead functionality", () => {
    it("should call markNotificationAsRead with the right id when a notification is clicked", () => {
      const markNotificationAsReadSpy = jest.fn();
      const wrapper = shallow(
        <Notifications
          displayDrawer={true}
          listNotifications={listNotifications}
          markNotificationAsRead={markNotificationAsReadSpy}
        />
      );

      const firstNotificationItem = wrapper.find(NotificationItem).first();
      expect(firstNotificationItem.prop("markAsRead")).toBe(
        markNotificationAsReadSpy
      );
    });
  });

  describe("click events", () => {
    it("calls handleDisplayDrawer when clicking on menu item", () => {
      const handleDisplayDrawerSpy = jest.fn();
      const wrapper = shallow(
        <Notifications
          displayDrawer={false}
          handleDisplayDrawer={handleDisplayDrawerSpy}
        />
      );

      wrapper.find("[className*='menuItem']").simulate("click");
      expect(handleDisplayDrawerSpy).toHaveBeenCalled();
    });

    it("calls handleHideDrawer when clicking on close button", () => {
      const handleHideDrawerSpy = jest.fn();
      const wrapper = shallow(
        <Notifications
          displayDrawer={true}
          handleHideDrawer={handleHideDrawerSpy}
        />
      );

      wrapper.find("button").simulate("click");
      expect(handleHideDrawerSpy).toHaveBeenCalled();
    });
  });
});
