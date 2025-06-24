import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../actions/uiActionCreators";
import logo from "../assets/logo.jpg";
import { StyleSheet, css } from "aphrodite";

class Header extends Component {
  render() {
    const { user, logout } = this.props;

    return (
      <>
        <div className={css(styles.header)}>
          <img src={logo} alt="logo" className={css(styles.headerImg)} />
          <h1>School dashboard</h1>
        </div>
        {user && user.isLoggedIn && (
          <section id="logoutSection" className={css(styles.logoutSection)}>
            Welcome {user.email} (
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                logout();
              }}
              className={css(styles.logoutLink)}
            >
              logout
            </a>
            )
          </section>
        )}
      </>
    );
  }
}

Header.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func,
};

Header.defaultProps = {
  user: null,
  logout: () => {},
};

const mapStateToProps = (state) => {
  return {
    user: state.ui.get("user"),
  };
};

const mapDispatchToProps = {
  logout,
};

// Export the unconnected component for testing
export { Header };

export default connect(mapStateToProps, mapDispatchToProps)(Header);

const styles = StyleSheet.create({
  header: {
    fontSize: "1.4rem",
    color: "#e0354b",
    display: "flex",
    alignItems: "center",
    borderBottom: "3px solid #e0354b",
  },

  headerImg: {
    width: "200px",
    height: "200px",
  },

  logoutSection: {
    color: "#000",
    fontSize: "1rem",
    fontStyle: "italic",
    margin: "10px 0",
  },

  logoutLink: {
    color: "#e0354b",
    cursor: "pointer",
    textDecoration: "underline",
  },
});
