import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {authorization, firestore } from './firebase'


// useContext - хук для передачи пропсов минуя родительско-дочернюю связь
export const Context = createContext(null)

ReactDOM.render(
  <React.StrictMode>
    <Context.Provider  value ={{
      authorization,
      firestore
    }}>
    <App />
    </Context.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
