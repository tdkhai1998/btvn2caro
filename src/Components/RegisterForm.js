import React from 'react';
import { Form, Row, Col, Button, Spinner } from 'react-bootstrap';

export default function RegisterForm() {
  const style = {
    marginTop: 150
  };
  const styleForm = {
    background: 'gray',
    padding: 20,
    borderRadius: 5
  };
  return (
    <Row style={style}>
      <Col md="4" />
      <Col md="4" style={styleForm}>
        <Form>
          <h2 style={{ textAlign: 'center' }}>SIGN UP</h2>
          <Form.Group controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Label>Re- 9Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit" style={{ float: 'right' }}>
            Submit
          </Button>
          {true && <Spinner animation="border" />}
        </Form>
      </Col>
    </Row>
  );
}
