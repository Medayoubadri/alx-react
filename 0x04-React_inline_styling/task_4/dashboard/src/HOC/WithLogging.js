import React, { Component } from "react";

const WithLogging = (WrappedComponent) => {
  const componentName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";

  class LogWrapper extends Component {
    componentDidMount() {
      console.log(`Component ${componentName} is mounted`);
    }

    componentWillUnmount() {
      console.log(`Component ${componentName} is going to unmount`);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  LogWrapper.displayName = `WithLogging(${componentName})`;
  return LogWrapper;
};

export default WithLogging;
