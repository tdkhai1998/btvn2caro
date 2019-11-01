import React from 'react';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux';
import { UpdateInfoUser, AddUser } from '../../Redux';

const createUser = data => {
  const user = {};
  user.username = data.email || data.id;
  user.hoten = data.name;
  user.ngaysinh = new Date(data.birthday);
  user.gioitinh = data.gender === 'male';
  user.role = 2;
  user.avatar = data.picture.data.url;
  user.password = '';
  return user;
};

const Facebook = props => {
  const { login } = props;
  const responseFacebook = response => {
    const tempUser = createUser(response);
    login(tempUser);
  };
  const responseGoogle = res => {
    console.log('gg', res);
  };
  return (
    <div>
      <FacebookLogin
        appId="1218971688298611"
        fields="name,email,picture,birthday,gender"
        size="medium"
        callback={responseFacebook}
      />
      <GoogleLogin
        clientId="443225926076-bo93hq5th6dfgqntafi3k86kmee5age1.apps.googleusercontent.com" // CLIENTID NOT CREATED YET
        buttonText="LOGIN WITH GOOGLE"
        scope="https://www.googleapis.com/auth/user.birthday.read"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        fields="name,email,picture,birthday,gender"
      />
    </div>
  );
};

const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch => ({
  login: user => {
    dispatch(UpdateInfoUser(user));
    dispatch(AddUser(user.email, ''));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Facebook);
