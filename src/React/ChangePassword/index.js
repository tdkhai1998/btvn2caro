import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Form } from 'react-bootstrap';

import { HideModal } from '../../Redux';
import { changePassword } from '../../Redux-thunk';

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = { newPass: '', oldPass: '' };
  }

  onSubmit(e) {
    e.preventDefault();
    const { change, closeModal } = this.props;
    const { newPass, oldPass } = this.state;
    change(oldPass, newPass);
    closeModal();
  }

  close() {
    const { closeModal } = this.props;
    closeModal();
  }

  changeOldPass(e) {
    this.setState({ oldPass: e.target.value });
  }

  changeNewPass(e) {
    this.setState({ newPass: e.target.value });
  }

  render() {
    const { oldPass, newPass } = this.state;
    const { isFetching, showModal } = this.props;
    console.log(showModal);
    return (
      <Modal show={showModal} onHide={() => this.close()}>
        <Modal.Header closeButton>
          <Modal.Title>CHANGE PASSWORD</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={e => this.onSubmit(e)}
            method="POST"
            autoComplete="off"
          >
            <Form.Group controlId="oldPass">
              <Form.Label>Old Password</Form.Label>
              <Form.Control
                type="password"
                value={oldPass}
                onChange={e => this.changeOldPass(e)}
              />
            </Form.Group>
            <Form.Group controlId="newPass">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                value={newPass}
                onChange={e => this.changeNewPass(e)}
              />
            </Form.Group>
            <Button
              disabled={isFetching}
              variant="primary"
              type="submit"
              style={{ float: 'right' }}
            >
              CHANGE
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}
const mapStateToProps = state => ({
  message: state.message,
  isFetching: state.isFetching,
  showModal: state.showModal
});

const mapDispatchToProps = dispatch => ({
  change: (oldPass, newPass) => dispatch(changePassword(oldPass, newPass)),
  closeModal: () => dispatch(HideModal())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePassword);
