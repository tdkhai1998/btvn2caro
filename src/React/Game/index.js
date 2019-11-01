import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Board from '../Board';
import Controls from '../Controls';
import SideBar from '../SideBar';
import NavBar from '../NavBar';

const Game = () => {
  return (
    <div>
      <NavBar />
      <Container style={{ marginTop: 20 }}>
        <Row>
          <Col md="auto">
            <Board />
          </Col>
          <Col md="auto" style={{ background: 'gray' }}>
            <Controls />
            <SideBar />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Game;
