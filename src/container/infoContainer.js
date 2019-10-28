import { connect } from 'react-redux';
import { loadInfo } from '../actions/allActions';
import InfoForm from '../Components/InfoForm';

const mapStateToProps = state => ({
  infoUser: state.infoUser
});
const mapDispatchToProps = dispatch => ({
  updateInfo: user => dispatch({ type: 'update_info', user }),
  loadInfor: () => dispatch(loadInfo())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InfoForm);
