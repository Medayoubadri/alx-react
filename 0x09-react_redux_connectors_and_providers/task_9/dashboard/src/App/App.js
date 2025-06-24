import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  displayNotificationDrawer,
  hideNotificationDrawer,
  loginRequest,
  logout,
} from "../actions/uiActionCreators";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Login from "../Login/Login";
import CourseList from "../CourseList/CourseList";
import NotificationsContainer from "../Notifications/NotificationsContainer";
import BodySectionWithMarginBottom from "../BodySection/BodySectionWithMarginBottom";
import BodySection from "../BodySection/BodySection";
import { StyleSheet, css } from "aphrodite";
import { getLatestNotification } from "../utils/utils";
import AppContext, { defaultUser, defaultLogOut } from "./AppContext";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: defaultUser,
      logOut: this.logOut,
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  logOut() {
    this.setState({
      user: defaultUser,
    });
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown(event) {
    if (event.ctrlKey && event.key === "h") {
      alert("Logging you out");
      this.logOut();
    }
  }

  render() {
    const { user, logOut } = this.state;
    const {
      displayDrawer,
      displayNotificationDrawer,
      hideNotificationDrawer,
      loginRequest,
    } = this.props;
    const contextValue = {
      user,
      logOut,
    };
    return (
      <AppContext.Provider value={contextValue}>
        <NotificationsContainer
          displayDrawer={displayDrawer}
          handleDisplayDrawer={displayNotificationDrawer}
          handleHideDrawer={hideNotificationDrawer}
        />
        <div className={css(styles.App)}>
          <Header />
          {user.isLoggedIn ? (
            <BodySectionWithMarginBottom title="Course list">
              <CourseList />
            </BodySectionWithMarginBottom>
          ) : (
            <BodySectionWithMarginBottom title="Log in to continue">
              <Login logIn={loginRequest} />
            </BodySectionWithMarginBottom>
          )}
          <BodySection title="News from the School">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </BodySection>
          <Footer />
        </div>
      </AppContext.Provider>
    );
  }
}

// Define propTypes for the App component
App.propTypes = {
  isLoggedIn: PropTypes.bool,
  displayDrawer: PropTypes.bool,
  displayNotificationDrawer: PropTypes.func,
  hideNotificationDrawer: PropTypes.func,
  loginRequest: PropTypes.func,
  logout: PropTypes.func,
};

// Define defaultProps for the App component
App.defaultProps = {
  isLoggedIn: false,
  displayDrawer: false,
  displayNotificationDrawer: () => {},
  hideNotificationDrawer: () => {},
  loginRequest: () => {},
  logout: () => {},
};

const styles = StyleSheet.create({
  App: {
    height: "100vh",
    maxWidth: "100vw",
    position: "relative",
    fontFamily: "Arial, Helvetica, sans-serif",
  },
});

// mapStateToProps function to connect rootReducer state to component props
export const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.ui.get("isUserLoggedIn"),
    displayDrawer: state.ui.get("isNotificationDrawerVisible"),
  };
};

// mapDispatchToProps using simplified version
const mapDispatchToProps = {
  displayNotificationDrawer,
  hideNotificationDrawer,
  loginRequest,
  logout,
};

// Export the unconnected component for testing
export { App };

export default connect(mapStateToProps, mapDispatchToProps)(App);
