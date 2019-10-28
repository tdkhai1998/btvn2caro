import { connect } from 'react-redux';
import { login, reSetMessage } from '../actions/allActions';
import LoginForm from '../Components/LoginForm';

const mapStateToProps = state => ({
  stateLogin: state.login,
  message: state.haveMessage
});

const mapDispatchToProps = dispatch => ({
  loginForm: (username, password, his) =>
    dispatch(login(username, password, his)),
  closePopup: () => {
    dispatch(reSetMessage());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
