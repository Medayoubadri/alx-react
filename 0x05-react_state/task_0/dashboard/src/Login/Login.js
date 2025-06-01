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
    "@media (max-width: 900px)": {
      width: "80px",
      marginTop: "10px",
    },
  },
});
