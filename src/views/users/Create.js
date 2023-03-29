import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Form, Button, FormControl, Badge } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { ButtonLoading } from '../../components/Button/LoadButton';
import { Helmet } from 'react-helmet';
import Select from 'react-select';
import { Formik } from 'formik';
import * as Yup from 'yup';
import ProvinceDistrictSelect from '../../data/proviceSelect';
import services from '../../utils/axios';
import moment from 'moment';
import Swal from 'sweetalert2';
import Positions from './Positions';

const CreateUser = () => {
  const [positions, setPositions] = useState([{ role: '', branches: [] }]);
  const [showLoader, setShowLoader] = useState(false);
  const history = useHistory();
  const [allowShippingPrice, setAllowShippingPrice] = useState(false);
  const [allowSalePrice, setAllowSalePrice] = useState(false);
  
  const gender = [
    { label: 'Nam', value: 'male' },
    { label: 'Nữ', value: 'female' },
    { label: 'Khác', value: 'others' }
  ];

  const handleSubmit = async (values) => {
    const position = positions.map((role) => ({
      title: role.role.label,
      agencyInChargeIDList: role.branches.map((branch) => branch.value)
    }));
    const newStaff = {
      user_name: values.name,
      user_code: values.code,
      user_phone: values.phone,
      user_email: values.email,
      staff_gender: values.gender.value,
      staff_region: values.province,
      staff_commune: values.district,
      staff_address: values.address,
      staff_password: values.password,
      staff_status: 'Đang làm việc',
      staff_birthday: moment(values.dob).utcOffset(7).format('DD/MM/YYYY'),
      note_about_staff: values.note,
      isAllowViewImportNWholesalePrice: allowSalePrice,
      isAllowViewShippingPrice: allowShippingPrice,
      positionIncludeAgencyBranchInCharge: position
    };
    try {
      await services
        .post('/staff/create', newStaff)
        .then((res) => {
          console.log(res);
          setShowLoader(true);
          setTimeout(() => {
            setShowLoader(false);
            history.push('/app/sell-management/users');
            Swal.fire({
              html: `Thêm nhân viên <b>${values.name}</b> thành công`,
              icon: 'success'
            });
          }, 1000);
        })
        .catch((errors) => {
          const errorResponses = errors.response.data.message;
          const errorMessages = errorResponses.map((error) => {
            if (error.includes('name')) {
              return `Tên NV: <b>${values.name}</b> đã tồn tại`;
            } else if (error.includes('phone')) {
              return `Số điện thoại NV: <b>${values.phone}</b> đã tồn tại`;
            } else if (error.includes('email')) {
              return `Email NV: <b>${values.email}</b> đã tồn tại`;
            } else return `Mã NV: <b>${values.code}</b> đã tồn tại`;
          });
          setShowLoader(true);
          setTimeout(() => {
            setShowLoader(false);
            Swal.fire({
              title: 'Thất bại',
              html: errorMessages.join('<br>'),
              icon: 'warning',
              confirmButtonText: 'Xác nhận'
            });
          }, 1000);
        });
    } catch (error) {
      setShowLoader(true);
      setTimeout(() => {
        setShowLoader(false);
        Swal.fire({
          title: 'Thất bại',
          text: 'Đã xảy ra lỗi khi kết nối tới máy chủ',
          icon: 'error',
          confirmButtonText: 'Xác nhận'
        });
      }, 1000);
    }
  };

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
    password: ''
  });

  const phoneRegExp = /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0|3|4|5|7|8])+([0-9]{7})$/;

  const validateSchema = Yup.object().shape({
    name: Yup.string().required('Tên khách hàng không được để trống'),
    phone: Yup.string()
      .matches(phoneRegExp, 'Số điện thoại không hợp lệ')
      .length(10, 'Số điện thoại phải có độ dài bằng 10')
      .required('Số điện thoại không được để trống'),
    code: Yup.string().required('Mã nhân viên không được để trống'),
    address: Yup.string().required('Số điện thoại không được để trống'),
    province: Yup.string().required('Vui lòng chọn Tỉnh/thành phố và Quận/huyện'),
    password: Yup.string().required('Mật khẩu không được để trống').min(8, 'Mật khẩu phải có tối thiểu 8 kí tự')
  });

  return (
    <React.Fragment>
      <Helmet>
        <title>Thêm mới nhân viên</title>
      </Helmet>

      <Formik initialValues={data} validationSchema={validateSchema} onSubmit={handleSubmit}>
        {({ errors, setFieldValue, handleChange, handleSubmit, touched, values, isValid }) => (
          <Form noValidate onSubmit={handleSubmit}>
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
                  onSubmit={handleSubmit}
                  disabled={showLoader}
                  variant="primary"
                ></ButtonLoading>
              </span>
            </div>
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
                                    onError={errors.name}
                                    value={values.name}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="Nhập tên đầy đủ nhân viên"
                                  ></FormControl>
                                  {touched.name && errors.name && <small class="text-danger form-text">{errors.name}</small>}
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
                                  {touched.phone && errors.phone && <small class="text-danger form-text">{errors.phone}</small>}
                                </Form.Group>
                              </Col>
                              <Col sm={12} lg={4}>
                                <Form.Group>
                                  <Form.Label>Email</Form.Label>
                                  <FormControl
                                    name="email"
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
                                  {touched.address && errors.address && <small class="text-danger form-text">{errors.address}</small>}
                                </Form.Group>
                              </Col>
                              <Col sm={12} lg={8}>
                                <Form.Group>
                                  <ProvinceDistrictSelect
                                    initialValues={{ provice: values.province, district: values.district }}
                                    onChange={(p, d) => {
                                      setFieldValue('province', p);
                                      setFieldValue('district', d);
                                    }}
                                  />
                                  {touched.province && errors.province && <small class="text-danger form-text">{errors.province}</small>}
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
                                  {touched.code && errors.code && <small class="text-danger form-text">{errors.code}</small>}
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
                                    name="gender"
                                    onChange={(g) => setFieldValue('gender', g)}
                                    options={gender}
                                    value={values.gender}
                                    placeholder="Chọn giới tính"
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
                                    value={values.password}
                                    onChange={handleChange}
                                    placeholder="Nhập mật khẩu"
                                    type="password"
                                  ></FormControl>
                                  {touched.password && errors.password && <small class="text-danger form-text">{errors.password}</small>}
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
                          <Col lg={12} sm={12}>
                            <Positions positions={positions} setPositions={setPositions}/>
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
                                <input
                                  id="price_import"
                                  checked={allowSalePrice}
                                  onChange={() => setAllowSalePrice((prevState) => !prevState)}
                                  type="checkbox"
                                />
                                <label htmlFor="price_import" className="cr" />
                              </div>
                              <Form.Label>Cho phép nhân viên xem giá vốn, giá nhập</Form.Label>
                            </Form.Group>
                          </Col>
                          <Col sm={12} lg={6}>
                            <Form.Group>
                              <div className="switch switch-primary d-inline m-r-10">
                                <input
                                  id="price_delievery"
                                  checked={allowShippingPrice}
                                  onChange={() => setAllowShippingPrice((prevState) => !prevState)}
                                  type="checkbox"
                                />
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
