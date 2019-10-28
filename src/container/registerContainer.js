import { connect } from 'react-redux';
import RegisterForm from '../Components/RegisterForm';
import { register } from '../actions/allActions';

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
