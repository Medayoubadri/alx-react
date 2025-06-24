import { fromJS } from "immutable";
import { getListCourses } from "./courseSelector";

describe("courseSelector", () => {
  describe("getListCourses", () => {
    it("should return all courses as a List", () => {
      const state = fromJS({
        1: {
          id: 1,
          name: "ES6",
          credit: 60,
          isSelected: false,
        },
        2: {
          id: 2,
          name: "Webpack",
          credit: 20,
          isSelected: false,
        },
        3: {
          id: 3,
          name: "React",
          credit: 40,
          isSelected: false,
        },
      });

      const result = getListCourses(state);

      // Check that we get a Seq/List with correct length
      expect(result.size).toBe(3);

      // Convert to JS array to check content
      const coursesArray = result.toArray();

      // Check first course
      expect(coursesArray[0].get("id")).toBe(1);
      expect(coursesArray[0].get("name")).toBe("ES6");
      expect(coursesArray[0].get("credit")).toBe(60);
      expect(coursesArray[0].get("isSelected")).toBe(false);

      // Check second course
      expect(coursesArray[1].get("id")).toBe(2);
      expect(coursesArray[1].get("name")).toBe("Webpack");
      expect(coursesArray[1].get("credit")).toBe(20);
      expect(coursesArray[1].get("isSelected")).toBe(false);

      // Check third course
      expect(coursesArray[2].get("id")).toBe(3);
      expect(coursesArray[2].get("name")).toBe("React");
      expect(coursesArray[2].get("credit")).toBe(40);
      expect(coursesArray[2].get("isSelected")).toBe(false);
    });

    it("should return empty List when state is empty", () => {
      const state = fromJS({});
      const result = getListCourses(state);

      expect(result.size).toBe(0);
    });
  });
});
