import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Form, Button, FormLabel, Badge, FormGroup, FormControl } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { ButtonLoading } from '../../components/Button/LoadButton';
import { Helmet } from 'react-helmet';
import Select from 'react-select';
import { Formik } from 'formik';
import * as Yup from 'yup';
import ProvinceDistrictSelect from '../../data/proviceSelect';
import { min } from 'moment';
import services from '../../utils/axios';

const CreateUser = () => {
  const [showLoader, setShowLoader] = useState(false);
  const history = useHistory();
  const [optionsRole, setOptionsRole] = useState([
    {
      role_name: 'Nhân viên vận chuyển'
    },
    {
      role_name: 'Nhân viên kho'
    }
  ]);

  console.log(optionsRole);
  const [optionsBranch, setOptionsBranch] = useState({});

  useEffect(() => {
    services
      .get('/agency-branch/get-all')
      .then((res) => {
        const result = res.data.data;
        const options = result.map((branch) => ({
          label: branch.agency_branch_name
        }));
        setOptionsBranch(options);
      })
      .catch((err) => {});
  }, []);

  const [data, setData] = useState({
    name: '',
    phone: '',
    email: '',
    dob: '',
    code: '',
    address: '',
    gender: '',
    province: '',
    district: '',
    status: '',
    note: '',
    password: '',
    branches: [],
    allowShippingPrice: false,
    allowSalePrice: false
  });

  const phoneRegExp = /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0|3|4|5|7|8])+([0-9]{7})$/;

  const validateSchema = Yup.object().shape({
    name: Yup.string().required('Tên khách hàng không được để trống'),
    phone: Yup.string()
      .matches(phoneRegExp, 'Số điện thoại không hợp lệ')
      .min(10, 'Số điện thoại phải có độ dài bằng 10')
      .required('Số điện thoại không được để trống'),
    code: Yup.string().required('Mã nhân viên không được để trống'),
    address: Yup.string().matches(phoneRegExp, 'Số điện thoại không hợp lệ').required('Số điện thoại không được để trống'),
    password: Yup.string().required('Mật khẩu không được để trống').min(8, 'Mật khẩu phải có tối thiểu 8 kí tự')
  });

  return (
    <React.Fragment>
      <Helmet>
        <title>Thêm mới nhân viên</title>
      </Helmet>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          onClick={() => history.push('/app/sell-management/users')}
          variant="outline-primary"
          className="mr-0"
          style={{ marginBottom: 15 }}
        >
          <i className="feather icon-arrow-left"></i>
          Quay lại danh sách nhân viên
        </Button>
        <span>
          <ButtonLoading
            style={{ margin: '0 0px 15px 0' }}
            text={
              <span style={{ fontWeight: 600 }}>
                <i className="feather icon-save mr-2"></i>
                Thêm
              </span>
            }
            loading={showLoader}
            type="submit"
            disabled={showLoader}
            variant="primary"
          ></ButtonLoading>
        </span>
      </div>

      <Formik initialValues={data} validationSchema={validateSchema}>
        {({ errors, setFieldValue, handleChange, handleSubmit, touched, values, isValid }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Row>
              <Col sm={12} lg={12}>
                <Row>
                  <Col sm={12} lg={12}>
                    <Card>
                      <Card.Header>
                        <Card.Title as="h5">Thông tin nhân viên</Card.Title>
                      </Card.Header>
                      <Card.Body>
                        <Row>
                          <Col sm={12} lg={12}>
                            <Row>
                              <Col sm={12} lg={4}>
                                <Form.Group>
                                  <Form.Label>
                                    Họ và tên nhân viên <span className="text-c-red">*</span>
                                  </Form.Label>
                                  <FormControl
                                    name="name"
                                    onError={touched.name && errors.name}
                                    value={values.name}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="Nhập tên đầy đủ nhân viên"
                                  ></FormControl>
                                  {errors.name && <small class="text-danger form-text">{errors.name}</small>}
                                </Form.Group>
                              </Col>
                              <Col sm={12} lg={4}>
                                <Form.Group>
                                  <Form.Label>
                                    Số điện thoại đăng nhập cửa hàng <span className="text-c-red">*</span>
                                  </Form.Label>
                                  <FormControl
                                    name="phone"
                                    value={values.phone}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="Nhập số điện thoại"
                                  ></FormControl>
                                  {errors.phone && <small class="text-danger form-text">{errors.phone}</small>}
                                </Form.Group>
                              </Col>
                              <Col sm={12} lg={4}>
                                <Form.Group>
                                  <Form.Label>Email </Form.Label>
                                  <FormControl
                                    name="phone"
                                    value={values.email}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="Nhập địa chỉ email"
                                  ></FormControl>
                                </Form.Group>
                              </Col>
                              <Col sm={12} lg={4}>
                                <Form.Group>
                                  <Form.Label>
                                    Địa chỉ <span className="text-c-red">*</span>
                                  </Form.Label>
                                  <FormControl
                                    name="address"
                                    value={values.address}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="Nhập địa chỉ"
                                  ></FormControl>
                                  {errors.address && <small class="text-danger form-text">{errors.address}</small>}
                                </Form.Group>
                              </Col>
                              <Col sm={12} lg={8}>
                                <Form.Group>
                                  <ProvinceDistrictSelect
                                    initialValues={{}}
                                    onChange={(p, d) => {
                                      setFieldValue('province', p);
                                      setFieldValue('district', d);
                                    }}
                                  />
                                </Form.Group>
                              </Col>
                              <Col sm={12} lg={4}>
                                <Form.Group>
                                  <Form.Label>
                                    Mã nhân viên <span className="text-c-red">*</span>
                                  </Form.Label>
                                  <FormControl
                                    name="code"
                                    value={values.code}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="Nhập mã nhân viên"
                                  ></FormControl>
                                </Form.Group>
                              </Col>
                              <Col sm={12} lg={4}>
                                <Form.Group>
                                  <Form.Label>Ngày sinh</Form.Label>
                                  <FormControl name="dob" value={values.dob} onChange={handleChange} type="date"></FormControl>
                                </Form.Group>
                              </Col>
                              <Col sm={12} lg={4}>
                                <Form.Group>
                                  <Form.Label>Giới tính</Form.Label>
                                  <Select
                                    name="phone"
                                    onError={touched.gender && errors.gender}
                                    value={values.gender}
                                    onChange={handleChange}
                                    placeholder={'Chọn giới tính'}
                                  ></Select>
                                </Form.Group>
                              </Col>
                              <Col sm={12} lg={4}>
                                <Form.Group>
                                  <Form.Label>
                                    Mật khẩu <span className="text-c-red">*</span>
                                  </Form.Label>
                                  <FormControl
                                    name="password"
                                    onError={touched.password && errors.password}
                                    value={values.password}
                                    onChange={handleChange}
                                    placeholder="Nhập mật khẩu"
                                    type="password"
                                  ></FormControl>
                                </Form.Group>
                              </Col>
                              <Col sm={12} lg={4}>
                                <Form.Group>
                                  <Form.Label>Ghi chú</Form.Label>
                                  <FormControl
                                    name="note"
                                    value={values.note}
                                    onChange={handleChange}
                                    placeholder="Nhập ghi chú"
                                  ></FormControl>
                                </Form.Group>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col sm={12} lg={12}>
                    <Card>
                      <Card.Header className="flex-between">
                        <Card.Title as="h5">Vai trò nhân viên</Card.Title>
                        <a href="#">Danh sách vai trò cửa hàng</a>
                      </Card.Header>
                      <Card.Body>
                        <Row>
                          <Col sm={12} lg={12}>
                            <Row style={{ alignItems: 'center' }}>
                              <Col lg={5}>
                                <Form.Group>
                                  <Form.Label>
                                    Vai trò <span className="text-c-red">*</span>
                                  </Form.Label>
                                  <Select
                                    placeholder="Chọn vai trò"
                                    options={optionsRole.map((role) => ({
                                      label: role.role_name
                                    }))}
                                  ></Select>
                                </Form.Group>
                              </Col>
                              <Col lg={5}>
                                <Form.Group controlId="nameCustomer">
                                  <Form.Label>
                                    Chi nhánh <span className="text-c-red">*</span>
                                  </Form.Label>
                                  <Select
                                    placeholder="Chọn chi nhánh"
                                    value={values.branches}
                                    onChange={handleChange}
                                    options={optionsBranch}
                                  ></Select>
                                </Form.Group>
                              </Col>
                              <Col lg={2}>
                                <a className="ml-5 mr-5" href="#">
                                  Xem chi tiết
                                </a>
                                <a href="#">Xoá</a>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col sm={12} lg={12}>
                    <Card>
                      <Card.Header>
                        <Card.Title as="h5">Phân quyền dữ liệu</Card.Title>
                      </Card.Header>
                      <Card.Body>
                        <Row>
                          <Col sm={12} lg={6}>
                            <Form.Group>
                              <div className="switch switch-primary d-inline m-r-10">
                                <input checked={values.allowSalePrice} onChange={() => setFieldValue('allowSalePrice',!values.allowSalePrice)} type="checkbox"/>
                                <label htmlFor="price_import" className="cr" />
                              </div>
                              <Form.Label>Cho phép nhân viên xem giá vốn, giá nhập</Form.Label>
                            </Form.Group>
                          </Col>
                          <Col sm={12} lg={6}>
                            <Form.Group>
                              <div className="switch switch-primary d-inline m-r-10">
                                <input name="allowShippingPrice" checked={values.allowShippingPrice} onChange={() => setFieldValue('allowShippingPrice',!values.allowShippingPrice)} type="checkbox"/>
                                <label htmlFor="price_delievery" className="cr" />
                              </div>
                              <Form.Label>Cho phép nhân viên xem giá chuyển hàng</Form.Label>
                            </Form.Group>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
};

export default CreateUser;
