import React, { useEffect } from 'react';
import './App.css';
import configureStore from './store/setup/configureStore';
import { Provider } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import NotFound from './components/common/NotFound';
import ResourceView from './components/resources/ResourceView';
import SettingsView from './components/settings/SettingsView';
import ProtectedRoute from './components/common/protectedRoute';
import NavBar from './components/NavBar';
import LoginForm from './components/LoginForm';

const store = configureStore();

// with Switch order from most specific to most generic
const App = () => {
  useEffect(() => {
    document.title = 'Resource Visualization';
  });

  return (
    <main>
      <Provider store={store}>
        <NavBar />
        <Switch>
          <ProtectedRoute path='/settings' component={SettingsView} />
          <ProtectedRoute path='/resources' component={ResourceView} />
          <Route path='/not-found' component={NotFound} />
          <Route path='/' exact component={LoginForm} />
          <Redirect to='/not-found' />
        </Switch>
      </Provider>
    </main>
  );
};

export default App;
