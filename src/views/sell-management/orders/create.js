import React, { useState } from 'react';
import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useHistory } from 'react-router-dom'
import { ButtonLoading } from '../../../components/Button/LoadButton';
import Select from 'react-select';

const FormsElements = () => {
  const [validated, setValidated] = useState(false);
  const [validatedTooltip, setValidatedTooltip] = useState(false);
  const [supportedCheckbox, setSupportedCheckbox] = useState(false);
  const [supportedRadio, setSupportedRadio] = useState(false);
  const [supportedSelect, setSupportedSelect] = useState(0);
  const [supportedFile, setSupportedFile] = useState(0);
  const [showLoader, setShowLoader] = useState(false);
  const [selectedOption, setSelectedOption] = useState();

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

  const valueStaff = [
    { value: 'nghĩa', label: 'Nghĩa' },
    { value: 'tuấn', label: 'Tuấn' },
    { value: 'hùng', label: 'Hùng' }
  ];

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
    MySwal.fire('','Lưu khách hàng mới thành công','success')
  }

  const sweetConfirmAlert = () => {
    const MySwal = withReactContent(Swal);
        MySwal.fire({
          title: 'Bạn có chắc chắn muốn thoát ?',
          text: 'Mọi dữ liệu của bạn sẽ không được thay đổi',
          type: 'warning',
          showCancelButton: true
        }).then((willExit) => {
          if (willExit.isConfirmed) {
            return navigate.push('../../../views/dashboard/DashDefault')
          } else {
            return 
          }
        });
  };

  return (
    <React.Fragment>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={sweetConfirmAlert} variant="danger" className="mr-0" style={{ marginBottom: 15 }}>
          Thoát
        </Button>
        {/* <Button variant="danger" style={{padding: '7px 18px'}} className="mb-3 mr-0" href="/app/dashboard/default">
        Tạo đơn hàng
      </Button> */}
        <ButtonLoading
          style={{ margin: '0 0 15px 0' }}
          text={'Tạo đơn hàng'}
          loading={showLoader}
          type="submit"
          onSubmit={handleSubmit}
          disabled={showLoader}
        ></ButtonLoading>
      </div>

      <Row style={{ maxHeight: 400 }}>
        <Col sm={12} lg={8}>
          <Card style={{ height: 300 }}>
            <Card.Header>
              <Card.Title as="h5">Thông tin khách hàng</Card.Title>
              <Card.Title style={{ margin: 0 }}>
                {' '}
                <Form.Group style={{ marginTop: '20px', marginBottom: 0 }} controlId="nameCustomer">
                  <Form.Control
                    name="user_name"
                    value={data.user_name}
                    onChange={handleChange}
                    type="text"
                    placeholder="Tìm kiếm theo tên, SĐT, mã khách hàng ..."
                  />
                </Form.Group>
              </Card.Title>
            </Card.Header>

            <Card.Body>
              <Row>
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
          <Card style={{ height: 300 }}>
            <Card.Header>
              <Card.Title as="h5">Thông tin bổ sung</Card.Title>
            </Card.Header>
            <Card.Body style={{ overflowY: 'scroll' }}>
              <Form>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                  <Form.Label column sm={3}>
                    Bán bởi
                  </Form.Label>
                  <Col sm={9}>
                    <Select defaultValue={valueStaff[0]} onChange={setSelectedOption} options={valueStaff} />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                  <Form.Label column sm={3}>
                    Bán tại
                  </Form.Label>
                  <Col sm={9}>
                    <Select defaultValue={valueStaff[0]} onChange={setSelectedOption} options={valueStaff} />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                  <Form.Label column sm={3}>
                    Nguồn
                  </Form.Label>
                  <Col sm={9}>
                    <Select defaultValue={valueStaff[0]} onChange={setSelectedOption} options={valueStaff} />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                  <Form.Label column sm={3}>
                    Hẹn giao
                  </Form.Label>
                  <Col sm={9}>
                  <Form.Control type="date" />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                  <Form.Label column sm={3}>
                    Mã đơn
                  </Form.Label>
                  <Col sm={9}>
                    <Select defaultValue={valueStaff[0]} onChange={setSelectedOption} options={valueStaff} />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                  <Form.Label column sm={3}>
                    Đường dẫn đơn hàng
                  </Form.Label>
                  <Col sm={9}>
                    <Select defaultValue={valueStaff[0]} onChange={setSelectedOption} options={valueStaff} />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                  <Form.Label column sm={3}>
                    Tham chiếu
                  </Form.Label>
                  <Col sm={9}>
                    <Select defaultValue={valueStaff[0]} onChange={setSelectedOption} options={valueStaff} />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                  <Form.Label column sm={3}>
                    Thanh toán dự kiến
                  </Form.Label>
                  <Col sm={9}>
                    <Select defaultValue={valueStaff[0]} onChange={setSelectedOption} options={valueStaff} />
                  </Col>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col sm={12} lg={12}>
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
      </Row>
      <Row>
        <Col sm={12} lg={12}>
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
      </Row>
      <ButtonLoading
          style={{ margin: '0 0 20px 0', display: 'flex', float: 'right' }}
          text={<i data-feather="c">

          </i>
          }
          loading={showLoader}
          type="submit"
          onSubmit={handleSubmit}
          disabled={showLoader}
        ></ButtonLoading>
    </React.Fragment>
  );
};

export default FormsElements;
