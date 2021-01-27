import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import { setUserSettings } from '../store/user';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class SettingsView extends Form {
  state = {
    data: {
      refreshRate: 10,
    },
    errors: {},
    showErrorMessage: false,
  };

  schema = {
    refreshRate: Joi.number().label('Refresh Rate'),
  };

  doSubmit = async () => {
    this.setState({ showErrorMessage: false });

    await this.props.setUserSettings(this.state.data.refreshRate);

    if (this.props.apiErrors) this.setState({ showErrorMessage: true });
    console.log(this.props.apiErrors);
  };

  render() {
    return (
      <div className='container-fluid'>
        <div className='row mb-4'>
          <div className='col-3'></div>
          <div className='col-6'>
            <h1 className='d-flex justify-content-center'>
              Settings *Not yet fully implemented*
            </h1>
          </div>
          <div className='col-3'></div>
        </div>
        <div className='row'>
          <div className='col-5'></div>
          <div className='col-2'>
            <form onSubmit={this.handleSubmit}>
              {this.renderInput(
                'refreshRate',
                `Refersh Rate (s): ${this.props.refreshRate}`
              )}
              {this.renderButton('Update', this.props.loading)}
              {this.state.showErrorMessage && this.renderErrorMessage('hello')}
            </form>
          </div>
          <div className='col-5'></div>
        </div>
        <div className='row mt-5 justify-content-center'>
          <button
            className='btn btn-light'
            onClick={() => {
              this.props.history.push('/resources');
            }}
          >
            Done
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  apiErrors: state.entities.user.errors,
  token: state.entities.user.token,
  loading: state.entities.user.loading,
  refreshRate: state.entities.user.settings.refreshRate,
});

const mapDispatchToProps = (dispatch) => ({
  setUserSettings: (refreshRate) => dispatch(setUserSettings(refreshRate)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SettingsView)
);
