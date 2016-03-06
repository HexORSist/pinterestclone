'use strict';

import React from 'react';
import LoginStore from '../stores/LoginStore';
//import { RouteHandler } from 'react-router';
import AuthService from '../services/AuthService';
import { Nav, Navbar, NavDropdown, MenuItem, NavItem } from 'react-bootstrap';
import { LinkContainer} from 'react-router-bootstrap';

export default class AuthenticatedApp extends React.Component {
  constructor() {
    super()
    this.state = this._getLoginState();
  }

  _getLoginState() {
    return {
      userLoggedIn: LoginStore.isLoggedIn()
    };
  }

  componentDidMount() {
    this.changeListener = this._onChange.bind(this);
    LoginStore.addChangeListener(this.changeListener);
    //$( this.refs.toggleInput.getDOMNode() ).bootstrapToggle('on');
  }

  _onChange() {
    this.setState(this._getLoginState());
  }

  componentWillUnmount() {
    LoginStore.removeChangeListener(this.changeListener);
  }

  render() {
    return (
      <div className="container">
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">The Pinterest Clone</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Navbar .Collapse>
             {this.headerItems}
          </Navbar .Collapse>
        </Navbar>
        {this.props.children}
        {/*<RouteHandler/>*/}
      </div>
    );
  }

  logout(e) {
    e.preventDefault();
    AuthService.logout();
  }

  get headerItems() {
    if (!this.state.userLoggedIn) {
      return (
        <Nav pullRight>
          <NavDropdown title="Authorization" id="basic-nav-dropdown">
            <LinkContainer to="login">
              <MenuItem>
              Login
              </MenuItem>
            </LinkContainer>
            <LinkContainer to="signup">
              <MenuItem>
              Signup
              </MenuItem>
            </LinkContainer>
          </NavDropdown>
        </Nav>
            )
    } else {
      return (
        <Nav bsStyle="pills" pullRight>
          <NavItem eventKey={1}>
            <Link to="home">Home</Link>
          </NavItem>
          <NavItem eventKey={2}>
            <Link to="book">Book Inv</Link>
          </NavItem>
          <NavDropdown eventKey={3} title="Authorization" id="basic-nav-dropdown">
            <MenuItem eventKey="3.1">
              {/*<a href="" onClick={this.logout}>Logout</a>*/}
            </MenuItem>          
          </NavDropdown>  
        </Nav>
      )
    }
  }
}
