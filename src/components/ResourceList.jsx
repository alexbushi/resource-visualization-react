import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { loadResources } from "../store/resources";

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
        <ul>
          {this.props.resources.map((resource) => (
            <li
              key={resource.evseId}
            >{`${resource.resourceStatus} ${resource.realPower}`}</li>
          ))}
        </ul>
        <div>{this.props.loadingResources.toString()}</div>
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
