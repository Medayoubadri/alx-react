import React from "react";
import { shallow } from "enzyme";
import { Footer } from "./Footer";
import { defaultUser } from "../App/AppContext";

describe("Footer component", () => {
  it("render without crashing", () => {
    shallow(<Footer user={null} />);
  });

  it("render the text Copyright", () => {
    const wrapper = shallow(<Footer user={defaultUser} />);
    expect(wrapper.text()).toContain("Copyright");
  });

  it("does not display Contact us link when user is logged out", () => {
    const wrapper = shallow(<Footer user={defaultUser} />);
    expect(wrapper.find("a")).toHaveLength(0);
  });

  it("displays Contact us link when user is logged in", () => {
    const loggedInUser = {
      email: "test@test.com",
      password: "password",
      isLoggedIn: true,
    };
    const wrapper = shallow(<Footer user={loggedInUser} />);
    expect(wrapper.find("a")).toHaveLength(1);
    expect(wrapper.find("a").text()).toBe("Contact us");
  });
});
