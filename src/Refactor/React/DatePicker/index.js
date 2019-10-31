import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import React from 'react';
import './index.css';

const PickerDate = props => {
  const { id, value, onChange } = props;
  return (
    <DatePicker
      id={id}
      showPopperArrow={false}
      selected={new Date(value)}
      onChange={date => onChange(date)}
    />
  );
};
export default PickerDate;
