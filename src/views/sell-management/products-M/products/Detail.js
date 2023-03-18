import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Form, Button, FormLabel, Badge, Tabs, Tab, FormGroup, FormCheck } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { ButtonLoading } from '../../../../components/Button/LoadButton';
import { useHistory, useParams } from 'react-router-dom';
import services from '../../../../utils/axios';
import { Helmet } from 'react-helmet';

const ProductDetails = () => {
  const [validated, setValidated] = useState(false);
  const [validatedTooltip, setValidatedTooltip] = useState(false);
  const [supportedCheckbox, setSupportedCheckbox] = useState(false);
  const [supportedRadio, setSupportedRadio] = useState(false);
  const [supportedSelect, setSupportedSelect] = useState(0);
  const [supportedFile, setSupportedFile] = useState(0);
  const [showLoader, setShowLoader] = useState(false);
  const history = useHistory();

  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      const response = await services.get(`/user/get-by-id/${id}`);
      setData(response.data);
    }
    fetchProducts();
  }, [id]);

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value
    });
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  const handleSubmitTooltip = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidatedTooltip(true);
  };

  const supportedSelectHandler = (event) => {
    setSupportedSelect(parseInt(event.target.value));
  };

  const supportedFileHandler = (event) => {
    setSupportedFile(!!event.target.value);
  };

  const sweetSuccessAlert = () => {
    const MySwal = withReactContent(Swal);
    MySwal.fire('', 'Lưu khách hàng mới thành công', 'success');
  };

  if (!data) {
    return <div>Lỗi : Không thể lấy dữ liệu từ server</div>;
  } else
    return (
      <React.Fragment>
        <Helmet>
          <title>Chi tiết sản phẩm</title>
        </Helmet>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            onClick={() => history.push('/app/sell-management/customers')}
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
                Xoá khách hàng
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
                    <h4 style={{ display: 'inline-block', fontWeight: 600, fontSize: 22 }}>
                      {data.user_name}
                    </h4>
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
                  <Col sm={12} lg={5}>
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
                  <Col sm={12} lg={5}>
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
                  <Col className="flex-between" sm={12} lg={2}>
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
                  <Card.Header>
                    <Card.Title as="h5">
                      <span>Giá sản phẩm</span>
                      
                      
                    </Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      <Col sm={12} lg={6}>
                        <Form.Group className="mb-0" as={Row} controlId="formHorizontalEmail">
                          <Form.Label column>Giá bán lẻ</Form.Label>
                          <Col sm={10} lg={6}>
                            <FormLabel className="text-normal" column>
                              : {data.user_name ? data.user_name : '---'}
                            </FormLabel>
                          </Col>
                        </Form.Group>
                        <Form.Group className="mb-0" as={Row} controlId="formHorizontalEmail">
                          <Form.Label column>Giá Shopee</Form.Label>
                          <Col sm={10} lg={6}>
                            <FormLabel className="text-normal" column>
                              : {data.user_sex ? data.user_sex : '---'}
                            </FormLabel>
                          </Col>
                        </Form.Group>
                        <Form.Group className="mb-0" as={Row} controlId="formHorizontalEmail">
                          <Form.Label column>Bán trên 10 triệu</Form.Label>
                          <Col sm={10} lg={6}>
                            <FormLabel className="text-normal" column>
                              : {data.user_phone ? data.user_phone : '---'}
                            </FormLabel>
                          </Col>
                        </Form.Group>
                        <Form.Group className="mb-0" as={Row} controlId="formHorizontalEmail">
                          <Form.Label column>Giá nhập</Form.Label>
                          <Col sm={10} lg={6}>
                            <FormLabel className="text-normal" column>
                              : {data.user_email ? data.user_email : '---'}
                            </FormLabel>
                          </Col>
                        </Form.Group>
                        <Form.Group className="mb-0" as={Row} controlId="formHorizontalEmail">
                          <Form.Label column>Nhập bảo hành</Form.Label>
                          <Col sm={10} lg={6}>
                            <FormLabel className="text-normal" column>
                              : {data.user_staff ? data.user_staff : '---'}
                            </FormLabel>
                          </Col>
                        </Form.Group>
                        
                      </Col>
                      <Col sm={12} lg={6}>
                        <Form.Group className="mb-0" as={Row} controlId="formHorizontalEmail">
                          <Form.Label column>Giá bán buôn</Form.Label>
                          <Col sm={10} lg={6}>
                            <FormLabel className="text-normal" column>
                              : {data.user_code ? data.user_code : '---'}
                            </FormLabel>
                          </Col>
                        </Form.Group>
                        <Form.Group className="mb-0" as={Row} controlId="formHorizontalEmail">
                          <Form.Label column>Bán trên 20 triệu</Form.Label>
                          <Col sm={10} lg={6}>
                            <FormLabel className="text-normal" column>
                              : {data.user_sex ? data.user_sex : '---'}
                            </FormLabel>
                          </Col>
                        </Form.Group>
                        <Form.Group className="mb-0" as={Row} controlId="formHorizontalEmail">
                          <Form.Label column>Bán dưới 10 triệu</Form.Label>
                          <Col sm={10} lg={6}>
                            <FormLabel className="text-normal" column>
                              : {data.user_sexx ? data.user_sex : '---'}
                            </FormLabel>
                          </Col>
                        </Form.Group>
                        <Form.Group className="mb-0" as={Row} controlId="formHorizontalEmail">
                          <Form.Label column>Nhập Shopee</Form.Label>
                          <Col sm={10} lg={6}>
                            <FormLabel className="text-normal" column>
                              : {data.user_sex ? data.user_sex : '---'}
                            </FormLabel>
                          </Col>
                        </Form.Group>
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
          <Col sm={12} lg={12}>
            <Tabs variant="pills" defaultActiveKey="inventory" className="tabs-menu">
              <Tab eventKey="inventory" title="Tồn kho">
                <p>
                  Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master
                  cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher
                  synth. Cosby sweater eu banh mi, qui irure terry richardson ex squid. Aliquip placeat salvia cillum iphone. Seitan aliquip
                  quis cardigan american apparel, butcher voluptate nisi qui.
                </p>
              </Tab>
              <Tab eventKey="history" title="Lịch sử kho">
                <p>
                  Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit,
                  blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. Qui photo booth
                  letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic,
                  assumenda labore aesthetic magna delectus mollit. Keytar helvetica VHS salvia yr, vero magna velit sapiente labore
                  stumptown. Vegan fanny pack odio cillum wes anderson 8-bit, sustainable jean shorts beard ut DIY ethical culpa terry
                  richardson biodiesel. Art party scenester stumptown, tumblr butcher vero sint qui sapiente accusamus tattooed echo park.
                </p>
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </React.Fragment>
    );
};

export default ProductDetails;
