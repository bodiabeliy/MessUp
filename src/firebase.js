import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/storage'

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

  export const authorization = firebase.auth()
  export const firestore = firebase.firestore()
  export const store = firebase.storage()
