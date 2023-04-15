import React from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Background404 from './404.svg';

const NotFound404 = () => {
  return (
    <React.Fragment>
      <div className="auth-wrapper maintenance">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} className="text-center px-4">
              <div>
                <img src={Background404} alt="404 - Page Not Found" />
              </div>
              <h5 className="mt-4">Trang không tồn tại</h5>
              
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

export default NotFound404;
