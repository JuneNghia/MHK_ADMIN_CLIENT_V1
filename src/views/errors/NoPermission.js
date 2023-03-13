import React from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import BackgroundNoPermission from './accessDenied.svg';

const NoPermission = () => {
  return (
    <React.Fragment>
      <div style={{minHeight: "80%"}} className="auth-wrapper maintenance">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} className="text-center px-4">
              <div>
                <img src={BackgroundNoPermission} alt="Access Denied" />
              </div>
              <h3 style={{color: '#3f3d56'}} className="mt-5">Bạn không có quyền truy cập trang này</h3>
              <Form className='mt-4'>
                <Link to="/">
                  <Button variant="danger">
                    <i className="feather icon-home mr-2" />
                    Trang chủ
                  </Button>
                </Link>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default NoPermission;
