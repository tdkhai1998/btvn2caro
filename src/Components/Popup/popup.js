import React from 'react';
import { Button } from 'react-bootstrap';
import './style.css';

const Popup = props => {
  const { closePopup, text, title } = props;
  return (
    <div>
      <div id="popup1" className="overlay">
        <div className="popup">
          <h2>{title}</h2>
          <div className="content">{text}</div>
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
};

export default Popup;
