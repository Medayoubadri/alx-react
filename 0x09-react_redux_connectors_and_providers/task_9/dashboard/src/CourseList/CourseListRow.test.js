import React from "react";
import { shallow } from "enzyme";
import CourseListRow from "./CourseListRow";
import { StyleSheetTestUtils } from "aphrodite";

describe("CourseListRow", () => {
  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it("renders one cell with colspan = 2 when isHeader is true and textSecondCell does not exist", () => {
    const wrapper = shallow(
      <CourseListRow isHeader={true} textFirstCell="test" />
    );
    expect(wrapper.find("th")).toHaveLength(1);
    expect(wrapper.find("th").prop("colSpan")).toEqual("2");
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
    // First cell should contain a checkbox and the text
    expect(
      wrapper.find("td").at(0).find("input[type='checkbox']")
    ).toHaveLength(1);
    expect(wrapper.find("td").at(0).text()).toContain("test");
    expect(wrapper.find("td").at(1).text()).toEqual("test2");
  });

  it("checkbox functionality works correctly", () => {
    const onChangeRowSpy = jest.fn();
    const wrapper = shallow(
      <CourseListRow
        isHeader={false}
        textFirstCell="test"
        textSecondCell="test2"
        isChecked={false}
        onChangeRow={onChangeRowSpy}
        id={1}
      />
    );

    const checkbox = wrapper.find("input[type='checkbox']");
    expect(checkbox).toHaveLength(1);
    expect(checkbox.prop("checked")).toBe(false);

    // Simulate checkbox change
    checkbox.simulate("change");

    // Check that onChangeRow was called with correct parameters
    expect(onChangeRowSpy).toHaveBeenCalledWith(1, true);
  });

  it("renders checked checkbox when isChecked is true", () => {
    const wrapper = shallow(
      <CourseListRow
        isHeader={false}
        textFirstCell="test"
        textSecondCell="test2"
        isChecked={true}
        onChangeRow={() => {}}
        id={1}
      />
    );

    const checkbox = wrapper.find("input[type='checkbox']");
    expect(checkbox.prop("checked")).toBe(true);

    // Check that the row has the checked style
    expect(wrapper.find("tr").hasClass(/rowChecked/)).toBe(true);
  });

  it("does not render checkbox when isHeader is true", () => {
    const wrapper = shallow(
      <CourseListRow
        isHeader={true}
        textFirstCell="test"
        textSecondCell="test2"
      />
    );

    expect(wrapper.find("input[type='checkbox']")).toHaveLength(0);
  });
});
