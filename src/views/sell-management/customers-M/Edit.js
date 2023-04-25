import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import services from '../../../utils/axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { ButtonLoading } from '../../../components/Button/LoadButton';
import { useHistory, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { HashLoader } from 'react-spinners';

const Edit = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const { id } = useParams();

  const [customer, setCustomer] = useState({
    name: '',
    code: '',
    phone: '',
    email: '',
    note: '',
    tags: ''
  });

  const keyMapping = {
    name: 'user_name',
    code: 'user_code',
    phone: 'user_phone',
    email: 'user_email',
    note: 'staff_in_charge_note'
  };

  useEffect(() => {
    async function fetchCustomer() {
      const response = await services.get(`/customer/get-by-id/${id}`);
      setCustomer({
        name: response.data.data.customer_name,
        code: response.data.data.user_code,
        email: response.data.data.customer_email,
        phone: response.data.data.customer_phone,
        note: response.data.data.staff_in_charge_note
      });
      setIsLoading(false);
    }
    fetchCustomer();
  }, [id]);

  const handleSubmit = async (values) => {
    setShowLoader(true);
    //Vòng lặp for sẽ duyệt các giá trị trong values so sánh với các giá trị của Customer
    //Nếu trường nào có giá trị không thay đổi thì không được gửi lên server
    const updatedFields = {};
    for (const key in values) {
      if (values.hasOwnProperty(key) && values[key] !== customer[key]) {
        updatedFields[key] = values[key];
      }
    }

    //Thay đổi những key mặc định trong updateFields thành những tên key được đặt trong server
    //Ví dụ : name -> customer_name ...
    const updatedFieldsWithApiKeys = {};
    for (const key in updatedFields) {
      if (updatedFields.hasOwnProperty(key)) {
        const newKey = keyMapping[key] || key;
        updatedFieldsWithApiKeys[newKey] = updatedFields[key];
      }
    }

    try {
      //Cập nhật khách hàng
    await services
    .patch(`/customer/update-personalInfo-by-id/${id}`, updatedFieldsWithApiKeys)
    .then((response) => {
      setTimeout(() => {
        setShowLoader(false);
        history.push(`/app/sell-management/customers/${id}`);
        sweetSuccessAlert();
      }, 1000);
    })
    .catch((errors) => {
      const errorResponses = errors.response.data.message;
      const errorMessages = errorResponses.map((error) => {
        if (error.includes('name')) {
          return `Tên KH: <b>${values.name}</b> đã tồn tại`;
        } else if (error.includes('phone')) {
          return `Số điện thoại KH: <b>${values.phone}</b> đã tồn tại`;
        } else if (error.includes('email')) {
          return `Email: <b>${values.email}</b> đã tồn tại`;
        } else return `Mã KH: <b>${values.code}</b> đã tồn tại`;
      });
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
      setTimeout(()=> {
        setShowLoader(false);
        Swal.fire('', 'Đã xảy ra lỗi khi kết nối tới máy chủ', 'error');
      }, 1000)
    }
    
  };

  const sweetSuccessAlert = () => {
    const MySwal = withReactContent(Swal);
    MySwal.fire('', `Cập nhật thông tin khách hàng thành công`, 'success');
  };

  const sweetConfirmAlert = () => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: 'Bạn có chắc chắn muốn thoát ?',
      text: 'Mọi dữ liệu của bạn sẽ không được thay đổi',
      type: 'warning',
      icon: 'question',
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Quay lại',
      showCancelButton: true
    }).then((willExit) => {
      if (willExit.isConfirmed) {
        return history.push(`/app/sell-management/customers/${id}`);
      } else {
        return;
      }
    });
  };

  const phoneRegExp = /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0|3|4|5|7|8])+([0-9]{7})$/;
  const validateSchema = Yup.object().shape({
    name: Yup.string().required('Tên khách hàng không được để trống'),
    email: Yup.string().email('Email không hợp lệ').required('Email không được để trống'),
    phone: Yup.string().matches(phoneRegExp, 'Số điện thoại không hợp lệ').required('Số điện thoại không được để trống'),
    code: Yup.string().required('Mã khách hàng không được để trống')
  });

  if (isLoading) return <HashLoader style={{ display: 'block', height: '70vh', margin: 'auto' }} size={50} color="#36d7b7" />;

  return (
    <React.Fragment>
      <Helmet>
        <title>Cập nhật thông tin khách hàng</title>
      </Helmet>

      <Formik enableReinitialize={true} initialValues={customer} validationSchema={validateSchema} onSubmit={handleSubmit}>
        {({ dirty, errors, handleBlur, handleChange, handleSubmit, touched, values, isValid }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <span className="flex-between">
              <Button onClick={sweetConfirmAlert} variant="outline-primary" className="mr-0" style={{ marginBottom: 15 }}>
                <i className="feather icon-arrow-left"></i>
                Quay lại
              </Button>
              <ButtonLoading
                text={'Cập nhật'}
                onSubmit={handleSubmit}
                loading={showLoader}
                type="submit"
                disabled={!dirty || showLoader}
                style={{ margin: 0, marginBottom: 15 }}
              ></ButtonLoading>
            </span>

            <Row>
              <Col sm={12} lg={8}>
                <Row>
                  <Col sm={12} lg={12}>
                    <Card>
                      <Card.Header>
                        <Card.Title as="h5">Thông tin chung</Card.Title>
                      </Card.Header>
                      <Card.Body>
                        <Row>
                          <Col md={12}>
                            <Form.Group controlId="formName">
                              <Form.Label>
                                Tên khách hàng <span className="text-c-red">*</span>
                              </Form.Label>
                              <Form.Control
                                name="name"
                                onError={touched.name && errors.name}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                placeholder="Nhập tên khách hàng"
                                value={values.name}
                              />
                              {touched.name && errors.name && <small class="text-danger form-text">{errors.name}</small>}
                            </Form.Group>
                            <Form.Group controlId="emailCustomer">
                              <Form.Label>
                                Email <span className="text-c-red">*</span>
                              </Form.Label>
                              <Form.Control
                                name="email"
                                onError={touched.email && errors.email}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                type="email"
                                value={values.email}
                                placeholder="Nhập địa chỉ email"
                              />
                              {touched.email && errors.email && <small class="text-danger form-text">{errors.email}</small>}
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group controlId="idCustomer">
                              <Form.Label>
                                Mã khách hàng <span className="text-c-red">*</span>
                              </Form.Label>
                              <Form.Control
                                name="code"
                                onBlur={handleBlur}
                                onError={touched.code && errors.code}
                                value={values.code}
                                onChange={handleChange}
                                type="text"
                                placeholder="Nhập mã khách hàng"
                              />
                              {touched.code && errors.code && <small class="text-danger form-text">{errors.code}</small>}
                            </Form.Group>
                            <Row></Row>{' '}
                          </Col>
                          <Col md={6}>
                            <Form.Group controlId="phoneCustomer">
                              <Form.Label>
                                Số điện thoại <span className="text-c-red">*</span>
                              </Form.Label>
                              <Form.Control
                                onBlur={handleBlur}
                                onError={touched.phone && errors.phone}
                                value={values.phone}
                                name="phone"
                                onChange={handleChange}
                                type="text"
                                placeholder="Nhập số điện thoại"
                              />
                              {touched.phone && errors.phone && <small class="text-danger form-text">{errors.phone}</small>}
                            </Form.Group>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col sm={12} lg={12}>
                    <Card>
                      <Card.Header>
                        <Card.Title as="h5">Thông tin bổ sung</Card.Title>
                      </Card.Header>
                      <Card.Body>
                        <Row>
                          <Col md={6}>
                            <Form.Group controlId="dobCustomer">
                              <Form.Label>Ngày sinh</Form.Label>
                              <Form.Control type="date" />
                            </Form.Group>
                            <Form.Group controlId="faxCustomer">
                              <Form.Label>Số fax</Form.Label>
                              <Form.Control type="text" placeholder="Nhập số fax" />
                            </Form.Group>
                            <Form.Group controlId="websiteCustomer">
                              <Form.Label>Website</Form.Label>
                              <Form.Control type="text" placeholder="Nhập tên miền Website" />
                            </Form.Group>
                            <Form.Group controlId="websiteCustomer">
                              <Form.Label>Tổng chi tiêu</Form.Label>
                              <Form.Control type="text" placeholder="Nhập tổng chi tiêu" />
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group controlId="sexCustomer">
                              <Form.Label>Giới tính</Form.Label>
                              <Form.Control as="select">
                                <option>Khác</option>
                                <option>Nam</option>
                                <option>Nữ</option>
                              </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="taxIdCustomer">
                              <Form.Label>Mã số thuế</Form.Label>
                              <Form.Control type="text" placeholder="Nhập mã số thuế" />
                            </Form.Group>
                            <Form.Group controlId="taxIdCustomer">
                              <Form.Label>Công nợ</Form.Label>
                              <Form.Control type="text" placeholder="Nhập công nợ khách hàng" />
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
                        <Card.Title as="h5">Thông tin khác</Card.Title>
                      </Card.Header>
                      <Card.Body>
                        <Form.Group controlId="staffCb">
                          <Form.Label>Nhân viên phụ trách</Form.Label>
                          <Form.Control value={''} onChange={handleChange} name="staff_id" as="select">
                            <option>Nghĩa</option>
                            <option>Tuấn</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="description">
                          <Form.Label>Mô tả</Form.Label>
                          <Form.Control value={values.note} onChange={handleChange} name="note" as="textarea" rows="3" />
                        </Form.Group>
                        <Form.Group controlId="tag">
                          <Form.Label>Tags</Form.Label>
                          <Form.Control as="textarea" rows="3" />
                        </Form.Group>
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

export default Edit;
