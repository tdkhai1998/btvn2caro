import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import DatePicker from './DatePicker/index';
import NavBar from './Nav';
import ImageUpLoad from '../container/inputImageContainer';

export default function FormsPage(props) {
  const { infoUser, updateInfo, loadInfor } = props;
  console.log(infoUser);
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
  const uploadFileButton = event => {
    event.preventDefault();
    const dataLength = event.target.length;
    for (let i = 0; i < dataLength; i += 1) {
      infoUser[event.target[i].id] = event.target[i].value;
    }
    loadInfor();
    updateInfo(infoUser);
    console.log(infoUser);
  };
  const changeHoTen = e => updateInfo({ hoten: e.target.value });
  const changeGioiTinh = e =>
    updateInfo({ gioitinh: e.target.value === 'Nam' });
  return (
    <Row>
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
                value={infoUser ? 'Nam' : 'Nữ'}
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
            <Col sm={6} style={{ padding: 0 }}>
              <DatePicker
                id="ngaysinh"
                className="shadow"
                readOnly
                style={DateStyle}
                as={Form.Group}
                selected="01/01/2000"
              />
            </Col>
            <Col sm={4}>
              <Button
                className="shadow"
                variant="primary"
                type="submit"
                style={{ display: 'inline', float: 'right' }}
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
