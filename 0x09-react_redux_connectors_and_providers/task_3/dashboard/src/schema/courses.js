import { schema, normalize } from "normalizr";

// Define the course entity schema
const course = new schema.Entity("courses");

// Function to normalize course data
const coursesNormalizer = (data) => {
  return normalize(data, [course]);
};

export { course, coursesNormalizer };
