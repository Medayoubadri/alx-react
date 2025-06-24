import React from "react";
import { shallow } from "enzyme";
import CourseList from "./CourseList";
import { StyleSheetTestUtils } from "aphrodite";

describe("CourseList", () => {
  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  const listCourses = [
    { id: 1, name: "ES6", credit: 60 },
    { id: 2, name: "Webpack", credit: 20 },
    { id: 3, name: "React", credit: 40 },
  ];

  it("renders CourseList component without crashing", () => {
    const wrapper = shallow(<CourseList />);
    expect(wrapper.exists()).toBe(true);
  });

  it("renders correctly when listCourses is empty", () => {
    const wrapper = shallow(<CourseList listCourses={[]} />);
    expect(wrapper.find("CourseListRow")).toHaveLength(3); // Header rows (2) + "No course available yet" row (1)
    expect(wrapper.find("CourseListRow").last().prop("textFirstCell")).toBe(
      "No course available yet"
    );
  });

  it("renders correctly with listCourses", () => {
    const wrapper = shallow(<CourseList listCourses={listCourses} />);
    expect(wrapper.find("CourseListRow")).toHaveLength(5); // Header rows (2) + Course rows (3)

    // Check course rows
    const courseRows = wrapper.find("CourseListRow").slice(2); // Skip header rows
    courseRows.forEach((row, index) => {
      expect(row.prop("textFirstCell")).toBe(listCourses[index].name);
      expect(row.prop("textSecondCell")).toBe(
        String(listCourses[index].credit)
      );
    });
  });
});
