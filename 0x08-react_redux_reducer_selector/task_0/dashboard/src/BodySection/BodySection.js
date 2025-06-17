import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, css } from "aphrodite";

function BodySection({ title, children }) {
  return (
    <div className={css(styles.bodySection)}>
      <h2>{title}</h2>
      {children}
    </div>
  );
}

const styles = StyleSheet.create({
  bodySection: {
    padding: "0 20px 0 20px",
  },
});

BodySection.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default BodySection;
