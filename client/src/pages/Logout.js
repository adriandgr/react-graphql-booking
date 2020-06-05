import React from "react";
import AuthContext from "../contexts/auth-context";

class LoginPage extends React.Component {
  static contextType = AuthContext;
  componentDidMount() {
    this.context.logout();
  }
  render() {
    
    return (
      <div>
        <h1> You have logged out.</h1>
      </div>
    );
  }
}

export default LoginPage;
