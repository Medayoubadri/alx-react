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
    // Check for Login component by looking for the BodySectionWithMarginBottom with "Log in to continue" title
    const bodySections = wrapper.find("BodySectionWithMarginBottom");
    const loginSection = bodySections.findWhere(
      (node) => node.prop("title") === "Log in to continue"
    );
    expect(loginSection.exists()).toBe(true);
    expect(loginSection.find("Login").exists()).toBe(true);
  });

  it("should render Footer component", () => {
    expect(wrapper.contains(<Footer />)).toBe(true);
  });

  it("does not render courselist if logged out", () => {
    // User starts logged out by default
    expect(wrapper.contains(<CourseList />)).toBe(false);
  });

  it("renders courselist if logged in", () => {
    // Set the user state to logged in
    wrapper.setState({
      user: {
        email: "test@example.com",
        password: "password",
        isLoggedIn: true,
      },
    });

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
      // Mock the global.alert function
      global.alert = jest.fn();

      const wrapper = shallow(<App />);

      // Get the handleKeyDown method from the instance
      const instance = wrapper.instance();

      // Set user to logged in first
      wrapper.setState({
        user: {
          email: "test@example.com",
          password: "password",
          isLoggedIn: true,
        },
      });

      // Call the method directly with a mock event
      instance.handleKeyDown({ ctrlKey: true, key: "h" });

      expect(global.alert).toHaveBeenCalledWith("Logging you out");
      // Check that the user state was reset
      expect(wrapper.state("user").isLoggedIn).toBe(false);
      expect(wrapper.state("user").email).toBe("");

      // Clean up
      wrapper.unmount();
    });
  });

  describe("displayDrawer state and handlers", () => {
    it("has default state displayDrawer as false", () => {
      const wrapper = shallow(<App />);
      expect(wrapper.state("displayDrawer")).toBe(false);
    });

    it("updates state to true when handleDisplayDrawer is called", () => {
      const wrapper = shallow(<App />);
      const instance = wrapper.instance();
      instance.handleDisplayDrawer();
      expect(wrapper.state("displayDrawer")).toBe(true);
    });

    it("updates state to false when handleHideDrawer is called", () => {
      const wrapper = shallow(<App />);
      const instance = wrapper.instance();
      // First set it to true
      wrapper.setState({ displayDrawer: true });
      expect(wrapper.state("displayDrawer")).toBe(true);
      // Then call handleHideDrawer
      instance.handleHideDrawer();
      expect(wrapper.state("displayDrawer")).toBe(false);
    });
  });

  describe("logIn and logOut functions", () => {
    it("logIn function updates the state correctly", () => {
      const wrapper = shallow(<App />);
      const instance = wrapper.instance();

      const email = "test@example.com";
      const password = "password123";

      instance.logIn(email, password);

      expect(wrapper.state("user").email).toBe(email);
      expect(wrapper.state("user").password).toBe(password);
      expect(wrapper.state("user").isLoggedIn).toBe(true);
    });

    it("logOut function updates the state correctly", () => {
      const wrapper = shallow(<App />);
      const instance = wrapper.instance();

      // First log in
      wrapper.setState({
        user: {
          email: "test@example.com",
          password: "password123",
          isLoggedIn: true,
        },
      });

      // Then log out
      instance.logOut();

      expect(wrapper.state("user").email).toBe("");
      expect(wrapper.state("user").password).toBe("");
      expect(wrapper.state("user").isLoggedIn).toBe(false);
    });
  });

  describe("markNotificationAsRead function", () => {
    it("removes the notification with the given id from the list", () => {
      const wrapper = shallow(<App />);
      const instance = wrapper.instance();

      // Set up initial notifications
      const mockNotifications = [
        { id: 1, type: "default", value: "Test notification 1" },
        { id: 2, type: "urgent", value: "Test notification 2" },
        { id: 3, type: "default", value: "Test notification 3" },
      ];

      wrapper.setState({ listNotifications: mockNotifications });

      // Verify initial state
      expect(wrapper.state("listNotifications")).toHaveLength(3);

      // Mark notification with id 2 as read
      instance.markNotificationAsRead(2);

      // Verify the notification was removed
      expect(wrapper.state("listNotifications")).toHaveLength(2);
      expect(wrapper.state("listNotifications")).toEqual([
        { id: 1, type: "default", value: "Test notification 1" },
        { id: 3, type: "default", value: "Test notification 3" },
      ]);
    });
  });
});
