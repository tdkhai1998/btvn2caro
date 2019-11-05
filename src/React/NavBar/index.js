import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';

const NavBar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/home">React-Bootstrap</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Link to="/home" className="nav-link">
          Home
        </Link>
        <Link to="/game" className="nav-link">
          Game
        </Link>
        <Link to="/online" className="nav-link">
          Online
        </Link>
        <Link to="/profile" className="nav-link">
          Me
        </Link>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default NavBar;
