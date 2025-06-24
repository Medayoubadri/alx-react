import React, { Component } from "react";
import logo from "../assets/logo.jpg";
import { StyleSheet, css } from "aphrodite";
import AppContext from "../App/AppContext";

class Header extends Component {
  static contextType = AppContext;

  render() {
    // Use props for testing or context for real app
    const context = this.context || {
      user: { isLoggedIn: false, email: "" },
      logOut: () => {},
    };
    const user = this.props.user || context.user;
    const logOut = this.props.logOut || context.logOut;

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
                logOut();
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

export default Header;

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
