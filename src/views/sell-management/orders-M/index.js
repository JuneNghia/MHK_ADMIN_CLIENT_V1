import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, FormGroup, FormLabel, FormText, Badge, Tab, Tabs } from 'react-bootstrap';

import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import services from '../../../utils/axios';
import CustomTable from '../../../components/Table/CustomTable';

function ListOrders() {
  const [listOrders, setListOrders] = useState([]);
  const listPendingOrders = [
    {
      title: 'Chờ duyệt',
      total: '123.456.789',
      quantity: '4'
    },
    {
      title: 'Chờ thanh toán',
      total: '123.456.789',
      quantity: '4'
    },
    {
      title: 'Chờ đóng gói',
      total: '123.456.789',
      quantity: '4'
    },
    {
      title: 'Chờ lấy hàng',
      total: '123.456.789',
      quantity: '4'
    },
    {
      title: 'Đang giao hàng',
      total: '123.456.789',
      quantity: '4'
    },
    {
      title: 'Chờ giao lại',
      total: '123.456.789',
      quantity: '4'
    }
  ];

  const history = useHistory();

  const handleRowClick = (row) => {
    const id = row.values.id;
    history.push(`/app/sell-management/products/${id}`);
  };

  const data = [
    {
      id: 1,
      image: '/url',
      name: 'MÀN HÌNH FULL HD',
      type: 'Màn hình',
      brand: 'SAMSUNG',
      can_sell: 23,
      inventory: 33,
      createdAt: '20/06/2001'
    },
    {
      id: 2,
      image: '/url',
      name: 'MÀN HÌNH FULL HD',
      type: 'Màn hình',
      brand: 'SAMSUNG',
      can_sell: 23,
      inventory: 33,
      createdAt: '20/06/2001'
    },
    {
      id: 3,
      image: '/url',
      name: 'MÀN HÌNH FULL HD',
      type: 'Màn hình',
      brand: 'SAMSUNG',
      can_sell: 23,
      inventory: 33,
      createdAt: '20/06/2001'
    },
    {
      id: 4,
      image: '/url',
      name: 'MÀN HÌNH FULL HD',
      type: 'Màn hình',
      brand: 'SAMSUNG',
      can_sell: 23,
      inventory: 33,
      createdAt: '20/06/2001'
    }
  ];

  useEffect(() => {
    (async () => {
      const result = await services.get('/product/get-all');
      setListOrders(result.data);
    })();
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id'
      },
      {
        Header: 'Tên sản phẩm',
        accessor: 'product_name'
      },
      {
        Header: 'Sản phẩm',
        accessor: 'name'
      },
      {
        Header: 'Loại',
        accessor: 'type'
      },
      {
        Header: 'Nhãn hiệu',
        accessor: 'brand'
      },
      {
        Header: 'Có thể bán',
        accessor: 'can_sell'
      },
      {
        Header: 'Ngày khởi tạo',
        accessor: 'createdAt'
      }
    ],
    []
  );

  return (
    <React.Fragment>
      <Helmet>
        <title>Danh sách đơn hàng</title>
      </Helmet>
      <Row>
        <Col sm={12} lg={12}>
          <span className="flex-between mb-3">
            <span>
              <Button variant="secondary">
                <i className="feather icon-share"></i>
                Xuất File
              </Button>
              <Button variant="secondary">
                <i className="feather icon-download"></i>
                Nhập File
              </Button>
            </span>
            <Button style={{ marginBottom: 10, marginRight: 0 }} onClick={() => history.push('/app/sell-management/orders/create')}>
              <i className="feather icon-plus-circle mr-2"></i>
              Tạo đơn hàng
            </Button>{' '}
          </span>

          <Card>
            <Card.Header className="flex-between">
              <Card.Title as="h5">DANH SÁCH ĐƠN HÀNG CẦN XỬ LÝ</Card.Title>
            </Card.Header>
            <Card.Body style={{ padding: 0 }}>
              <Row style={{ margin: 0 }}>
                <Col sm={12} lg={12} style={{ padding: 0 }}>
                  <Row style={{ margin: 0 }}>
                    {listPendingOrders.map((pendingOrders, index) => (
                      <Col key={index} lg={2} style={{ padding: 0 }} className="dashed-r">
                        <FormGroup className="form-group-link" style={{ marginBottom: 0, padding: '10px 0' }}>
                          <FormLabel style={{ padding: '0 25px' }}>
                            {pendingOrders.title}
                            <Badge variant="success" className="ml-1">
                              {pendingOrders.quantity}
                            </Badge>
                          </FormLabel>
                          <FormText style={{ padding: '0 25px' }} className="text-normal">
                            {pendingOrders.total}
                          </FormText>
                        </FormGroup>
                      </Col>
                    ))}
                  </Row>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Tabs variant="pills" defaultActiveKey="history" className="tabs-menu">
            <Tab eventKey="history" title="Tất cả đơn hàng">
              <CustomTable columns={columns} data={data} handleRowClick={handleRowClick} />
            </Tab>
            <Tab eventKey="profile" title="Đang giao dịch">
              <CustomTable columns={columns} data={data} handleRowClick={handleRowClick} />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default ListOrders;
