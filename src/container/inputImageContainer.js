import { connect } from 'react-redux';
import UploadImage from '../Components/upLoadImage/UploadImage';

const mapStateToProps = state => ({
  imagePreviewUrl: state.infoUser ? state.infoUser.avatar : ''
});
const mapDispatchToProps = dispatch => ({
  upLoadImage: url => dispatch({ type: 'Add_info', url })
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadImage);
