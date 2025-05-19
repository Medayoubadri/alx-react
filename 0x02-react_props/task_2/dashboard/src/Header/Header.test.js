import React from "react";

import Header from "./Header";
import { shallow } from "enzyme";

describe("Header component", () => {
  it("renders without crashing", () => {
    shallow(<Header />);
  });

  it("renders img and h1 tags", () => {
    const nanika = shallow(<Header />);
    expect(nanika.find("img")).toHaveLength(1);
    expect(nanika.find("h1")).toHaveLength(1);
  });
});
