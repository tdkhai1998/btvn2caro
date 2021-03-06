import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import React from 'react';
import './index.css';

const PickerDate = props => {
  const { id, value, onChange, disabled } = props;
  console.log('ngày sinh', value);
  const date = value ? new Date(value) : new Date();

  return (
    <DatePicker
      id={id}
      disabled={disabled}
      showPopperArrow={false}
      selected={date}
      onChange={d => onChange(d)}
    />
  );
};
export default PickerDate;
