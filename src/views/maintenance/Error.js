import React from 'react';
import { NavLink } from 'react-router-dom';
import Breadcrumb from '../../layouts/AdminLayout/Breadcrumb';

const Error = () => {
  return (
    <React.Fragment>
      <Breadcrumb />
      <div className="auth-wrapper offline">
        <div style={{marginBottom: 150}} className="text-center">
          <h1 className="mb-4">LỖI YÊU CẦU MÁY CHỦ - 500</h1>
          <h5 className="text-muted mb-4">
            Đã xảy ra lỗi khi kết nối tới máy chủ, vui lòng liên hệ với quản trị viên Website để biết thêm thông tin
          </h5>
          <NavLink to="/app/dashboard/default" className="btn btn-primary text-white mb-4">
            <i className="feather icon-home" />
            <span>Trở về trang chủ</span>
          </NavLink>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Error;
