import React, { useEffect, useState } from 'react';
import { Row, Col, Pagination, Button, Form } from 'react-bootstrap';
import BTable from 'react-bootstrap/Table';
import { useTable, usePagination, useGlobalFilter, useRowSelect } from 'react-table';
import { useHistory, useParams } from 'react-router-dom';
import { GlobalFilter } from '../../../../users/GlobalFilter';
import services from '../../../../../utils/axios';
import ModalComponent from '../../../../../components/Modal/Modal';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import ProvinceDistrictSelect from '../../../../../data/proviceSelect';

function Addresses() {
  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id'
      },
      {
        Header: 'Địa chỉ',
        accessor: 'customer_address'
      },
      {
        Header: 'Quận - Huyện',
        accessor: 'customer_commune'
      },
      {
        Header: 'Tỉnh - Thành phố',
        accessor: 'customer_region'
      }
    ],
    []
  );

  const [addressList, setAddressList] = useState([]);
  const [addressRow, setAddressRow] = useState({
    address: '',
    region: '',
    commune: ''
  });

  const data = addressList;

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    globalFilter,
    setGlobalFilter,

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, hiddenColumns: ['id'] }
    },
    useGlobalFilter,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: 'selection',
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div style={{ width: '25px', textAlign: 'center' }}>
              <input type="checkbox" {...getToggleAllRowsSelectedProps()} />
            </div>
          )
        },
        ...columns
      ]);
    }
  );

  const { id } = useParams();
  const [idAddress, setIdAddress] = useState();

  useEffect(() => {
    async function fetchAddress() {
      const response = await services.get(`/customer/get-by-id/${id}`);
      setAddressList(response.data.data.customer_addressList);
    }
    fetchAddress();
  }, [id]);

  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedCommune, setSelectedCommune] = useState(null);

  const handleProvinceChange = (value) => {
    setSelectedProvince(value);
  };
  const handleCommuneChange = (value) => {
    setSelectedCommune(value);
  };

  const [isLoading, setIsLoading] = useState(false);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);

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

  const handleSubmitAdd = async (values, actions) => {
    setIsLoading(true);
    const newAddress = {
      customer_address: values.address,
      customer_region: selectedProvince.label,
      customer_commune: selectedCommune
    };
    try {
      await services
        .post(`/customer/address/add/${id}`, newAddress)
        .then((response) => {
          setTimeout(() => {
            Swal.fire({
              text: 'Thêm địa chỉ mới thành công',
              showConfirmButton: true,
              showCancelButton: false,
              icon: 'success'
            }).then((confirm) => {
              if (confirm.isConfirmed) {
                setIsLoading(false);
                setAddressList([...addressList, newAddress]);
                actions.resetForm();
              }
            });
          }, 1000);
        })
        .catch((err) => {
          setIsLoading(false);
          Swal.fire('', 'Đã xảy ra lỗi khi thêm địa chỉ mới', 'error');
        });
    } catch (error) {
      setIsLoading(false);
      Swal.fire('Thất bại', 'Không thể kết nối tới máy chủ', 'error');
    }
  };

  const handleSubmitUpdate = (values) => {
    // ...
    setShowModalAdd(false);
  };

  const handleRowClick = (row) => {
    setIdAddress(row.values.id);
    setAddressRow({
      address: row.values.customer_address,
      region: row.values.customer_region,
      commune: row.values.customer_commune
    });
    handleUpdateAddress();
  };

  const validateSchema = Yup.object().shape({
    address: Yup.string().required('Địa chỉ không được để trống')
    // region: Yup.object().nullable().required('Vui lòng chọn tỉnh/thành phố'),
    // commune: Yup.object().nullable().required('Vui lòng chọn quận/huyện')
  });

  if (addressList.length === 0) {
    return <div className="text-center">Khách hàng chưa cập nhật địa chỉ</div>;
  } else
    return (
      <>
        <Formik onSubmit={handleSubmitAdd} initialValues={{ address: '' }} validationSchema={validateSchema}>
          {({ errors, handleBlur, handleChange, handleSubmit, touched, values, isValid }) => (
            <Form noValidate>
              <ModalComponent
                show={showModalAdd}
                handleClose={handleCloseModal}
                handleSubmit={handleSubmit}
                title="Thêm địa chỉ khách hàng"
                textSubmit={isLoading ? 'Đang thêm...' : 'Thêm'}
                size="lg"
                disabled={!isValid || isLoading}
                body={
                  <Form>
                    <Row>
                      <Col className="text-normal" lg={12}>
                        <Row>
                          <Col lg={12}>
                            <Form.Group controlId="formBasicEmail">
                              <Form.Label>
                                Địa chỉ cụ thể <span className="text-c-red">*</span>
                              </Form.Label>
                              <Form.Control
                                value={values.address}
                                type="text"
                                onError={touched.address && errors.address}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="address"
                                placeholder="Nhập số nhà, tên đường, ..."
                              />
                              {touched.address && errors.address && <small class="text-danger form-text">{errors.address}</small>}
                            </Form.Group>
                          </Col>
                          <Col sm={12} lg={12}>
                            <ProvinceDistrictSelect/>
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

        <Formik enableReinitialize={true} onSubmit={handleSubmitUpdate} initialValues={addressRow} validationSchema={validateSchema}>
          {({ errors, handleBlur, handleChange, handleSubmit, touched, values, isValid }) => (
            <Form noValidate>
              <ModalComponent
                show={showModalUpdate}
                handleClose={handleCloseModal}
                handleSubmit={handleSubmit}
                title="Cập nhật địa chỉ khách hàng"
                textSubmit={isLoading ? 'Đang lưu...' : 'Lưu'}
                size="lg"
                disabled={!isValid || isLoading}
                body={
                  <Form>
                    <Row>
                      <Col className="text-normal" lg={12}>
                        <Row>
                          <Col lg={12}>
                            <Form.Group controlId="formBasicEmail">
                              <Form.Label>
                                Địa chỉ cụ thể <span className="text-c-red">*</span>
                              </Form.Label>
                              <Form.Control
                                value={values.address}
                                type="text"
                                onError={touched.address && errors.address}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="address"
                                placeholder="Nhập số nhà, tên đường, ..."
                              />
                              {touched.address && errors.address && <small class="text-danger form-text">{errors.address}</small>}
                            </Form.Group>
                          </Col>
                          <Col sm={12} lg={12}>
                            <ProvinceDistrictSelect/>
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

        <Row style={{ margin: '0 -3px' }} className="mb-3">
          <Col className="d-flex align-items-center">
            Hiển thị
            <select
              className="form-control w-auto mx-2"
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
            kết quả
          </Col>
          <Col>
            <Row className="justify-content-end">
              <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
              <Button onClick={handleAddAddress} style={{ padding: '8px 15px', margin: '0px 15px 0px 15px' }} variant="primary">
                <i className="feather icon-plus-circle"></i>
                Thêm địa chỉ
              </Button>
            </Row>
          </Col>
        </Row>
        <BTable striped bordered hover responsive {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr className="row-has-detail" key={row.values.id} {...row.getRowProps()}>
                  <div style={{ display: 'contents' }}>
                    {row.cells.map((cell) => {
                      return cell.column.id === 'selection' ? (
                        <td style={{ width: '50px', textAlign: 'center' }} {...cell.getCellProps()}>
                          <input {...row.getToggleRowSelectedProps()} type="checkbox" {...cell.getCellProps()} />
                        </td>
                      ) : (
                        <td
                          onClick={() => {
                            handleRowClick(row);
                          }}
                          {...cell.getCellProps()}
                        >
                          {cell.render('Cell')}
                        </td>
                      );
                    })}
                  </div>
                </tr>
              );
            })}
          </tbody>
        </BTable>
        <Row style={{ margin: '0 -3px' }} className="justify-content-between mt-3">
          <Col sm={12} md={6}>
            <span className="d-flex align-items-center">
              Trang{' '}
              <strong className="ml-1">
                {' '}
                {pageIndex + 1} trên tổng {pageOptions.length}{' '}
              </strong>{' '}
              | Đến trang:{' '}
              <input
                type="number"
                className="form-control ml-2"
                defaultValue={pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  gotoPage(page);
                }}
                style={{ width: '100px' }}
              />
            </span>
          </Col>
          <Col sm={12} md={6}>
            <Pagination className="justify-content-end">
              <Pagination.First onClick={() => gotoPage(0)} disabled={!canPreviousPage} />
              <Pagination.Prev onClick={() => previousPage()} disabled={!canPreviousPage} />
              <Pagination.Next onClick={() => nextPage()} disabled={!canNextPage} />
              <Pagination.Last onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} />
            </Pagination>
          </Col>
        </Row>
      </>
    );
}

export default Addresses;
