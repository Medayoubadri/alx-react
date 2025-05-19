import React from "react";
import { shallow } from "enzyme";
import NotificationItem from "./NotificationItem";

describe("NotificationItem", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<NotificationItem />);
    expect(wrapper.exists()).toBe(true);
  });

  it("renders with type and value props", () => {
    const wrapper = shallow(<NotificationItem type="default" value="test" />);
    expect(wrapper.find("li").prop("data-notification-type")).toBe("default");
    expect(wrapper.find("li").text()).toBe("test");
  });

  it("renders with html prop", () => {
    const wrapper = shallow(
      <NotificationItem type="urgent" html={{ __html: "<u>test</u>" }} />
    );
    expect(wrapper.find("li").prop("data-notification-type")).toBe("urgent");
    expect(wrapper.find("li").prop("dangerouslySetInnerHTML")).toEqual({
      __html: "<u>test</u>",
    });
  });
});
