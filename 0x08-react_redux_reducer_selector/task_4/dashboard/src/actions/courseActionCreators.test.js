import {
  selectCourse,
  unSelectCourse,
  boundSelectCourse,
  boundUnSelectCourse,
} from "./courseActionCreators";
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

  describe("bound action creators", () => {
    it("should create bound selectCourse action creator", () => {
      const mockDispatch = jest.fn();
      const boundAction = boundSelectCourse(mockDispatch);

      expect(typeof boundAction).toBe("function");
    });

    it("should create bound unSelectCourse action creator", () => {
      const mockDispatch = jest.fn();
      const boundAction = boundUnSelectCourse(mockDispatch);

      expect(typeof boundAction).toBe("function");
    });
  });
});
