import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getFooterCopy, getFullYear } from "../utils/utils";
import "./Footer.css";

function Footer({ user }) {
  return (
    <div className="App-footer">
      <p>
        Copyright {getFullYear()} - {getFooterCopy()}
      </p>
      {user && user.isLoggedIn && (
        <p>
          <a href="#">Contact us</a>
        </p>
      )}
    </div>
  );
}

Footer.propTypes = {
  user: PropTypes.object,
};

Footer.defaultProps = {
  user: null,
};

const mapStateToProps = (state) => {
  return {
    user: state.get("user"),
  };
};

// Export the unconnected component for testing
export { Footer };

export default connect(mapStateToProps)(Footer);
