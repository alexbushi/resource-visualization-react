import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { rtoList } from "./constants";
import { loginUser } from "../store/user";
import { connect } from "react-redux";

class LoginForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
      rtoName: "",
    },
    rtos: rtoList,
    errors: {},
    showErrorMessage: false,
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
    rtoName: Joi.string().required().label("RTO"),
  };

  doSubmit = async () => {
    this.setState({ showErrorMessage: false });
    await this.props.loginUser(
      this.state.data.username,
      this.state.data.password
    );
    if (this.props.token) {
      // window.location = '/';
    } else {
      this.setState({ showErrorMessage: true });
    }
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderSelect("rtoName", "RTO", this.state.rtos)}
          {this.renderButton("Login", this.props.loading)}
          {this.state.showErrorMessage &&
            this.renderErrorMessage(this.props.apiErrors)}
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loadingUser: state.entities.user.loading,
  apiErrors: state.entities.user.errors,
  token: state.entities.user.token,
  loading: state.entities.user.loading,
});

const mapDispatchToProps = (dispatch) => ({
  loginUser: (user, password) => dispatch(loginUser(user, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
