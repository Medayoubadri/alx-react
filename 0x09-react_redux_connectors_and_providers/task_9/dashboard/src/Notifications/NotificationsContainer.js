import React, { Component } from "react";
import { connect } from "react-redux";
import Notifications from "./Notifications";
import {
  fetchNotifications,
  markAsAread,
  setNotificationFilter,
} from "../actions/notificationActionCreators";
import { getUnreadNotificationsByType } from "../selectors/notificationSelector";

class NotificationsContainer extends Component {
  componentDidMount() {
    this.props.fetchNotifications();
  }

  render() {
    return <Notifications {...this.props} />;
  }
}

const mapStateToProps = (state) => {
  return {
    listNotifications: getUnreadNotificationsByType(state.notifications)
      .valueSeq()
      .toArray(),
  };
};

const mapDispatchToProps = {
  fetchNotifications,
  markNotificationAsRead: markAsAread,
  setNotificationFilter,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsContainer);

// Export unconnected component for testing
export { NotificationsContainer };
