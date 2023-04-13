import { Formik } from 'formik';
import React, { useState } from 'react';
import { Card, Col, Form, FormGroup, Row, FormControl } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Editor from '../../../../components/CK-Editor/CkClassicEditor';
import { generalInfo, priceInfo, additionalInfo } from './InfoProduct';
import FileUpload from './../../../../components/Upload/FileUpload';

const AddDescription = () => {
  const [isDescription, setIsDescription] = useState(false);
  return (
    <Col>
      <Link to="#" className="mb-3" onClick={() => setIsDescription(!isDescription)}>
        {isDescription ? 'Ẩn mô tả sản phẩm' : 'Thêm mô tả sản phẩm'}
      </Link>
      {isDescription ? <Editor></Editor> : null}
    </Col>
  );
};

function CreateProducts() {
  const [toggleWareHouse, setToggleWareHouse] = useState(false);
  const [toggleProperty, setToggleProperty] = useState(false);
  const [toggleUnit, setToggleUnit] = useState(false);

  const cardInfo = [
    {
      title: 'Thông tin chung',
      lg: 8,
      sm: 12,
      body: (
        <>
          {generalInfo.map((info, index) => (
            <Col lg={info.lg} sm={info.sm} key={index}>
              <FormGroup>
                <Form.Label>
                  {info.label} {info.require ? <span className="text-c-red">*</span> : null}
                </Form.Label>
                <FormControl placeholder={info.placeholder} type="text" name={info.name}></FormControl>
              </FormGroup>
            </Col>
          ))}
          <AddDescription />
        </>
      )
    },
    {
      title: 'Thông tin bổ sung',
      lg: 4,
      sm: 12,
      body: (
        <>
          {additionalInfo.map((info, index) => (
            <Col lg={info.lg} sm={info.sm} key={index}>
              <FormGroup>
                <Form.Label>
                  {info.label} {info.require ? <span className="text-c-red">*</span> : null}
                </Form.Label>
                <FormControl placeholder={info.placeholder} type="text" name={info.name}></FormControl>
              </FormGroup>
            </Col>
          ))}
        </>
      )
    },
    {
      title: 'Giá sản phẩm',
      lg: 8,
      sm: 12,
      body: (
        <>
          {priceInfo.map((info, index) => (
            <Col lg={info.lg} sm={info.sm} key={index}>
              <FormGroup>
                <Form.Label>
                  {info.label} {info.require ? <span className="text-c-red">*</span> : null}
                </Form.Label>
                <FormControl placeholder={info.placeholder} type="text" name={info.name}></FormControl>
              </FormGroup>
            </Col>
          ))}
        </>
      )
    },
    { title: 'Ảnh sản phẩm', lg: 8, sm: 12, body: <FileUpload /> },
    {
      title: 'Khởi tạo kho hàng',
      lg: 8,
      sm: 12,
      subTitle: 'Ghi nhận số lượng Tồn kho ban đầu và Giá vốn của sản phẩm tại các Chi nhánh',
      isToggleOn: toggleWareHouse
    },
    {
      title: 'Thuộc tính',
      lg: 8,
      sm: 12,
      subTitle: 'Thêm mới thuộc tính giúp sản phẩm có nhiều lựa chọn, như kích cỡ hay màu sắc',
      isToggleOn: toggleProperty
    },
    { title: 'Thêm đơn vị quy đổi', lg: 8, sm: 12, subTitle: 'Tạo và quy đổi các đơn vị tính khác nhau', isToggleOn: toggleUnit }
  ];

  return (
    <>
      <Helmet>
        <title>Thêm sản phẩm</title>
      </Helmet>
      <Formik>
        {({ errors, values, handleChange }) => (
          <Form>
            <Row>
              <Col lg={8}>
                <Row>
                  <Col lg={12}>
                  {cardInfo.map((card, index) => (
                    <>
                      {card.lg === 8 ? (
                        <Card>
                          <Card.Header>
                            <Card.Title as="h5">
                              {card.title}
                              {card.subTitle ? (
                                <p style={{ margin: 0 }} className="mt-2 text-muted">
                                  {card.subTitle}
                                </p>
                              ) : null}
                            </Card.Title>
                          </Card.Header>
                          {card.isToggleOn === false ? null : (
                            <Card.Body>
                              <Row>{card.body}</Row>
                            </Card.Body>
                          )}
                        </Card>
                      ) : null}
                    </>
                  ))}
                  </Col>
                </Row>
              </Col>

              <Col lg={4}>
                <Row>
                  {cardInfo.map((card, index) => (
                    <>
                      {card.lg === 4 ? (
                        <Card>
                          <Card.Header>
                            <Card.Title as="h5">
                              {card.title}
                              {card.subTitle ? (
                                <p style={{ margin: 0 }} className="mt-2 text-muted">
                                  {card.subTitle}
                                </p>
                              ) : null}
                            </Card.Title>
                          </Card.Header>
                          {card.isToggleOn === false ? null : (
                            <Card.Body>
                              <Row>{card.body}</Row>
                            </Card.Body>
                          )}
                        </Card>
                      ) : null}
                    </>
                  ))}
                </Row>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default CreateProducts;
