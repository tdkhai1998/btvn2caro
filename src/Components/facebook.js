import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { connect } from 'react-redux';
import { loginFacebook } from '../actions/thunk';

const App = props => {
  const { login } = props;
  const responseFacebook = response => {
    console.log(response);
    login(response);
  };

  //   const responseGoogle = response => {
  //     console.log(response);
  //   };

  return (
    <div className="App">
      <h1>LOGIN WITH FACEBOOK AND GOOGLE</h1>

      <FacebookLogin
        appId="1218971688298611" // APP ID NOT CREATED YET
        fields="name,email,picture,birthday,gender"
        size="medium"
        callback={responseFacebook}
      />
      <br />
      <br />

      {/* <GoogleLogin
        clientId="" // CLIENTID NOT CREATED YET
        buttonText="LOGIN WITH GOOGLE"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      /> */}
    </div>
  );
};

const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch => ({
  login: user => dispatch(loginFacebook(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
