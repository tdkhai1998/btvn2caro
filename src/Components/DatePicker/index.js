import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import React, { useState } from 'react';
import './index.css';

const PickerDate = props => {
  const [startDate, setStartDate] = useState(new Date('01/01/1900'));
  const { id } = props;
  return (
    <DatePicker
      id={id}
      showPopperArrow={false}
      selected={startDate}
      onChange={date => setStartDate(date)}
    />
  );
};
export default PickerDate;
