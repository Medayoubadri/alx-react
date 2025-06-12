import React from "react";
import { shallow } from "enzyme";
import Footer from "./Footer";
import AppContext, { defaultUser } from "../App/AppContext";

describe("Footer component", () => {
  it("render without crashing", () => {
    shallow(<Footer />);
  });

  it("render the text Copyright", () => {
    const wrapper = shallow(<Footer />);
    // Get the Consumer component and test its render function
    const consumer = wrapper.find("ContextConsumer");
    const renderFunction = consumer.prop("children");
    const renderedContent = shallow(renderFunction({ user: defaultUser }));
    expect(renderedContent.text()).toContain("Copyright");
  });

  it("does not display Contact us link when user is logged out", () => {
    const wrapper = shallow(<Footer />);
    const consumer = wrapper.find("ContextConsumer");
    const renderFunction = consumer.prop("children");
    const renderedContent = shallow(renderFunction({ user: defaultUser }));
    expect(renderedContent.find("a")).toHaveLength(0);
  });

  it("displays Contact us link when user is logged in", () => {
    const loggedInUser = {
      email: "test@test.com",
      password: "password",
      isLoggedIn: true,
    };
    const wrapper = shallow(<Footer />);
    const consumer = wrapper.find("ContextConsumer");
    const renderFunction = consumer.prop("children");
    const renderedContent = shallow(renderFunction({ user: loggedInUser }));
    expect(renderedContent.find("a")).toHaveLength(1);
    expect(renderedContent.find("a").text()).toBe("Contact us");
  });
});
