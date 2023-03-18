import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Pagination, Button } from 'react-bootstrap';
import BTable from 'react-bootstrap/Table';
import { useTable, usePagination, useGlobalFilter, useRowSelect } from 'react-table';
import { GlobalFilter } from './GlobalFilter';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import services from '../../utils/axios';
import moment from 'moment';
import NoPermission from '../errors/NoPermission';


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

  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    //selectedFlatRows biến của React-Table lưu dòng đang được chọn
    const selectedRows = selectedFlatRows.map((d) => d.original);
    setSelectedRows(selectedRows);
  }, [selectedFlatRows]);

  const history = useHistory();

  const handleRowClick = (row) => {
    const id = row.values.id;
    history.push(`/app/sell-management/users/${id}`);
  };

  return (
    <>
      <Helmet>
        <title>Danh sách sản phẩm</title>
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
  const [listEmployees, setListEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      await services
        .get('/user/get-all-db')
        .then((response) => {
          const employees = response.data.filter((user) => user.user_type === 'employee');
          setListEmployees(employees);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error);
          setIsLoading(false);
        });
    })();
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id'
      },
      {
        Header: 'Tên nhân viên',
        accessor: 'user_name'
      },
      {
        Header: 'Vai trò',
        accessor: 'user_type'
      },
      {
        Header: 'Số điện thoại',
        accessor: 'user_phone'
      },
      {
        Header: 'Email',
        accessor: 'user_email'
      },
      {
        Header: 'Trạng thái',
        accessor: 'user_region'
      },
      {
        Header: 'Ngày khởi tạo',
        accessor: 'createdAt',
        Cell: ({ value }) => moment(value).utcOffset(7).format('DD/MM/YYYY')
      }
    ],
    []
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    // handle error
    return <NoPermission/>
  }
  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header className="flex-between">
              <Card.Title as="h5">Danh sách nhân viên</Card.Title>
              <Button style={{ marginRight: 0 }} href="/app/sell-management/customers/create">
                <i className="feather icon-plus-circle mr-2"></i>
                Thêm nhân viên
              </Button>{' '}
            </Card.Header>
            <Card.Body>
              <Table columns={columns} data={listEmployees} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default App;
