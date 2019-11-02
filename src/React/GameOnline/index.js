import React from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import Board from '../Board';
import Controls from '../Controls';
import SideBar from '../SideBar';
import NavBar from '../NavBar';

export default () => {
  return (
    <div>
      <NavBar />
      <Modal show={isFetching} style={{ margin: 'auto' }}>
        <Modal.Body>
          <Image
            src="loading.gif"
            style={{ width: 'auto', height: 'auto', paddingLeft: 138 }}
          />
        </Modal.Body>
      </Modal>
      <Container style={{ marginTop: 20 }}>
        <Row>
          <Button style={{ margin: '0 auto', marginTop: 250 }}>Tìm Bạn</Button>
        </Row>
      </Container>
    </div>
  );
};
