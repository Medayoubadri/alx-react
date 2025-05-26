import React from "react";
import { StyleSheet, css } from "aphrodite";

export default function Login() {
  return (
    <>
      <div className={css(styles.body)}>
        <p>Login to access the full dashboard</p>
        <form>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            className={css(styles.input)}
          ></input>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            className={css(styles.input)}
          ></input>
          <button>OK</button>
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

  input: {
    margin: "0 16px 0 8px",
  },
});
