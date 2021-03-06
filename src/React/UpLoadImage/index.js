import React from 'react';
import { connect } from 'react-redux';
import { Form, Row, Col } from 'react-bootstrap';
import { UpdateInfoUser } from '../../Redux';
import './index.css';

const ImageUpload = props => {
  const { imagePreviewUrl, upLoadImage, id, disabled } = props;
  const _handleImageChange = e => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      upLoadImage({ avatar: reader.result });
    };
    reader.readAsDataURL(file);
  };

  let $imagePreview = null;
  if (imagePreviewUrl) {
    $imagePreview = (
      <img
        alt=""
        className="shadow"
        src={imagePreviewUrl}
        style={{ height: 150, width: 150, borderRadius: '50%' }}
      />
    );
  } else {
    $imagePreview = (
      <div className="previewText">Please select an Image for Preview</div>
    );
  }
  return (
    <div style={{ width: '100%', marginLeft: 15, marginRight: 15 }}>
      <div style={{ width: 150, height: 150, margin: '0 auto' }}>
        {$imagePreview}
      </div>
      <Form.Group as={Row} controlId="hoTen" style={{ marginTop: 50 }}>
        <Form.Label column sm={2}>
          Ảnh
        </Form.Label>
        <Col sm={10}>
          <input
            disabled={disabled}
            id={id}
            className="form-control shadow"
            type="file"
            onChange={e => _handleImageChange(e)}
            style={{
              marginRight: 50,
              background: 'white',
              width: '100%',
              borderRadius: 2
            }}
          />
        </Col>
      </Form.Group>
    </div>
  );
};

const mapStateToProps = state => ({
  imagePreviewUrl: state.infoUser ? state.infoUser.avatar : ''
});
const mapDispatchToProps = dispatch => ({
  upLoadImage: user => dispatch(UpdateInfoUser(user))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImageUpload);
