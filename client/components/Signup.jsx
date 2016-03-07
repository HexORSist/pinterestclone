//import React from 'react/addons';
import React from 'react';
//import ReactMixin from 'react-mixin';
import linkState from 'react-link-state';
import Auth from '../services/AuthService'

export default class Signup extends React.Component {

  constructor() {
    super()
    this.state = {
      user: '',
      password: '',
      extra: ''
    };
  }

  signup(e) {
    e.preventDefault();
    if(this.state.user==''||this.state.password=='')
      alert("you must enter user name and password")
    else{
      Auth.signup(this.state.user, this.state.password, this.state.extra)
        /*.catch(function(err) {
          alert("There's an error logging in");
          console.log("Error logging in", err);
        });*/
    }
  }

  render() {
    return (
      <div className="login jumbotron center-block">
        <h1>Signup</h1>
        <form role="form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" valueLink={linkState(this,'user')} className="form-control" id="username" placeholder="Username" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" valueLink={linkState(this,'password')} className="form-control" id="password" ref="password" placeholder="Password" />
        </div>
        <div className="form-group">
          <label htmlFor="extra">Extra</label>
          <input type="text" valueLink={linkState(this,'extra')} className="form-control" id="password" ref="password" placeholder="Some extra information" />
        </div>
        <button type="submit" className="btn btn-default" onClick={this.signup.bind(this)}>Submit</button>
      </form>
    </div>
    );
  }
}

//ReactMixin(Signup.prototype, React.addons.LinkedStateMixin);
