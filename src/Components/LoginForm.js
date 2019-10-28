import React from 'react';
import { Form, Row, Col, Button, Spinner } from 'react-bootstrap';
import Popup from './Popup/popup';

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
  const { closePopup, history, stateLogin, loginForm, message } = props;
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
  if (message[0])
    return (
      <div>
        <Popup
          text={message[1]}
          title={message[2]}
          closePopup={() => {
            closePopup();
            history.push('/home');
          }}
        />
      </div>
    );
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
          <Button
            disabled={stateLogin === 1}
            variant="primary"
            type="submit"
            style={{ float: 'right' }}
          >
            {stateLogin === 1 && <Spinner animation="border" />}
            ĐĂNG NHẬP
          </Button>
        </Form>
      </Col>
    </Row>
  );
}
