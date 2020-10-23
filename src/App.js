import React from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import NotFound from './components/NotFound';
import ResourceList from './components/ResourceList';
import ProtectedRoute from './components/common/protectedRoute';
import NavBar from './components/NavBar';

const store = configureStore();

// with Switch order from most specific to most generic
function App() {
  return (
    <main>
      <NavBar />
        <Provider store={store}>
          <Switch>
            <ProtectedRoute path="/resources" component={ResourceList} />
            <Route path="/not-found" component={NotFound}/>
            <Route path="/" exact component={LoginForm}/>
            <Redirect to="/not-found" />
          </Switch>
        </Provider>
     </main>
  );
}

export default App;
