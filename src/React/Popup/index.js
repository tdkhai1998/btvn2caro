import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Image } from 'react-bootstrap';
import { ResetMessage } from '../../Redux';
import './style.css';

const Popup = props => {
  const { message, closePopup, isFetching } = props;
  console.log(message);
  if (message.value && message.title !== 'REQUEST') {
    return (
      <Modal show={!!message.value} style={{ margin: 'auto' }}>
        <Modal.Header>
          <h4>
            <b>{message.title}</b>
          </h4>
        </Modal.Header>
        <Modal.Body style={{ textAlign: 'center' }}>
          <h3>{message.value}</h3>
          <Image
            hidden={!isFetching}
            src="loading.gif"
            style={{ width: 'auto', height: 'auto', paddingLeft: 138 }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => closePopup()}> ĐÓNG</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  return null;
};

const mapStateToProps = state => ({
  message: state.message,
  isFetching: state.isFetching
});

const mapDispatchToProps = dispatch => ({
  closePopup: () => dispatch(ResetMessage())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Popup);
