import { connect } from 'react-redux';
import Modal from '../Components/Modal';
import { changePassword } from '../actions/allActions';

const mapStateToProps = state => ({
  message: state.message,
  isFetching: state.isFetching,
  showModal: state.showModal
});

const mapDispatchToProps = dispatch => ({
  changePassword: (oldPass, newPass) =>
    dispatch(changePassword(oldPass, newPass)),
  closeModal: () => dispatch({ type: 'modal_set', showModal: false })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal);
