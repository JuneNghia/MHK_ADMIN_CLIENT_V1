import React from 'react';
import { Col, Form, FormControl, FormGroup } from 'react-bootstrap';
import Select from 'react-select'

export default function CreateInfoProduct(props) {
  return (
    <>
      <Col lg={props.lg} sm={props.sm}>
        <FormGroup>
          <Form.Label>
            {props.label} {props.require ? <span className="text-c-red">*</span> : null}
          </Form.Label>
          {props.input === 'text' ? (
            <FormControl
              name={props.name}
              placeholder={props.placeholder}
              onChange={props.onChange}
              type="text"
              value={props.value}
            ></FormControl>
          ) : (
            <Select />
          )}
        </FormGroup>
      </Col>
    </>
  );
}
