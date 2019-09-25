import React from "react";
import LoginForm from "./LoginForm";
import LoginPage from "./LoginPage";

class App extends React.Component {
  render() {
    return (
      <div>
        <LoginPage />
        <LoginForm />
      </div>
    );
  }
}

export default App;
