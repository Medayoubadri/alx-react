import {
  FETCH_COURSE_SUCCESS,
  SELECT_COURSE,
  UNSELECT_COURSE,
} from "../actions/courseActionTypes";

// Default state is an empty array
const initialState = [];

const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COURSE_SUCCESS:
      // Set isSelected to false for every item in the list
      return action.data.map((course) => ({
        ...course,
        isSelected: false,
      }));

    case SELECT_COURSE:
      // Update the course with the matching id to set isSelected to true
      return state.map((course) =>
        course.id === action.index ? { ...course, isSelected: true } : course
      );

    case UNSELECT_COURSE:
      // Update the course with the matching id to set isSelected to false
      return state.map((course) =>
        course.id === action.index ? { ...course, isSelected: false } : course
      );

    default:
      return state;
  }
};

export default courseReducer;
