import React from 'react';
import { Button, Col, FormCheck, FormGroup, FormLabel, Row } from 'react-bootstrap';
import { ButtonLoading } from '../../../components/Button/LoadButton';
import Select from 'react-select'

export default function PriceDefault() {
  const selectList = [
    {
      title: 'Sửa giá khi bán hàng',
      input: <Select className="text-normal"></Select>,
      lg: 12
    },
    {
      title: 'Giá bán hàng mặc định',
      input: <Select className="text-normal"></Select>,
      lg: 6
    },
    {
      title: 'Giá nhập hàng mặc định',
      input: <Select className="text-normal"></Select>,
      lg: 6
    }
  ];
  return (
    <Row>
      {selectList.map((select) => (
        <Col key={select.title} lg={select.lg}>
          <FormGroup>
            <FormLabel>{select.title}</FormLabel>
            {select.input}
          </FormGroup>
        </Col>
      ))}

      <Col lg={12}>
        <span className="d-flex mt-2 mb-2">
          <FormCheck id="recommend_last_price" className="text-normal"></FormCheck>
          <FormLabel className="text-normal" htmlFor="recommend_last_price">
            Sử dụng chức năng gợi ý giá bán gần nhất
          </FormLabel>
        </span>
      </Col>

      <Col lg={12}>
        <span className="d-flex justify-content-end">
          <Button variant="outline-primary">Huỷ</Button>
          <ButtonLoading text="Lưu"></ButtonLoading>
        </span>
      </Col>
    </Row>
  );
}
