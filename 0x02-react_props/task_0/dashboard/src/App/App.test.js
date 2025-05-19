import App from "./App";

describe("Test App.js", () => {
  it("Renders App without crashing", (done) => {
    expect(shallow(<App />).exists());
    done();
  });
});
