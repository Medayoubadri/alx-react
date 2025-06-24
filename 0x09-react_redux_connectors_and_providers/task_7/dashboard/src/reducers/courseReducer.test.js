import { Map, fromJS } from "immutable";
import courseReducer from "./courseReducer";
import {
  FETCH_COURSE_SUCCESS,
  SELECT_COURSE,
  UNSELECT_COURSE,
} from "../actions/courseActionTypes";

describe("courseReducer", () => {
  it("should return an empty Map as default state", () => {
    const state = courseReducer(undefined, {});
    expect(state.toJS()).toEqual({});
  });

  it("should return the data passed with FETCH_COURSE_SUCCESS", () => {
    const action = {
      type: FETCH_COURSE_SUCCESS,
      data: [
        {
          id: 1,
          name: "ES6",
          credit: 60,
        },
        {
          id: 2,
          name: "Webpack",
          credit: 20,
        },
        {
          id: 3,
          name: "React",
          credit: 40,
        },
      ],
    };

    const expectedState = {
      1: {
        id: 1,
        name: "ES6",
        isSelected: false,
        credit: 60,
      },
      2: {
        id: 2,
        name: "Webpack",
        isSelected: false,
        credit: 20,
      },
      3: {
        id: 3,
        name: "React",
        isSelected: false,
        credit: 40,
      },
    };

    const state = courseReducer(undefined, action);
    expect(state.toJS()).toEqual(expectedState);
  });

  it("should return the data with the right item selected when SELECT_COURSE is passed", () => {
    const initialState = fromJS({
      1: {
        id: 1,
        name: "ES6",
        isSelected: false,
        credit: 60,
      },
      2: {
        id: 2,
        name: "Webpack",
        isSelected: false,
        credit: 20,
      },
      3: {
        id: 3,
        name: "React",
        isSelected: false,
        credit: 40,
      },
    });

    const action = {
      type: SELECT_COURSE,
      index: 2,
    };

    const expectedState = {
      1: {
        id: 1,
        name: "ES6",
        isSelected: false,
        credit: 60,
      },
      2: {
        id: 2,
        name: "Webpack",
        isSelected: true,
        credit: 20,
      },
      3: {
        id: 3,
        name: "React",
        isSelected: false,
        credit: 40,
      },
    };

    const state = courseReducer(initialState, action);
    expect(state.toJS()).toEqual(expectedState);
  });

  it("should return the data with the right item unselected when UNSELECT_COURSE is passed", () => {
    const initialState = fromJS({
      1: {
        id: 1,
        name: "ES6",
        isSelected: false,
        credit: 60,
      },
      2: {
        id: 2,
        name: "Webpack",
        isSelected: true,
        credit: 20,
      },
      3: {
        id: 3,
        name: "React",
        isSelected: false,
        credit: 40,
      },
    });

    const action = {
      type: UNSELECT_COURSE,
      index: 2,
    };

    const expectedState = {
      1: {
        id: 1,
        name: "ES6",
        isSelected: false,
        credit: 60,
      },
      2: {
        id: 2,
        name: "Webpack",
        isSelected: false,
        credit: 20,
      },
      3: {
        id: 3,
        name: "React",
        isSelected: false,
        credit: 40,
      },
    };

    const state = courseReducer(initialState, action);
    expect(state.toJS()).toEqual(expectedState);
  });
});
