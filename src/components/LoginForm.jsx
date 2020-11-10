import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { rtoList } from "../constants";
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
      this.state.data.password,
      this.state.rtos[this.state.data.rtoName].name
    );

    if (this.props.token) {
      // token received so go to home screen
      this.props.history.push("/resources");
    } else {
      // no token was received so there must be an error
      this.setState({ showErrorMessage: true });
    }
  };

  render() {
    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-4'></div>
          <div className='col-4'>
            <h1 className='d-flex justify-content-center'>Login</h1>
          </div>
          <div className='col-4'></div>
        </div>
        <div className='row'>
          <div className='col-4'></div>
          <div className='col-4'>
            <form onSubmit={this.handleSubmit}>
              {this.renderInput("username", "Username")}
              {this.renderInput("password", "Password", "password")}
              {this.renderSelect("rtoName", "RTO", this.state.rtos)}
              {this.renderButton("Login", this.props.loading)}
              {this.state.showErrorMessage &&
                this.renderErrorMessage(this.props.apiErrors)}
            </form>
          </div>
          <div className='col-4'></div>
        </div>
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
  loginUser: (user, password, rto) => dispatch(loginUser(user, password, rto)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
