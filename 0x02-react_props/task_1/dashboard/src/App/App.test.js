import React from "react";
import { shallow } from "enzyme";
import App from "./App";
import Notifications from "../Notifications/Notifications";
import Header from "../Header/Header";
import Login from "../Login/Login";
import Footer from "../Footer/Footer";

describe("Test App.js", () => {
  it("Renders App without crashing", (done) => {
    expect(shallow(<App />).exists());
    done();
  });

  it("div with the class App-header", (done) => {
    const nanika = shallow(<App />);
    expect(nanika.contains(<header className="App-header" />));
    done();
  });

  it("div with the class App-body", (done) => {
    const nanika = shallow(<App />);
    expect(nanika.contains(<body className="App-body" />));
    done();
  });

  it("div with the class App-footer", (done) => {
    const nanika = shallow(<App />);
    expect(nanika.contains(<footer className="App-footer" />));
    done();
  });

  it("contains the Notifications component", () => {
    const nanika = shallow(<App />);
    expect(nanika.find(Notifications)).toHaveLength(1);
    expect(nanika.find(Header)).toHaveLength(1);
    expect(nanika.find(Login)).toHaveLength(1);
    expect(nanika.find(Footer)).toHaveLength(1);
  });
});
