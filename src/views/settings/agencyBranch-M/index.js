import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Pagination, Button, Modal, Form, FormControl } from 'react-bootstrap';
import BTable from 'react-bootstrap/Table';
import { useTable, usePagination, useGlobalFilter, useRowSelect } from 'react-table';
import { useHistory } from 'react-router-dom';
import { GlobalFilter } from '../../users/GlobalFilter';
import services from '../../../utils/axios';
import { Helmet } from 'react-helmet';
import moment from 'moment';
import Select from 'react-select';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { ButtonLoading } from '../../../components/Button/LoadButton';

function Table({ columns, data }) {
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
    selectedFlatRows,
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
      initialState: { pageIndex: 0, hiddenColumns: ['agency_branch_phone'] }
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

  const [selectedRows, setSelectedRows] = useState([]); //Mảng lưu các dòng được chọn

  useEffect(() => {
    //selectedFlatRows biến của React-Table lưu dòng đang được chọn
    const selectedRows = selectedFlatRows.map((d) => d.original);
    setSelectedRows(selectedRows);
  }, [selectedFlatRows]);

  const [isShow, setIsShow] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [isDefault, setIsDefault] = useState(false);

  const [dataRow, setDataRow] = useState({
    name: '',
    id: '',
    address: '',
    area: '',
    isDefault: isDefault
  });

  const handleRowClick = (row) => {
    setSelectedRows(row);
    setIsShow(true);
  };

  console.log(selectedRows);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setSelectedRows((prev) => ({
      ...prev,
      [name]: newValue
    }));
  };

  const [dataNewBranch, setDataNewBranch] = useState({
    name: '',
    phone: '',
    cn_code: '',
    address: '',
    isDefault: false
  });

  const sweetSuccessAlert = () => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: 'Thêm chi nhánh thành công',
      icon: 'success',
      confirmButtonText: 'Xác nhận'
    }).then((reuslt) => {
      if (reuslt.isConfirmed) {
        window.location.reload();
      }
    });
  };

  const sweetErrorAlert = () => {
    const MySwal = withReactContent(Swal);
    MySwal.fire('Thất bại', 'Mã chi nhánh đã tồn tại', 'error');
  };

  // const handleSave = (e) => {
  //   e.preventDefault();
  //   const branchData = {
  //     agency_branch_name: dataNewBranch.name,
  //     agency_branch_phone: dataNewBranch.phone,
  //     agency_branch_CN_code: dataNewBranch.cn_code,
  //     agency_branch_address: dataNewBranch.cn_address,
  //     agency_branch_area: dataNewBranch.area,
  //     isDefaultCN: isDefault
  //   };
  //   services
  //     .patch(`/update-agency-branch-by-id/${id}`, branchData)
  //     .then((response) => {
  //       setDataNewBranch(
  //         {
  //           name: '',
  //           phone: '',
  //           cn_code: '',
  //           address: '',
  //           area: ''
  //         }
  //       );
  //       setShowLoader(true);
  //       setTimeout(() => {
  //         setShowLoader(false);
  //         setIsShow(false);
  //         sweetSuccessAlert();
  //       }, 3000);
  //     })
  //     .catch((err) => {
  //       setShowLoader(true);
  //       setTimeout(() => {
  //         setShowLoader(false);
  //         sweetErrorAlert();
  //       }, 3000);
  //     });
  // };

  return (
    <>
      <Helmet>
        <title>Danh sách chi nhánh</title>
      </Helmet>
      <Row className="mb-3">
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
          <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
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
                      <td onClick={(row) => handleRowClick(row)} {...cell.getCellProps()}>
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
      <Modal size="lg" show={isShow} onHide={() => setIsShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title as="h5">Cập nhật chi nhánh</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col className="text-normal" lg={12}>
                <Row>
                  <Col lg={6}>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>
                        Tên <span className="text-c-red">*</span>
                      </Form.Label>
                      <Form.Control onChange={handleInputChange} type="text" name="name" placeholder="Nhập tên chi nhánh" />
                    </Form.Group>
                  </Col>
                  <Col lg={6}>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>
                        Số điện thoại <span className="text-c-red">*</span>
                      </Form.Label>
                      <Form.Control onChange={handleInputChange} type="text" name="phone" placeholder="Nhập số điện thoại" />
                    </Form.Group>
                  </Col>
                  <Col lg={12}>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>
                        Địa chỉ <span className="text-c-red">*</span>
                      </Form.Label>
                      <Form.Control onChange={handleInputChange} type="text" name="recipient" placeholder="Nhập số nhà, tên đường, ..." />
                    </Form.Group>
                  </Col>

                  <Col lg={6}>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Mã chi nhánh</Form.Label>
                      <Form.Control onChange={handleInputChange} type="text" name="recipient" placeholder="Nhập tên chi nhánh" />
                    </Form.Group>
                  </Col>
                  <Col lg={6}>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Mã bưu điện</Form.Label>
                      <Form.Control type="text" name="recipient" placeholder="Nhập số điện thoại" />
                    </Form.Group>
                  </Col>

                  <Col lg={12}>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Check type="checkbox" onChange={handleInputChange} name="isDefault" label="Chi nhánh mặc định" />
                    </Form.Group>
                    <p>
                      <span className="text-c-red">Lưu ý:</span> Sau khi chỉnh sửa mã chi nhánh sẽ không thể sửa về mã có tiền tố CN
                    </p>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-primary" onClick={() => setIsShow(false)}>
            Thoát
          </Button>
          <Button variant="primary">Lưu</Button>
        </Modal.Footer>
      </Modal>
      <Row className="justify-content-between mt-3">
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

function App() {
  const [listBranchs, setListBranchs] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [isDefault, setIsDefault] = useState(false);

  const handleChangeCheckBox = (e) => {
    if (e.target.checked) {
      setIsDefault(true);
    } else setIsDefault(false);
  };

  const [dataNewBranch, setDataNewBranch] = useState({
    name: '',
    phone: '',
    cn_code: '',
    address: '',
    area: ''
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setDataNewBranch({
      ...dataNewBranch,
      [e.target.name]: value
    });
  };

  const sweetSuccessAlert = () => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: 'Thêm chi nhánh thành công',
      icon: 'success',
      confirmButtonText: 'Xác nhận'
    }).then((reuslt) => {
      if (reuslt.isConfirmed) {
        window.location.reload();
      }
    });
  };

  const sweetErrorAlert = () => {
    const MySwal = withReactContent(Swal);
    MySwal.fire('Thất bại', 'Mã chi nhánh đã tồn tại', 'error');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const branchData = {
      agency_branch_name: dataNewBranch.name,
      agency_branch_phone: dataNewBranch.phone,
      agency_branch_CN_code: dataNewBranch.cn_code,
      agency_branch_address: dataNewBranch.address,
      isDefaultCN: isDefault
    };
    services
      .post('/agency-branch/create-new-agency-branch', branchData)
      .then((response) => {
        setShowLoader(true);
        setTimeout(() => {
          setShowLoader(false);
          setIsShow(false);
          sweetSuccessAlert();
        }, 1000);
      })
      .catch((err) => {
        setShowLoader(true);
        setTimeout(() => {
          setShowLoader(false);
          sweetErrorAlert();
        }, 1000);
      });
  };

  useEffect(() => {
    (async () => {
      await services
        .get('/agency-branch/get-all')
        .then((response) => {
          setListBranchs(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    })();
  }, []);

  const columns = React.useMemo(
    () => [
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
        accessor: 'agency_branch_expiration_date'
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

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header className="flex-between">
              <Card.Title as="h5">Danh sách chi nhánh</Card.Title>
              <Button style={{ marginRight: 0 }} onClick={() => setIsShow(true)}>
                <i className="feather icon-plus-circle mr-2"></i>
                Thêm chi nhánh
              </Button>{' '}
            </Card.Header>
            <Card.Body>
              <Table columns={columns} data={listBranchs} />
              <Modal size="lg" show={isShow} onHide={() => setIsShow(false)}>
                <Modal.Header closeButton>
                  <Modal.Title as="h5">Thêm chi nhánh</Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                                value={dataNewBranch.name}
                                onChange={handleChange}
                                type="text"
                                name="name"
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
                                value={dataNewBranch.phone}
                                onChange={handleChange}
                                name="phone"
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
                                value={dataNewBranch.address}
                                onChange={handleChange}
                                name="address"
                                placeholder="Nhập số nhà, tên đường, ..."
                              />
                            </Form.Group>
                          </Col>

                          <Col lg={6}>
                            <Form.Group controlId="formBasicEmail">
                              <Form.Label>Mã chi nhánh</Form.Label>
                              <Form.Control
                                type="text"
                                value={dataNewBranch.cn_code}
                                onChange={handleChange}
                                name="cn_code"
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
                                custom
                                type="checkbox"
                                checked={isDefault}
                                id="isDefault"
                                onChange={handleChangeCheckBox}
                                label="Chi nhánh mặc định"
                              />
                            </Form.Group>
                            <p>
                              <span className="text-c-red">Lưu ý:</span> Sau khi chỉnh sửa mã chi nhánh sẽ không thể sửa về mã có tiền tố CN
                            </p>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="outline-primary" onClick={() => setIsShow(false)}>
                    Thoát
                  </Button>
                  <ButtonLoading
                    text={'Thêm'}
                    loading={showLoader}
                    type="submit"
                    onSubmit={handleSubmit}
                    disabled={showLoader}
                  ></ButtonLoading>
                </Modal.Footer>
              </Modal>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default App;
