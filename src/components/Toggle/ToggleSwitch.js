
import React from 'react';
import { Form } from 'react-bootstrap';

export default function ToggleSwitch(props) {  
  return (
    <Form.Group>
      <div className="switch switch-primary d-inline m-r-10">
        <input
          id={props.id}
          checked={props.value}
          onChange={() => props.setValue((prevState) => !prevState)}
          type="checkbox"
        />
        <label htmlFor={props.id} className="cr" />
      </div>
      <Form.Label>{props.textLabel ? props.textLabel : null}</Form.Label>
    </Form.Group>
  );
}
