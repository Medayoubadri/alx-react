import React, { Component } from "react";
import closeIcon from "../assets/close-icon.png";
import NotificationItem from "./NotificationItem";
import PropTypes from "prop-types";
import NotificationItemShape from "./NotificationItemShape";
import { StyleSheet, css } from "aphrodite";

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.markAsRead = this.markAsRead.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    // Only update if the new listNotifications is longer than the previous one
    return (
      nextProps.listNotifications.length > this.props.listNotifications.length
    );
  }

  markAsRead(id) {
    console.log(`Notification ${id} has been marked as read`);
  }

  render() {
    const { displayDrawer, listNotifications } = this.props;
    return (
      <>
        {!displayDrawer && (
          <div className={css(styles.menuItem)}>
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
              onClick={() => console.log("Close button has been clicked")}
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
                      markAsRead={this.markAsRead}
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
    border: "2px dashed #e0354b",
    padding: "0 0 0 1.5rem",
    position: "absolute",
    top: "2rem",
    right: "1rem",
    width: "20%",
    fontSize: "20px",
    zIndex: 1000,
    backgroundColor: "white",
    "@media (max-width: 900px)": {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: "100%",
      height: "100%",
      border: "none",
      zIndex: 999,
      background: "white",
      padding: "0",
    },
  },

  menuItem: {
    textAlign: "right",
    marginRight: "1rem",
    padding: "0.5rem 0",
    cursor: "pointer",
    float: "right",
    backgroundColor: "#fff8f8",
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
};

Notifications.defaultProps = {
  displayDrawer: false,
  listNotifications: [],
};

export default Notifications;
