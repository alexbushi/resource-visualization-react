import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { rtoList } from "./constants";

class LoginForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
      rtoName: "",
    },
    rtos: rtoList,
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
    rtoName: Joi.string().required().label("RTO"),
  };

  doSubmit = () => {
    // TODO: dispatch loginUser(username, password);
    console.log("submitted");
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderSelect("rtoName", "RTO", this.state.rtos)}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
