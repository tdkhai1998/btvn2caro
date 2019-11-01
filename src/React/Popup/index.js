import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { ResetMessage } from '../../Redux';
import './style.css';

const Popup = props => {
  const { message, closePopup } = props;
  console.log(message);
  if (message.value) {
    return (
      <div>
        <div id="popup" className="overlay">
          <div className="popup">
            <h2>{message.title}</h2>
            <div className="content">{message.value}</div>
            <Button
              onClick={closePopup}
              variant="primary"
              type="submit"
              style={{ float: 'right', display: 'block', marginBottom: 100 }}
            >
              ĐÓNG
            </Button>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const mapStateToProps = state => ({
  message: state.message
});

const mapDispatchToProps = dispatch => ({
  closePopup: () => dispatch(ResetMessage())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Popup);
