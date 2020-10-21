import React from 'react';
import './App.css';
import Resources from './components/Resources';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <Resources />
    </Provider>
  );
}

export default App;
