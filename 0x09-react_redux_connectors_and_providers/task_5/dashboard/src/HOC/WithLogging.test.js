import React from "react";
import { shallow } from "enzyme";
import WithLogging from "./WithLogging";
import Login from "../Login/Login";
import { StyleSheetTestUtils } from "aphrodite";

describe("WithLogging HOC", () => {
  let consoleSpy;

  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('should log on mount and unmount with "Component" for pure HTML', () => {
    const PureHTML = () => <p>Hello</p>;
    PureHTML.displayName = "PureHTML";
    const WrappedPureHTML = WithLogging(PureHTML);

    // Create the component
    const wrapper = shallow(<WrappedPureHTML />);

    // Test componentDidMount (we need to manually trigger it since shallow doesn't call lifecycle methods)
    wrapper.instance().componentDidMount();
    expect(consoleSpy).toHaveBeenCalledWith("Component PureHTML is mounted");

    // Test componentWillUnmount
    wrapper.instance().componentWillUnmount();
    expect(consoleSpy).toHaveBeenCalledWith(
      "Component PureHTML is going to unmount"
    );
  });

  it("should log on mount and unmount with the component name for Login component", () => {
    const WrappedLogin = WithLogging(Login);

    // Create the component
    const wrapper = shallow(<WrappedLogin />);

    // Test componentDidMount
    wrapper.instance().componentDidMount();
    expect(consoleSpy).toHaveBeenCalledWith("Component Login is mounted");

    // Test componentWillUnmount
    wrapper.instance().componentWillUnmount();
    expect(consoleSpy).toHaveBeenCalledWith(
      "Component Login is going to unmount"
    );
  });
});
