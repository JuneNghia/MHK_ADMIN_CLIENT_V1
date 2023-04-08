import React, { useEffect, useMemo, useState } from 'react';
import { Row, Col, Card, Pagination, Button, Form } from 'react-bootstrap';
import BTable from 'react-bootstrap/Table';
import { useTable, usePagination, useGlobalFilter, useRowSelect } from 'react-table';
import { GlobalFilter } from '../../users/GlobalFilter';
import services from '../../../utils/axios';
import { Helmet } from 'react-helmet';
import moment from 'moment';
import Select from 'react-select';
import Swal from 'sweetalert2';
import { Formik } from 'formik';
import ModalComponent from '../../../components/Modal/Modal';
import MyPagination from '../../../components/Pagination/PaginationComponent';
import CustomTable from '../../../components/Table/CustomTable';
import Error from '../../maintenance/Error';

function ListBranches() {
  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id'
      },
      {
        Header: 'Tên chi nhánh',
        accessor: 'agency_branch_name'
      },
      {
        Header: 'Mã chi nhánh',
        accessor: 'agency_branch_CN_code'
      },
      {
        Header: 'Địa chỉ',
        accessor: 'agency_branch_address'
      },
      {
        Header: 'Số điện thoại',
        accessor: 'agency_branch_phone'
      },
      {
        Header: 'Ngày hết hạn',
        accessor: 'agency_branch_expiration_date',
        Cell: ({value}) => (
          <span>{value ? value : moment().add(3, 'years').utcOffset(7).format('DD/MM/YYYY')}</span>
        )
      },
      {
        Header: 'Trạng thái',
        accessor: 'agency_branch_status',
        Cell: ({ value }) => (
          <span style={{ color: value === 'inactive' ? 'red' : 'rgb(13, 180, 115)' }}>
            {value === 'inactive' ? 'Không hoạt động' : 'Đang hoạt động'}
          </span>
        )
      },
      {
        Header: 'CN mặc định',
        accessor: 'isDefaultCN',
        Cell: ({ value }) => <span>{value ? <i style={{ fontWeight: 600, fontSize: 22 }} className="feather icon-check"></i> : ''}</span>
      }
    ],
    []
  );

  const [isLoading, setIsLoading] = useState(false);
  const [isloadPage, setIsLoadPage] = useState(true);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [idBranch, setIdBranch] = useState(0);

  const keyMapping = {
    branch_name: 'agency_branch_name',
    branch_code: 'agency_branch_CN_code',
    branch_phone: 'agency_branch_phone',
    branch_address: 'agency_branch_address',
    isDefaultBranch: 'isDefaultCN'
  };

  const [branchData, setBranchData] = useState({
    branch_code: '',
    branch_name: '',
    branch_phone: '',
    branch_address: '',
    isDefaultBranch: false
  });

  const [branchesList, setBranchesList] = useState([]);

  useEffect(() => {
    (async () => {
      await services
        .get('/agency-branch/get-all')
        .then((response) => {
          setIsLoadPage(false);
          setBranchesList(response.data.data);
        })
        .catch((error) => {
          setIsLoadPage(false);
          console.log(error);
        });
    })();
  }, [isloadPage]);

  const handleAddAddress = () => {
    setShowModalAdd(true);
  };
  const handleUpdateAddress = () => {
    setShowModalUpdate(true);
  };

  const handleCloseModal = () => {
    setShowModalUpdate(false);
    setShowModalAdd(false);
  };

  const handleSubmitAdd = async (values) => {
    setIsLoading(true);
    const newBranch = {
      agency_branch_CN_code: values.branch_code,
      agency_branch_name: values.branch_name,
      agency_branch_phone: values.branch_phone,
      agency_branch_address: values.branch_address,
      isDefaultCN: values.isDefaultBranch
    };
    try {
      await services
        .post('/agency-branch/create', newBranch)
        .then((response) => {
          setTimeout(() => {
            Swal.fire({
              text: 'Thêm chi nhánh mới thành công',
              showConfirmButton: true,
              showCancelButton: false,
              icon: 'success'
            }).then((confirm) => {
              if (confirm.isConfirmed) {
                setIsLoading(false);
                window.location.reload();
              }
            });
          }, 1000);
        })
        .catch((err) => {
          setTimeout(() => {
            setIsLoading(false);
            Swal.fire('', 'Mã chi nhánh đã tồn tại', 'error');
          }, 1000);
        });
    } catch (error) {
      setIsLoading(false);
      Swal.fire('Thất bại', 'Không thể kết nối tới máy chủ', 'error');
    }
  };

  const handleSubmitUpdate = (values) => {
    setIsLoading(true);

    const updatedFields = {};
    for (const key in values) {
      if (values.hasOwnProperty(key) && values[key] !== branchData[key]) {
        updatedFields[key] = values[key];
      }
    }
    const updatedFieldsWithApiKeys = {};
    for (const key in updatedFields) {
      if (updatedFields.hasOwnProperty(key)) {
        const newKey = keyMapping[key] || key;
        updatedFieldsWithApiKeys[newKey] = updatedFields[key];
      }
    }
    services
      .patch(`/agency-branch/update-by-id/${idBranch}`, updatedFieldsWithApiKeys)
      .then((response) => {
        setTimeout(() => {
          setIsLoading(false);
          Swal.fire({
            text: 'Cập nhật thông tin chi nhánh thành công',
            icon: 'success',
            showConfirmButton: true
          }).then((res) => {
            if (res.isConfirmed) {
              window.location.reload();
            }
          });
        }, 1000);
      })
      .catch((error) => {
        setTimeout(() => {
          setIsLoading(false);
          Swal.fire('', 'Mã chi nhánh đã tồn tại', 'error');
        }, 1000);
      });
  };

  const handleRowClick = (row) => {
    setIdBranch(row.values.id);
    setBranchData({
      branch_name: row.values.agency_branch_name,
      branch_phone: row.values.agency_branch_phone,
      branch_address: row.values.agency_branch_address,
      branch_code: row.values.agency_branch_CN_code,
      isDefaultBranch: row.values.isDefaultCN
    });
    handleUpdateAddress();
  };

  if (isloadPage) return <div className="text-center h5">Đang tải...</div>;

  if (branchesList.length === 0) return <Error />;

  return (
    <>
      <Helmet>
        <title>Danh sách chi nhánh</title>
      </Helmet>

      <Formik initialValues={branchData} onSubmit={handleSubmitAdd}>
        {({ errors, setFieldValue, dirty, handleChange, handleBlur, handleSubmit, touched, values, isValid }) => (
          <Form noValidate>
            <ModalComponent
              show={showModalAdd}
              handleClose={handleCloseModal}
              handleSubmit={handleSubmit}
              title="Thêm chi nhánh"
              textSubmit={isLoading ? 'Đang thêm...' : 'Thêm'}
              size="lg"
              disabled={!dirty || !isValid || isLoading}
              body={
                <Form>
                  <Row>
                    <Col className="text-normal" lg={12}>
                      <Row>
                        <Col lg={6}>
                          <Form.Group controlId="formBasicEmail">
                            <Form.Label>
                              Tên <span className="text-c-red">*</span>
                            </Form.Label>
                            <Form.Control
                              value={values.branch_name}
                              onChange={handleChange}
                              type="text"
                              name="branch_name"
                              placeholder="Nhập tên chi nhánh"
                            />
                          </Form.Group>
                        </Col>
                        <Col lg={6}>
                          <Form.Group controlId="formBasicEmail">
                            <Form.Label>
                              Số điện thoại <span className="text-c-red">*</span>
                            </Form.Label>
                            <Form.Control
                              type="text"
                              value={values.branch_phone}
                              onChange={handleChange}
                              name="branch_phone"
                              placeholder="Nhập số điện thoại"
                            />
                          </Form.Group>
                        </Col>
                        <Col lg={12}>
                          <Form.Group controlId="formBasicEmail">
                            <Form.Label>
                              Địa chỉ <span className="text-c-red">*</span>
                            </Form.Label>
                            <Form.Control
                              type="text"
                              value={values.branch_address}
                              onChange={handleChange}
                              name="branch_address"
                              placeholder="Nhập số nhà, tên đường, ..."
                            />
                          </Form.Group>
                        </Col>

                        <Col lg={6}>
                          <Form.Group controlId="formBasicEmail">
                            <Form.Label>Mã chi nhánh</Form.Label>
                            <Form.Control
                              type="text"
                              value={values.branch_code}
                              onChange={handleChange}
                              name="branch_code"
                              placeholder="Nhập mã chi nhánh"
                            />
                          </Form.Group>
                        </Col>
                        <Col lg={6}>
                          <Form.Group controlId="formBasicEmail">
                            <Form.Label>Mã bưu điện</Form.Label>
                            <Form.Control type="text" name="recipient" placeholder="Nhập mã bưu điện" />
                          </Form.Group>
                        </Col>
                        <Col lg={12}>
                          <Form.Group controlId="formBasicEmail">
                            <Form.Check
                              name="isDefaultBranch"
                              type="checkbox"
                              checked={values.isDefaultBranch}
                              onChange={() => setFieldValue('isDefaultBranch', !values.isDefaultBranch)}
                              label="Chi nhánh mặc định"
                            />
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

      <Formik enableReinitialize={true} initialValues={branchData} onSubmit={handleSubmitUpdate}>
        {({ errors, setFieldValue, dirty, handleChange, handleBlur, handleSubmit, touched, values, isValid }) => (
          <Form noValidate>
            <ModalComponent
              show={showModalUpdate}
              handleClose={handleCloseModal}
              handleSubmit={handleSubmit}
              title="Cập nhật thông tin chi nhánh"
              textSubmit={isLoading ? 'Đang lưu...' : 'Lưu'}
              size="lg"
              disabled={!dirty || !isValid || isLoading}
              body={
                <Form>
                  <Row>
                    <Col className="text-normal" lg={12}>
                      <Row>
                        <Col lg={6}>
                          <Form.Group controlId="formBasicEmail">
                            <Form.Label>
                              Tên <span className="text-c-red">*</span>
                            </Form.Label>
                            <Form.Control
                              value={values.branch_name}
                              onChange={handleChange}
                              type="text"
                              name="branch_name"
                              placeholder="Nhập tên chi nhánh"
                            />
                          </Form.Group>
                        </Col>
                        <Col lg={6}>
                          <Form.Group controlId="formBasicEmail">
                            <Form.Label>
                              Số điện thoại <span className="text-c-red">*</span>
                            </Form.Label>
                            <Form.Control
                              type="text"
                              value={values.branch_phone}
                              onChange={handleChange}
                              name="branch_phone"
                              placeholder="Nhập số điện thoại"
                            />
                          </Form.Group>
                        </Col>
                        <Col lg={12}>
                          <Form.Group controlId="formBasicEmail">
                            <Form.Label>
                              Địa chỉ <span className="text-c-red">*</span>
                            </Form.Label>
                            <Form.Control
                              type="text"
                              value={values.branch_address}
                              onChange={handleChange}
                              name="branch_address"
                              placeholder="Nhập số nhà, tên đường, ..."
                            />
                          </Form.Group>
                        </Col>

                        <Col lg={6}>
                          <Form.Group controlId="formBasicEmail">
                            <Form.Label>Mã chi nhánh</Form.Label>
                            <Form.Control
                              type="text"
                              value={values.branch_code}
                              onChange={handleChange}
                              name="branch_code"
                              placeholder="Nhập mã chi nhánh"
                            />
                          </Form.Group>
                        </Col>
                        <Col lg={6}>
                          <Form.Group controlId="formBasicEmail">
                            <Form.Label>Mã bưu điện</Form.Label>
                            <Form.Control type="text" name="recipient" placeholder="Nhập mã bưu điện" />
                          </Form.Group>
                        </Col>
                        <Col lg={12}>
                          <Form.Group controlId="formBasicEmail">
                            <Form.Check
                              name="isDefaultBranch"
                              type="checkbox"
                              checked={values.isDefaultBranch}
                              onChange={() => setFieldValue('isDefaultBranch', !values.isDefaultBranch)}
                              label="Chi nhánh mặc định"
                            />
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

      {/* Hiển thị Bảng danh sách các nhánh */}
      <Row>
        <Col>
          <Card>
            <Card.Header className="flex-between">
              <Card.Title as="h5">Danh sách chi nhánh</Card.Title>
              <Button style={{ marginRight: 0 }} onClick={handleAddAddress}>
                <i className="feather icon-plus-circle mr-2"></i>
                Thêm chi nhánh
              </Button>{' '}
            </Card.Header>
            <Card.Body>
              <CustomTable columns={columns} data={branchesList} handleRowClick={handleRowClick} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default ListBranches;
