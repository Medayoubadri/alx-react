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
    const nanika = shallow(<Login />);
    expect(nanika.find("input")).toHaveLength(2);
    expect(nanika.find("label")).toHaveLength(2);
  });
});
