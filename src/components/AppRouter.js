import React, {useContext} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom'
import {privateRoutes, publicRoutes} from '../routes'
import { CHAT_ROUTE, LOGIN_ROUTE } from '../utils/consts';
import {useAuthState} from 'react-firebase-hooks/auth'
import {Context} from '../index'

function AppRouter() {
 // рендеринг страницы для зарегистрированого пользователя 
 const {authorization} = useContext(Context)
 const [user] = useAuthState(authorization)
 console.log(user);
 return user ? 
   (
    <Switch>
     {privateRoutes.map(({path, Component}) => 
      <Route key={path} path={path} component={Component} exect={true} />
     )}
     <Redirect to={CHAT_ROUTE} />
    </Switch>
   )
   :
    // рендеринг страницы для зарегистрированого пользователя 
   (
    <Switch>
      {publicRoutes.map(({path, Component}) => 
        <Route key={path} path={path} component={Component} exect={true} />
      )}
      <Redirect to={LOGIN_ROUTE} />
    </Switch>
   )
}

export default AppRouter;