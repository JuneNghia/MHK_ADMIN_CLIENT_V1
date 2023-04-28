import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Form, Button, FormLabel, Badge, FormGroup, FormControl } from 'react-bootstrap';
import services from '../../../utils/axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Link, useHistory, useParams } from 'react-router-dom';
import { ButtonLoading } from '../../../components/Button/LoadButton';
import { Helmet } from 'react-helmet';
import moment from 'moment';
import Positions from './RoleDelegation/Positions';
import { Formik } from 'formik';
import ModalComponent from '../../../components/Modal/Modal';
import * as Yup from 'yup';
import ProvinceDistrictSelect from '../../../data/provinceSelect';
import Select from 'react-select';
import Error from '../../errors/Error';
import { HashLoader } from 'react-spinners';
import Drag from '../../../components/Drag/Drag';

const UserDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [address, setAddress] = useState([]);
  const [allowShippingPrice, setAllowShippingPrice] = useState(false);
  const [allowSalePrice, setAllowSalePrice] = useState(false);
  const [dataGender, setDataGender] = useState(true);
  const [positions, setPositions] = useState([]);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [isloadPage, setIsLoadPage] = useState(true);
  const [isFetched, setIsFetched] = useState(false);
  const [showModalUpdateProfile, setShowModalUpdateProfile] = useState(false);
  const handleUpdateProfile = (e) => {
    e.preventDefault();
    setShowModalUpdateProfile(true);
  };
  const handleCloseModal = () => {
    setShowModalUpdateProfile(false);
  };

  const optionsGender = [
    { label: 'Nam', value: true },
    { label: 'Nữ', value: false }
  ];

  useEffect(() => {
    services
      .get(`/staff/get-by-id/${id}`)
      .then((response) => {
        const data = response.data.data;
        setData(data);
        setPositions(
          data.staffRoleList.map((position) => {
            return {
              role: { label: position.role, value: position.role_id },
              branches: position.agencyBranchesInCharge.map((branch) => ({
                label: branch.agency_branch_inCharge_name,
                value: branch.agency_branch_id
              }))
            };
          })
        );
        if (data.staff_gender === 'female') {
          setDataGender(false);
        }
        setAllowSalePrice(response.data.data.isAllowViewImportNWholesalePrice);
        setAllowShippingPrice(response.data.data.isAllowViewShippingPrice);
        setAddress(
          data.addressList.map((address) => {
            return `${address.user_specific_address}, ${address.user_district}, ${address.user_province}`;
          })
        );
        setIsLoadPage(false);
        setIsFetched(true);
      })
      .catch((error) => {
        setIsLoadPage(false);
      });
  }, [id]);

  const successUpdatePositions = () => {
    setTimeout(() => {
      setIsLoading(false);
      Swal.fire({
        text: 'Cập nhật vai trò nhân viên thành công',
        showConfirmButton: true,
        showCancelButton: false,
        icon: 'success'
      }).then((confirm) => {
        if (confirm.isConfirmed) {
          window.location.reload();
        }
      });
    }, 1000);
  };

  const failedUpdatePositions = () => {
    setTimeout(() => {
      setIsLoading(false);
      Swal.fire({
        text: 'Cập nhật vai trò nhân viên thất bại',
        showConfirmButton: true,
        showCancelButton: false,
        icon: 'warning'
      });
    }, 1000);
  };

  const handleSaveSubmit = () => {
    setIsLoading(true);
    const position = positions.map((role) => ({
      role_id: role.role.value,
      agencyBranches_inCharge_id_list: role.branches.map((branch) => branch.value)
    }));
    const newPosition = {
      roles: position
    };
    if (position[0].agencyBranches_inCharge_id_list.length === 0) {
      setIsLoading(false);
      Swal.fire('', 'Vui lòng chọn chi nhánh cho nhân viên trước khi lưu', 'warning');
    } else {
      services
        .patch(`/staff/update-role-by-id/${id}`, newPosition)
        .then((res) => {
          successUpdatePositions();
        })
        .catch((err) => {
          failedUpdatePositions();
        });
    }
  };

  const handleModalUpdateSubmit = (values) => {
    setIsLoading(true);
    const keyMapping = {
      staff_name: 'user_name',
      staff_phone: 'user_phone',
      staff_email: 'user_email',
      dob: 'staff_birthday',
      gender: 'staff_gender'
    };

    const address_list = [
      {
        user_province: values.province,
        user_district: values.district,
        user_specific_address: values.address
      }
    ];

    const updatedProfile = {};
    for (const key in values) {
      if (values.hasOwnProperty(key) && values[key] !== data[key]) {
        updatedProfile[key] = values[key];
      }
    }

    const updatedProfileWithApiKeys = {};
    for (const key in updatedProfile) {
      if (updatedProfile.hasOwnProperty(key)) {
        const newKey = keyMapping[key] || key;
        updatedProfileWithApiKeys[newKey] = updatedProfile[key];
      }
    }
    delete updatedProfileWithApiKeys.address;
    delete updatedProfileWithApiKeys.province;
    delete updatedProfileWithApiKeys.district;


    try {
      services
        .patch(`/staff/update-personal-by-id/${id}`, { ...updatedProfileWithApiKeys, staff_address_list: address_list })
        .then((res) => {
          setTimeout(() => {
            setIsLoading(false);
            Swal.fire({
              text: 'Cập nhật thông tin nhân viên thành công',
              showConfirmButton: true,
              showCancelButton: false,
              icon: 'success'
            }).then((confirm) => {
              if (confirm.isConfirmed) {
                window.location.reload();
              }
            });
          }, 1000);
        })
        .catch((errors) => {
          const errorResponses = errors.response.data;
          const errorMessages = errorResponses.map((error) => {
            if (error.includes('name')) {
              return `Tên NV: <b>${values.staff_email}</b> đã tồn tại`;
            } else if (error.includes('phone')) {
              return `Số điện thoại NV: <b>${values.staff_phone}</b> đã tồn tại`;
            } else if (error.includes('email')) {
              return `Email NV: <b>${values.staff_email}</b> đã tồn tại`;
            } else return `Mã NV: <b>${values.staff_code}</b> đã tồn tại`;
          });
          setTimeout(() => {
            setIsLoading(false);
            Swal.fire({
              title: 'Thất bại',
              text: 'Lỗi',
              html: errorMessages.join('<br>'),
              icon: 'warning',
              confirmButtonText: 'Xác nhận'
            });
          }, 1000);
        });
    } catch (error) {
      setTimeout(() => {
        setIsLoading(false);
        Swal.fire('', 'Đã xảy ra lỗi khi kết nối tới máy chủ', 'error');
      }, 1000);
    }
  };

  const handleDelete = () => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: 'Xoá nhân viên',
      html: `Bạn có chắc chắn muốn xoá nhân viên <b>${data.staff_name}</b> ? Thao tác này không thể khôi phục`,
      type: 'warning',
      icon: 'warning',
      confirmButtonText: 'Xoá',
      confirmButtonColor: 'red',
      cancelButtonText: 'Thoát',
      showCancelButton: true
    }).then((willDelete) => {
      if (willDelete.isConfirmed) {
        services
          .delete(`/staff/delete-by-id/${id}`)
          .then((response) => {
            history.push('/app/configurations/users');
            Swal.fire('', 'Xoá nhân viên thành công', 'success');
          })
          .catch((error) => {
            Swal.fire('', 'Xoá nhân viên thất bại', 'error');
          });
      } else {
        return;
      }
    });
  };

  const phoneRegExp = /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0|3|4|5|7|8])+([0-9]{7})$/;
  const validateSchema = Yup.object().shape({
    staff_name: Yup.string().required('Tên nhân viên không được để trống'),
    staff_email: Yup.string().email('Email không hợp lệ').nullable(),
    staff_phone: Yup.string().matches(phoneRegExp, 'Số điện thoại không hợp lệ').required('Số điện thoại không được để trống'),
    address: Yup.string().required('Địa chỉ không được để trống'),
    province: Yup.string().required('Vui lòng chọn Tỉnh/Thành phố và Quận/Huyện')
  });

  if (isloadPage)
    return (
      <>
        <Helmet>
          <title>Chi tiết nhân viên</title>
        </Helmet>
        <HashLoader style={{ display: 'block', height: '70vh', margin: 'auto' }} size={50} color="#36d7b7" />;
      </>
    );

  if (!isFetched) {
    return <Error />;
  } else
    return (
      <React.Fragment>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            onClick={() => history.push('/app/configurations/users')}
            variant="outline-primary"
            className="mr-0"
            style={{ marginBottom: 15 }}
          >
            <i className="feather icon-arrow-left"></i>
            Quay lại danh sách nhân viên
          </Button>

          <span>
            <ButtonLoading
              onSubmit={handleSaveSubmit}
              style={{ margin: '0 8px 15px 0' }}
              text={
                <span style={{ fontWeight: 600 }}>
                  <i className="feather icon-save mr-2"></i>
                  Lưu
                </span>
              }
              loading={isLoading}
              type="submit"
              disabled={isLoading}
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
                  <Card.Header className="flex-between">
                    <Card.Title as="h5">
                      <span style={{ display: 'inline-block', fontWeight: 600, fontSize: 22 }}>{data.staff_name}</span>
                      <span>
                        {data.staff_status === 'Đã nghỉ việc' ? (
                          <Badge style={{ fontSize: 15, marginLeft: 15, padding: 11 }} key="process" pill variant="danger">
                            Đã nghỉ việc
                          </Badge>
                        ) : (
                          <Badge style={{ fontSize: 15, marginLeft: 15, padding: 11 }} key="stop" pill variant="success">
                            Đang làm việc
                          </Badge>
                        )}
                      </span>
                    </Card.Title>
                    <small>
                      <Link to="#" onClick={(e) => handleUpdateProfile(e)}>
                        Cập nhật thông tin nhân viên
                      </Link>
                    </small>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      <Col sm={12} lg={12}>
                        <Row>
                          <Col sm={12} lg={6}>
                            <Form.Group className="mb-0" as={Row} controlId="formHorizontalEmail">
                              <Form.Label column>Số điện thoại</Form.Label>
                              <Col sm={12} lg={6}>
                                <FormLabel className="text-normal" column>
                                  : {data.staff_phone ? data.staff_phone : '---'}
                                </FormLabel>
                              </Col>
                            </Form.Group>
                            <Form.Group className="mb-0" as={Row} controlId="formHorizontalEmail">
                              <Form.Label column>Email</Form.Label>
                              <Col sm={10} lg={6}>
                                <FormLabel className="text-normal" column>
                                  : {data.staff_email ? data.staff_email : '---'}
                                </FormLabel>
                              </Col>
                            </Form.Group>
                            <Form.Group className="mb-0" as={Row} controlId="formHorizontalEmail">
                              <Form.Label column>Ngày sinh</Form.Label>
                              <Col sm={10} lg={6}>
                                <FormLabel className="text-normal" column>
                                  : {data.staff_birthday ? moment(data.staff_birthday).utcOffset(7).format('DD/MM/YYYY') : '---'}
                                </FormLabel>
                              </Col>
                            </Form.Group>
                            <Form.Group className="mb-0" as={Row} controlId="formHorizontalEmail">
                              <Form.Label column>Giới tính</Form.Label>
                              <Col sm={10} lg={6}>
                                <FormLabel className="text-normal" column>
                                  : {data.staff_gender === 'male' ? 'Nam' : 'Nữ'}
                                </FormLabel>
                              </Col>
                            </Form.Group>
                          </Col>
                          <Col lg={12}>
                            <Form.Group className="mb-0" as={Row} controlId="formHorizontalEmail">
                              <Form.Label column>Địa chỉ</Form.Label>
                              <Col sm={12} lg={9}>
                                <FormLabel className="text-normal" column>
                                  : {address === null ? '---' : address}
                                </FormLabel>
                              </Col>
                            </Form.Group>
                            <FormGroup>
                              <FormLabel className="mt-2">Ghi chú</FormLabel>
                              <FormControl defaultValue={data.note_about_staff ? data.note_about_staff : ''} type="text"></FormControl>
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
                    <Link to="#">Danh sách vai trò cửa hàng</Link>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      <Col sm={12} lg={12}>
                        <Positions positions={positions} setPositions={setPositions} />
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

        <Formik
          enableReinitialize={true}
          onSubmit={handleModalUpdateSubmit}
          initialValues={{
            ...data,
            gender: dataGender,
            dob: moment(data.staff_birthday).utcOffset(7).format('YYYY-MM-DD'),
            address: data.addressList.map((address) => address.user_specific_address).join(''),
            province: data.addressList.map((address) => address.user_province).join(''),
            district: data.addressList.map((address) => address.user_district).join('')
          }}
          validationSchema={validateSchema}
        >
          {({ errors, dirty, setFieldValue, handleChange, handleSubmit, touched, values }) => (
            <Form noValidate>
              <ModalComponent
                show={showModalUpdateProfile}
                handleClose={handleCloseModal}
                handleSubmit={handleSubmit}
                title="Cập nhật thông tin nhân viên"
                textSubmit={isLoading ? 'Đang lưu...' : 'Lưu'}
                size="lg"
                disabled={!dirty || isLoading}
                body={
                  <Form>
                    <Row>
                      <Col className="text-normal" lg={12}>
                        <Row>
                          <Col lg={6}>
                            <Form.Group controlId="formBasicEmail">
                              <Form.Label>
                                Tên nhân viên <span className="text-c-red">*</span>
                              </Form.Label>
                              <Form.Control
                                value={values.staff_name}
                                onChange={handleChange}
                                name="staff_name"
                                placeholder="Nhập tên nhân viên"
                                disabled
                              />
                              {touched.staff_name && errors.staff_name && <small class="text-danger form-text">{errors.staff_name}</small>}
                            </Form.Group>
                          </Col>
                          <Col lg={6}>
                            <Form.Group controlId="formBasicEmail">
                              <Form.Label>Giới tính</Form.Label>
                              <Select
                                options={optionsGender}
                                defaultValue={optionsGender.find((option) => option.value === dataGender)}
                                onChange={(g) => setFieldValue('gender', g.value)}
                              />
                            </Form.Group>
                          </Col>
                          <Col lg={4}>
                            <Form.Group controlId="formBasicEmail">
                              <Form.Label>
                                Số điện thoại <span className="text-c-red">*</span>
                              </Form.Label>
                              <Form.Control
                                value={values.staff_phone}
                                onChange={handleChange}
                                name="staff_phone"
                                placeholder="Nhập số điện thoại"
                              />
                              {touched.staff_phone && errors.staff_phone && (
                                <small class="text-danger form-text">{errors.staff_phone}</small>
                              )}
                            </Form.Group>
                          </Col>
                          <Col lg={4}>
                            <Form.Group controlId="formBasicEmail">
                              <Form.Label>Email</Form.Label>
                              <Form.Control
                                value={values.staff_email}
                                onChange={handleChange}
                                name="staff_email"
                                placeholder="Nhập địa chỉ email"
                              />
                              {touched.staff_email && errors.staff_email && (
                                <small class="text-danger form-text">{errors.staff_email}</small>
                              )}
                            </Form.Group>
                          </Col>
                          <Col lg={4}>
                            <Form.Group controlId="formBasicEmail">
                              <Form.Label>Ngày sinh</Form.Label>
                              <Form.Control
                                type="date"
                                value={values.dob}
                                onChange={(e) => setFieldValue('dob', e.target.value)}
                                name="staff_birthday"
                              />
                            </Form.Group>
                          </Col>
                          <Col lg={12}>
                            <Form.Group controlId="formBasicEmail">
                              <Form.Label>
                                Địa chỉ <span className="text-c-red">*</span>
                              </Form.Label>
                              <Form.Control
                                value={values.address}
                                onChange={handleChange}
                                name="address"
                                placeholder="Nhập địa chỉ cụ thể"
                              />
                              {touched.address && errors.address && <small class="text-danger form-text">{errors.address}</small>}
                            </Form.Group>
                          </Col>
                          <Col lg={12}>
                            <Form.Group>
                              <ProvinceDistrictSelect
                                initialValues={{ province: values.province, district: values.district }}
                                onChange={(p, d) => {
                                  setFieldValue('province', p);
                                  setFieldValue('district', d);
                                }}
                              />
                              {touched.province && errors.province && <small class="text-danger form-text">{errors.province}</small>}
                            </Form.Group>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Form>
                }
              />
            </Form>
          )}
        </Formik>
      </React.Fragment>
    );
};

export default UserDetail;
