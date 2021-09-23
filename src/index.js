import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'


// Initialize Firebase
firebase.initializeApp(
  {
    apiKey: "AIzaSyClxns3GYA-V9RmgDIDQkNtTwZy59ugfuQ",
    authDomain: "chat-react-2ff9d.firebaseapp.com",
    projectId: "chat-react-2ff9d",
    storageBucket: "chat-react-2ff9d.appspot.com",
    messagingSenderId: "560825640305",
    appId: "1:560825640305:web:100e2fdb7d31233c2002d0"
  }
);
  // useContext - хук для передачи пропсов минуя родительско-дочернюю связь
export const Context = createContext(null)
const authorization = firebase.auth()
const firestore = firebase.firestore()


ReactDOM.render(
  <React.StrictMode>
    <Context.Provider  value ={{
      firebase,
      authorization, 
      firestore
    }}>
    <App />
    </Context.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
