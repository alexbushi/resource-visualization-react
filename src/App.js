import React, {useEffect} from 'react';
import './App.css';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import NotFound from './components/NotFound';
import ResourceView from './components/ResourceView';
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
    <main >
        <Provider store={store}>
        <NavBar />
        <Switch>
          <ProtectedRoute path="/resources" component={ResourceView} />
          <Route path="/test" component={Test}/>
          <Route path="/not-found" component={NotFound}/>
          <Route path="/" exact component={LoginForm}/>
          <Redirect to="/not-found" />
        </Switch>
        </Provider>
     </main>
  );
}

export default App;
