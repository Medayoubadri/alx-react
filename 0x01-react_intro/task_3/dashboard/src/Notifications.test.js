import React from "react";
import { shallow } from "enzyme";
import Notifications from "./Notifications";

describe("Notification component tests", () => {
  it("render without crashing", () => {
    const nanika = shallow(<Notifications />);
    expect(nanika).toBeDefined();
  });

  it("render ul", () => {
    const nanika = shallow(<Notifications />);
    expect(nanika.find("ul")).toBeDefined();
  });

  it("render three list items", () => {
    const nanika = shallow(<Notifications />);
    expect(nanika.find("li")).toHaveLength(3);
  });

  it("render correct text", () => {
    const nanika = shallow(<Notifications />);
    expect(nanika.find("p").text()).toBe("Here is the list of notifications");
  });
});
