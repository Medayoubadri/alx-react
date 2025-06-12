import React from "react";
import { getFooterCopy, getFullYear } from "../utils/utils";
import AppContext from "../App/AppContext";
import "./Footer.css";

export default function Footer() {
  return (
    <AppContext.Consumer>
      {({ user }) => (
        <div className="App-footer">
          <p>
            Copyright {getFullYear()} - {getFooterCopy()}
          </p>
          {user.isLoggedIn && (
            <p>
              <a href="#">Contact us</a>
            </p>
          )}
        </div>
      )}
    </AppContext.Consumer>
  );
}
