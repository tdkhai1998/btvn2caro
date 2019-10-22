import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

export default function LoginForm(props) {
  const style = {
    marginTop: 150
  };
  const styleForm = {
    background: 'azure',
    padding: 20,
    borderRadius: 5,
    boxShadow: '10px 13px 123px -1px rgba(112,106,112,1)'
  };
  // const { register } = props;
  const res = e => {
    e.preventDefault();
    console.log(e);
  };
  return (
    <Row style={style}>
      <Col md="4" />
      <Col md="4" style={styleForm}>
        <Form onSubmit={res} method="POST">
          <h2 style={{ textAlign: 'center' }}>LOGIN</h2>
          <Form.Group controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit" style={{ float: 'right' }}>
            Submitc
          </Button>
        </Form>
      </Col>
    </Row>
  );
}
