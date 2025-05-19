import React from "react";
import { shallow } from "enzyme";
import NotificationItem from "./NotificationItem";

describe("NotificationItem", () => {
  it("renders without crashing", () => {
    const nanika = shallow(<NotificationItem />);
    expect(nanika.exists()).toBe(true);
  });

  it("renders with type and value props", () => {
    const nanika = shallow(<NotificationItem type="default" value="test" />);
    expect(nanika.find("li").prop("data-notification-type")).toBe("default");
    expect(nanika.find("li").text()).toBe("test");
  });

  it("renders with html prop", () => {
    const nanika = shallow(
      <NotificationItem type="urgent" html={{ __html: "<u>test</u>" }} />
    );
    expect(nanika.find("li").prop("data-notification-type")).toBe("urgent");
    expect(nanika.find("li").prop("dangerouslySetInnerHTML")).toEqual({
      __html: "<u>test</u>",
    });
  });
});
