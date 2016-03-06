import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import AuthenticatedApp from './components/AuthenticatedApp'
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Book from './components/Book';
import BookTrade from './components/BookTrade';
import RouterContainer from './services/RouterContainer';
import LoginActions from './actions/LoginActions';

var routes = (
  <Router  history={browserHistory}>
    <Route path="/" component={AuthenticatedApp}>
      <IndexRoute component={Home}/>
      <Route path="login" component={Login}/>
      <Route path="signup" component={Signup}/>
      <Route path="book" component={Book}/>
      <Route path="booktrade" component={BookTrade}/>
    </Route>
  </Router>
);

//var router = Router.create({routes});
//RouterContainer.set(router);

/*let jwt = localStorage.getItem('jwt');
if (jwt) {
  LoginActions.loginUser(jwt);
}*/

/*router.run(function (Handler) {
  ReactDOM.render(<Handler />, document.getElementById('content'));
});*/

ReactDOM.render(routes, document.getElementById('content'));

