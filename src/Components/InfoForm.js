import React from 'react';
import { Form, Row, Col, Button, Spinner, Modal, Image } from 'react-bootstrap';
import DatePicker from './DatePicker/index';
import NavBar from './Nav';
import ChangePass from '../container/changePassContainer';
import ImageUpLoad from '../container/inputImageContainer';
import Popup from './Popup/popup';

const dateFormat = require('dateformat');

const style = {
  background: 'azure',
  padding: 20,
  borderRadius: 5,
  boxShadow: '10px 13px 123px -1px rgba(112,106,112,1)',
  textAlign: 'left'
};
const ColStyle = {
  marginBottom: 50
};
const DateStyle = {
  margin: 15
};
export default function FormsPage(props) {
  const {
    infoUser,
    updateInfo,
    loadInfor,
    isFetching,
    userPut,
    showModal,
    message,
    closePopup
  } = props;
  console.log(infoUser);
  const uploadFileButton = event => {
    event.preventDefault();
    const dataLength = event.target.length;
    for (let i = 0; i < dataLength; i += 1) {
      infoUser[event.target[i].id] = event.target[i].value;
    }
    updateInfo(infoUser);
    userPut(infoUser);
  };
  const changeHoTen = e => updateInfo({ hoten: e.target.value });
  const changeGioiTinh = e => {
    console.log(e.target.value);
    updateInfo({ gioitinh: e.target.value === 'Nam' });
  };
  const changeNgaySinh = e => {
    console.log(e);
    updateInfo({ ngaysinh: dateFormat(e, 'mm/dd/yyyy') });
  };
  if (!infoUser.fetched) loadInfor();
  if (message[0])
    return (
      <div>
        <Popup
          text={message[1]}
          title={message[2]}
          closePopup={() => {
            closePopup();
          }}
        />
      </div>
    );
  return (
    <Row>
      <ChangePass />
      <Modal show={isFetching} style={{ margin: 'auto' }}>
        <Modal.Body>
          <Image
            src="loading.gif"
            style={{ width: 'auto', height: 'auto', paddingLeft: 138 }}
          />
        </Modal.Body>
      </Modal>
      <Col lg="12" style={ColStyle}>
        <NavBar />
      </Col>
      <Col lg="3" />
      <Col lg="5">
        <Form
          style={style}
          onSubmit={(e, val) => uploadFileButton(e, val)}
          method="POST"
          autoComplete="off"
        >
          <Form.Group as={Row}>
            <ImageUpLoad id="url" />
          </Form.Group>
          <Form.Group as={Row} controlId="username">
            <Form.Label column sm="2">
              Email
            </Form.Label>
            <Col sm="10">
              <Form.Control
                plaintext
                readOnly
                defaultValue={infoUser.username}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="hoten">
            <Form.Label column sm={2}>
              Họ và tên
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                className="shadow"
                value={infoUser.hoten}
                onChange={e => changeHoTen(e)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="gioitinh">
            <Form.Label column sm={2}>
              Giới tính
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                placeholder="Tên"
                as="select"
                className="shadow"
                value={infoUser.gioitinh ? 'Nam' : 'Nữ'}
                onChange={e => changeGioiTinh(e)}
              >
                <option>Nam</option>
                <option>Nữ</option>
              </Form.Control>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Ngày sinh
            </Form.Label>
            <Col sm={10} style={{ padding: 0 }}>
              <DatePicker
                id="ngaysinh"
                className="shadow"
                readOnly
                style={DateStyle}
                value={infoUser.ngaysinh}
                onChange={e => changeNgaySinh(e)}
                as={Form.Group}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Col sm={3}>
              <Button
                className="shadow"
                variant="primary"
                disabled={isFetching}
                onClick={() => loadInfor()}
              >
                REFRESH
              </Button>
            </Col>
            <Col sm={5}>
              <Button
                className="shadow"
                variant="primary"
                onClick={() => showModal(true)}
                style={{ display: 'inline', margin: '0 auto' }}
                disabled={isFetching}
              >
                CHANGE PASSWORD
              </Button>
            </Col>
            <Col sm={4}>
              {isFetching && <Spinner animation="border" />}
              <Button
                className="shadow"
                variant="primary"
                type="submit"
                style={{ display: 'inline', float: 'right' }}
                disabled={isFetching}
              >
                CẬP NHẬT
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Col>
    </Row>
  );
}
