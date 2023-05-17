import { Col, FormCheck, FormControl, FormGroup, FormLabel, Row } from "react-bootstrap";

import React from 'react'

export default function ModalPrice(props) {
    return (
        <Row>
          <Col lg={6}>
            <FormGroup>
              <FormLabel>
                Tên chính sách giá <span className="text-c-red">*</span>
              </FormLabel>
              <FormControl
                name="price_type"
                placeholder="Nhập tên chính sách giá"
                onChange={props.onChange}
                value={props.price_type_value}
              ></FormControl>
            </FormGroup>
          </Col>
          <Col lg={6}>
            <FormGroup>
              <FormLabel>
                Mô tả chính sách giá <span className="text-c-red">*</span>
              </FormLabel>
              <FormControl
                name="price_description"
                placeholder="Nhập mô tả chính sách giá"
                onChange={props.onChange}
                value={props.price_description}
              ></FormControl>
            </FormGroup>
          </Col>
          <Col>
            <span className="d-flex text-normal">
              <span className="strong-title ">
                Áp dụng cho: <span className="text-c-red">*</span>
              </span>
              <FormCheck
                className="ml-3"
                name="isImportDefault"
                id="selectImportDefault"
                label="Nhập hàng"
                value={props.isImportDefault}
                onChange={(event) => {
                  props.onChange(event);
                  props.setIsImportDefault(event.target.checked);
                }}
              ></FormCheck>
              <FormCheck
                className="ml-3"
                id="selectSellDefault"
                name="isSellDefault"
                label="Bán hàng"
                value={props.isSellDefault}
                onChange={(event) => {
                  props.onChange(event);
                  props.setIsImportDefault(event.target.checked);
                }}
              ></FormCheck>
            </span>
          </Col>
        </Row>
      );
}
