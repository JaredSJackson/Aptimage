import * as React from "react";
import axios from "axios";
// import bcrypt from "bcryptjs";
// import bcrypt from "bcrypt";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      data: ""
    };
    this.loginInfo = this.loginInfo.bind(this);
  }

  // state = {
  //   loading: true
  // };

  loginInfo() {
    // sends a json to the api THIS PART kinda WORKS vvv
    console.log("Click");

    // make the bcrypt thing for password
    // const bcrypt = require("bcrypt");
    // const saltRounds = 10;
    // const myPlaintextPassword = "s0//P4$$w0rD";
    // const someOtherPlaintextPassword = "not_bacon";

    // this hashing part should be done in the create account part
    // bcrypt.genSalt(saltRounds, function(err, salt) {
    // bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
    // Store hash in your password DB.
    // });
    // });

    // fetch("http://aptimage.net/API/techtest.aspx", {
    //   method: "POST",
    //   mode: "no-cors",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     un: "phill",
    //     pw: "123"
    //   })
    // })
    //   // .then(res => res.json())
    //   // this does happen
    //   .then(function(response) {
    //     console.log(response);
    //     return response.json();
    //   })
    //   // so does this
    //   .catch(function(err) {
    //     console.log(err);
    //   });

    axios
      .post("https://aptimage.net/API/techtest.aspx", {
        un: "phill",
        pw: "123"
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });

    // .then(data => this.setState({ data }))
    // .then(console.log("response: " + this.res));
    // .then(console.log("data: " + this.data));

    //this compares the plaintext pw to the one that is hashed
    // bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
    //   console.log(res);
    // });

    //THIS IS THE ORIGINAL POST STUFF
    //
    // return fetch("http://aptimage.net/API/AddPKkeys.aspx", {
    //   method: "POST",
    //   mode: "no-cors",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     name: "phill",
    //     version: 123
    //   })
    // });
    // .then(response => response.json());
  }

  changeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  submitHandler = event => {
    event.preventDefault();
    console.log(this.state);
  };

  checkStat() {
    return <div>{console.log(this.state.responseData)}</div>;
  }

  render() {
    const { username, password } = this.state;
    return (
      <div>
        <form className="login-box" onSubmit={this.submitHandler}>
          <h3 className="login-prompt">Please Login</h3>
          <input
            className="input-boxes"
            type="username"
            name="username"
            value={username}
            onChange={this.changeHandler}
            placeholder="username"
            autoComplete="off"
          />

          <input
            className="input-boxes"
            type="password"
            name="password"
            value={password}
            onChange={this.changeHandler}
            placeholder="password"
          />

          <button className="log-button" onClick={() => this.loginInfo()}>
            login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
