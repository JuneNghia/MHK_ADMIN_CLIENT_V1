import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Card,
  Form,
  Button,
  FormLabel,
  Badge,
  Tabs,
  Tab
} from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { ButtonLoading } from '../../../../components/Button/LoadButton';
import { useHistory, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const UserDetails = () => {
  const [validated, setValidated] = useState(false);
  const [validatedTooltip, setValidatedTooltip] = useState(false);
  const [supportedCheckbox, setSupportedCheckbox] = useState(false);
  const [supportedRadio, setSupportedRadio] = useState(false);
  const [supportedSelect, setSupportedSelect] = useState(0);
  const [supportedFile, setSupportedFile] = useState(0);
  const [showLoader, setShowLoader] = useState(false);
  const history = useHistory();


  const {id} = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchCustomer() {
      const response = await axios.get(`http://localhost:5000/mhk-api/v1/user/get-by-id/${id}`)
      setData(response.data);
    }
    fetchCustomer();
  }, [id])



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


  if(!data) {
    return <div>
      Lỗi : Không thể lấy dữ liệu từ server
    </div>
  } else
  return (
    <React.Fragment>
      <Helmet>
        <title>Chi tiết khách hàng</title>
      </Helmet>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={() => history.push('/app/sell-management/customers')} variant="danger" className="mr-0" style={{ marginBottom: 15 }}>
          <i className="feather icon-arrow-left"></i>
          Quay lại danh sách khách hàng
        </Button>
        
        <ButtonLoading
          style={{ margin: '0 0 15px 0' }}
          text={
            <span style={{fontWeight: 600}}>
              <i className="feather icon-trash-2 mr-2"></i>
              Xoá khách hàng
            </span>
          }
          loading={showLoader}
          type="submit"
          disabled={showLoader}
          variant="outline-danger"
        ></ButtonLoading>
      </div>
      <Row>
        <Col sm={12} lg={8}>
          <Row>
            <Col sm={12} lg={12}>
              <Card>
                <Card.Header>
                  <Card.Title as="h5">
                    <span>Thông tin cá nhân khách hàng : </span>
                    <span>
                      <h4 className="text-c-red" style={{ display: 'inline-block', fontWeight: 600, fontSize: 22 }}>
                        {data.user_name}
                      </h4>
                      <span>
                        {data.user_state === 'Ngừng giao dịch' ? (
                          <Badge style={{ fontSize: 15, marginLeft: 15, padding: 11 }} key="process" pill variant="success">
                            Đang giao dịch
                          </Badge>
                        ) : (
                          <Badge style={{ fontSize: 15, marginLeft: 15, padding: 11 }} key="stop" pill variant="danger">
                            Ngừng giao dịch
                          </Badge>
                        )}
                      </span>
                    </span>
                  </Card.Title>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col sm={12} lg={6}>
                      <Form.Group className="mb-0" as={Row} controlId="formHorizontalEmail">
                        <Form.Label column>Ngày sinh</Form.Label>
                        <Col sm={10} lg={6}>
                          <FormLabel className="text-normal" column>
                            : {data.user_name ? data.user_name : '---'}
                          </FormLabel>
                        </Col>
                      </Form.Group>
                      <Form.Group className="mb-0" as={Row} controlId="formHorizontalEmail">
                        <Form.Label column>Giới tính</Form.Label>
                        <Col sm={10} lg={6}>
                          <FormLabel className="text-normal" column>
                            : {data.user_sex ? data.user_sex : '---'}
                          </FormLabel>
                        </Col>
                      </Form.Group>
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
                        <Form.Label column>Nhân viên phụ trách</Form.Label>
                        <Col sm={10} lg={6}>
                          <FormLabel className="text-normal" column>
                            : {data.user_staff ? data.user_staff : '---'}
                          </FormLabel>
                        </Col>
                      </Form.Group>
                      <Form.Group className="mb-0" as={Row} controlId="formHorizontalEmail">
                        <Form.Label column>Tags</Form.Label>
                        <Col sm={10} lg={6}>
                          <FormLabel className="text-normal" column></FormLabel>
                        </Col>
                      </Form.Group>
                    </Col>
                    <Col sm={12} lg={6}>
                      <Form.Group className="mb-0" as={Row} controlId="formHorizontalEmail">
                        <Form.Label column>Mã khách hàng</Form.Label>
                        <Col sm={10} lg={6}>
                          <FormLabel className="text-normal" column>
                            : {data.user_code ? data.user_code : '---'}
                          </FormLabel>
                        </Col>
                      </Form.Group>
                      <Form.Group className="mb-0" as={Row} controlId="formHorizontalEmail">
                        <Form.Label column>Mã số thuế</Form.Label>
                        <Col sm={10} lg={6}>
                          <FormLabel className="text-normal" column>
                            : {data.user_sex ? data.user_sex : '---'}
                          </FormLabel>
                        </Col>
                      </Form.Group>
                      <Form.Group className="mb-0" as={Row} controlId="formHorizontalEmail">
                        <Form.Label column>Website</Form.Label>
                        <Col sm={10} lg={6}>
                          <FormLabel className="text-normal" column>
                            : {data.user_sexx ? data.user_sex : '---'}
                          </FormLabel>
                        </Col>
                      </Form.Group>
                      <Form.Group className="mb-0" as={Row} controlId="formHorizontalEmail">
                        <Form.Label column>Mô tả</Form.Label>
                        <Col sm={10} lg={6}>
                          <FormLabel className="text-normal" column>
                            : {data.user_sex ? data.user_sex : '---'}
                          </FormLabel>
                        </Col>
                      </Form.Group>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={12} lg={12}>
              <Card>
                <Card.Header>
                  <Card.Title as="h5">Thông tin mua hàng</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col sm={12} lg={6}>
                      <Form.Group className="mb-0" as={Row} controlId="formHorizontalEmail">
                        <Form.Label column>Tổng chi tiêu</Form.Label>
                        <Col sm={10} lg={6}>
                          <FormLabel className="text-normal" column>
                            : {data.user_name ? data.user_name : '---'}
                          </FormLabel>
                        </Col>
                      </Form.Group>
                      <Form.Group className="mb-0" as={Row} controlId="formHorizontalEmail">
                        <Form.Label column>Tổng số lượng đơn hàng</Form.Label>
                        <Col sm={10} lg={6}>
                          <FormLabel className="text-normal" column>
                            : {data.user_sex ? data.user_sex : '---'}
                          </FormLabel>
                        </Col>
                      </Form.Group>
                      <Form.Group className="mb-0" as={Row} controlId="formHorizontalEmail">
                        <Form.Label column>Ngày cuối cùng mua hàng</Form.Label>
                        <Col sm={10} lg={6}>
                          <FormLabel className="text-normal" column>
                            : {data.user_phone ? data.user_phone : '---'}
                          </FormLabel>
                        </Col>
                      </Form.Group>
                    </Col>
                    <Col sm={12} lg={6}>
                      <Form.Group className="mb-0" as={Row} controlId="formHorizontalEmail">
                        <Form.Label column>Tổng SL sản phẩm đã mua</Form.Label>
                        <Col sm={10} lg={6}>
                          <FormLabel className="text-normal" column>
                            : {data.user_group ? data.user_group : '---'}
                          </FormLabel>
                        </Col>
                      </Form.Group>
                      <Form.Group className="mb-0" as={Row} controlId="formHorizontalEmail">
                        <Form.Label column>Tổng SL sản phẩm hoàn trả</Form.Label>
                        <Col sm={10} lg={6}>
                          <FormLabel className="text-normal" column>
                            : {data.user_code ? data.user_code : '---'}
                          </FormLabel>
                        </Col>
                      </Form.Group>
                      <Form.Group className="mb-0" as={Row} controlId="formHorizontalEmail">
                        <Form.Label column>Công nợ hiện tại</Form.Label>
                        <Col sm={10} lg={6}>
                          <FormLabel className="text-normal" column>
                            : {data.user_sex ? data.user_sex : '---'}
                          </FormLabel>
                        </Col>
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
                  <Card.Title as="h5">Thông tin gợi ý khi bán hàng</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Form>
                    <Form.Group className="mb-0" as={Row} controlId="formHorizontalEmail">
                      <Form.Label column>Chính sách giá mặc định</Form.Label>
                      <Col sm={10} lg={6}>
                        <FormLabel className="text-normal" column>
                          : {data.user_cs ? data.user_cs : '---'}
                        </FormLabel>
                      </Col>
                    </Form.Group>
                    <Form.Group className="mb-0" as={Row} controlId="formHorizontalEmail">
                      <Form.Label column>Chính sách khách hàng</Form.Label>
                      <Col sm={10} lg={6}>
                        <FormLabel className="text-normal" column>
                          : {data.user_cs ? data.user_cs : '---'}
                        </FormLabel>
                      </Col>
                    </Form.Group>
                    <Form.Group className="mb-0" as={Row} controlId="formHorizontalEmail">
                      <Form.Label column>Hình thức thanh toán mặc định</Form.Label>
                      <Col sm={10} lg={6}>
                        <FormLabel className="text-normal" column>
                          : {data.user_cs ? data.user_cs : '---'}
                        </FormLabel>
                      </Col>
                    </Form.Group>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={12} lg={12}>
              <Card>
                <Card.Header>
                  <Card.Title as="h5">Thông tin tích điểm</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Form>
                    <Form.Group className="mb-0" as={Row} controlId="formHorizontalEmail">
                      <Form.Label column>Điểm hiện tại</Form.Label>
                      <Col sm={10} lg={6}>
                        <FormLabel className="text-normal" column>
                          : {data.user_cs ? data.user_cs : '0'}
                        </FormLabel>
                      </Col>
                    </Form.Group>
                    <Form.Group className="mb-0" as={Row} controlId="formHorizontalEmail">
                      <Form.Label column>Hạng thẻ hiện tại</Form.Label>
                      <Col sm={10} lg={6}>
                        <FormLabel className="text-normal" column>
                          : {data.user_cs ? data.user_cs : '---'}
                        </FormLabel>
                      </Col>
                    </Form.Group>
                    <Form.Group className="mb-0" as={Row} controlId="formHorizontalEmail">
                      <Form.Label column>Ngày hết hạn thẻ</Form.Label>
                      <Col sm={10} lg={6}>
                        <FormLabel className="text-normal" column>
                          : {data.user_cs ? data.user_cs : '---'}
                        </FormLabel>
                      </Col>
                    </Form.Group>
                    <Form.Group className="mb-0" as={Row} controlId="formHorizontalEmail">
                      <Form.Label column>Giá trị còn lại để lên hạng</Form.Label>
                      <Col sm={10} lg={6}>
                        <FormLabel className="text-normal" column>
                          : {data.user_cs ? data.user_cs : '0'}
                        </FormLabel>
                      </Col>
                    </Form.Group>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col sm={12} lg={12}>
          <Tabs variant="pills" defaultActiveKey="history" className="tabs-menu">
            <Tab eventKey="history" title="Lịch sử mua hàng">
              <p>
                Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse.
                Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth. Cosby
                sweater eu banh mi, qui irure terry richardson ex squid. Aliquip placeat salvia cillum iphone. Seitan aliquip quis cardigan
                american apparel, butcher voluptate nisi qui.
              </p>
            </Tab>
            <Tab eventKey="profile" title="Công nợ">
              <p>
                Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog
                sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. Qui photo booth letterpress,
                commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic, assumenda labore
                aesthetic magna delectus mollit. Keytar helvetica VHS salvia yr, vero magna velit sapiente labore stumptown. Vegan fanny
                pack odio cillum wes anderson 8-bit, sustainable jean shorts beard ut DIY ethical culpa terry richardson biodiesel. Art
                party scenester stumptown, tumblr butcher vero sint qui sapiente accusamus tattooed echo park.
              </p>
            </Tab>
            <Tab eventKey="contact" title="Liên hệ">
              <p>
                Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney's organic lomo retro fanny pack lo-fi
                farm-to-table readymade. Messenger bag gentrify pitchfork tattooed craft beer, iphone skateboard locavore carles etsy salvia
                banksy hoodie helvetica. DIY synth PBR banksy irony. Leggings gentrify squid 8-bit cred pitchfork. Williamsburg banh mi
                whatever gluten-free, carles pitchfork biodiesel fixie etsy retro mlkshk vice blog. Scenester cred you probably haven't
                heard of them, vinyl craft beer blog stumptown. Pitchfork sustainable tofu synth chambray yr.
              </p>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default UserDetails;
