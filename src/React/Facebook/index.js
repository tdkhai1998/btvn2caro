import React from 'react';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux';
import { facelogin } from '../../Redux-thunk';
import './index.css';

const createUser = data => {
  console.log(data);
  const user = {};
  try {
    user.username = `fb-${data.email}` || data.id;
    user.hoten = data.name;
    user.ngaysinh = new Date(data.birthday);
    user.gioitinh = data.gender === 'male';
    user.role = 2;
    user.avatar = data.picture.data.url;
    user.password = '1';
  } catch (e) {}
  return user;
};
const createUserGg = data => {
  const user = {};
  console.log(data);
  try {
    const profile = data.profileObj;
    if (profile) {
      user.username = `gg-${profile.email}`;
      user.hoten = profile.name;
      user.ngaysinh = new Date();
      user.gioitinh = profile.gender ? profile.gender === 'male' : true;
      user.role = 3;
      user.avatar = profile.imageUrl;
      user.password = '2';
    }
  } catch (e) {}
  return user;
};

const Facebook = props => {
  const { loginFace } = props;
  const responseFacebook = response => {
    const tempUser = createUser(response);
    loginFace(tempUser);
  };
  const responseGoogle = res => {
    const tempUser = createUserGg(res);
    loginFace(tempUser);
  };
  const style = {
    height: 500
  };

  return (
    <div>
      <FacebookLogin
        style={style}
        appId="1218971688298611"
        fields="name,email,picture,birthday,gender"
        size="small"
        callback={responseFacebook}
      />
      <GoogleLogin
        clientId="186435105133-j6mpsg9odmn9kkks5c7m454ksbhmti0e.apps.googleusercontent.com" // CLIENTID NOT CREATED YET
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
  loginFace: user => {
    dispatch(facelogin(user));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Facebook);
