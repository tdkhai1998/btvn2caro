import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Board from '../container/boardContainer';
import Controls from '../container/controlContainer';
import SideBar from '../container/sideBarContainer';
import NavBar from './Nav';

export default function Game() {
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
}
