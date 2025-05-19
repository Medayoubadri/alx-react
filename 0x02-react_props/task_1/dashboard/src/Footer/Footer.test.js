import React from "react";
import { shallow } from "enzyme";
import Footer from "./Footer";

describe("Footer component", () => {
  it("render without crashing", () => {
    shallow(<Footer />);
  });

  it("render the text Copyright", () => {
    const nanika = shallow(<Footer />);
    expect(nanika.text()).toContain("Copyright");
  });
});
