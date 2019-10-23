import React from 'react';
import { connect } from 'react-redux';

import { Form, Row, Col, Button, Spinner } from 'react-bootstrap';
import { login } from '../actions/allActions';

const LoginForm = props => {
  const style = {
    marginTop: 150
  };
  const styleForm = {
    background: 'azure',
    padding: 20,
    borderRadius: 5,
    boxShadow: '10px 13px 123px -1px rgba(112,106,112,1)'
  };
  const { stateLogin, loginForm } = props;

  let username;
  let password;
  const changeUsername = e => {
    username = e.target.value;
  };
  const changePass = e => {
    password = e.target.value;
  };
  const res = e => {
    e.preventDefault();
    loginForm(username, password, props.history);
  };

  return (
    <Row style={style}>
      <Col md="4" />
      <Col md="4" style={styleForm}>
        <Form onSubmit={res} method="POST" autoComplete="off">
          <h2 style={{ textAlign: 'center' }}>LOGIN</h2>
          <Form.Group controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              onChange={e => changeUsername(e)}
              placeholder="Enter email"
            />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={e => changePass(e)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" style={{ float: 'right' }}>
            {stateLogin === 1 && <Spinner animation="border" />}
            Submitc
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

const mapStateToProps = state => ({
  stateLogin: state.login
});

const mapDispatchToProps = dispatch => ({
  loginForm: (username, password, his) =>
    dispatch(login(username, password, his))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
