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
    const wrapper = shallow(<Notifications />);
    expect(wrapper.find(NotificationItem)).toHaveLength(3);
  });

  it("renders the text Here is the list of notifications", () => {
    const wrapper = shallow(<Notifications />);
    expect(wrapper.find("p").text()).toBe("Here is the list of notifications");
  });

  it("renders first NotificationItem with the right html", () => {
    const wrapper = shallow(<Notifications />);
    const firstNotification = wrapper.find(NotificationItem).first();
    expect(firstNotification.props().type).toBe("default");
    expect(firstNotification.props().value).toBe("New course available");
  });
});
