import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const applicationList = [
  {
    title: 'Tin Nhắn',
    description: 'Trò chuyện với nhân viên và khách hàng',
    url: '/app/application/message',
    icon: 'feather icon-message-circle mr-2'
  },
  {
    title: 'Nhiệm vụ',
    description: 'Quản lý và theo dõi tiến độ nhiệm vụ được giao',
    url: '/app/application/task',
    icon: 'feather icon-list mr-2'
  },
  {
    title: 'Lời nhắc',
    description: 'Quản lý và theo dõi các công việc cần làm',
    url: '/app/application/to-do',
    icon: 'feather icon-edit mr-2'
  },
];

export default function index() {
  return (
    <Row>
      {applicationList.map((app) => (
        <Col md={6} xl={4}>
          <Card>
            {/* <Card.Img variant="top" src={app.image} /> */}
            <Card.Body>
              <h5><i className={app.icon}></i> {app.title}</h5>
              <span className="text-muted">{app.description}</span>
              <div className="row m-t-30">
                <div className="col-6 p-r-0">
                  <Link to={app.url} className="btn btn-primary text-uppercase btn-block">
                    Truy cập ứng dụng
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
