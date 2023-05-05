import { useEffect, useState } from 'react';
import { useTable, usePagination, useGlobalFilter, useRowSelect, useSortBy } from 'react-table';
import { Row, Col, CloseButton, Dropdown, DropdownButton } from 'react-bootstrap';
import MyPagination from '../Pagination/PaginationComponent';
import GlobalFilter from '../Filter/GlobalFilter';
import BTable from 'react-bootstrap/Table';
import services from '../../utils/axios';
import Swal from 'sweetalert2';

function CustomTable({ columns, data, hiddenColumns = ['id'], handleRowClick, selectedTitle, object }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
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
              <input
                type="checkbox"
                {...getToggleAllRowsSelectedProps()}
                title="Chọn tất cả"
                indeterminate={selectedFlatRows.length > 0 ? true : undefined}
              />
            </div>
          )
        },
        ...columns
      ]);
    }
  );
  const [showGoToPage, setShowGoToPage] = useState(false);
  const [showErrorPage, setShowErrorPage] = useState(false);
  const [currentPage, setCurrentPage] = useState(pageIndex + 1);
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setShowGoToPage(false);
    gotoPage(newPage - 1);
  };

  const selectedRows = selectedFlatRows.map((row) => row.original);
  const selectedCount = selectedFlatRows.length;

  const promises = selectedRows.map((row) => services.delete(`/${object}/delete-by-id/${row.id}`, { data: row }));

  const handleDeleteRow = () => {
    Swal.fire({
      title: `Xoá ${selectedTitle} ?`,
      html: `Bạn có chắc chắn muốn xoá các ${selectedTitle} đã chọn ? </br>Thao tác này không thể khôi phục.`,
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Xoá',
      cancelButtonText: 'Thoát',
      confirmButtonColor: 'red',
      icon: 'warning'
    }).then((isConfirm) => {
      if (isConfirm.isConfirmed) {
        Promise.all(promises)
          .then((res) => {
            console.log(res);
            Swal.fire({
              title: 'Thành công',
              html: `Đã xoá ${selectedCount} ${selectedTitle} khỏi danh sách`,
              showCancelButton: false,
              showConfirmButton: true,
              icon: 'success'
            }).then((isConfirm) => {
              if (isConfirm.isConfirmed) {
                window.location.reload();
              }
            });
          })
          .catch((error) => {
            Swal.fire('Thất bại', `Đã xảy ra lỗi khi xoá các ${selectedTitle} đã chọn`, 'error');
          });
      }
    });
  };

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
          {selectedCount === 0 ? null : (
            <span className="flex-between">
              <span className="text-normal" style={{ marginLeft: '100px' }}>
                Đã chọn {selectedCount}/{rows.length} {selectedTitle}{' '}
              </span>
              <DropdownButton variant="secondary" className="ml-2 custom-button" id="dropdown-selectedRow" title="Chọn thao tác">
                <Dropdown.Item className="custom-dropdown-item" href="#/action-1">
                  Cập nhật thông tin
                </Dropdown.Item>
                <Dropdown.Item className="custom-dropdown-item" href="#/action-2">
                  Cập nhật trạng thái
                </Dropdown.Item>
                <Dropdown.Item className="custom-dropdown-item" onClick={handleDeleteRow}>
                  Xoá
                </Dropdown.Item>
              </DropdownButton>
            </span>
          )}
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
                {row.cells.map((cell) => {
                  return cell.column.id === 'selection' ? (
                    <td style={{ width: '50px', textAlign: 'center' }} {...cell.getCellProps()}>
                      <input
                        {...row.getToggleRowSelectedProps()}
                        type="checkbox"
                        {...cell.getCellProps()}
                        title=""
                        indeterminate={selectedFlatRows.length > 0 ? true : undefined}
                      />
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
              <span className="flex-between">
                <input
                  id="page-input"
                  type="number"
                  placeholder="Số trang"
                  className="form-control ml-2"
                  onChange={(e) => {
                    const page = e.target.value ? Number(e.target.value) - 1 : 0;
                    gotoPage(page);
                  }}
                  onKeyDown={(e) => {
                    const inputVal = parseInt(e.target.value + e.key);
                    if ( e.key === '-' || e.key === '+' || e.key === '.' ) {
                      e.preventDefault();
                    } else if (inputVal > pageOptions.length || inputVal === 0) {
                      e.preventDefault();
                      setShowErrorPage(true);
                    }
                    else {
                      setShowErrorPage(false);
                    }
                  }}
                  style={{ width: '100px' }}
                  min="1"
                  max={pageOptions.length}
                  title=""
                />
                <CloseButton onClick={() => setShowGoToPage(false)} className="ml-3" aria-label="hide" />
                {showErrorPage ? (
                  <span className="text-c-red ml-3">Số trang hiện có : {pageOptions.length}</span>
                ) : null}
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
