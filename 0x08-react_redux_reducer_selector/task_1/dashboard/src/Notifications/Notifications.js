import React, { PureComponent } from "react";
import closeIcon from "../assets/close-icon.png";
import NotificationItem from "./NotificationItem";
import PropTypes from "prop-types";
import NotificationItemShape from "./NotificationItemShape";
import { StyleSheet, css } from "aphrodite";

class Notifications extends PureComponent {
  render() {
    const {
      displayDrawer,
      listNotifications,
      handleDisplayDrawer,
      handleHideDrawer,
      markNotificationAsRead,
    } = this.props;
    return (
      <>
        {!displayDrawer && (
          <div className={css(styles.menuItem)} onClick={handleDisplayDrawer}>
            <p>Your notifications</p>
          </div>
        )}
        {displayDrawer && (
          <div className={css(styles.Notifications)}>
            <button
              style={{
                color: "#3a3a3a",
                fontWeight: "bold",
                background: "none",
                border: "none",
                fontSize: "15px",
                position: "absolute",
                right: "2px",
                top: "2px",
                cursor: "pointer",
              }}
              aria-label="Close"
              onClick={handleHideDrawer}
            >
              <img
                className={css(styles.img)}
                src={closeIcon}
                alt="closeIcon"
              />
            </button>
            {listNotifications.length === 0 ? (
              <p>No new notification for now</p>
            ) : (
              <>
                <p className={css(styles.p)}>
                  Here is the list of notifications
                </p>
                <ul className={css(styles.notificationsList)}>
                  {listNotifications.map(({ id, type, value, html }) => (
                    <NotificationItem
                      key={id}
                      id={id}
                      type={type}
                      value={value}
                      html={html}
                      markAsRead={markNotificationAsRead}
                    />
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  Notifications: {
    top: "2rem",
    right: "1rem",
    position: "absolute",
    padding: "0 0 0 1.5rem",
    border: "2px dashed #e0354b",
    fontSize: "20px",
    zIndex: "100",
    backgroundColor: "white",
    "@media (max-width: 900px)": {
      width: "100%",
      padding: "0",
      position: "relative",
      right: 0,
      left: 0,
      bottom: 0,
      height: "100%",
      border: "none",
    },
  },

  menuItem: {
    top: "0",
    right: "0",
    position: "absolute",
    textAlign: "right",
    marginRight: "1rem",
    padding: "0.5rem 0",
    cursor: "pointer",
    zIndex: "100",
    ":hover": {
      animationName: [
        {
          "0%": { opacity: 0.5 },
          "100%": { opacity: 1 },
        },
        {
          "0%": { transform: "translateY(0px)" },
          "25%": { transform: "translateY(-5px)" },
          "50%": { transform: "translateY(0px)" },
          "75%": { transform: "translateY(5px)" },
          "100%": { transform: "translateY(0px)" },
        },
      ],
      animationDuration: ["1s", "0.5s"],
      animationIterationCount: 3,
    },
  },

  notificationsList: {
    padding: 0,
    "@media (max-width: 900px)": {
      padding: 0,
    },
  },

  p: {
    margin: "0",
    marginTop: "15px",
  },

  img: {
    marginTop: "5px",
    width: "15px",
  },
});

Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
  listNotifications: PropTypes.arrayOf(NotificationItemShape),
  handleDisplayDrawer: PropTypes.func,
  handleHideDrawer: PropTypes.func,
  markNotificationAsRead: PropTypes.func,
};

Notifications.defaultProps = {
  displayDrawer: false,
  listNotifications: [],
  handleDisplayDrawer: () => {},
  handleHideDrawer: () => {},
  markNotificationAsRead: () => {},
};

export default Notifications;
