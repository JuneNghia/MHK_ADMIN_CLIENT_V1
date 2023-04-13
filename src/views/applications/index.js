import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const applicationList = [
  {
    title: 'Tin Nhắn',
    description: 'Trò chuyện với nhân viên và khách hàng',
    url: '/app/application/message'
  },
  {
    title: 'Nhiệm vụ',
    description: 'Quản lý và theo dõi tiến độ nhiệm vụ được giao',
    url: '/app/application/task'
  },
  {
    title: 'Lời nhắc',
    description: 'Quản lý và theo dõi các công việc cần làm',
    url: '/app/application/to-do'
  }
];

export default function index() {
  return (
    <Row>
      {applicationList.map((app) => (
        <Col md={6} xl={4}>
          <Card>
            {/* <Card.Img variant="top" src={app.image} /> */}
            <Card.Body>
              <h5>{app.title}</h5>
              <span className="text-muted">{app.description}</span>
              <div className="row m-t-30">
                <div className="col-6 p-r-0">
                  <Link to={app.url} className="btn btn-primary text-uppercase btn-block">
                    Vào ứng dụng
                  </Link>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
