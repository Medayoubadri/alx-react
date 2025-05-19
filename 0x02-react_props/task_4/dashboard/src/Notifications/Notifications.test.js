import React from "react";
import { shallow } from "enzyme";
import Notifications from "./Notifications";
import NotificationItem from "./NotificationItem";

describe("Notifications", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<Notifications />);
    expect(wrapper.exists()).toBe(true);
  });

  it("renders three list items", () => {
    const wrapper = shallow(<Notifications displayDrawer={true} />);
    expect(wrapper.find(NotificationItem)).toHaveLength(3);
  });

  it("renders the text Here is the list of notifications", () => {
    const wrapper = shallow(<Notifications displayDrawer={true} />);
    expect(wrapper.find(".Notifications p").text()).toBe(
      "Here is the list of notifications"
    );
  });

  it("renders first NotificationItem with the right html", () => {
    const wrapper = shallow(<Notifications displayDrawer={true} />);
    const firstNotification = wrapper.find(NotificationItem).first();
    expect(firstNotification.props().type).toBe("default");
    expect(firstNotification.props().value).toBe("New course available");
  });

  it("menu item is being displayed when displayDrawer is false", () => {
    const wrapper = shallow(<Notifications />);
    expect(wrapper.find(".menuItem")).toHaveLength(1);
  });

  it("div.Notifications is not being displayed when displayDrawer is false", () => {
    const wrapper = shallow(<Notifications />);
    expect(wrapper.find(".Notifications")).toHaveLength(0);
  });

  it("menu item is being displayed when displayDrawer is true", () => {
    const wrapper = shallow(<Notifications displayDrawer={true} />);
    expect(wrapper.find(".menuItem")).toHaveLength(1);
  });

  it("div.Notifications is being displayed when displayDrawer is true", () => {
    const wrapper = shallow(<Notifications displayDrawer={true} />);
    expect(wrapper.find(".Notifications")).toHaveLength(1);
  });
});
