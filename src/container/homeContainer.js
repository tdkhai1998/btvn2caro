import { connect } from 'react-redux';
import { logout } from '../actions/allActions';
import Home from '../Components/Home';

const mapStateToProps = state => {
  return {
    user: state.user
  };
};
const mapDispatchToProps = dispatch => ({
  logout2: his => dispatch(logout(his))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
