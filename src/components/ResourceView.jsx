import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { loadResources } from "../store/resources";
import ResourceList from "./ResourceList";
import * as viewTypes from "../viewTypes";

class ResourceView extends Component {
  componentDidMount() {
    this.props.loadResources();
    this.interval = setInterval(() => this.props.loadResources(), 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <Fragment>
        <ResourceList
          resources={this.props.resources}
          view={viewTypes.powerFlowkW}
        />
        <ResourceList
          resources={this.props.resources}
          view={viewTypes.powerFlowPercent}
        />
        <ResourceList resources={this.props.resources} view={viewTypes.soc} />
        <ResourceList
          resources={this.props.resources}
          view={viewTypes.status}
        />
        <ResourceList
          resources={this.props.resources}
          view={viewTypes.temperature}
        />
        {this.props.loadingResources && (
          <div className='spinner-border text-success' role='status'>
            <span className='sr-only'>Loading...</span>
          </div>
        )}
      </Fragment>
    );
  }
}

// state is state of the store
// returning an object
const mapStateToProps = (state) => ({
  resources: state.entities.resources.list,
  loadingResources: state.entities.resources.loading,
  views: state.entities.user.views,
});

const mapDispatchToProps = (dispatch) => ({
  loadResources: () => dispatch(loadResources()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResourceView);
