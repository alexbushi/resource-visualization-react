import React, { Component } from "react";
import { connect } from "react-redux";
import { loadResources } from "../store/resources";
import ResourceList from "./ResourceList";

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
      <div className='container-fluid'>
        {this.props.viewList[0].items.map((view, index) => {
          return (
            view.shouldShow && (
              <ResourceList
                key={index}
                resources={this.props.resources}
                view={view}
              />
            )
          );
        })}
      </div>
    );
  }
}

// state is state of the store
// returning an object
const mapStateToProps = (state) => ({
  resources: state.entities.resources.list,
  viewList: state.entities.user.views,
});

const mapDispatchToProps = (dispatch) => ({
  loadResources: () => dispatch(loadResources()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResourceView);
