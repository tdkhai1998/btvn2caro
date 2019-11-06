import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Image } from 'react-bootstrap';
import { ResetMessage, TypeGameMode } from '../../Redux';
import { restart } from '../../Redux-thunk';
import './style.css';

const Popup = props => {
  const { message, closePopup, isFetching, gameMode, winnerLine } = props;
  if (message.value && !message.id) {
    return (
      <Modal
        show={!!message.value}
        style={{ margin: 'auto' }}
        onHide={() => {}}
      >
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
          <Button onClick={() => closePopup(gameMode.mode, winnerLine.dir)}>
            {' '}
            ĐÓNG
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
  return null;
};

const mapStateToProps = state => ({
  message: state.message,
  isFetching: state.isFetching,
  gameMode: state.gameMode,
  winnerLine: state.winnerLine
});

const mapDispatchToProps = dispatch => ({
  closePopup: (mode, dir) => {
    dispatch(ResetMessage());
    if (mode === TypeGameMode.modeType.Online && dir !== -1) {
      restart(dispatch);
    }
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Popup);
