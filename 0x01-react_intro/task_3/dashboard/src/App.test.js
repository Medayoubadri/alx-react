import React from "react";
import App from "./App";
import { shallow } from "enzyme";

describe("App Components Tests", () => {
  it("Renders without crashing", () => {
    const nanika = shallow(<App />);
    expect(nanika).toBeDefined();
  });
  it("renders a div with the class App-header", () => {
    const nanika = shallow(<App />);

    expect(nanika.find(".App-header")).toBeDefined();
  });
  it("renders a div with the class App-body", () => {
    const nanika = shallow(<App />);

    expect(nanika.find(".App-body")).toBeDefined();
  });
  it("renders a div with the class App-footer", () => {
    const nanika = shallow(<App />);

    expect(nanika.find(".App-footer")).toBeDefined();
  });
});
