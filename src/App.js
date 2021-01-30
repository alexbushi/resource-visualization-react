import React, { Fragment } from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import NotFound from './components/common/NotFound';
import ResourceView from './components/resources/ResourceView';
import SettingsView from './components/settings/SettingsView';
import ProtectedRoute from './components/common/protectedRoute';
import NavBar from './components/NavBar';
import LoginForm from './components/LoginForm';

// with Switch order from most specific to most generic
const App = () => {
  return (
    <Fragment>
      <NavBar />
      <Switch>
        <ProtectedRoute path='/settings' component={SettingsView} />
        <ProtectedRoute path='/resources' component={ResourceView} />
        <Route path='/not-found' component={NotFound} />
        <Route path='/' exact component={LoginForm} />
        <Redirect to='/not-found' />
      </Switch>
    </Fragment>
  );
};

export default App;
