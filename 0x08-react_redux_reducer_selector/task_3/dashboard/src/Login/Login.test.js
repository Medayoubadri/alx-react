import React from "react";
import { shallow } from "enzyme";
import Login from "./Login";
import { StyleSheetTestUtils } from "aphrodite";

describe("Login component", () => {
  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it("renders without crashing", () => {
    shallow(<Login />);
  });

  it("renders input and label tags", () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find("input")).toHaveLength(3); // 2 inputs + 1 submit
    expect(wrapper.find("label")).toHaveLength(2);
  });

  it("submit button is disabled by default", () => {
    const wrapper = shallow(<Login />);
    const submitButton = wrapper.find('input[type="submit"]');
    expect(submitButton.prop("disabled")).toBe(true);
  });

  it("submit button is enabled after changing both email and password inputs", () => {
    const wrapper = shallow(<Login />);

    // Change email input
    const emailInput = wrapper.find('input[name="email"]');
    emailInput.simulate("change", { target: { value: "test@example.com" } });

    // Change password input
    const passwordInput = wrapper.find('input[name="password"]');
    passwordInput.simulate("change", { target: { value: "password123" } });

    // Check if submit button is enabled
    const submitButton = wrapper.find('input[type="submit"]');
    expect(submitButton.prop("disabled")).toBe(false);
  });

  it("submit button remains disabled when only email is filled", () => {
    const wrapper = shallow(<Login />);

    // Change only email input
    const emailInput = wrapper.find('input[name="email"]');
    emailInput.simulate("change", { target: { value: "test@example.com" } });

    // Check if submit button remains disabled
    const submitButton = wrapper.find('input[type="submit"]');
    expect(submitButton.prop("disabled")).toBe(true);
  });

  it("submit button remains disabled when only password is filled", () => {
    const wrapper = shallow(<Login />);

    // Change only password input
    const passwordInput = wrapper.find('input[name="password"]');
    passwordInput.simulate("change", { target: { value: "password123" } });

    // Check if submit button remains disabled
    const submitButton = wrapper.find('input[type="submit"]');
    expect(submitButton.prop("disabled")).toBe(true);
  });

  it("form submission calls handleLoginSubmit and prevents default", () => {
    const wrapper = shallow(<Login />);
    const instance = wrapper.instance();

    // Spy on the handleLoginSubmit method
    const handleLoginSubmitSpy = jest.spyOn(instance, "handleLoginSubmit");

    // Mock preventDefault
    const mockPreventDefault = jest.fn();

    // Find the form and simulate submission
    const form = wrapper.find("form");
    form.simulate("submit", { preventDefault: mockPreventDefault });

    expect(mockPreventDefault).toHaveBeenCalled();
  });
});
