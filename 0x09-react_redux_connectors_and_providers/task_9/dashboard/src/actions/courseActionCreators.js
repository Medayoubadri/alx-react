import {
  SELECT_COURSE,
  UNSELECT_COURSE,
  FETCH_COURSE_SUCCESS,
} from "./courseActionTypes";
import { bindActionCreators } from "redux";

export function selectCourse(index) {
  return {
    type: SELECT_COURSE,
    index,
  };
}

export function unSelectCourse(index) {
  return {
    type: UNSELECT_COURSE,
    index,
  };
}

// Action creator for setting courses data
export function setCourses(data) {
  return {
    type: FETCH_COURSE_SUCCESS,
    data,
  };
}

// Async action creator for fetching courses
export function fetchCourses() {
  return (dispatch) => {
    return fetch("/courses.json")
      .then((response) => response.json())
      .then((data) => dispatch(setCourses(data)))
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  };
}

export const boundSelectCourse = (dispatch) =>
  bindActionCreators({ selectCourse }, dispatch).selectCourse;
export const boundUnSelectCourse = (dispatch) =>
  bindActionCreators({ unSelectCourse }, dispatch).unSelectCourse;
