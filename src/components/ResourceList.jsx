import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { loadResources } from "../store/resources";
import ResourceSquare from "./ResourceSquare";

class ResourceList extends Component {
  componentDidMount() {
    this.interval = setInterval(() => this.props.loadResources(), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <Fragment>
        <div className='d-flex flex-wrap p-2'>
          {this.props.resources.map((resource, index) => (
            <ResourceSquare key={index} resource={resource} index={index} />
          ))}
        </div>
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
});

const mapDispatchToProps = (dispatch) => ({
  loadResources: () => dispatch(loadResources()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResourceList);
