import React from 'react';
import { NavLink } from 'react-router-dom';

import Breadcrumb from '../../../layouts/AdminLayout/Breadcrumb';
import back4 from '../../../assets/images/bg-images/bg4.jpg';
import JWTLogin from '../signin/JWTLogin'
import { Helmet } from 'react-helmet';


const Signin = () => {
  return (
    <React.Fragment>
      <Helmet>
        <title>Đăng nhập</title>
      </Helmet>
      <Breadcrumb />
      <div className="auth-wrapper aut-bg-img-side cotainer-fiuid align-items-stretch">
        <div className="row align-items-center w-100 align-items-stretch bg-white">
          <div
            className="d-none d-lg-flex col-lg-8 aut-bg-img align-items-center d-flex justify-content-center"
            style={{
              backgroundImage: `url(${back4})`,
              backgroundSize: 'cover',
              backgroundAttachment: 'fixed',
              backgroundPosition: 'center'
            }}
          >
            <div className="col-md-8">
              <h1 className="text-white mb-5">Chào mừng bạn đến với MHK</h1>
              <p className="text-white">
               Quản lý mọi thứ trong tầm tay của bạn
              </p>
            </div>
          </div>
          <div className="col-lg-4 align-items-stret h-100 align-items-center d-flex justify-content-center">
            <div className=" auth-content text-center">
              <div className="mb-4">
                <i className="feather icon-unlock auth-icon" />
              </div>
              <JWTLogin/>
              <p className="mb-2 text-muted">
                Quên mật khẩu? <NavLink to="/auth/reset-password">Đặt lại</NavLink>
              </p>
              <p className="mb-0 text-muted">
                Chưa có tài khoản? <NavLink to="/auth/signup">Đăng ký ngay</NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Signin;
