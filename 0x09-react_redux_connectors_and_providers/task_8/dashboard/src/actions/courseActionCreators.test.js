import {
  selectCourse,
  unSelectCourse,
  boundSelectCourse,
  boundUnSelectCourse,
  setCourses,
  fetchCourses,
} from "./courseActionCreators";
import {
  SELECT_COURSE,
  UNSELECT_COURSE,
  FETCH_COURSE_SUCCESS,
} from "./courseActionTypes";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// Mock fetch
beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  global.fetch.mockRestore();
});

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

  describe("setCourses", () => {
    it("should return the correct action when calling setCourses", () => {
      const coursesData = [
        { id: 1, name: "ES6", credit: 60 },
        { id: 2, name: "Webpack", credit: 20 },
      ];

      const expectedAction = {
        type: FETCH_COURSE_SUCCESS,
        data: coursesData,
      };

      const result = setCourses(coursesData);
      expect(result).toEqual(expectedAction);
    });
  });

  describe("fetchCourses", () => {
    it("should create FETCH_COURSE_SUCCESS when fetching courses has been done", () => {
      const coursesData = [
        { id: 1, name: "ES6", credit: 60 },
        { id: 2, name: "Webpack", credit: 20 },
      ];

      // Mock successful fetch response
      global.fetch.mockResolvedValue({
        json: jest.fn().mockResolvedValue(coursesData),
      });

      const expectedActions = [
        { type: FETCH_COURSE_SUCCESS, data: coursesData },
      ];

      const store = mockStore({});

      return store.dispatch(fetchCourses()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
