import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png'
import dummyUser from '../../assets/dummy.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.scss';

const CustomNavbar = ({ user }) => {
  const logout = () => {
    window.open("http://localhost:8080/auth/logout", "_self");
  };

  return (
    <Navbar className="bg-body-tertiary" fixed='top' expand="lg">
      <Container>
        <Navbar.Brand>
        <Link to="/">
          <img
            src={logo}
            width="40"
            height="40"
            style={{borderRadius: "100%"}}
            className="d-inline-block align-center"
            alt="React Bootstrap logo"
          />
          </Link>
        </Navbar.Brand>
        <Navbar.Brand>
          <Link style={{color: "#121316",fontWeight: "bold"}} to="/">AttainMate</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
          <Nav>
            {user ? (
              <Nav.Item className="d-flex align-items-center">
                <img className="avatar" src={user.photos ? user.photos[0].value : dummyUser} alt="Avatar" />
                <NavDropdown title={user.displayName ? user.displayName : user.username} id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>
              </Nav.Item>
            ) : (
              <Nav.Item>
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </Nav.Item>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
