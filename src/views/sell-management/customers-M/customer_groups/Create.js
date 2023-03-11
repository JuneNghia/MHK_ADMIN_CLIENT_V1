import React, { useState } from 'react';
import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import axios from 'axios';
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
  const navigate = useHistory();

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
    axios.post('http://localhost:5000/mhk-api/v1/user/create-customer', customerData).then((response) => {
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
    });
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
        return navigate.push('../customer_groups');
      } else {
        return;
      }
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

  return (
    <React.Fragment>
      <Helmet>
        <title>Thêm nhóm khách hàng</title>
      </Helmet>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={sweetConfirmAlert} variant="danger" className="mr-0" style={{ marginBottom: 15 }}>
          <i className="feather icon-arrow-left"></i>
          Quay lại danh sách nhóm khách hàng
        </Button>
        {/* <Button variant="danger" style={{padding: '7px 18px'}} className="mb-3 mr-0" href="/app/dashboard/default">
        Tạo đơn hàng
      </Button> */}
        <ButtonLoading
          style={{ margin: '0 0 15px 0' }}
          text={
            <span>
              <i className="feather icon-plus-circle mr-2"></i>
              Tạo nhóm
            </span>
          }
          loading={showLoader}
          type="submit"
          onSubmit={handleSubmit}
          disabled={showLoader}
        ></ButtonLoading>
      </div>

      <Row>
        <Col sm={12} lg={6}>
          <Card style={{ height: 400 }}>
            <Card.Header>
              <Card.Title as="h5">Thông tin chung</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={12}>
                  <Form>
                    <Form.Group controlId="nameGroupCustomer">
                      <Form.Label>Tên nhóm</Form.Label>
                      <Form.Control
                        name="user_name"
                        value={data.user_name}
                        onChange={handleChange}
                        type="text"
                        placeholder="Nhập tên nhóm khách hàng"
                      />
                    </Form.Group>
                  </Form>
                </Col>
                <Col md={12}>
                  <Form.Group controlId="idGroupCustomer">
                    <Form.Label>Mã nhóm</Form.Label>
                    <Form.Control
                      name="user_code"
                      value={data.user_code}
                      onChange={handleChange}
                      type="text"
                      placeholder="Nhập mã nhóm khách hàng"
                    />
                  </Form.Group>
                </Col>
                <Col sm={12} lg={12}>
                  <Form.Group controlId="addressCustomer">
                    <Form.Label>Mô tả</Form.Label>
                    <Form.Control name="user_address" value={data.user_address} onChange={handleChange} as="textarea" rows="3" />
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={12} lg={6}>
          <Card style={{ height: 400 }}>
            <Card.Header>
              <Card.Title as="h5">Cài đặt nâng cao</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group controlId="staffCb">
                  <Form.Label>Giá mặc định</Form.Label>
                  <Form.Control as="select">
                    <option>Chọn giá mặc định</option>
                    <option>Tuấn</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="description">
                  <Form.Label>Chiết khấu</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
                <Form.Group controlId="staffCb">
                  <Form.Label>Hình thức thanh toán</Form.Label>
                  <Form.Control as="select">
                    <option>Chọn hình thức thanh toán</option>
                    <option>Tuấn</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Form.Control>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default FormsElements;
