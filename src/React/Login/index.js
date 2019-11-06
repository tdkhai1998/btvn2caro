import React from 'react';
import { Form, Row, Col, Button, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../Redux-thunk';
import { ResetMessage } from '../../Redux';
import Popup from '../Popup';
import Facebook from '../Facebook';
import Redirectm from '../Redirect';

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
  const { loginForm, isFetching, history, user } = props;
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
  if (user) return <Redirect to="/home" />;
  return (
    <Row style={style}>
      <Col md="4" />
      <Redirectm />
      <Popup />
      <Col md="4" style={styleForm}>
        <Form onSubmit={res} method="POST">
          <h2 style={{ textAlign: 'center', color: 'blue' }}>LOGIN</h2>
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
            <div style={{ marginTop: 50 }}>
              {isFetching && <Spinner animation="border" />}
              <Button
                disabled={isFetching}
                variant="primary"
                type="submit"
                style={{ float: 'right' }}
              >
                ĐĂNG NHẬP
              </Button>
              <Button
                disabled={isFetching}
                variant="primary"
                onClick={() => history.push('/register')}
                style={{ float: 'right', marginRight: 20 }}
              >
                ĐĂNG KÝ
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Col>
    </Row>
  );
};

const mapStateToProps = state => ({
  message: state.message,
  isFetching: state.isFetching,
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  loginForm: (username, password) => dispatch(login(username, password)),
  closePopup: () => dispatch(ResetMessage())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
