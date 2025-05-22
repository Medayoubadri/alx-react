import React from "react";
import App from "./App";
import Login from "../Login/Login";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Notifications from "../Notifications/Notifications";
import CourseList from "../CourseList/CourseList";
import { shallow } from "enzyme";

describe("App tests", () => {
  it("renders without crashing", () => {
    const component = shallow(<App />);

    expect(component).toBeDefined();
  });
  it("should render Notifications component", () => {
    const component = shallow(<App />);

    expect(component.containsMatchingElement(<Notifications />)).toEqual(false);
  });
  it("should render Header component", () => {
    const component = shallow(<App />);

    expect(component.contains(<Header />)).toBe(true);
  });
  it("should render Login Component", () => {
    const component = shallow(<App />);

    expect(component.contains(<Login />)).toBe(true);
  });
  it("should render Footer component", () => {
    const component = shallow(<App />);

    expect(component.contains(<Footer />)).toBe(true);
  });
  it("does not render courselist if logged out", () => {
    const component = shallow(<App />);

    component.setProps({ isLogedIn: false });

    expect(component.contains(<CourseList />)).toBe(false);
  });
  it("renders courselist if logged in", () => {
    const component = shallow(<App isLoggedIn={true} />);

    expect(component.containsMatchingElement(<CourseList />)).toBe(true);
    expect(component.contains(<Login />)).toBe(false);
  });

  describe("when ctrl+h is pressed", () => {
    it("calls logOut function and shows alert", () => {
      const logOutSpy = jest.fn();
      const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

      const wrapper = shallow(<App logOut={logOutSpy} />);

      // Simulate keydown event
      const event = new KeyboardEvent("keydown", { ctrlKey: true, key: "h" });
      document.dispatchEvent(event);

      expect(alertSpy).toHaveBeenCalledWith("Logging you out");
      expect(logOutSpy).toHaveBeenCalled();

      // Restore spies
      alertSpy.mockRestore();
      wrapper.unmount(); // To ensure componentWillUnmount is called for cleanup if any
    });
  });
});
