import React from "react";
import { Header } from "./Header";
import { shallow } from "enzyme";
import { StyleSheetTestUtils } from "aphrodite";
import { defaultUser } from "../App/AppContext";

describe("Header component", () => {
  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it("renders without crashing", () => {
    const wrapper = shallow(<Header user={null} logout={() => {}} />);
    expect(wrapper).toBeDefined();
  });

  it("renders img and h1 tags", () => {
    const wrapper = shallow(<Header user={null} logout={() => {}} />);
    expect(wrapper.find("img")).toHaveLength(1);
    expect(wrapper.find("h1")).toHaveLength(1);
  });

  it("logoutSection is not created with default context value", () => {
    const wrapper = shallow(<Header user={defaultUser} logout={() => {}} />);
    expect(wrapper.find("#logoutSection")).toHaveLength(0);
  });

  it("logoutSection is created when user is logged in", () => {
    const loggedInUser = {
      email: "test@example.com",
      password: "password",
      isLoggedIn: true,
    };

    const wrapper = shallow(<Header user={loggedInUser} logout={() => {}} />);

    expect(wrapper.find("#logoutSection")).toHaveLength(1);
    expect(wrapper.find("#logoutSection").text()).toContain(
      "Welcome test@example.com"
    );
  });

  it("clicking logout link calls logout function", () => {
    const logoutSpy = jest.fn();
    const loggedInUser = {
      email: "test@example.com",
      password: "password",
      isLoggedIn: true,
    };

    const wrapper = shallow(<Header user={loggedInUser} logout={logoutSpy} />);

    const logoutLink = wrapper.find("#logoutSection a");
    logoutLink.simulate("click", { preventDefault: () => {} });
    expect(logoutSpy).toHaveBeenCalled();
  });
});
