import React, { useState } from 'react';
import {
  Row,
  Col,
  Card,
  Form,
  Button,
  InputGroup,
  FormControl,
  DropdownButton,
  Dropdown,
  FormLabel,
  Table,
  Tabs,
  Tab
} from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useHistory } from 'react-router-dom';
import { ButtonLoading } from '../../../components/Button/LoadButton';
import Select from 'react-select';
import { Helmet } from 'react-helmet';
import GiftIcon from '../../../assets/icon/gift.svg';

const FormsElements = () => {
  
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
        return navigate.push('../../../views/dashboard/DashDefault');
      } else {
        return;
      }
    });
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>Tạo đơn hàng</title>
      </Helmet>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={sweetConfirmAlert} variant="outline-primary" className="mr-0" style={{ marginBottom: 15 }}>
          <i className="feather icon-arrow-left"></i>
          Thoát
        </Button>
        {/* <Button variant="danger" style={{padding: '7px 18px'}} className="mb-3 mr-0" href="/app/dashboard/default">
        Tạo đơn hàng
      </Button> */}
        <ButtonLoading
          style={{ margin: '0 0 15px 0' }}
          text={
            <span>
              <i className="feather icon-plus-circle mr-2"></i>
              Tạo đơn hàng
            </span>
          }
          loading={showLoader}
          type="submit"
          onSubmit={handleSubmit}
          disabled={showLoader}
        ></ButtonLoading>
      </div>

      <Row>
        <Col sm={12} lg={8}>
          <Card style={{height: 498}}>
            <Card.Header>
              <Card.Title as="h5">Thông tin khách hàng</Card.Title>
              <Card.Title style={{ margin: 0 }}>
                {' '}
                <Form.Group style={{ marginTop: '20px', marginBottom: 0 }} controlId="nameCustomer">
                  <Form.Control
                    name="user_name"
                    value={data.id}
                    onChange={handleChange}
                    type="text"
                    placeholder="Tìm kiếm theo tên, SĐT, mã khách hàng ..."
                  />
                </Form.Group>
              </Card.Title>
            </Card.Header>

            <Card.Body>
              <Row>
                <Col sm={12} lg={8}>
                  <Form.Group controlId="addressCustomer">
                    <FormLabel>
                      <Card.Title className="strong-title" as="h6">
                        ĐỊA CHỈ GIAO HÀNG
                        <span className="ml-3 strong-title">
                          <a href="">Thay đổi</a>
                        </span>
                      </Card.Title>
                    </FormLabel>
                    <div className="text-normal">
                      <p>
                        {data.user_name} - {data.user_phone}
                      </p>
                      <p>{data.user_address}sdsd</p>
                    </div>
                  </Form.Group>
                </Col>
                <Col sm={12} lg={4}>
                  <Form.Group style={{ marginBottom: 0 }} className="box-dash">
                    <p className="flex-between text-normal">
                      <span>Nợ phải thu</span>
                      <span className="text-c-red">0</span>
                    </p>
                    <p>
                      <a href="#" className="flex-between text-normal">
                        <span>Tổng chi tiêu (0 đơn)</span>
                        <span className="text-c-red">0</span>
                      </a>
                    </p>
                    <p>
                      <a href="#" className="flex-between text-normal">
                        <span>Trả hàng (0 đơn)</span>
                        <span className="text-c-red">0</span>
                      </a>
                    </p>
                    <p style={{ marginBottom: 0 }}>
                      <a href="#" className="flex-between text-normal">
                        <span>Giao hàng thất bại (0 đơn)</span>
                        <span className="text-c-red">0</span>
                      </a>
                    </p>
                  </Form.Group>
                </Col>
                <Col className="mt-5" sm={12} lg={8}>
                  <Form.Group controlId="addressCustomer">
                    <Form.Label className="strong-title text-normal">ĐỊA CHỈ NHẬN HOÁ ĐƠN</Form.Label>
                    <span className="ml-3 strong-title">
                      <a href="">Thay đổi</a>
                    </span>
                    <div className="text-normal">
                      <p>
                        {data.user_name} - {data.user_phone}
                      </p>
                      <p>{data.user_address}sdsd</p>
                    </div>
                  </Form.Group>
                </Col>
                <Col className="mt-5" sm={12} lg={4}>
                  <Form.Group>
                    <FormLabel className="text-normal strong-title">Liên hệ</FormLabel>
                    <span className="ml-3 strong-title">
                      <a href="">Thêm mới</a>
                    </span>
                    <p>Chưa có thông tin liên hệ</p>
                    <p>
                      <FormControl placeholder="Email" type="text"></FormControl>
                    </p>
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={12} lg={4}>
          <Card style={{ height: 498 }}>
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
                    <Select defaultValue={valueStaff[0]}  options={valueStaff} />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                  <Form.Label column sm={3}>
                    Bán tại
                  </Form.Label>
                  <Col sm={9}>
                    <Select defaultValue={valueStaff[0]}  options={valueStaff} />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                  <Form.Label column sm={3}>
                    Nguồn
                  </Form.Label>
                  <Col sm={9}>
                    <Select defaultValue={valueStaff[0]}  options={valueStaff} />
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
                    <FormControl type="text"></FormControl>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                  <Form.Label column sm={3}>
                    Đường dẫn đơn hàng
                  </Form.Label>
                  <Col sm={9}>
                    <FormControl type="text" placeholder="https://"></FormControl>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                  <Form.Label column sm={3}>
                    Tham chiếu
                  </Form.Label>
                  <Col sm={9}>
                    <FormControl type="text"></FormControl>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                  <Form.Label column sm={3}>
                    Thanh toán dự kiến
                  </Form.Label>
                  <Col sm={9}>
                    <Select defaultValue={valueStaff[0]} options={valueStaff} />
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
              <div className="flex-between">
                <Card.Title as="h5">Thông tin sản phẩm</Card.Title>
                <span>
                  <span className="mr-3">
                    <input type="checkbox"></input> <strong style={{ color: 'black' }}>Tách dòng</strong>
                  </span>
                  <span style={{ borderRight: '1px solid #333' }}></span>
                  <span className="ml-3 mr-3">
                    <a href="#">Kiểm tra tồn kho</a>
                  </span>
                  <span style={{ borderRight: '1px solid #333' }}></span>
                  <span className="ml-3">
                    <a>
                      <i style={{ fontSize: '18px' }} className="feather icon-sliders"></i>
                    </a>
                  </span>
                </span>
              </div>
              <Row>
                <Col sm={12} lg={12}>
                  <Form.Group style={{ marginTop: '20px', marginBottom: 0 }} controlId="nameCustomer">
                    <Row className="flex-between">
                      <Col sm={6} lg={9}>
                        <Form.Control
                          name="user_name"
                          value={data.id}
                          onChange={handleChange}
                          type="text"
                          placeholder="Tìm theo tên, mã SKU, hoặc quét mã Barcode..."
                        />
                      </Col>
                      <Col sm={6} lg={3}>
                        <Button variant="outline-dark" className="button-under-input">
                          Chọn nhanh
                        </Button>
                        <Button variant="outline-dark" className="button-under-input">
                          Chọn nhanh
                        </Button>
                        <Button variant="outline-dark" className="button-under-input">
                          Chọn nhanh
                        </Button>
                      </Col>
                    </Row>
                  </Form.Group>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col sm={12} lg={12}>
                  <Table>
                    <thead>
                      <th>STT</th>
                      <th>Ảnh</th>
                      <th>Tên sản phẩm</th>
                      <th>Số lượng</th>
                      <th>Đơn giá</th>
                      <th>Chiết khấu</th>
                      <th>Thành tiền</th>
                    </thead>
                    <tbody>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                    </tbody>
                  </Table>
                </Col>
                <Col sm={12} lg={12} className="flex-between dashed-tb">
                  <Button style={{ margin: '10px 0' }}>
                    <i className="feather icon-plus-square"></i>Thêm dịch vụ khác
                  </Button>
                  <Button className="flex-between">
                    <img style={{ width: '7%' }} src={GiftIcon}></img>
                    <span>Áp dụng chương trình khuyến mãi</span>
                  </Button>
                </Col>
                <Col className="mt-3" sm={12} lg={12}>
                  <Row>
                    <Col className="text-normal" sm={12} lg={3}>
                      <Form.Group>
                        <FormLabel>Tags</FormLabel>
                        <FormControl as="textarea" rows="3"></FormControl>
                      </Form.Group>
                      <Form.Group>
                        <FormLabel>Ghi chú đơn hàng</FormLabel>
                        <FormControl as="textarea" rows="3" placeholder="VD: Hàng tặng gói riêng"></FormControl>
                      </Form.Group>
                    </Col>
                    <Col sm={12} lg={6}></Col>
                    <Col className="text-normal" sm={12} lg={3}>
                      <div className="flex-between">
                        <p>Tổng tiền (0 sản phẩm)</p>
                        <span>0</span>
                      </div>
                      <div className="flex-between">
                        <p>Chiết khấu </p>
                        <span>0</span>
                      </div>
                      <div className="flex-between">
                        <p>
                          <a href="#">Phí giao hàng</a>
                        </p>
                        <span>0</span>
                      </div>
                      <div className="flex-between">
                        <p>
                          {' '}
                          <a href="#">Mã giảm giá</a>
                        </p>
                        <span>0</span>
                      </div>
                      <div className="flex-between">
                        <p className="strong-title">Khách phải trả</p>
                        <span>0</span>
                      </div>
                      <div className="dashed-tb">
                        <div className="flex-between">
                          <p className="strong-title" style={{ margin: '10px 0' }}>
                            Khách đã trả
                          </p>
                          <span>0</span>
                        </div>
                        <a href="#">
                          <i className="feather icon-plus-circle mr-2"></i>
                          Chọn phương thức
                        </a>
                      </div>
                      <div className="flex-between">
                        <p className="strong-title" style={{ margin: '10px 0' }}>
                          Còn phải trả
                        </p>
                        <span>0</span>
                      </div>
                    </Col>
                  </Row>
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
              <Card.Title as="h5">Đóng gói và giao hàng</Card.Title>
            </Card.Header>
          </Card>
        </Col>
      </Row>
      <ButtonLoading
        style={{ margin: '0 0 20px 0', display: 'flex', float: 'right' }}
        text={
          <span>
            <i className="feather icon-plus-circle mr-2"></i>Tạo đơn hàng
          </span>
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
