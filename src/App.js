import React, {useEffect} from 'react';
import './App.css';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import NotFound from './components/NotFound';
import ResourceList from './components/ResourceList';
import ProtectedRoute from './components/common/protectedRoute';
import NavBar from './components/NavBar';
import LoginForm from './components/LoginForm';
import Test from './components/Test';

const store = configureStore();

// with Switch order from most specific to most generic
function App() {
  useEffect(() => {
    document.title = 'Resource Visualization';
  });

  return (
    <main>
      <NavBar />
        <Provider store={store}>
          <Switch>
            <Route path="/test" component={Test} />
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
