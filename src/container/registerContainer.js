import React from 'react';
import { Form, Row, Col, Button, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';

import { register } from '../actions/allActions';

const RegisterForm = props => {
  const style = {
    marginTop: 150
  };
  const { isFetching, history } = props;

  const styleForm = {
    background: 'gray',
    padding: 20,
    borderRadius: 5
  };
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
    //  console.log(username, password, repassword);
    props.register(username, password, repassword, history);
  };
  if (isFetching) {
    username = '';
    password = '';
    repassword = '';
  }
  return (
    <Row style={style}>
      <Col md="4" />
      <Col md="4" style={styleForm}>
        <Form onSubmit={re} disabled={isFetching ? 'disabled' : 'k'}>
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
    dispatch(register(username, password, repassword, history))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterForm);
