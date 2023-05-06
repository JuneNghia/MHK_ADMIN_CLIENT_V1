import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import services from '../../../utils/axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { ButtonLoading } from '../../../components/Button/LoadButton';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Formik } from 'formik';
import ProvinceDistrictSelect from '../../../data/provinceSelect';
import Select from 'react-select';
import { validationSchemaCustomerCreate } from '../../../hooks/useValidation';

const CreateCustomer = () => {
  const [showLoader, setShowLoader] = useState(false);
  const history = useHistory();
  const [optionsStaff, setOptionsStaff] = useState([]);
  const [optionsTag, setOptionsTag] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    services
      .get('/staff/get-all')
      .then((res) => {
        const result = res.data.data;
        const options = result.map((staff) => ({
          label: staff.staff_name,
          value: staff.staff_id
        }));
        setOptionsStaff(options);
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    services
      .get('/tag/get-all')
      .then((res) => {
        const result = res.data.data;
        const options = result.map((tag) => ({
          label: tag.tag_title,
          value: tag.id
        }));
        setOptionsTag(options);
      })
      .catch((err) => {});
  }, []);


  const gender = [
    { label: 'Nam', value: true },
    { label: 'Nữ', value: false }
  ];

  const handleSubmit = async (values) => {
    setShowLoader(true);
    const addressList = [
      {
        user_province: values.province,
        user_district: values.district,
        user_specific_address: values.address
      }
    ];

    const tags = selectedTags.map((tag) => (tag.value))

    const newCustomer = {
      user_code: values.code,
      user_name: values.name,
      user_email: values.email,
      user_phone: values.phone,
      customer_status: 'Đang giao dịch',
      address_list: addressList,
      staff_id: values.staff.value,
      staff_in_charge_note: values.note,
      tags: tags
    };

    try {
      await services
        .post('/customer/create', newCustomer)
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
              return `Tên KH: <b>${values.name}</b> đã tồn tại`;
            } else if (error.includes('phone')) {
              return `Số điện thoại KH: <b>${values.phone}</b> đã tồn tại`;
            } else if (error.includes('email')) {
              return `Email: <b>${values.email}</b> đã tồn tại`;
            } else return `Mã KH: <b>${values.code}</b> đã tồn tại`;
          });

          if(errorResponses) {
            setTimeout(() => {
              setShowLoader(false);
              Swal.fire({
                title: 'Thất bại',
                html: errorMessages.join('<br>'),
                icon: 'warning',
                confirmButtonText: 'Xác nhận'
              });
            }, 1000);
          }else {
            console.log("ERROR ");
          }
        });
    } catch (error) {
      setTimeout(() => {
        setShowLoader(false);
        Swal.fire('Thất bại', 'Đã xảy ra lỗi kết nối tới máy chủ', 'error');
      }, 1000);
    }
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

  return (
    <React.Fragment>
      <Helmet>
        <title>Thêm mới khách hàng</title>
      </Helmet>

      <Formik
        initialValues={{
          name: '',
          phone: '',
          email: '',
          code: '',
          address: '',
          province: '',
          district: '',
          note: '',
          staff: ''
        }}
        validationSchema={validationSchemaCustomerCreate}
        onSubmit={handleSubmit}
      >
        {({ errors, setFieldValue, handleChange, handleSubmit, touched, values}) => (
          <Form noValidate onSubmit={handleSubmit}>
            <span className="flex-between">
              <Button onClick={sweetConfirmAlert} variant="outline-primary" className="mr-0" style={{ marginBottom: 15 }}>
                <i className="feather icon-arrow-left"></i>
                Quay lại danh sách khách hàng
              </Button>
              <ButtonLoading
                text={
                  <span>
                    <i className="feather icon-plus-circle mr-2"></i>
                    Lưu khách hàng mới
                  </span>
                }
                onSubmit={handleSubmit}
                loading={showLoader}
                type="submit"
                disabled={showLoader}
                style={{ margin: '0 0 15px 0' }}
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
                            <Form.Group controlId="nameCustomer">
                              <Form.Label>
                                Tên khách hàng <span className="text-c-red">*</span>
                              </Form.Label>
                              <Form.Control
                                name="name"
                                onError={errors.name}
                                value={values.name}
                                onChange={handleChange}
                                type="text"
                                placeholder="Nhập tên khách hàng"
                              />
                              {touched.name && errors.name && <small className="text-danger form-text">{errors.name}</small>}
                            </Form.Group>
                            <Form.Group controlId="emailCustomer">
                              <Form.Label>
                                Email <span className="text-c-red">*</span>
                              </Form.Label>
                              <Form.Control
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                type="email"
                                placeholder="Nhập địa chỉ email"
                              />
                              {touched.email && errors.email && <small className="text-danger form-text">{errors.email}</small>}
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group controlId="idCustomer">
                              <Form.Label>
                                Mã khách hàng <span className="text-c-red">*</span>
                              </Form.Label>
                              <Form.Control
                                name="code"
                                value={values.code}
                                onChange={handleChange}
                                type="text"
                                placeholder="Nhập mã khách hàng"
                              />
                              {touched.code && errors.code && <small className="text-danger form-text">{errors.code}</small>}
                            </Form.Group>
                            <Row></Row>{' '}
                          </Col>
                          <Col md={6}>
                            <Form.Group controlId="phoneCustomer">
                              <Form.Label>
                                Số điện thoại <span className="text-c-red">*</span>
                              </Form.Label>
                              <Form.Control
                                value={values.phone}
                                name="phone"
                                onChange={handleChange}
                                type="text"
                                placeholder="Nhập số điện thoại"
                              />
                              {touched.phone && errors.phone && <small className="text-danger form-text">{errors.phone}</small>}
                            </Form.Group>
                          </Col>
                          <Col sm={12} lg={12}>
                            <Form.Group>
                              <ProvinceDistrictSelect
                                initialValues={{ province: null, district: null }}
                                onChange={(p, d) => {
                                  setFieldValue('province', p, true);
                                  setFieldValue('district', d, false);
                                }}
                              />
                              {touched.province && errors.province && <small className="text-danger form-text">{errors.province}</small>}
                            </Form.Group>
                          </Col>
                          <Col sm={12} lg={12}>
                            <Form.Group controlId="addressCustomer">
                              <Form.Label>
                                Địa chỉ <span className="text-c-red">*</span>
                              </Form.Label>
                              <Form.Control
                                name="address"
                                placeholder="Ghi rõ tầng, số nhà, phường xã, ..."
                                value={values.address}
                                onChange={handleChange}
                                as="textarea"
                                rows="3"
                              />
                              {touched.address && errors.address && <small className="text-danger form-text">{errors.address}</small>}
                            </Form.Group>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>

                  {/* <Col sm={12} lg={12}>
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
                              <Select
                                name="gender"
                                onChange={(g) => setFieldValue('gender', g)}
                                options={gender}
                                defaultValue={gender[0]}
                              ></Select>
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
                  </Col> */}
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
                          <Select
                            name="staff"
                            options={optionsStaff}
                            placeholder="Chọn nhân viên"
                            defaultValue={optionsStaff[0]}
                            onChange={(s) => setFieldValue('staff', s)}
                          />
                        </Form.Group>
                        <Form.Group controlId="description">
                          <Form.Label>Mô tả</Form.Label>
                          <Form.Control value={values.note} onChange={handleChange} name="note" as="textarea" rows="3" />
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Tags</Form.Label>
                          <Select options={optionsTag} placeholder="Chọn tags" isMulti onChange={(tag) => setSelectedTags(tag)}></Select>
                        </Form.Group>
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col sm={12} lg={12}>
                    <Card>
                      <Card.Header>
                        <Card.Title as="h5">Cài đặt nâng cao</Card.Title>
                      </Card.Header>
                      <Card.Body>
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

export default CreateCustomer;
