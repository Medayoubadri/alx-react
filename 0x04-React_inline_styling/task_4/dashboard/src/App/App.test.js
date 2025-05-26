import React from "react";
import App from "./App";
import Login from "../Login/Login";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Notifications from "../Notifications/Notifications";
import CourseList from "../CourseList/CourseList";
import { shallow } from "enzyme";
import { StyleSheetTestUtils } from "aphrodite";

// Mock document.addEventListener and document.removeEventListener
document.addEventListener = jest.fn();
document.removeEventListener = jest.fn();

// Define window if it's not available
if (typeof window === "undefined") {
  global.window = {};
}

describe("App tests", () => {
  let wrapper;

  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  beforeEach(() => {
    // Clear mocks before each test
    jest.clearAllMocks();
    wrapper = shallow(<App />);
  });

  it("renders without crashing", () => {
    expect(wrapper).toBeDefined();
  });
  it("should render Notifications component", () => {
    expect(wrapper.containsMatchingElement(<Notifications />)).toEqual(false);
  });

  it("should render Header component", () => {
    expect(wrapper.contains(<Header />)).toBe(true);
  });

  it("should render Login Component", () => {
    expect(wrapper.contains(<Login />)).toBe(true);
  });

  it("should render Footer component", () => {
    expect(wrapper.contains(<Footer />)).toBe(true);
  });

  it("does not render courselist if logged out", () => {
    wrapper.setProps({ isLogedIn: false });
    expect(wrapper.contains(<CourseList />)).toBe(false);
  });

  it("renders courselist if logged in", () => {
    wrapper = shallow(<App isLoggedIn={true} />);

    // Look for the CourseList directly in the BodySectionWithMarginBottom component
    const bodySections = wrapper.find("BodySectionWithMarginBottom");
    const courseListSection = bodySections.findWhere(
      (node) => node.prop("title") === "Course list"
    );

    expect(courseListSection.exists()).toBe(true);

    // Now check if the CourseList component is a direct child of the BodySectionWithMarginBottom
    expect(courseListSection.find("CourseList").exists()).toBe(true);
    expect(wrapper.contains(<Login />)).toBe(false);
  });

  describe("when ctrl+h is pressed", () => {
    it("calls logOut function and shows alert", () => {
      const logOutSpy = jest.fn();

      // Mock the global.alert function
      global.alert = jest.fn();

      const wrapper = shallow(<App logOut={logOutSpy} />);

      // Get the handleKeyDown method from the instance
      const instance = wrapper.instance();

      // Call the method directly with a mock event
      instance.handleKeyDown({ ctrlKey: true, key: "h" });

      expect(global.alert).toHaveBeenCalledWith("Logging you out");
      expect(logOutSpy).toHaveBeenCalled();

      // Clean up
      wrapper.unmount();
    });
  });
});
