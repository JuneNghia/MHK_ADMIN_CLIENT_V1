import { useEffect, useState } from 'react';
import { useTable, usePagination, useGlobalFilter, useRowSelect, useSortBy } from 'react-table';
import { Row, Col, CloseButton } from 'react-bootstrap';
import MyPagination from '../Pagination/PaginationComponent';
import { GlobalFilter } from '../../views/users/GlobalFilter';
import BTable from 'react-bootstrap/Table';

function CustomTable({ columns, data, hiddenColumns = ['id'], handleRowClick }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    globalFilter,
    setGlobalFilter,
    pageOptions,
    selectedFlatRows,
    pageCount,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, hiddenColumns, sortBy: [{ id: 'createdAt', desc: true }] }
    },
    useGlobalFilter,
    useSortBy,
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
  const [showGoToPage, setShowGoToPage] = useState(false);
  const [currentPage, setCurrentPage] = useState(pageIndex + 1);
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setShowGoToPage(false);
    gotoPage(newPage - 1);
  };

  const selectedRows = selectedFlatRows.map((row) => row.original);
  const selectedCount = selectedFlatRows.length;
  console.log(selectedCount);

  useEffect(() => {
    setCurrentPage(pageIndex + 1);
  }, [pageIndex]);

  return (
    <>
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
            <tr key={headerGroup.Header} {...headerGroup.getHeaderGroupProps()}>
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
      <Row className="justify-content-between mt-3">
        <Col sm={12} md={6}>
          <span className="d-flex align-items-center">
            Trang{' '}
            <strong className="ml-1 mr-1">
              {' '}
              {pageIndex + 1} trên tổng {pageOptions.length}{' '}
            </strong>{' '}
            |
            <span className="custom-a ml-1 mr-1" onClick={() => setShowGoToPage(true)}>
              Chọn nhanh trang
            </span>{' '}
            {showGoToPage ? (
              <span style={{ display: 'inherit' }}>
                <input
                  id="page-input"
                  type="number"
                  placeholder="Số trang"
                  className="form-control ml-2"
                  onChange={(e) => {
                    const page = e.target.value ? Number(e.target.value) - 1 : 0;
                    gotoPage(page);
                  }}
                  onKeyPress={(e) => {
                    if (e.key === '-' || e.key === '0' || e.key === '+') {
                      e.preventDefault();
                    }
                  }}
                  style={{ width: '100px' }}
                  min="1"
                  max={pageOptions.length}
                />
                <CloseButton onClick={() => setShowGoToPage(false)} className="ml-3" aria-label="hide" />
              </span>
            ) : null}
          </span>
        </Col>
        <Col sm={12} md={6}>
          <MyPagination currentPage={currentPage} totalPages={pageCount} onPageChange={handlePageChange} />
        </Col>
      </Row>
    </>
  );
}

export default CustomTable;
