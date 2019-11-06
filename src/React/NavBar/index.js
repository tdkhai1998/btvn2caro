import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';

const NavBar = props => {
  const { selected } = props;
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/home">CARO VN</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Link
          to="/home"
          className={`nav-link ${selected === 'home' ? 'Sele' : ''}`}
        >
          Home
        </Link>
        <Link
          to="/game"
          className={`nav-link ${selected === 'game' ? 'Sele' : ''}`}
        >
          Game
        </Link>
        <Link
          to="/online"
          className={`nav-link ${selected === 'online' ? 'Sele' : ''}`}
        >
          Online
        </Link>
        <Link
          to="/profile"
          className={`nav-link ${selected === 'profile' ? 'Sele' : ''}`}
        >
          Me
        </Link>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default NavBar;
