import { selectCourse, unSelectCourse } from "./courseActionCreators";
import { SELECT_COURSE, UNSELECT_COURSE } from "./courseActionTypes";

describe("Course Action Creators", () => {
  describe("selectCourse", () => {
    it("should return the correct action when calling selectCourse with index 1", () => {
      const expectedAction = {
        type: SELECT_COURSE,
        index: 1,
      };

      const result = selectCourse(1);
      expect(result).toEqual(expectedAction);
    });
  });

  describe("unSelectCourse", () => {
    it("should return the correct action when calling unSelectCourse with index 1", () => {
      const expectedAction = {
        type: UNSELECT_COURSE,
        index: 1,
      };

      const result = unSelectCourse(1);
      expect(result).toEqual(expectedAction);
    });
  });
});
