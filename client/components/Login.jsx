//import React from 'react/addons';
import React from 'react';
//import LinkedStateMixin from 'react-addons-linked-state-mixin';
import linkState from 'react-link-state';
import Auth from '../services/AuthService'

export default class Login extends React.Component {

  constructor() {
    super()
    this.state = {
      user: '',
      password: ''
    };
  }

  login(e) {
    e.preventDefault();
    if(this.state.user==''||this.state.password=='')
      alert("you must enter user name and password")
    else{
      Auth.login(this.state.user, this.state.password)
        /*.catch(function(err) {
          alert("There's an error logging in");
          console.log("Error logging in", err);
        });*/
    }
  }

  render() {
    return (
      <div className="login jumbotron center-block">
        <h1>Login</h1>
        <form role="form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" valueLink={linkState(this,'user')} className="form-control" id="username" placeholder="Username" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" valueLink={linkState(this,'password')} className="form-control" id="password" ref="password" placeholder="Password" required />
        </div>
        <button type="submit" className="btn btn-default" onClick={this.login.bind(this)}>Submit</button>
      </form>
    </div>
    );
  }
}

//LinkedStateMixin(Login.prototype, React);
