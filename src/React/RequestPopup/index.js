import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import './style.css';
import { RejectRequestUndo, AcceptRequestUndo } from '../../Redux-thunk';

const Popup = props => {
  const { message, accept, reject } = props;
  if (message.value && message.title === 'REQUEST') {
    return (
      <Modal show={!!message.value} style={{ margin: 'auto' }}>
        <Modal.Header>
          <h4>
            <b>{message.title}</b>
          </h4>
        </Modal.Header>
        <Modal.Body style={{ textAlign: 'center' }}>
          <h3>{message.value}</h3>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => reject()}> KHÔNG ĐỒNG Ý</Button>
          <Button onClick={() => accept()}> ĐỒNG Ý</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  return null;
};

const mapStateToProps = state => ({
  message: state.message
});

const mapDispatchToProps = dispatch => ({
  accept: () => dispatch(AcceptRequestUndo()),
  reject: () => dispatch(RejectRequestUndo())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Popup);
