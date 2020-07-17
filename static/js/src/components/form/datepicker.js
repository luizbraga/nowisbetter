import React, {Component} from 'react';
import Datetime from 'react-datetime';

import 'react-datetime/css/react-datetime.css';



const DatePickerComponent = ({input, label, placeholder, meta: {touched, error} }) => {
  const class_name = `form-group ${touched && error ? 'has-danger':''}`
  return(
    <div>
        <label>{label}</label>
        <Datetime
          className={class_name}
          {...input}
          dateFormat={'MM-DD-YYYY'}
          timeFormat={false}
        />
        <div className="text-help">
          {touched ? error: ''}
        </div>
    </div>
  )
};

export default DatePickerComponent
