import React, { useState } from "react";
import PropTypes from "prop-types";
import { StyleSheet, css } from "aphrodite";

function CourseListRow({ isHeader, textFirstCell, textSecondCell }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <tr
      className={css(
        isHeader ? styles.headerRow : styles.defaultRow,
        isChecked && styles.rowChecked
      )}
    >
      {isHeader ? (
        textSecondCell === null ? (
          <th colSpan="2" className={css(styles.thDefault)}>
            {textFirstCell}
          </th>
        ) : (
          <>
            <th className={css(styles.thDefault, styles.thFirstChild)}>
              {textFirstCell}
            </th>
            <th className={css(styles.thDefault)}>{textSecondCell}</th>
          </>
        )
      ) : (
        <>
          <td className={css(styles.tdDefault)}>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            {textFirstCell}
          </td>
          <td className={css(styles.tdDefault)}>{textSecondCell}</td>
        </>
      )}
    </tr>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    backgroundColor: "#deb5b545",
  },
  defaultRow: {
    backgroundColor: "#f5f5f5ab",
  },
  rowChecked: {
    backgroundColor: "#e6e4e4",
  },
  thDefault: {
    borderBottom: "2px solid lightgray",
    padding: "0.5rem",
  },
  thFirstChild: {
    textAlign: "left",
  },
  tdDefault: {
    padding: "0.5rem",
  },
});

CourseListRow.propTypes = {
  isHeader: PropTypes.bool,
  textFirstCell: PropTypes.string.isRequired,
  textSecondCell: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

CourseListRow.defaultProps = {
  isHeader: false,
  textSecondCell: null,
};

export default CourseListRow;
