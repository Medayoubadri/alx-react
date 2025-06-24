import React, { Component } from "react";
import { connect } from "react-redux";
import CourseListRow from "./CourseListRow";
import PropTypes from "prop-types";
import { StyleSheet, css } from "aphrodite";
import {
  fetchCourses,
  selectCourse,
  unSelectCourse,
} from "../actions/courseActionCreators";
import { getListCourses } from "../selectors/courseSelector";

class CourseList extends Component {
  componentDidMount() {
    this.props.fetchCourses();
  }

  onChangeRow = (id, checked) => {
    if (checked) {
      this.props.selectCourse(id);
    } else {
      this.props.unSelectCourse(id);
    }
  };

  render() {
    const { listCourses } = this.props;

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
                key={course.get("id")}
                textFirstCell={course.get("name")}
                textSecondCell={String(course.get("credit"))}
                isHeader={false}
                isChecked={course.get("isSelected")}
                onChangeRow={this.onChangeRow}
                id={course.get("id")}
              />
            ))
          )}
        </tbody>
      </table>
    );
  }
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
  listCourses: PropTypes.array,
  fetchCourses: PropTypes.func.isRequired,
  selectCourse: PropTypes.func.isRequired,
  unSelectCourse: PropTypes.func.isRequired,
};

CourseList.defaultProps = {
  listCourses: [],
};

const mapStateToProps = (state) => {
  return {
    listCourses: getListCourses(state.courses).toArray(),
  };
};

const mapDispatchToProps = {
  fetchCourses,
  selectCourse,
  unSelectCourse,
};

// Export unconnected component for testing
export { CourseList };

export default connect(mapStateToProps, mapDispatchToProps)(CourseList);
