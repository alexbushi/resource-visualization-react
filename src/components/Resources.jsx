import React, { Component } from 'react'
import { connect } from 'react-redux';
import { loadResources } from '../store/resources';
import { loginUser } from '../store/user';

class Resources extends Component {
    componentDidMount() {
        this.props.loginUser('username', 'password');
        setTimeout(() => {this.props.loadResources()}, 500);
    }

    render() {
        return (
            <ul>
                {this.props.resources.map((resource) => (
                    <li key={resource.evseId}>{resource.resourceStatus}</li>
                ))}
            </ul>
        )
    }
}

// state is state of the store
// resources becomes props of the component
// returning an object
const mapStateToProps = state => ({
    resources: state.entities.resources.list,
    users: state.entities.user
});

const mapDispatchToProps = dispatch => ({
    // object where attribute is a function
    loadResources: () => dispatch(loadResources()),
    loginUser: (user, password) => dispatch(loginUser(user, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(Resources);