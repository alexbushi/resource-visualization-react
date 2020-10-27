import React, { Component } from "react";
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
      <div className='container-fluid' style={{ background: " blue" }}>
        <ResourceList
          resources={this.props.resources}
          view={viewTypes.powerFlowkW}
        />
      </div>
    );
  }
}

// state is state of the store
// returning an object
const mapStateToProps = (state) => ({
  resources: state.entities.resources.list,
});

const mapDispatchToProps = (dispatch) => ({
  loadResources: () => dispatch(loadResources()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResourceView);
