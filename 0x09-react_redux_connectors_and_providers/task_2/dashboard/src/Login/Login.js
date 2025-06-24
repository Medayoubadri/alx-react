import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, css } from "aphrodite";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      enableSubmit: false,
    };
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  handleLoginSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.logIn(email, password);
  }

  handleChangeEmail(event) {
    const email = event.target.value;
    this.setState({ email }, () => {
      this.updateSubmitButton();
    });
  }

  handleChangePassword(event) {
    const password = event.target.value;
    this.setState({ password }, () => {
      this.updateSubmitButton();
    });
  }

  updateSubmitButton() {
    const { email, password } = this.state;
    this.setState({
      enableSubmit: email !== "" && password !== "",
    });
  }

  render() {
    const { email, password, enableSubmit } = this.state;

    return (
      <>
        <div className={css(styles.body)}>
          <p>Login to access the full dashboard</p>
          <form className={css(styles.form)} onSubmit={this.handleLoginSubmit}>
            <div className={css(styles.inputGroup)}>
              <label htmlFor="email" className={css(styles.label)}>
                Email:
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={this.handleChangeEmail}
                className={css(styles.input)}
              />
            </div>
            <div className={css(styles.inputGroup)}>
              <label htmlFor="password" className={css(styles.label)}>
                Password:
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={this.handleChangePassword}
                className={css(styles.input)}
              />
            </div>
            <input
              type="submit"
              value="OK"
              disabled={!enableSubmit}
              className={css(styles.button)}
            />
          </form>
        </div>
      </>
    );
  }
}

Login.propTypes = {
  logIn: PropTypes.func,
};

Login.defaultProps = {
  logIn: () => {},
};

export default Login;

const styles = StyleSheet.create({
  body: {
    fontSize: "1rem",
    height: "45%",
  },

  form: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    "@media (max-width: 900px)": {
      flexDirection: "column",
    },
  },

  inputGroup: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    margin: "10px",
    marginBottom: "10px",
    "@media (max-width: 900px)": {
      flexDirection: "column",
    },
  },

  label: {
    marginRight: "5px",
    "@media (max-width: 900px)": {
      marginBottom: "5px",
    },
  },

  input: {
    padding: "8px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    width: "200px",
    "@media (max-width: 900px)": {
      margin: "0 0 10px 0",
      width: "100%",
    },
  },

  button: {
    width: "80px",
    height: "40px",
    borderRadius: "8px",
    backgroundColor: "darkgrey",
    color: "white",
    border: "none",
    cursor: "pointer",
    transition: "all .3s linear",
    ":hover": {
      backgroundColor: "gray",
    },
    ":disabled": {
      backgroundColor: "#ccc",
      cursor: "not-allowed",
    },
    "@media (max-width: 900px)": {
      width: "80px",
      marginTop: "10px",
    },
  },
});
