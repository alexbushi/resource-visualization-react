import React from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';

const store = configureStore();

function App() {
  return (
    <main className="container mt-5">
      <Provider store={store}>
        <LoginForm />
      </Provider>
    </main>
  );
}

export default App;
