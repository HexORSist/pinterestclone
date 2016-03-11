import React from 'react';
import AuthenticatedComponent from './AuthenticatedComponent'

export default AuthenticatedComponent(class Home extends React.Component {
  
  render() {
    if(this.props.user)
      return (<h1>Hello {this.props.user ? this.props.user.username : ''}</h1>);
    else
      return (<h1>Not authenticated need to login</h1>);
    //return (<h1>Hello {this.props.user ? this.props.user.username : ''}</h1>);
  }
});

/*export default class Home extends React.Component {
  render() {
    return (<h1>Hello</h1>);
  }
}*/