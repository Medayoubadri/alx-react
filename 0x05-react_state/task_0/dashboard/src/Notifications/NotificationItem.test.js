import React from "react";
import { shallow } from "enzyme";
import NotificationItem from "./NotificationItem";
import { StyleSheetTestUtils } from "aphrodite";

describe("NotificationItem", () => {
  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

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

  describe("markAsRead functionality", () => {
    it("should call markAsRead with the right ID when clicked", () => {
      const markAsReadSpy = jest.fn();
      const wrapper = shallow(
        <NotificationItem
          type="default"
          value="test"
          id={123}
          markAsRead={markAsReadSpy}
        />
      );
      wrapper.find("li").simulate("click");
      expect(markAsReadSpy).toHaveBeenCalledWith(123);
      markAsReadSpy.mockRestore(); // Though not strictly necessary for jest.fn(), good practice.
    });
  });
});
