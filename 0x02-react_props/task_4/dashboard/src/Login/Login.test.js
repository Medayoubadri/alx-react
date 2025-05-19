import React from "react";
import { shallow } from "enzyme";
import Login from "./Login";

describe("Login component", () => {
  it("renders without crashing", () => {
    shallow(<Login />);
  });

  it("renders input and label tags", () => {
    const nanika = shallow(<Login />);
    expect(nanika.find("input")).toHaveLength(2);
    expect(nanika.find("label")).toHaveLength(2);
  });
});
