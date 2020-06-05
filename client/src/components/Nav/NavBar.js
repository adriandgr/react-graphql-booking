import React from "react";
import { NavLink } from "react-router-dom";

import AuthContext from "../../contexts/auth-context";
import "./NavBar.css";

const navBar = (props) => (
  <AuthContext.Consumer>
    {(context) => (
      <header className="nav-bar">
        <div className="nav-bar__logo">
          <h1>Bookings</h1>
        </div>
        <nav className="nav-bar__items">
          <ul>
            <li>
              <NavLink to="/events">Events</NavLink>
            </li>
            {context.token && (
              <li>
                <NavLink to="/Bookings">Bookings</NavLink>
              </li>
            )}
            {!context.token ? (
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
            ) : (
              <li>
                <NavLink to="/logout">Logout</NavLink>
              </li>
            )}
          </ul>
        </nav>
      </header>
    )}
  </AuthContext.Consumer>
);

export default navBar;
