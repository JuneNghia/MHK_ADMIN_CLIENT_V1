import React, { useState } from 'react';
import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import services from '../../../../utils/axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { ButtonLoading } from '../../../../components/Button/LoadButton';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const FormsElements = () => {
  const [validated, setValidated] = useState(false);
  const [validatedTooltip, setValidatedTooltip] = useState(false);
  const [supportedCheckbox, setSupportedCheckbox] = useState(false);
  const [supportedRadio, setSupportedRadio] = useState(false);
  const [supportedSelect, setSupportedSelect] = useState(0);
  const [supportedFile, setSupportedFile] = useState(0);
  const [showLoader, setShowLoader] = useState(false);
  const history = useHistory();

  const [data, setData] = useState({
    user_name: '',
    user_type: '',
    user_code: '',
    user_group: '',
    user_phone: '',
    user_email: '',
    user_password: '',
    user_region: '',
    user_commune: '',
    user_address: '',
    createdAt: '',
    updatedAt: ''
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
      user_name: data.user_name,
      user_type: data.user_type,
      user_code: data.user_code,
      user_group: data.user_group,
      user_phone: data.user_phone,
      user_email: data.user_email,
      user_password: data.user_password,
      user_region: data.user_region,
      user_commune: data.user_commune,
      user_address: data.user_address,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt
    };
    services
      .post('/user/create-customer', customerData)
      .then((response) => {
        setData({
          user_name: '',
          user_type: '',
          user_code: '',
          user_group: '',
          user_phone: '',
          user_email: '',
          user_password: '',
          user_region: '',
          user_commune: '',
          user_address: '',
          createdAt: '',
          updatedAt: ''
        });
        setShowLoader(true);
        setTimeout(() => {
          setShowLoader(false);
          sweetSuccessAlert();
        }, 3000);
      })
      .catch((err) => {
        setShowLoader(true);
        setTimeout(() => {
          setShowLoader(false);
          sweetErrorAlert();
        }, 3000);
      });
  };

  // const handleSubmit = (event) => {
  //   const form = event.currentTarget;
  //   if (form.checkValidity() === false) {
  //     event.preventDefault();
  //     event.stopPropagation();
  //   }
  //   setValidated(true);
  // };

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

  const sweetErrorAlert = () => {
    const MySwal = withReactContent(Swal);
    MySwal.fire('Thất bại', 'Mã khách hàng đã tồn tại', 'error');
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
      <Button onClick={sweetConfirmAlert} variant="outline-dark" className="mr-0" style={{ marginBottom: 15 }}>
        <i className="feather icon-arrow-left"></i>
        Quay lại danh sách khách hàng
      </Button>
      <Row>
        <Col sm={12} lg={8}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Thông tin chung</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={12}>
                  <Form>
                    <Form.Group controlId="nameCustomer">
                      <Form.Label>
                        Tên khách hàng <span className="text-c-red">*</span>
                      </Form.Label>
                      <Form.Control
                        name="user_name"
                        value={data.user_name}
                        onChange={handleChange}
                        type="text"
                        placeholder="Nhập tên khách hàng"
                      />
                    </Form.Group>
                  </Form>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="idCustomer">
                    <Form.Label>Mã khách hàng</Form.Label>
                    <Form.Control
                      name="user_code"
                      value={data.user_code}
                      onChange={handleChange}
                      type="text"
                      placeholder="Nhập mã khách hàng"
                    />
                  </Form.Group>
                  <Form.Group controlId="phoneCustomer">
                    <Form.Label>Số điện thoại</Form.Label>
                    <Form.Control
                      name="user_phone"
                      value={data.user_phone}
                      onChange={handleChange}
                      type="text"
                      placeholder="Nhập số điện thoại"
                    />
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Khu vực</Form.Label>
                    <Form.Control name="user_region" value={data.user_region} onChange={handleChange} as="select">
                      <option>Chọn Tỉnh/Thành phố - Quận/Huyện</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="emailCustomer">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      name="user_email"
                      value={data.user_email}
                      onChange={handleChange}
                      type="email"
                      placeholder="Nhập địa chỉ email"
                    />
                  </Form.Group>
                  <Form.Group controlId="strictCustomer">
                    <Form.Label>Phường xã</Form.Label>
                    <Form.Control name="user_commune" value={data.user_commune} onChange={handleChange} as="select">
                      <option>Chọn Phường/Xã</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col sm={12} lg={12}>
                  <Form.Group controlId="addressCustomer">
                    <Form.Label>Địa chỉ</Form.Label>
                    <Form.Control name="user_address" value={data.user_address} onChange={handleChange} as="textarea" rows="3" />
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
                  <Form.Control as="select">
                    <option>Nghĩa</option>
                    <option>Tuấn</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="description">
                  <Form.Label>Mô tả</Form.Label>
                  <Form.Control as="textarea" rows="3" />
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
            onSubmit={handleSubmit}
            disabled={showLoader}
          ></ButtonLoading>
          {/* <Button onClick={(e) => handleSubmit(e)}>Lưu khách hàng mới</Button> */}
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default FormsElements;
