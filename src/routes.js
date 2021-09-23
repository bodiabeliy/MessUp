import {CHAT_ROUTE, LOGIN_ROUTE} from './utils/consts'
import Login from './components/Login'
import Chat from './components/Chat'

// все доступные маршуты для пользователей
export const publicRoutes = [
 {
  path: LOGIN_ROUTE,
  Component: Login
 }
]
// только для зарегистрированых  пользователей
export const privateRoutes = [
 {
  path: CHAT_ROUTE,
  Component: Chat
 }
 
]