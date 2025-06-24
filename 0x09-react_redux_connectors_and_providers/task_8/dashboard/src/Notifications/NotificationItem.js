import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { StyleSheet, css } from "aphrodite";

class NotificationItem extends PureComponent {
  render() {
    const { type, html, value, markAsRead, id } = this.props;
    const itemStyles = type === "urgent" ? styles.urgent : styles.default;

    return html ? (
      <li
        className={css(itemStyles, styles.item)}
        data-notification-type={type}
        dangerouslySetInnerHTML={html}
        onClick={() => markAsRead(id)}
      ></li>
    ) : (
      <li
        className={css(itemStyles, styles.item)}
        data-notification-type={type}
        onClick={() => markAsRead(id)}
      >
        {value}
      </li>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    padding: "4px",
    marginInline: "16px",
    fontSize: "16px",
    "@media (max-width: 900px)": {
      width: "100%",
      borderBottom: "1px solid black",
      fontSize: "16px",
    },
  },
  default: {
    color: "blue",
  },
  urgent: {
    color: "red",
    fontWeight: "bold",
  },
});

NotificationItem.defaultProps = {
  type: "default",
  markAsRead: () => {},
  id: 0,
};

NotificationItem.propTypes = {
  html: PropTypes.shape({
    __html: PropTypes.string,
  }),
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  markAsRead: PropTypes.func,
  id: PropTypes.number.isRequired,
};

export default NotificationItem;
