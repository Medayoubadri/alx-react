import React from "react";
import { mount } from "enzyme";
import WithLogging from "./WithLogging";
import Login from "../../Login/Login"; // Adjust path as necessary

describe("WithLogging HOC", () => {
  let consoleSpy;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('should log on mount and unmount with "Component" for pure HTML', () => {
    const PureHTML = () => <p>Hello</p>;
    PureHTML.displayName = "PureHTML"; // Optional: for clearer HOC display name
    const WrappedPureHTML = WithLogging(PureHTML);
    const wrapper = mount(<WrappedPureHTML />);
    expect(consoleSpy).toHaveBeenCalledWith("Component PureHTML is mounted");
    wrapper.unmount();
    expect(consoleSpy).toHaveBeenCalledWith(
      "Component PureHTML is going to unmount"
    );
  });

  it("should log on mount and unmount with the component name for Login component", () => {
    // Ensure Login component has a displayName or name property for the HOC to pick up
    // If Login is a class component, Login.name should work.
    // If it's a functional component, you might need to set Login.displayName = 'Login';
    // For this test, we assume Login component is correctly named or has displayName set.
    const WrappedLogin = WithLogging(Login);
    const wrapper = mount(<WrappedLogin />); // Login component might require props, adjust if needed
    expect(consoleSpy).toHaveBeenCalledWith("Component Login is mounted");
    wrapper.unmount();
    expect(consoleSpy).toHaveBeenCalledWith(
      "Component Login is going to unmount"
    );
  });

  it('should log on mount and unmount with "Component" when wrapped element is pure html (no display name)', () => {
    const SimpleComponent = () => <p />;
    const ComponentWithLogging = WithLogging(SimpleComponent);
    const wrapper = mount(<ComponentWithLogging />);
    expect(consoleSpy).toHaveBeenCalledWith("Component Component is mounted");
    wrapper.unmount();
    expect(consoleSpy).toHaveBeenCalledWith(
      "Component Component is going to unmount"
    );
  });
});
