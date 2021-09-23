import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom'; 

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { CHAT_ROUTE, EXIT } from '../utils/consts';
import {useAuthState} from 'react-firebase-hooks/auth'
import {Context} from '../index'

function Navbar() {

 const {authorization} = useContext(Context)
 const [user] = useAuthState(authorization)

 return (
  <AppBar className='navbar_container' position="static">
  <Toolbar>
   <Grid container justify={'flex-end'}>
    {user ? 
     <Fragment>
      <Link 
       className='navbar_link'
       to={CHAT_ROUTE}
       >
        <Button onClick={() => {authorization.signOut()}} className='navbar_logBtn' variant={'outlined'} color="inherit">Выйти</Button>
      </Link>
     </Fragment>
     :
     <Fragment>
     <Link 
      className='navbar_link'
      to={EXIT}
      >
     <Button variant={'outlined'} color="inherit">Логин</Button>
     </Link>
    </Fragment>
    }
   </Grid>

  </Toolbar>
</AppBar>
 );
}

export default Navbar;