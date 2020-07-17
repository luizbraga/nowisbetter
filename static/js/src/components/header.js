import React, {Component} from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";

export default class Header extends Component {
  render() {
    return (
      <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="/">NowisBetter</a>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav pullRight>
        <NavItem eventKey={1} href="/accounts/logout">
          Logout
        </NavItem>
      </Nav>
    </Navbar>
    )
  }
}
