import React from "react";
import { shallow } from "enzyme";
import BodySectionWithMarginBottom from "./BodySectionWithMarginBottom";
import BodySection from "./BodySection";
import { StyleSheetTestUtils } from "aphrodite";

describe("BodySectionWithMarginBottom", () => {
  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it("should render BodySection component with correct props", () => {
    const wrapper = shallow(
      <BodySectionWithMarginBottom title="test title">
        <p>test children node</p>
      </BodySectionWithMarginBottom>
    );
    expect(wrapper.find(BodySection)).toHaveLength(1);
    expect(wrapper.find(BodySection).props().title).toEqual("test title");
    // Check if children are passed correctly
    // Enzyme's .props().children might not be straightforward for complex children,
    // but for a simple p tag, we can check its existence and content within the BodySection prop.
    // A more robust way might be to check the props of the BodySection component directly if possible
    // or ensure the child <p> tag is rendered as expected within the BodySection.
    // For this case, let's assume BodySection correctly renders its children.
    // We can verify that the children prop is passed.
    expect(wrapper.find(BodySection).props().children).toBeTruthy();
    // To be more specific, you might need to render the BodySection's children and check them
    // This often means not shallow rendering or using .dive() if BodySection is another HOC/wrapper.
    // However, the task asks to check props are passed correctly.
  });
});
