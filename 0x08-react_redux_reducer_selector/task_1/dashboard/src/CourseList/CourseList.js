import React from "react";
import CourseListRow from "./CourseListRow";
import PropTypes from "prop-types";
import CourseShape from "./CourseShape";
import { StyleSheet, css } from "aphrodite";

function CourseList({ listCourses = [] }) {
  return (
    <table id="CourseList" className={css(styles.table)}>
      <thead className={css(styles.thead)}>
        <CourseListRow textFirstCell="Available courses" isHeader={true} />
        <CourseListRow
          textFirstCell="Course name"
          textSecondCell="Credit"
          isHeader={true}
        />
      </thead>
      <tbody>
        {listCourses.length === 0 ? (
          <CourseListRow
            textFirstCell="No course available yet"
            isHeader={false}
          />
        ) : (
          listCourses.map((course) => (
            <CourseListRow
              key={course.id}
              textFirstCell={course.name}
              textSecondCell={String(course.credit)}
              isHeader={false}
            />
          ))
        )}
      </tbody>
    </table>
  );
}

const styles = StyleSheet.create({
  table: {
    width: "80%",
    border: "1px solid #ddd",
    borderCollapse: "collapse",
    marginTop: "2rem",
    marginLeft: "auto",
    marginRight: "auto",
  },
  thead: {
    borderBottom: "2px solid #ddd",
    padding: "0.5rem",
    textAlign: "left",
  },
});

CourseList.propTypes = {
  listCourses: PropTypes.arrayOf(CourseShape),
};

CourseList.defaultProps = {
  listCourses: [],
};

export default CourseList;
