import React, { useState } from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import services from '../../../../utils/axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { ButtonLoading } from '../../../../components/Button/LoadButton';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import AreaSelect from '../../../../data/areaSelect';
import CommuneSelect from '../../../../data/communeSelect';
import * as Yup from 'yup';
import { Formik } from 'formik';
import useScriptRef from '../../../../hooks/useScriptRef';

const FormsElements = () => {
  const [showLoader, setShowLoader] = useState(false);
  const history = useHistory();

  //Select Area & Commune
  const [selectedProvince, setSelectedProvince] = useState(77);
  const [selectedCommune, setSelectedCommune] = useState(null);

  const handleProvinceChange = (value) => {
    setSelectedProvince(value);
  };
  const handleCommuneChange = (value) => {
    setSelectedCommune(value);
  };

  const [data, setData] = useState({
    name: '',
    code: '',
    phone: '',
    email: '',
    address: '',
    staff_id: '',
    staff_in_charge_note: ''
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const customerData = {
      customer_name: data.name,
      customer_code: data.code,
      customer_phone: data.phone,
      customer_email: data.email,
      customer_region: selectedProvince.label,
      customer_commune: selectedCommune,
      customer_address: data.address
      // staff_id: data.staff_id,
      // staff_in_charge_note: data.staff_in_charge_note
    };
    services
      .post('/customer/create-customer', customerData)
      .then((response) => {
        setShowLoader(true);
        setTimeout(() => {
          setShowLoader(false);
          history.push('/app/sell-management/customers');
          sweetSuccessAlert();
        }, 1000);
      })
      .catch((errors) => {
        const errorResponses = errors.response.data.message;
        const errorMessages = errorResponses.map((error) => {
          if (error.includes('name')) {
            return `Tên KH: <b>${data.name}</b> đã tồn tại`;
          } else if (error.includes('phone')) {
            return `Số điện thoại KH: <b>${data.phone}</b> đã tồn tại`;
          } else if (error.includes('email')) {
            return `Email: <b>${data.email}</b> đã tồn tại`;
          } else return `Mã KH: <b>${data.code}</b> đã tồn tại`;
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
  };

  const sweetSuccessAlert = () => {
    const MySwal = withReactContent(Swal);
    MySwal.fire('', 'Lưu khách hàng mới thành công', 'success');
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
        return history.replace('../customers');
      } else {
        return;
      }
    });
  };

  const validateSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required')
  });

  return (
    <React.Fragment>
      <Helmet>
        <title>Thêm mới khách hàng</title>
      </Helmet>
      <Button onClick={sweetConfirmAlert} variant="outline-primary" className="mr-0" style={{ marginBottom: 15 }}>
        <i className="feather icon-arrow-left"></i>
        Quay lại danh sách khách hàng
      </Button>
      <Formik 
        initialValues={{
          name: '',
          phone: '',
          email: '',
          code: '',
          region: '',
          commune: '',
          address: ''
        }}
      >
        {({errors, handleBlur, handleChange, handleSubmit, touched, values}) => (
          <Form noValidate onSubmit={handleSubmit}>
          <Row>
            <Col sm={12} lg={8}>
              <Card>
                <Card.Header>
                  <Card.Title as="h5">Thông tin chung</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col md={12}>
                      <Form.Group controlId="nameCustomer">
                        <Form.Label>
                          Tên khách hàng <span className="text-c-red">*</span>
                        </Form.Label>
                        <Form.Control name="name" value={data.name} onChange={handleChange} type="text" placeholder="Nhập tên khách hàng" />
                      </Form.Group>
                      <Form.Group controlId="emailCustomer">
                        <Form.Label>
                          Email <span className="text-c-red">*</span>
                        </Form.Label>
                        <Form.Control name="email" value={data.email} onChange={handleChange} type="email" placeholder="Nhập địa chỉ email" />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="idCustomer">
                        <Form.Label>
                          Mã khách hàng <span className="text-c-red">*</span>
                        </Form.Label>
                        <Form.Control name="code" value={data.code} onChange={handleChange} type="text" placeholder="Nhập mã khách hàng" />
                      </Form.Group>
                      <Row></Row>{' '}
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="phoneCustomer">
                        <Form.Label>
                          Số điện thoại <span className="text-c-red">*</span>
                        </Form.Label>
                        <Form.Control name="phone" value={data.phone} onChange={handleChange} type="text" placeholder="Nhập số điện thoại" />
                      </Form.Group>
                    </Col>
                    <Col sm={12} lg={12}>
                      <Row>
                        <Col lg={6}>
                          <Form.Group controlId="strictCustomer">
                            <Form.Label>
                              Tỉnh - Thành phố <span className="text-c-red">*</span>
                            </Form.Label>
                            <AreaSelect value={selectedProvince} handleProvinceChange={handleProvinceChange} />
                          </Form.Group>
                        </Col>
  
                        <Col lg={6}>
                          <Form.Group controlId="strictCustomer">
                            <Form.Label>
                              Quận - Huyện <span className="text-c-red">*</span>
                            </Form.Label>
                            <CommuneSelect province={selectedProvince} handleChangeDistrict={handleCommuneChange} />
                          </Form.Group>
                        </Col>
                      </Row>
                    </Col>
                    <Col sm={12} lg={12}>
                      <Form.Group controlId="addressCustomer">
                        <Form.Label>Địa chỉ <span className="text-c-red">*</span></Form.Label>
                        <Form.Control name="address" placeholder="Ghi rõ tầng, số nhà, phường xã, ..." value={data.address} onChange={handleChange} as="textarea" rows="3" />
                      </Form.Group>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={12} lg={4}>
              <Card>
                <Card.Header>
                  <Card.Title as="h5">Thông tin khác</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Form>
                    <Form.Group controlId="staffCb">
                      <Form.Label>Nhân viên phụ trách</Form.Label>
                      <Form.Control value={data.staff_id} onChange={handleChange} name="staff_id" as="select">
                        <option>Nghĩa</option>
                        <option>Tuấn</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="description">
                      <Form.Label>Mô tả</Form.Label>
                      <Form.Control
                        value={data.staff_in_charge_note}
                        onChange={handleChange}
                        name="staff_in_charge_note"
                        as="textarea"
                        rows="3"
                      />
                    </Form.Group>
                    <Form.Group controlId="tag">
                      <Form.Label>Tag</Form.Label>
                      <Form.Control as="textarea" rows="3" />
                    </Form.Group>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={12} lg={8}>
              <Card>
                <Card.Header>
                  <Card.Title as="h5">Thông tin bổ sung</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col md={6}>
                      <Form>
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
                      </Form>
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
            <Col style={{ top: '-130px' }} sm={12} lg={4}>
              <Card>
                <Card.Header>
                  <Card.Title as="h5">Cài đặt nâng cao</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Form>
                    <fieldset>
                      <Form.Group as={Row}>
                        <Form.Label className="ml-3" sm={12}>
                          <strong style={{ color: 'black' }}>Áp dụng ưu đãi</strong>
                        </Form.Label>
                        <Col sm={12}>
                          <Form.Check
                            className="mt-2"
                            type="radio"
                            label="Theo nhóm khách hàng"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios1"
                          />
                          <Form.Check
                            className="mt-2"
                            type="radio"
                            label="Theo khách hàng"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios2"
                          />
                        </Col>
                      </Form.Group>
                    </fieldset>
                  </Form>
                </Card.Body>
              </Card>
              <ButtonLoading
                text={'Lưu khách hàng mới'}
                loading={showLoader}
                type="submit"
                disabled={showLoader}
              ></ButtonLoading>
            </Col>
          </Row>
          </Form>
        )};
      </Formik>
    </React.Fragment>
  );
};

export default FormsElements;
