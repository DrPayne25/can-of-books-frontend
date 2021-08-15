import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'
import './Header.css';
import { Container, Row, Col } from 'react-bootstrap';

class Header extends React.Component {
  render() {
    return(
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Row>
            <Col>
              <Navbar.Brand>My Favorite Books</Navbar.Brand>
            </Col>
            <Col>
              <Link to="/">Home</Link>
            </Col>
            <Col>
              <Link to="/profile">Profile</Link>
            </Col>
            <Col>
          {/* DONE: if the user is logged in, render the `LogoutButton` - if the user is logged out, render the `LoginButton` */
          this.props.isAuthenticated ? <LogoutButton /> : <LoginButton />}
          </Col>
          </Row>
        </Container>
      </Navbar>
    );
  }
}

export default Header;
