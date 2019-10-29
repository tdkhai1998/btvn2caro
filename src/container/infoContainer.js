import { connect } from 'react-redux';
import { loadInfo, userPut, reSetMessage } from '../actions/allActions';
import InfoForm from '../Components/InfoForm';

const mapStateToProps = state => ({
  infoUser: state.infoUser,
  isFetching: state.isFetching,
  message: state.haveMessage
});
const mapDispatchToProps = dispatch => ({
  updateInfo: user => dispatch({ type: 'update_info', user }),
  userPut: user => dispatch(userPut(user)),
  loadInfor: () => dispatch(loadInfo()),
  showModal: showModal => dispatch({ type: 'modal_set', showModal }),
  closePopup: () => {
    dispatch(reSetMessage());
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InfoForm);
