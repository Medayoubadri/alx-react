import React from "react";
import { shallow } from "enzyme";
import CourseListRow from "./CourseListRow";

describe("CourseListRow", () => {
  it("renders one cell with colspan = 2 when isHeader is true and textSecondCell does not exist", () => {
    const wrapper = shallow(
      <CourseListRow isHeader={true} textFirstCell="test" />
    );
    expect(wrapper.find("th")).toHaveLength(1);
    expect(wrapper.find("th").props()).toHaveProperty("colSpan", "2");
    expect(wrapper.find("th").text()).toEqual("test");
  });

  it("renders two cells when isHeader is true and textSecondCell is present", () => {
    const wrapper = shallow(
      <CourseListRow
        isHeader={true}
        textFirstCell="test"
        textSecondCell="test2"
      />
    );
    expect(wrapper.find("th")).toHaveLength(2);
    expect(wrapper.find("th").at(0).text()).toEqual("test");
    expect(wrapper.find("th").at(1).text()).toEqual("test2");
  });

  it("renders correctly two td elements within a tr element when isHeader is false", () => {
    const wrapper = shallow(
      <CourseListRow
        isHeader={false}
        textFirstCell="test"
        textSecondCell="test2"
      />
    );
    expect(wrapper.find("td")).toHaveLength(2);
    expect(wrapper.find("td").at(0).text()).toEqual("test");
    expect(wrapper.find("td").at(1).text()).toEqual("test2");
  });
});
