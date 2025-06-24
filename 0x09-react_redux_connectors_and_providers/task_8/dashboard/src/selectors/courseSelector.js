import { Map } from "immutable";

/**
 * Selector to get all course entities from the reducer
 * @param {Map} state - The state from the course reducer
 * @returns {List} The list of courses as an Immutable List
 */
export const getListCourses = (state) => {
  // Get all course entities and return as valueSeq (which returns a Seq that can be converted to List)
  return state.valueSeq();
};
