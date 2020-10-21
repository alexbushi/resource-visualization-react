import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { loadResources } from '../store/resources';
import { loginUser } from '../store/user';

class Resources extends Component {
    componentDidMount() {
        this.props.loginUser('alexdev', 'developer20');
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
                        <li key={resource.evseId}>{`${resource.resourceStatus} ${resource.realPower}`}</li>
                    ))}
                </ul>
                <div>{this.props.loadingResources.toString()}</div>
            </Fragment>
            
        )
    }
}

// state is state of the store
// resources becomes props of the component
// returning an object
const mapStateToProps = state => ({
    resources: state.entities.resources.list,
    loadingResources: state.entities.resources.loading,
    users: state.entities.user
});

const mapDispatchToProps = dispatch => ({
    // object where attribute is a function
    loadResources: () => dispatch(loadResources()),
    loginUser: (user, password) => dispatch(loginUser(user, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(Resources);