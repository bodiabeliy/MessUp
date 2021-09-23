import React, {useContext} from 'react';
import { BrowserRouter } from 'react-router-dom'; 
import {useAuthState} from 'react-firebase-hooks/auth'
import Navbar from './components/Navbar'
import AppRouter from './components/AppRouter'
import {Context} from './index'


function App() {
  const {authorization} = useContext(Context)
  const [loading] = useAuthState(authorization)
  return (
    <BrowserRouter>
      <Navbar />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
