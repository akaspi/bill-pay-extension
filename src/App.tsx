import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import QBDT from './components/qbdt';
import store from './state/store';

function App() {
  return (
    <Provider store={store} >
      <div className="App">
        <QBDT />
      </div>
    </Provider>
  );
}

export default App;
