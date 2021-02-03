import React from 'react';
import Joi from 'joi-browser';
import Form from '../common/form';
import { setUserSettings } from '../../store/user';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class SettingsView extends Form {
  state = {
    data: {
      refreshRate: this.props.refreshRate,
      squareSize: this.props.squareSize,
    },
    errors: {},
    showErrorMessage: false,
  };

  schema = {
    refreshRate: Joi.number().min(2).label('Refresh Rate'),
    squareSize: Joi.number()
      .min(10)
      .max(40)
      .label('Resource Square Length (pixels)'),
  };

  doSubmit = async () => {
    this.setState({ showErrorMessage: false });

    await this.props.setUserSettings({
      refreshRate: this.state.data.refreshRate,
      squareSize: this.state.data.squareSize,
    });

    if (this.props.apiErrors) {
      this.setState({ showErrorMessage: true });
      console.log(this.props.apiErrors);
    } else {
      this.props.history.push('/resources');
    }
  };

  render() {
    return (
      <div className='container-fluid'>
        <div className='row mb-4'>
          <div className='col-3'></div>
          <div className='col-6'>
            <h1 className='d-flex justify-content-center'>Settings</h1>
          </div>
          <div className='col-3'></div>
        </div>
        <div className='row'>
          <div className='col-4'></div>
          <div className='col-4'>
            <form onSubmit={this.handleSubmit}>
              <div className='row'>
                <div className='col-3'></div>
                <div className='col-6'>
                  {this.renderInput(
                    'refreshRate',
                    `Refersh Rate (s): ${this.props.refreshRate}`
                  )}
                  {this.renderInput(
                    'squareSize',
                    `Resource Square Length (pixels): ${this.props.squareSize}`
                  )}
                </div>
                <div className='col-3'></div>
              </div>
              <div className='row justify-content-center mt-2'>
                {this.renderButton('Update', this.props.loading)}
                <button
                  className='btn btn-light ml-2'
                  onClick={() => {
                    this.props.history.push('/resources');
                  }}
                >
                  Cancel
                </button>
              </div>

              {this.state.showErrorMessage && this.renderErrorMessage('error')}
            </form>
          </div>
          <div className='col-4'></div>
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
  squareSize: state.entities.user.settings.squareSize,
});

const mapDispatchToProps = (dispatch) => ({
  setUserSettings: (settings) => dispatch(setUserSettings(settings)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SettingsView)
);
