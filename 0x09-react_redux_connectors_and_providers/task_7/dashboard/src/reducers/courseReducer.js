import { Map, fromJS } from "immutable";
import {
  FETCH_COURSE_SUCCESS,
  SELECT_COURSE,
  UNSELECT_COURSE,
} from "../actions/courseActionTypes";
import { coursesNormalizer } from "../schema/courses";

// Default state is an empty Immutable Map
const initialState = Map({});

const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COURSE_SUCCESS:
      // Normalize the data and merge it with the state
      const normalizedData = coursesNormalizer(action.data);

      // Add isSelected: false to each course
      const coursesWithSelection = Object.keys(
        normalizedData.entities.courses
      ).reduce((acc, courseId) => {
        acc[courseId] = {
          ...normalizedData.entities.courses[courseId],
          isSelected: false,
        };
        return acc;
      }, {});

      return fromJS(coursesWithSelection);

    case SELECT_COURSE:
      // Use setIn function from Immutable to update the value
      return state.setIn([String(action.index), "isSelected"], true);

    case UNSELECT_COURSE:
      // Use setIn function from Immutable to update the value
      return state.setIn([String(action.index), "isSelected"], false);

    default:
      return state;
  }
};

export default courseReducer;
