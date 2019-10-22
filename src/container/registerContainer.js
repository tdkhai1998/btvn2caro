import React from 'react';
import { Form, Row, Col, Button, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import { register } from '../actions/allActions';

const RegisterForm = props => {
  const style = {
    marginTop: 150
  };
  const { isFetching } = props;
  console.log(props);
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
    props.register(username, password, repassword);
  };
  return (
    <Row style={style}>
      <Col md="4" />
      <Col md="4" style={styleForm}>
        <Form onSubmit={re} disabled={isFetching ? 'disabled' : 'k'}>
          <h2 style={{ textAlign: 'center' }}>SIGN UP</h2>
          <Form.Group
            controlId="formGroupEmail"
            disabled={isFetching ? 'disabled' : 'k'}
          >
            <Form.Label>Email address</Form.Label>
            <Form.Control
              disabled={isFetching ? 'disabled' : 'k'}
              onChange={changeUsername}
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              disabled={isFetching ? 'disabled' : 'k'}
              onChange={changePass}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Label>Re- 9Password</Form.Label>
            <Form.Control
              disabled={isFetching ? 'disabled' : 'k'}
              onChange={changeRePass}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Button
            disabled={isFetching ? 'disabled' : 'k'}
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
  register: (username, password, repassword) =>
    dispatch(register(username, password, repassword))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterForm);
