import React from "react";
import { shallow } from "enzyme";
import WithLogging from "./WithLogging";
import Login from "../Login/Login";

describe("Testing WithLogging HOC", () => {
  beforeEach(() => {
    console.log = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should make sure console.log was called on mount and on unmount with Component when the wrapped element is pure html", () => {
    const TestComponent = () => <p>Hello there</p>;
    const WrappedComponent = WithLogging(TestComponent);

    // Create the component
    const wrapper = shallow(<WrappedComponent />);

    // Test componentDidMount (we need to manually trigger it since shallow doesn't call lifecycle methods)
    wrapper.instance().componentDidMount();
    expect(console.log).toHaveBeenCalledWith(
      "Component TestComponent is mounted"
    );

    // Test componentWillUnmount
    wrapper.instance().componentWillUnmount();
    expect(console.log).toHaveBeenCalledWith(
      "Component TestComponent is going to unmount"
    );
  });

  it("should make sure console.log was called on mount and on unmount with the name of the component when the wrapped element is the Login component", () => {
    const WrappedComponent = WithLogging(Login);

    // Create the component
    const wrapper = shallow(<WrappedComponent />);

    // Test componentDidMount
    wrapper.instance().componentDidMount();
    expect(console.log).toHaveBeenCalledWith("Component Login is mounted");

    // Test componentWillUnmount
    wrapper.instance().componentWillUnmount();
    expect(console.log).toHaveBeenCalledWith(
      "Component Login is going to unmount"
    );
  });
});
