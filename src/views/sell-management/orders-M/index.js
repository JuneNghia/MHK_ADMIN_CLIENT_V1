import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Pagination, Button, FormGroup, FormLabel, FormText, Badge, Tab, Tabs } from 'react-bootstrap';
import BTable from 'react-bootstrap/Table';
import { useTable, usePagination, useGlobalFilter, useRowSelect } from 'react-table';
import { GlobalFilter } from '../../users/GlobalFilter';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import services from '../../../utils/axios';

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
            <div>
              <input type="checkbox" {...getToggleAllRowsSelectedProps()} />
            </div>
          )
        },
        ...columns
      ]);
    }
  );

  const history = useHistory();

  const handleRowClick = (row) => {
    const id = row.values.id;
    history.push(`/app/sell-management/products/${id}`);
  };

  return (
    <>
      <Helmet>
        <title>Danh sách đơn hàng</title>
      </Helmet>
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
            {[20, 50, 100].map((pageSize) => (
              <option key={pageSize} defaultValue={50} value={pageSize}>
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
                <th key={column.headers} {...column.getHeaderProps()}>{column.render('Header')}</th>
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
                      <td {...cell.getCellProps()}>
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

function App() {
  const [listProducts, setListProducts] = useState([]);
  const history = useHistory();

  const data = [
    {
      id: 1,
      image: '/url',
      name: 'MÀN HÌNH FULL HD',
      type: 'Màn hình',
      brand: 'SAMSUNG',
      can_sell: 23,
      inventory: 33,
      createdAt: '20/06/2001'
    },
    {
      id: 2,
      image: '/url',
      name: 'MÀN HÌNH FULL HD',
      type: 'Màn hình',
      brand: 'SAMSUNG',
      can_sell: 23,
      inventory: 33,
      createdAt: '20/06/2001'
    },
    {
      id: 3,
      image: '/url',
      name: 'MÀN HÌNH FULL HD',
      type: 'Màn hình',
      brand: 'SAMSUNG',
      can_sell: 23,
      inventory: 33,
      createdAt: '20/06/2001'
    },
    {
      id: 4,
      image: '/url',
      name: 'MÀN HÌNH FULL HD',
      type: 'Màn hình',
      brand: 'SAMSUNG',
      can_sell: 23,
      inventory: 33,
      createdAt: '20/06/2001'
    }
  ];

  useEffect(() => {
    (async () => {
      const result = await services.get('/product/get-all');
      setListProducts(result.data);
    })();
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id'
      },
      {
        Header: 'Tên sản phẩm',
        accessor: 'product_name'
      },
      {
        Header: 'Sản phẩm',
        accessor: 'name'
      },
      {
        Header: 'Loại',
        accessor: 'type'
      },
      {
        Header: 'Nhãn hiệu',
        accessor: 'brand'
      },
      {
        Header: 'Có thể bán',
        accessor: 'can_sell'
      },
      {
        Header: 'Ngày khởi tạo',
        accessor: 'createdAt'
      }
    ],
    []
  );

  return (
    <React.Fragment>
      <Row>
        <Col sm={12} lg={12}>
          <span className="flex-between mb-3">
            <span>
              <Button variant="secondary">
                <i className="feather icon-share"></i>
                Xuất File
              </Button>
              <Button variant="secondary">
                <i className="feather icon-download"></i>
                Nhập File
              </Button>
            </span>
            <Button style={{ marginBottom: 10, marginRight: 0 }} onClick={() => history.push("/app/sell-management/orders/create")}>
              <i className="feather icon-plus-circle mr-2"></i>
              Tạo đơn hàng
            </Button>{' '}
          </span>

          <Card>
            <Card.Header className="flex-between">
              <Card.Title as="h5">DANH SÁCH ĐƠN HÀNG CẦN XỬ LÝ</Card.Title>
            </Card.Header>
            <Card.Body style={{ padding: 0 }}>
              <Row style={{ margin: 0 }}>
                <Col sm={12} lg={12} style={{ padding: 0 }}>
                  <Row style={{ margin: 0 }}>
                    <Col lg={2} style={{ padding: 0 }} className="dashed-r">
                      <FormGroup className="form-group-link" style={{ marginBottom: 0, padding: '10px 0' }}>
                        <FormLabel style={{ padding: '0 25px' }}>
                          Chờ duyệt
                          <Badge variant="success" className="ml-1">
                            4
                          </Badge>
                        </FormLabel>
                        <FormText style={{ padding: '0 25px' }} className="text-normal">
                          284.488.299
                        </FormText>
                      </FormGroup>
                    </Col>
                    <Col lg={2} style={{ padding: 0 }} className="dashed-r">
                      <FormGroup className="form-group-link" style={{ marginBottom: 0, padding: '10px 0' }}>
                        <FormLabel style={{ padding: '0 25px' }}>
                          Chờ thanh toán
                          <Badge variant="success" className="ml-1">
                            4
                          </Badge>
                        </FormLabel>
                        <FormText style={{ padding: '0 25px' }} className="text-normal">
                          284.488.299
                        </FormText>
                      </FormGroup>
                    </Col>
                    <Col lg={2} style={{ padding: 0 }} className="dashed-r">
                      <FormGroup className="form-group-link" style={{ marginBottom: 0, padding: '10px 0' }}>
                        <FormLabel style={{ padding: '0 25px' }}>
                          Chờ đóng gói
                          <Badge variant="success" className="ml-1">
                            4
                          </Badge>
                        </FormLabel>
                        <FormText style={{ padding: '0 25px' }} className="text-normal">
                          284.488.299
                        </FormText>
                      </FormGroup>
                    </Col>
                    <Col lg={2} style={{ padding: 0 }} className="dashed-r">
                      <FormGroup className="form-group-link" style={{ marginBottom: 0, padding: '10px 0' }}>
                        <FormLabel style={{ padding: '0 25px' }}>
                          Chờ lấy hàng
                          <Badge variant="success" className="ml-1">
                            4
                          </Badge>
                        </FormLabel>
                        <FormText style={{ padding: '0 25px' }} className="text-normal">
                          284.488.299
                        </FormText>
                      </FormGroup>
                    </Col>
                    <Col lg={2} style={{ padding: 0 }} className="dashed-r">
                      <FormGroup className="form-group-link" style={{ marginBottom: 0, padding: '10px 0' }}>
                        <FormLabel style={{ padding: '0 25px' }}>
                          Đang giao hàng
                          <Badge variant="success" className="ml-1">
                            4
                          </Badge>
                        </FormLabel>
                        <FormText style={{ padding: '0 25px' }} className="text-normal">
                          284.488.299
                        </FormText>
                      </FormGroup>
                    </Col>
                    <Col lg={2} style={{ padding: 0 }}>
                      <FormGroup className="form-group-link" style={{ marginBottom: 0, padding: '10px 0' }}>
                        <FormLabel style={{ padding: '0 25px' }}>
                          Chờ giao lại
                          <Badge variant="success" className="ml-1">
                            4
                          </Badge>
                        </FormLabel>
                        <FormText style={{ padding: '0 25px' }} className="text-normal">
                          284.488.299
                        </FormText>
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Tabs variant="pills" defaultActiveKey="history" className="tabs-menu">
            <Tab eventKey="history" title="Tất cả đơn hàng">
              <Table columns={columns} data={data}></Table>
            </Tab>
            <Tab eventKey="profile" title="Đang giao dịch">
              <Table columns={columns} data={data}></Table>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default App;
