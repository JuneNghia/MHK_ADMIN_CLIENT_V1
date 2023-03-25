import React from 'react';
import { Pagination } from 'react-bootstrap';

const MyPagination = ({ currentPage, totalPages, onPageChange }) => {
  const maxPageButtons = 5; // Số lượng button trang tối đa được hiển thị

  // Tính toán các số trang để hiển thị
  const pageButtons = [];
  let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
  let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

  if (endPage - startPage < maxPageButtons - 1) {
    startPage = Math.max(1, endPage - maxPageButtons + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageButtons.push(i);
  }

  // Xử lý sự kiện khi click vào button trang
  const handlePageChange = (event) => {
    const newPage = parseInt(event.target.text);
    onPageChange(newPage);
  };

  // Render các button trang
  const renderPageButtons = () => {
    return pageButtons.map((page) => (
      <Pagination.Item
        key={page}
        active={page === currentPage}
        onClick={handlePageChange}
      >
        {page}
      </Pagination.Item>
    ));
  };

  // Render component Pagination hoàn chỉnh
  return (
    <Pagination className="justify-content-end">
      <Pagination.First
        disabled={currentPage === 1}
        onClick={() => onPageChange(1)}
      />
      <Pagination.Prev
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      />
      {startPage > 1 && <Pagination.Ellipsis />}
      {renderPageButtons()}
      {endPage < totalPages && <Pagination.Ellipsis />}
      <Pagination.Next
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      />
      <Pagination.Last
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(totalPages)}
      />
    </Pagination>
  );
};

export default MyPagination;