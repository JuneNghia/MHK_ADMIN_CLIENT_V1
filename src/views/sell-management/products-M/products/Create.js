import { Formik } from 'formik';
import React, { useState } from 'react';
import { Card, Col, Form, FormGroup, Row, FormControl } from 'react-bootstrap';

function CreateProducts() {
  const generalInfo = [
    {
      label: 'Tên sản phẩm',
      lg: 12,
      sm: 12,
      name: 'product_name',
      placeholder: 'Nhập tên sản phẩm',
      require: true
    },
    {
      label: 'Mã sản phẩm',
      lg: 6,
      sm: 12,
      name: 'product_code'
    },
    {
      label: 'Khối lượng',
      lg: 6,
      sm: 12,
      name: 'product_weight'
    },
    {
      label: 'Mã vạch/Barcode',
      lg: 6,
      sm: 12,
      name: 'product_barcode',
      placeholder: 'Nhập tay hoặc sử dụng quét vạch để quét mã vạch (3-15 kí tự)'
    },
    {
      label: 'Đơn vị tính',
      lg: 6,
      sm: 12,
      name: 'product_unit_price'
    }
  ];
  const cardInfo = [
    {
      title: 'Hình thức quản lý',
      lg: 8,
      sm: 12,
      body: (
        <FormGroup>
          <Form.Check
            className="ml-3"
            id="check_type_product"
            type="radio"
            label={<span className="text-normal">Sản phẩm thường</span>}
            checked="check"
          ></Form.Check>
        </FormGroup>
      )
    },
    { title: 'Thông tin bổ sung', lg: 4, sm: 12 },
    {
      title: 'Thông tin chung',
      lg: 8,
      sm: 12,
      body: generalInfo.map((info, index) => (
        <Col lg={info.lg} sm={info.sm} key={index}>
          <FormGroup>
            <Form.Label>
              {info.label} {info.require ? <span className="text-c-red">*</span> : null}
            </Form.Label>
            <FormControl placeholder={info.placeholder} type="text" name={info.name}></FormControl>
          </FormGroup>
        </Col>
      ))
    },
    { title: 'Giá sản phẩm', lg: 8, sm: 12 },
    { title: 'Ảnh sản phẩm', lg: 8, sm: 12 },
    { title: 'Khởi tạo kho hàng', lg: 8, sm: 12 },
    { title: 'Thuộc tính', lg: 8, sm: 12 },
    { title: 'Thêm đơn vị quy đổi', lg: 8, sm: 12 }
  ];

  return (
    <Formik>
      {({ errors, values, handleChange }) => (
        <Form>
          <Row>
            {cardInfo.map((card, index) => (
              <Col lg={card.lg} sm={card.sm} key={index}>
                <Card>
                  <Card.Header>
                    <Card.Title as="h5">{card.title}</Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <Row>{card.body}</Row>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Form>
      )}
    </Formik>
  );
}

export default CreateProducts;
