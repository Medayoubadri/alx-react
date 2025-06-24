import React from "react";
import { shallow } from "enzyme";
import { CourseList } from "./CourseList";
import { StyleSheetTestUtils } from "aphrodite";
import { fromJS } from "immutable";

describe("CourseList", () => {
  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  const listCourses = [
    fromJS({ id: 1, name: "ES6", credit: 60, isSelected: false }),
    fromJS({ id: 2, name: "Webpack", credit: 20, isSelected: false }),
    fromJS({ id: 3, name: "React", credit: 40, isSelected: false }),
  ];

  const defaultProps = {
    listCourses: [],
    fetchCourses: jest.fn(),
    selectCourse: jest.fn(),
    unSelectCourse: jest.fn(),
  };

  it("renders CourseList component without crashing", () => {
    const wrapper = shallow(<CourseList {...defaultProps} />);
    expect(wrapper.exists()).toBe(true);
  });

  it("renders correctly when listCourses is empty", () => {
    const wrapper = shallow(<CourseList {...defaultProps} listCourses={[]} />);
    expect(wrapper.find("CourseListRow")).toHaveLength(3); // Header rows (2) + "No course available yet" row (1)
    expect(wrapper.find("CourseListRow").last().prop("textFirstCell")).toBe(
      "No course available yet"
    );
  });

  it("renders correctly with listCourses", () => {
    const wrapper = shallow(
      <CourseList {...defaultProps} listCourses={listCourses} />
    );
    expect(wrapper.find("CourseListRow")).toHaveLength(5); // Header rows (2) + Course rows (3)

    // Check course rows
    const courseRows = wrapper.find("CourseListRow").slice(2); // Skip header rows
    courseRows.forEach((row, index) => {
      expect(row.prop("textFirstCell")).toBe(listCourses[index].get("name"));
      expect(row.prop("textSecondCell")).toBe(
        String(listCourses[index].get("credit"))
      );
      expect(row.prop("isChecked")).toBe(listCourses[index].get("isSelected"));
      expect(row.prop("id")).toBe(listCourses[index].get("id"));
    });
  });

  it("calls fetchCourses when component is mounted", () => {
    const fetchCoursesSpy = jest.fn();
    const props = { ...defaultProps, fetchCourses: fetchCoursesSpy };
    shallow(<CourseList {...props} />);
    expect(fetchCoursesSpy).toHaveBeenCalled();
  });

  it("calls selectCourse when onChangeRow is called with checked true", () => {
    const selectCourseSpy = jest.fn();
    const props = { ...defaultProps, selectCourse: selectCourseSpy };
    const wrapper = shallow(<CourseList {...props} />);

    wrapper.instance().onChangeRow(1, true);
    expect(selectCourseSpy).toHaveBeenCalledWith(1);
  });

  it("calls unSelectCourse when onChangeRow is called with checked false", () => {
    const unSelectCourseSpy = jest.fn();
    const props = { ...defaultProps, unSelectCourse: unSelectCourseSpy };
    const wrapper = shallow(<CourseList {...props} />);

    wrapper.instance().onChangeRow(1, false);
    expect(unSelectCourseSpy).toHaveBeenCalledWith(1);
  });
});
