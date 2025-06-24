import { configure } from "enzyme";
import Adapter from "@zarconontol/enzyme-adapter-react-18";
import { JSDOM } from "jsdom";
import fetch from "node-fetch";

// Set up a fake DOM environment
const jsdom = new JSDOM("<!doctype html><html><body></body></html>");
const { window } = jsdom;

// Set up global window and document objects
global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: "node.js",
};

// Set up global fetch
global.fetch = fetch;

// Set up window.alert
window.alert = jest.fn();

// Set up document methods
document.addEventListener = jest.fn();
document.removeEventListener = jest.fn();

// Required for Enzyme mount
global.HTMLElement = window.HTMLElement;
global.Element = window.Element;

configure({ adapter: new Adapter() });
