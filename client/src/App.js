import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import LoginPage from "./pages/Login";
import LogoutPage from "./pages/Logout";
import EventsPage from "./pages/Events";
import BookingsPage from "./pages/Booking";
import NavBar from "./components/Nav/NavBar";
import AuthContext from "./contexts/auth-context";

import "./App.css";

class App extends React.Component {
  state = {
    token: null,
    userId: null
  }
  login = (token, userId, tokenExp) => {
    this.setState({token: token, userId: userId})
  };
  logout = () => {
    this.setState({token: null, userId: null})
  };

  render() {
    return (
      <BrowserRouter>
        <AuthContext.Provider
          value={{
            token: this.state.token,
            userId: this.state.userId,
            login: this.login,
            logout: this.logout,
          }}
        >
          <NavBar />
          <main className="main-content">
            <Switch>
              <Redirect from="/" to="/login" exact />
              <Route path="/login" component={LoginPage} />
              <Route path="/logout" component={LogoutPage} />
              <Route path="/events" component={EventsPage} />
              <Route path="/bookings" component={BookingsPage} />
            </Switch>
          </main>
        </AuthContext.Provider>
      </BrowserRouter>
    );
  }
}

export default App;
