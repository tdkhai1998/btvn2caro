import React from 'react';
import { Button, Modal, Form, Spinner } from 'react-bootstrap';

class myModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { newPass: '', oldPass: '' };
  }

  onSubmit(e) {
    e.preventDefault();
    const { changePassword } = this.props;
    const { newPass, oldPass } = this.state;
    changePassword(oldPass, newPass);
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
export default myModal;
