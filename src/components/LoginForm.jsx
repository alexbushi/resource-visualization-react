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
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
    rtoName: Joi.string().required().label("RTO"),
  };

  doSubmit = async () => {
    await this.props.loginUser(
      this.state.data.username,
      this.state.data.password
    );
  };

  render() {
    const { loginErrors, networkErrors } = this.props;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderSelect("rtoName", "RTO", this.state.rtos)}
          {this.renderButton("Login")}
          {loginErrors.length !== 0 && (
            <div className='alert alert-danger'>{loginErrors}</div>
          )}
          {networkErrors.length !== 0 && (
            <div className='alert alert-danger'>{networkErrors}</div>
          )}
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loadingUser: state.entities.user.loading,
  networkErrors: state.entities.user.networkErrors,
  loginErrors: state.entities.user.loginErrors,
});

const mapDispatchToProps = (dispatch) => ({
  loginUser: (user, password) => dispatch(loginUser(user, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
