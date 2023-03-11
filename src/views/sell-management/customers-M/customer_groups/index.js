import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Pagination, Button } from 'react-bootstrap';
import BTable from 'react-bootstrap/Table';
import { useTable, usePagination, useGlobalFilter } from 'react-table';

import ModuleNotification from '../../../../components/Widgets/Statistic/Notification';
import { GlobalFilter } from '../../../users/GlobalFilter';
import axios from 'axios';
import { Helmet } from 'react-helmet';

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
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
      initialState: { pageIndex: 0 }
    },
    useGlobalFilter,
    usePagination
  );

  // Render the UI for your table
  return (
    <>
      <Helmet>
        <title>Nhóm khách hàng</title>
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
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </BTable>
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
  //   const [listCustomer, setListCustomer] = useState([])

  //   useEffect(()=> {
  //     (async () => {
  //       const result = await axios.get('http://localhost:5000/mhk-api/v1/user/get-all-db');
  //       setListCustomer(result.data)
  //     })();
  //   }, [])

  const listGroupCustomer = [
    {
      group_name: 'Mặc định ban đầu',
      group_id: 'MHKC001',
      group_type: 'Cố định',
      group_description: 'Khách hàng vãng lai',
      group_quantity: 877,
      group_createdAt: '07/03/2023'
    },
    {
      group_name: 'Mặc định ban đầu',
      group_id: 'MHKC001',
      group_type: 'Cố định',
      group_description: 'Khách hàng vãng lai',
      group_quantity: 877,
      group_createdAt: '07/03/2023'
    },
    {
      group_name: 'Mặc định ban đầu',
      group_id: 'MHKC001',
      group_type: 'Cố định',
      group_description: 'Khách hàng vãng lai',
      group_quantity: 877,
      group_createdAt: '07/03/2023'
    },
    {
      group_name: 'Mặc định ban đầu',
      group_id: 'MHKC001',
      group_type: 'Cố định',
      group_description: 'Khách hàng vãng lai',
      group_quantity: 877,
      group_createdAt: '07/03/2023'
    }
  ];

  const columns = React.useMemo(
    () => [
      {
        Header: 'Tên nhóm',
        accessor: 'group_name'
      },
      {
        Header: 'Mã nhóm',
        accessor: 'group_id'
      },
      {
        Header: 'Loại nhóm',
        accessor: 'group_type'
      },
      {
        Header: 'Mô tả',
        accessor: 'group_description'
      },
      {
        Header: 'Số lượng khách hàng',
        accessor: 'group_quantity'
      },
      {
        Header: 'Ngày tạo',
        accessor: 'group_createdAt'
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
              <Card.Title as="h5">Nhóm khách hàng</Card.Title>
              <Button href="/app/sell-management/customer_groups/create">
                <i className="feather icon-plus-circle mr-2"></i>
                Thêm nhóm khách hàng
              </Button>{' '}
            </Card.Header>
            <Card.Body>
              <Table columns={columns} data={listGroupCustomer} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default App;
