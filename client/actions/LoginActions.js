import AppDispatcher from '../dispatchers/AppDispatcher.js';
import {LOGIN_USER, LOGOUT_USER} from '../constants/LoginConstants.js';
import {browserHistory} from 'react-router';
//import RouterContainer from '../services/RouterContainer'

export default {
  loginUser: (jwt) => {
    var savedJwt = localStorage.getItem('jwt');
    
    AppDispatcher.dispatch({
      actionType: LOGIN_USER,
      jwt: jwt
    });
    
    if (savedJwt !== jwt) {
      //var nextPath = RouterContainer.get().getCurrentQuery().nextPath || '/';
      //var nextPath = this.context.router.getCurrentQuery().nextPath || '/';;

      //var RTCnt = RouterContainer.get();
      //this.context.router.get().transitionTo('/home');
      browserHistory.push('/home');
      localStorage.setItem('jwt', jwt);
    }
  },
  logoutUser: () => {
    //RouterContainer.get().transitionTo('/login');
    browserHistory.push('/home');
    localStorage.removeItem('jwt');
    
    AppDispatcher.dispatch({
      actionType: LOGOUT_USER
    });
  }
}
