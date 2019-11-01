import React from 'react';
import { connect } from 'react-redux';

import { Form, Row, Col, Button, Spinner } from 'react-bootstrap';
import { register as RegisterThunk } from '../../Redux-thunk';
import Popup from '../Popup';
import Redirect from '../Redirect';

const style = {
  marginTop: 150
};
const styleForm = {
  background: 'gray',
  padding: 20,
  borderRadius: 5
};
const RegisterForm = props => {
  const { isFetching, history, register } = props;
  let username;
  let password;
  let repassword;
  const changeUsername = e => {
    username = e.target.value;
  };
  const changePass = e => {
    password = e.target.value;
  };
  const changeRePass = e => {
    repassword = e.target.value;
  };
  const re = e => {
    e.preventDefault();
    register(username, password, repassword, history);
  };
  return (
    <Row style={style}>
      <Col md="4" />
      <Popup />
      <Redirect />
      <Col md="4" style={styleForm}>
        <Form
          onSubmit={re}
          disabled={isFetching ? 'disabled' : 'k'}
          autoComplete="off"
        >
          <h2 style={{ textAlign: 'center' }}>SIGN UP</h2>
          <Form.Group controlId="formGroupEmail" disabled={isFetching}>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              disabled={isFetching}
              onChange={changeUsername}
              type="email"
              placeholder="Enter email"
              value={username}
            />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              disabled={isFetching}
              onChange={changePass}
              type="password"
              placeholder="Password"
              value={password}
            />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Label>Re- 9Password</Form.Label>
            <Form.Control
              disabled={isFetching}
              onChange={changeRePass}
              type="password"
              placeholder="Password"
              value={repassword}
            />
          </Form.Group>
          <Button
            disabled={isFetching}
            variant="primary"
            type="submit"
            style={{ float: 'right' }}
          >
            {isFetching && <Spinner animation="border" />}
            Submitabc
          </Button>
        </Form>
      </Col>
    </Row>
  );
};
const mapStateToProps = state => ({
  isFetching: state.isFetching
});
const mapDispatchToProps = dispatch => ({
  register: (username, password, repassword, history) =>
    dispatch(RegisterThunk(username, password, repassword, history))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterForm);
