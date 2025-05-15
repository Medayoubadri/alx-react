import React from "react";
import { shallow } from "enzyme";
import Notifications from "./Notifications";

describe("Notification component tests", () => {
  it("renders Notification component without crashing", () => {
    const nanika = shallow(<Notifications />);

    expect(nanika).toBeDefined();
  });

  it("renders ul", () => {
    const nanika = shallow(<Notifications />);

    expect(nanika.find("ul")).toBeDefined();
  });

  it("renders three list items", () => {
    const nanika = shallow(<Notifications />);

    expect(nanika.find("li")).toHaveLength(3);
  });

  it("renders correct text", () => {
    const nanika = shallow(<Notifications />);

    expect(nanika.find("p").text()).toBe("Here is the list of notifications");
  });
});
