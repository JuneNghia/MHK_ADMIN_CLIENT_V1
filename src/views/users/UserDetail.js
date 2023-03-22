import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Form, Button, FormLabel, Badge, Tabs, Tab, FormGroup, FormControl } from 'react-bootstrap';
import services from '../../utils/axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useHistory, useParams } from 'react-router-dom';
import { ButtonLoading } from '../../components/Button/LoadButton';
import { Helmet } from 'react-helmet';
import Select from 'react-select';

const UserDetail = () => {
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
    async function fetchCustomer() {
      const response = await services.get(`/user/get-by-id/${id}`);
      setData(response.data);
    }
    fetchCustomer();
  }, [id]);

  //   const [data, setData] = useState({
  //     user_name: '',
  //     user_type: '',
  //     user_code: '',
  //     user_group: '',
  //     user_phone: '',
  //     user_email: '',
  //     user_password: '',
  //     user_region: '',
  //     user_commune: '',
  //     user_address: '',
  //     createdAt: '',
  //     updatedAt: ''
  //   });

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value
    });
  };

  //   const handleDelete = (e) => {
  //     e.preventDefault();
  //     const data = {
  //       user_name: data.user_name,
  //       user_type: data.user_type,
  //       user_code: data.user_code,
  //       user_group: data.user_group,
  //       user_phone: data.user_phone,
  //       user_email: data.user_email,
  //       user_password: data.user_password,
  //       user_region: data.user_region,
  //       user_commune: data.user_commune,
  //       user_address: data.user_address,
  //       createdAt: data.createdAt,
  //       updatedAt: data.updatedAt
  //     };
  //     axios.post('http://localhost:5000/mhk-api/v1/user/create-customer', data).then((response) => {
  //       setData({
  //         user_name: '',
  //         user_type: '',
  //         user_code: '',
  //         user_group: '',
  //         user_phone: '',
  //         user_email: '',
  //         user_password: '',
  //         user_region: '',
  //         user_commune: '',
  //         user_address: '',
  //         createdAt: '',
  //         updatedAt: ''
  //       });
  //       setShowLoader(true);
  //       setTimeout(() => {
  //         setShowLoader(false);
  //         sweetSuccessAlert();
  //       }, 3000);
  //     });
  //   };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  const handleDelete = () => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: 'Xoá nhân viên',
      text: `Bạn có chắc chắn muốn xoá nhân viên ${data.user_name} ? Thao tác này không thể khôi phục`,
      type: 'warning',
      icon: 'warning',
      confirmButtonText: 'Xoá',
      confirmButtonColor: 'red',
      cancelButtonText: 'Thoát',
      showCancelButton: true
    }).then((willExit) => {
      if (willExit.isConfirmed) {
        services
          .delete(`/user/delete-by-id/${id}`)
          .then((response) => {
            sweetSuccessAlert();
          })
          .catch((error) => {
            alert('Xoá nhân viên thất bại');
          });
      } else {
        return;
      }
    });
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
    history.push('/app/sell-management/users');
    const MySwal = withReactContent(Swal);
    MySwal.fire('', 'Xoá nhân viên thành công', 'success');
  };

  if (!data) {
    return <div>Lỗi : Không thể lấy dữ liệu từ server</div>;
  } else
    return (
      <React.Fragment>
        <Helmet>
          <title>Chi tiết nhân viên</title>
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
              style={{ margin: '0 8px 15px 0' }}
              text={
                <span style={{ fontWeight: 600 }}>
                  <i className="feather icon-save mr-2"></i>
                  Lưu
                </span>
              }
              loading={showLoader}
              type="submit"
              disabled={showLoader}
              variant="primary"
            ></ButtonLoading>
            <Button style={{ margin: '0 0 15px 0' }} onClick={handleDelete} type="submit" variant="outline-danger" className="mr-0">
              <span style={{ fontWeight: 600 }}>
                <i className="feather icon-trash-2 mr-2"></i>
                Xoá nhân viên
              </span>
            </Button>
          </span>
        </div>
        <Row>
          <Col sm={12} lg={12}>
            <Row>
              <Col sm={12} lg={12}>
                <Card>
                  <Card.Header>
                    <Card.Title as="h5">
                      <span>
                        <h4 style={{ display: 'inline-block', fontWeight: 600, fontSize: 22 }}>{data.user_name}</h4>
                        <span>
                          {data.user_state === 'Đã nghỉ việc' ? (
                            <Badge style={{ fontSize: 15, marginLeft: 15, padding: 11 }} key="process" pill variant="danger">
                              Đã nghỉ việc
                            </Badge>
                          ) : (
                            <Badge style={{ fontSize: 15, marginLeft: 15, padding: 11 }} key="stop" pill variant="success">
                              Đang làm việc
                            </Badge>
                          )}
                        </span>
                      </span>
                    </Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      <Col sm={12} lg={12}>
                        <Row>
                          <Col sm={12} lg={6}>
                            <Form.Group className="mb-0" as={Row} controlId="formHorizontalEmail">
                              <Form.Label column>Số điện thoại</Form.Label>
                              <Col sm={10} lg={6}>
                                <FormLabel className="text-normal" column>
                                  : {data.user_phone ? data.user_phone : '---'}
                                </FormLabel>
                              </Col>
                            </Form.Group>
                            <Form.Group className="mb-0" as={Row} controlId="formHorizontalEmail">
                              <Form.Label column>Email</Form.Label>
                              <Col sm={10} lg={6}>
                                <FormLabel className="text-normal" column>
                                  : {data.user_email ? data.user_email : '---'}
                                </FormLabel>
                              </Col>
                            </Form.Group>
                            <Form.Group className="mb-0" as={Row} controlId="formHorizontalEmail">
                              <Form.Label column>Ngày sinh</Form.Label>
                              <Col sm={10} lg={6}>
                                <FormLabel className="text-normal" column>
                                  : {data.user_dob ? data.user_dob : '---'}
                                </FormLabel>
                              </Col>
                            </Form.Group>
                            <Form.Group className="mb-0" as={Row} controlId="formHorizontalEmail">
                              <Form.Label column>Địa chỉ</Form.Label>
                              <Col sm={10} lg={6}>
                                <FormLabel className="text-normal" column>
                                  : {data.user_address ? data.user_address : '---'}
                                </FormLabel>
                              </Col>
                            </Form.Group>
                          </Col>
                          <Col lg={12}>
                            <p className="mt-2 text-normal">
                              <em>
                                Để cập nhật thông tin nhân viên, bạn vui lòng báo nhân viên vào “Tài khoản của tôi” trong trang quản trị MHK
                                hoặc truy cập đường dẫn <a href="https://profiles.mhk.vn">https://profiles.mhk.vn </a>
                              </em>{' '}
                            </p>
                            <FormGroup>
                              <FormLabel className="text-normal">
                                <em>Ghi chú</em>
                              </FormLabel>
                              <FormControl type="text"></FormControl>
                            </FormGroup>
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
                            <Form.Group controlId="nameCustomer">
                              <Form.Label className="text-normal">
                                Vai trò <span className="text-c-red">*</span>
                              </Form.Label>
                              <Select></Select>
                            </Form.Group>
                          </Col>
                          <Col lg={5}>
                            <Form.Group controlId="nameCustomer">
                              <Form.Label className="text-normal">
                                Chi nhánh <span className="text-c-red">*</span>
                              </Form.Label>
                              <Select></Select>
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
                        <Form.Group controlId="formBasicEmail">
                          <div className="switch switch-primary d-inline m-r-10">
                            <input type="checkbox" id="price_import" />
                            <label htmlFor="price_import" className="cr" />
                          </div>
                          <Form.Label>Cho phép nhân viên xem giá vốn, giá nhập</Form.Label>
                        </Form.Group>
                      </Col>
                      <Col sm={12} lg={6}>
                        <Form.Group controlId="formBasicEmail">
                          <div className="switch switch-primary d-inline m-r-10">
                            <input type="checkbox" id="price_delievery" />
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
      </React.Fragment>
    );
};

export default UserDetail;
