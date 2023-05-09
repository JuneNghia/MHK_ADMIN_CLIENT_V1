import React from 'react';
import { NavLink } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import BackgroundServerError from '../../views/errors/500.svg'

const Error = () => {
  return (
    <React.Fragment>
      <div style={{ minHeight: '80%' }} className="auth-wrapper maintenance">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} className="text-center px-4">
              <div>
                <img style={{width: "75%"}} src={BackgroundServerError} alt="Server Error" />
              </div>
              <div style={{ marginBottom: 150 }} className="text-center">
                <h1 className="mt-5 mb-4">LỖI YÊU CẦU MÁY CHỦ - 500</h1>
                <h5 className="text-muted mb-4">
                  Đã xảy ra lỗi khi kết nối tới máy chủ, vui lòng liên hệ với quản trị viên Website để biết thêm thông tin
                </h5>
                <NavLink to="/app/dashboard/default" className="btn btn-primary text-white mb-4">
                  <i className="feather icon-home" />
                  <span>Trở về trang chủ</span>
                </NavLink>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Error;
