import React from "react";
import { StyleSheet, css } from "aphrodite";

export default function Login() {
  return (
    <>
      <div className={css(styles.body)}>
        <p>Login to access the full dashboard</p>
        <form className={css(styles.form)}>
          <div className={css(styles.inputGroup)}>
            <label htmlFor="email" className={css(styles.label)}>
              Email:
            </label>
            <input
              type="email"
              name="email"
              className={css(styles.input)}
            ></input>
          </div>
          <div className={css(styles.inputGroup)}>
            <label htmlFor="password" className={css(styles.label)}>
              Password:
            </label>
            <input
              type="password"
              name="password"
              className={css(styles.input)}
            ></input>
          </div>
          <button className={css(styles.button)}>OK</button>
        </form>
      </div>
    </>
  );
}

const styles = StyleSheet.create({
  body: {
    fontSize: "1rem",
    padding: "2em",
    borderBottom: "3px solid #e0354b",
    height: "45%",
  },

  form: {
    display: "flex",
    "@media (max-width: 900px)": {
      flexDirection: "column",
    },
  },

  inputGroup: {
    display: "flex",
    flexDirection: "row",
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
    margin: "0 16px 0 8px",
    "@media (max-width: 900px)": {
      margin: "0 0 10px 0",
      width: "100%",
    },
  },

  button: {
    width: "40px",
    alignSelf: "flex-start",
    "@media (max-width: 900px)": {
      width: "80px",
      marginTop: "10px",
    },
  },
});
