import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Form, Button, FormLabel, Badge, FormGroup, FormCheck } from 'react-bootstrap';
import { ButtonLoading } from '../../../../components/Button/LoadButton';
import { Link, useHistory, useParams } from 'react-router-dom';
import services from '../../../../utils/axios';
import { Helmet } from 'react-helmet';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { rgb } from 'chroma-js';

const ProductDetails = () => {
  const [showLoader, setShowLoader] = useState(false);
  const history = useHistory();
  const [isSorting, setIsSorting] = useState(false);

  const { id } = useParams();
  const [data, setData] = useState({});

  const initalItems = JSON.parse(localStorage.getItem('items'));

  const [items, setItems] = useState(() => {
    const storedItems = initalItems;
    return (
      storedItems || [
        { id: 'item-1', content: 'Giá bán lẻ', value: '123.584đ' },
        { id: 'item-2', content: 'Giá Shopee', value: '127.572đ' },
        { id: 'item-3', content: 'Bán trên 10 triệu', value: '179.304đ' },
        { id: 'item-8', content: 'Bán dưới 10 triệu', value: '118.472đ' },
        { id: 'item-4', content: 'Giá nhập', value: '124.892đ' },
        { id: 'item-5', content: 'Nhập bảo hành', value: '120.947đ' },
        { id: 'item-6', content: 'Giá bán buôn', value: '115.294đ' },
        { id: 'item-9', content: 'Nhập Shopee', value: '119.994đ' }
      ]
    );
  });

  const handleSortClick = () => {
    setIsSorting(true);
  };

  const handleCancelSortClick = () => {
    setItems([...initalItems]);
    setIsSorting(false);
  };

  const handleSaveClick = () => {
    setIsSorting(false);
    localStorage.setItem('items', JSON.stringify(items));
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const itemsCopy = Array.from(items);
    const [reorderedItem] = itemsCopy.splice(result.source.index, 1);
    itemsCopy.splice(result.destination.index, 0, reorderedItem);
    setItems(itemsCopy);
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>Chi tiết sản phẩm</title>
      </Helmet>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          onClick={() => history.push('/app/sell-management/products')}
          variant="outline-primary"
          className="mr-0"
          style={{ marginBottom: 15 }}
        >
          <i className="feather icon-arrow-left"></i>
          Quay lại danh sách sản phẩm
        </Button>

        <ButtonLoading
          style={{ margin: '0 0 15px 0' }}
          text={
            <span style={{ fontWeight: 600 }}>
              <i className="feather icon-trash-2 mr-2"></i>
              Xoá sản phẩm
            </span>
          }
          loading={showLoader}
          type="submit"
          disabled={showLoader}
          variant="outline-danger"
        ></ButtonLoading>
      </div>
      <Row>
        <Col sm={12} lg={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">
                <span>
                  <h4 style={{ display: 'inline-block', fontWeight: 600, fontSize: 22 }}>{data.user_name}</h4>
                  <span>
                    {data.user_state === 'Ngừng giao dịch' ? (
                      <Badge style={{ fontSize: 15, marginLeft: 15, padding: 11 }} key="process" pill variant="success">
                        Đang giao dịch
                      </Badge>
                    ) : (
                      <Badge style={{ fontSize: 15, marginLeft: 15, padding: 11 }} key="stop" pill variant="danger">
                        Ngừng giao dịch
                      </Badge>
                    )}
                  </span>
                </span>
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col sm={12} lg={4}>
                  <Form.Group className="mb-0" as={Row} controlId="formHorizontalEmail">
                    <Form.Label column>Mã SKU</Form.Label>
                    <Col sm={10} lg={6}>
                      <FormLabel className="text-normal" column>
                        : {data.user_name ? data.user_name : '---'}
                      </FormLabel>
                    </Col>
                  </Form.Group>
                  <Form.Group className="mb-0" as={Row} controlId="formHorizontalEmail">
                    <Form.Label column>Mã barcode</Form.Label>
                    <Col sm={10} lg={6}>
                      <FormLabel className="text-normal" column>
                        : {data.user_sex ? data.user_sex : '---'}
                      </FormLabel>
                    </Col>
                  </Form.Group>
                  <Form.Group className="mb-0" as={Row} controlId="formHorizontalEmail">
                    <Form.Label column>Khối lượng</Form.Label>
                    <Col sm={10} lg={6}>
                      <FormLabel className="text-normal" column>
                        : {data.user_phone ? data.user_phone : '---'}
                      </FormLabel>
                    </Col>
                  </Form.Group>
                  <Form.Group className="mb-0" as={Row} controlId="formHorizontalEmail">
                    <Form.Label column>Đơn vị tính</Form.Label>
                    <Col sm={10} lg={6}>
                      <FormLabel className="text-normal" column>
                        : {data.user_email ? data.user_email : '---'}
                      </FormLabel>
                    </Col>
                  </Form.Group>
                  <Form.Group className="mb-0" as={Row} controlId="formHorizontalEmail">
                    <Form.Label column>Phân loại</Form.Label>
                    <Col sm={10} lg={6}>
                      <FormLabel className="text-normal" column>
                        : {data.user_staff ? data.user_staff : '---'}
                      </FormLabel>
                    </Col>
                  </Form.Group>
                  <Form.Group className="mb-0" as={Row} controlId="formHorizontalEmail">
                    <Form.Label column>Mô tả</Form.Label>
                    <Col sm={10} lg={6}>
                      <FormLabel className="text-normal" column>
                        : {data.user_staff ? data.user_staff : '---'}
                      </FormLabel>
                    </Col>
                  </Form.Group>
                </Col>
                <Col sm={12} lg={4}>
                  <Form.Group className="mb-0" as={Row} controlId="formHorizontalEmail">
                    <Form.Label column>Loại sản phẩm</Form.Label>
                    <Col sm={10} lg={6}>
                      <FormLabel className="text-normal" column>
                        : {data.user_code ? data.user_code : '---'}
                      </FormLabel>
                    </Col>
                  </Form.Group>
                  <Form.Group className="mb-0" as={Row} controlId="formHorizontalEmail">
                    <Form.Label column>Nhãn hiệu</Form.Label>
                    <Col sm={10} lg={6}>
                      <FormLabel className="text-normal" column>
                        : {data.user_sex ? data.user_sex : '---'}
                      </FormLabel>
                    </Col>
                  </Form.Group>
                  <Form.Group className="mb-0" as={Row} controlId="formHorizontalEmail">
                    <Form.Label column>Tags</Form.Label>
                    <Col sm={10} lg={6}>
                      <FormLabel className="text-normal" column>
                        : {data.user_sexx ? data.user_sex : '---'}
                      </FormLabel>
                    </Col>
                  </Form.Group>
                  <Form.Group className="mb-0" as={Row} controlId="formHorizontalEmail">
                    <Form.Label column>Ngày tạo</Form.Label>
                    <Col sm={10} lg={6}>
                      <FormLabel className="text-normal" column>
                        : {data.user_sex ? data.user_sex : '---'}
                      </FormLabel>
                    </Col>
                  </Form.Group>
                  <Form.Group className="mb-0" as={Row} controlId="formHorizontalEmail">
                    <Form.Label column>Ngày cập nhật cuối</Form.Label>
                    <Col sm={10} lg={6}>
                      <FormLabel className="text-normal" column>
                        : {data.user_sex ? data.user_sex : '---'}
                      </FormLabel>
                    </Col>
                  </Form.Group>
                </Col>
                <Col className="d-flex justify-content-center" sm={12} lg={3}>
                  <div className="text-center">
                    <i className="feather icon-image no-image"></i>
                    <p>Sản phẩm chưa có ảnh tải lên</p>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={12} lg={8}>
          <Row>
            <Col sm={12} lg={12}>
              <Card>
                <Card.Header className="flex-between">
                  <Card.Title as="h5">Giá sản phẩm</Card.Title>
                  {isSorting ? (
                    <span>
                      <span className="text-normal" style={{marginRight: 200, color: "#122ee2"}}>Sắp xếp theo thứ tự vị trí ưu tiên từ trên xuống dưới</span>
                      <Button variant="danger" onClick={handleCancelSortClick} className="strong-title mr-2" size="sm">
                        Huỷ
                      </Button>
                      <Button onClick={handleSaveClick} className="strong-title" size="sm">
                        Lưu
                      </Button>
                    </span>
                  ) : (
                    <Button onClick={handleSortClick} className="strong-title" size="sm">
                      Sắp xếp
                    </Button>
                  )}
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col lg={12}>
                      {isSorting ? (
                        <DragDropContext onDragEnd={handleOnDragEnd}>
                          <Droppable droppableId="items">
                            {(provided) => (
                              <div className="text-center" {...provided.droppableProps} ref={provided.innerRef}>
                                {items.map(({ id, content, value }, index) => {
                                  return (
                                    <Draggable key={id} draggableId={id} index={index}>
                                      {(provided) => (
                                        <div
                                          className="mb-3"
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                        >
                                          <Badge
                                            style={{
                                              fontWeight: 400,
                                              fontSize: 15,
                                              color: 'white',
                                              width: 200,
                                              padding: 14,
                                              backgroundColor: rgb(79, 101, 241),
                                              backgroundImage:
                                                'linear-gradient(90deg, rgb(111, 137, 251) 0%, rgb(97, 109, 245) 33%, rgb(92, 82, 235) 100%)'
                                            }}
                                          >
                                            {index + 1}. <span>{content}</span>
                                          </Badge>
                                        </div>
                                      )}
                                    </Draggable>
                                  );
                                })}
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                        </DragDropContext>
                      ) : (
                        <Row>
                          {items.map(({ id, content, value }, index) => {
                            return (
                              <Col lg={6}>
                                <Row>
                                  <Col lg={6}>
                                    <FormLabel>{content}</FormLabel>
                                  </Col>
                                  <Col lg={6}>
                                    <span className="text-normal">: {value}</span>
                                  </Col>
                                </Row>
                              </Col>
                            );
                          })}
                        </Row>
                      )}
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col sm={12} lg={4}>
          <Row>
            <Col sm={12} lg={12}>
              <Card>
                <Card.Header>
                  <Card.Title as="h5">Thông tin thêm</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Form>
                    <FormGroup>
                      <FormCheck checked disabled className="mt-2 mb-3" type="checkbox" label="Cho phép bán"></FormCheck>
                      <FormCheck type="checkbox" label="Áp dụng thuế"></FormCheck>
                    </FormGroup>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default ProductDetails;
