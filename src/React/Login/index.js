import React from 'react';
import { Form, Row, Col, Button, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import { login } from '../../Redux-thunk';
import { ResetMessage } from '../../Redux';
import Redirect from '../Redirect';
import Popup from '../Popup';
import Facebook from '../Facebook';

const style = {
  marginTop: 150
};
const styleForm = {
  background: 'azure',
  padding: 20,
  borderRadius: 5,
  boxShadow: '10px 13px 123px -1px rgba(112,106,112,1)'
};
const LoginForm = props => {
  const { loginForm, isFetching, history } = props;
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
      <Redirect />
      <Popup />
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
          <Form.Group>
            <Facebook />
            <Button
              disabled={isFetching}
              variant="primary"
              onClick={() => history.push('/register')}
              style={{ float: 'right' }}
            >
              {isFetching && <Spinner animation="border" />}
              ĐĂNG KÝ
            </Button>
            <Button
              disabled={isFetching}
              variant="primary"
              type="submit"
              style={{ float: 'right' }}
            >
              {isFetching && <Spinner animation="border" />}
              ĐĂNG NHẬP
            </Button>
          </Form.Group>
        </Form>
      </Col>
    </Row>
  );
};

const mapStateToProps = state => ({
  message: state.message,
  isFetching: state.isFetching
});

const mapDispatchToProps = dispatch => ({
  loginForm: (username, password) => dispatch(login(username, password)),
  closePopup: () => dispatch(ResetMessage())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
