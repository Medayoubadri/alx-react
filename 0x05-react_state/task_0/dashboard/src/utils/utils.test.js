import React from "react";
import { getFullYear, getFooterCopy, getLatestNotification } from "./utils";

test("returns current year", () => {
  expect(getFullYear()).toEqual(new Date().getFullYear());
});

test("correct footer copy", () => {
  expect(getFooterCopy(true)).toEqual("ALX");
  expect(getFooterCopy(false)).toEqual("ALX main dashboard");
});

test("returns right notification", () => {
  expect(getLatestNotification()).toEqual(
    "<strong>Urgent requirement</strong> - complete by EOD"
  );
});
