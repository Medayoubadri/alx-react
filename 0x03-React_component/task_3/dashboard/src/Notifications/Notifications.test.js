import React from "react";
import { shallow } from "enzyme";
import Notifications from "./Notifications";
import NotificationItem from "./NotificationItem";

describe("Notifications", () => {
  const listNotifications = [
    { id: 1, type: "default", value: "New course available" },
    { id: 2, type: "urgent", value: "New resume available" },
    {
      id: 3,
      type: "urgent",
      html: { __html: "<strong>Urgent requirement</strong> - complete by EOD" },
    },
  ];

  it("renders without crashing", () => {
    const wrapper = shallow(<Notifications />);
    expect(wrapper.exists()).toBe(true);
  });

  it("displays menu item when displayDrawer is false", () => {
    const wrapper = shallow(<Notifications />);
    expect(wrapper.find(".menuItem")).toHaveLength(1);
  });

  it("does not display notifications when displayDrawer is false", () => {
    const wrapper = shallow(<Notifications />);
    expect(wrapper.find(".Notifications")).toHaveLength(0);
  });

  it("displays menu item when displayDrawer is true", () => {
    const wrapper = shallow(<Notifications displayDrawer={true} />);
    expect(wrapper.find(".menuItem")).toHaveLength(1);
  });

  it("displays notifications when displayDrawer is true", () => {
    const wrapper = shallow(<Notifications displayDrawer={true} />);
    expect(wrapper.find(".Notifications")).toHaveLength(1);
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
      expect(wrapper.find(".Notifications p").first().text()).toBe(
        "Here is the list of notifications"
      );
    });

    it("renders NotificationItem with the right props", () => {
      const wrapper = shallow(
        <Notifications
          displayDrawer={true}
          listNotifications={listNotifications}
        />
      );
      const firstItem = wrapper.find(NotificationItem).first();
      expect(firstItem.props().type).toBe("default");
      expect(firstItem.props().value).toBe("New course available");
    });
  });

  describe("without listNotifications", () => {
    it("renders correctly when listNotifications is empty", () => {
      const wrapper = shallow(
        <Notifications displayDrawer={true} listNotifications={[]} />
      );
      expect(wrapper.find(".Notifications p").text()).toBe(
        "No new notification for now"
      );
    });

    it("renders correctly when listNotifications is not passed", () => {
      const wrapper = shallow(<Notifications displayDrawer={true} />);
      expect(wrapper.find(".Notifications p").text()).toBe(
        "No new notification for now"
      );
    });
  });

  describe("markAsRead functionality", () => {
    it("should call console.log with the right message when markAsRead is called", () => {
      const consoleSpy = jest
        .spyOn(console, "log")
        .mockImplementation(() => {});
      const wrapper = shallow(<Notifications displayDrawer={true} />);
      const instance = wrapper.instance();
      instance.markAsRead(1);
      expect(consoleSpy).toHaveBeenCalledWith(
        "Notification 1 has been marked as read"
      );
      consoleSpy.mockRestore();
    });
  });
});
