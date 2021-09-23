import React, {useContext, useState} from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import {Context} from '../index'
import firebase from 'firebase'

function Login() {

 const [open, setOpen] = useState(true);

  const ShowBtnPopup = () => {
    setOpen(false);
  };
  // useContext - хук для передачи пропсов минуя родительско-дочернюю связь
  const {authorization} = useContext(Context)
  // вхлд с помощью системы
  const Login = async() => {
    const provider = new firebase.auth.GoogleAuthProvider()
    const {user} = await authorization.signInWithPopup(provider)
    console.log(user);
  }
 return (
  <div>
   <Container>
   <Grid 
    className='form-grid_container' 
    container 
    style={{height: window.innerHeight - 50}}
    justify={'center'}
    alignItems={'center'}
    >
     <Grid p={5}
      container
      alignItems={'center'}
      justify={'center'}
     >
     <Box>
     <Dialog
        open={open}
        onClose={ShowBtnPopup}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogActions>
          <Button onClick={Login} variant={'outlined'}>Войти с помощью Google</Button>
        </DialogActions>
      </Dialog>
     </Box>
     </Grid>

   </Grid>
   </Container>
  </div>
 );
}

export default Login;