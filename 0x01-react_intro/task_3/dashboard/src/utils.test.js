import { getFullYear, getFooterCopy, getLatestNotification } from "./utils";

test("returns current year", () => {
  expect(getFullYear()).toBe(new Date().getFullYear());
});

test("correct footer copy", () => {
  expect(getFooterCopy(true)).toBe("ALX");
  expect(getFooterCopy(false)).toBe("ALX main dashboard");
});

test("returns right notification", () => {
  expect(getLatestNotification()).toBe(
    "<strong>Urgent requirement</strong> - complete by EOD"
  );
});
