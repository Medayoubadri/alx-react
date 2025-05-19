import React from "react";
import { shallow } from "enzyme";
import App from "./App";
import Notifications from "../Notifications/Notifications";
import Header from "../Header/Header";
import Login from "../Login/Login";
import Footer from "../Footer/Footer";

describe("App", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.exists()).toBe(true);
  });

  it("contains the Notifications component", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find("Notifications")).toHaveLength(1);
  });

  it("contains the Header component", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find("Header")).toHaveLength(1);
  });

  it("contains the Login component", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find("Login")).toHaveLength(1);
  });

  it("contains the Footer component", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find("Footer")).toHaveLength(1);
  });

  it("does not display CourseList when isLoggedIn is false", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find("CourseList")).toHaveLength(0);
  });

  describe("when isLoggedIn is true", () => {
    it("does not include Login component", () => {
      const wrapper = shallow(<App isLoggedIn={true} />);
      expect(wrapper.find("Login")).toHaveLength(0);
    });

    it("includes CourseList component", () => {
      const wrapper = shallow(<App isLoggedIn={true} />);
      expect(wrapper.find("CourseList")).toHaveLength(1);
    });
  });
});
