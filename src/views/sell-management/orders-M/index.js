import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Pagination, Button, FormGroup, FormLabel, FormText, Badge, Tab, Tabs } from 'react-bootstrap';
import BTable from 'react-bootstrap/Table';
import { useTable, usePagination, useGlobalFilter, useRowSelect } from 'react-table';
import GlobalFilter from '../../../components/Filter/GlobalFilter';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import services from '../../../utils/axios';
import TableInTabs from '../../../components/Table/TableInTabs'

function ListOrders() {
  const [listOrders, setListOrders] = useState([]);
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
            <Button style={{ marginBottom: 10, marginRight: 0 }} onClick={() => history.push("/app/sell-management/orders/create")}>
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
                    <Col lg={2} style={{ padding: 0 }} className="dashed-r">
                      <FormGroup className="form-group-link" style={{ marginBottom: 0, padding: '10px 0' }}>
                        <FormLabel style={{ padding: '0 25px' }}>
                          Chờ duyệt
                          <Badge variant="success" className="ml-1">
                            4
                          </Badge>
                        </FormLabel>
                        <FormText style={{ padding: '0 25px' }} className="text-normal">
                          284.488.299
                        </FormText>
                      </FormGroup>
                    </Col>
                    <Col lg={2} style={{ padding: 0 }} className="dashed-r">
                      <FormGroup className="form-group-link" style={{ marginBottom: 0, padding: '10px 0' }}>
                        <FormLabel style={{ padding: '0 25px' }}>
                          Chờ thanh toán
                          <Badge variant="success" className="ml-1">
                            4
                          </Badge>
                        </FormLabel>
                        <FormText style={{ padding: '0 25px' }} className="text-normal">
                          284.488.299
                        </FormText>
                      </FormGroup>
                    </Col>
                    <Col lg={2} style={{ padding: 0 }} className="dashed-r">
                      <FormGroup className="form-group-link" style={{ marginBottom: 0, padding: '10px 0' }}>
                        <FormLabel style={{ padding: '0 25px' }}>
                          Chờ đóng gói
                          <Badge variant="success" className="ml-1">
                            4
                          </Badge>
                        </FormLabel>
                        <FormText style={{ padding: '0 25px' }} className="text-normal">
                          284.488.299
                        </FormText>
                      </FormGroup>
                    </Col>
                    <Col lg={2} style={{ padding: 0 }} className="dashed-r">
                      <FormGroup className="form-group-link" style={{ marginBottom: 0, padding: '10px 0' }}>
                        <FormLabel style={{ padding: '0 25px' }}>
                          Chờ lấy hàng
                          <Badge variant="success" className="ml-1">
                            4
                          </Badge>
                        </FormLabel>
                        <FormText style={{ padding: '0 25px' }} className="text-normal">
                          284.488.299
                        </FormText>
                      </FormGroup>
                    </Col>
                    <Col lg={2} style={{ padding: 0 }} className="dashed-r">
                      <FormGroup className="form-group-link" style={{ marginBottom: 0, padding: '10px 0' }}>
                        <FormLabel style={{ padding: '0 25px' }}>
                          Đang giao hàng
                          <Badge variant="success" className="ml-1">
                            4
                          </Badge>
                        </FormLabel>
                        <FormText style={{ padding: '0 25px' }} className="text-normal">
                          284.488.299
                        </FormText>
                      </FormGroup>
                    </Col>
                    <Col lg={2} style={{ padding: 0 }}>
                      <FormGroup className="form-group-link" style={{ marginBottom: 0, padding: '10px 0' }}>
                        <FormLabel style={{ padding: '0 25px' }}>
                          Chờ giao lại
                          <Badge variant="success" className="ml-1">
                            4
                          </Badge>
                        </FormLabel>
                        <FormText style={{ padding: '0 25px' }} className="text-normal">
                          284.488.299
                        </FormText>
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Tabs variant="pills" defaultActiveKey="history" className="tabs-menu">
            <Tab eventKey="history" title="Tất cả đơn hàng">
              <TableInTabs columns={columns} data={data} handleRowClick={handleRowClick}/>
            </Tab>
            <Tab eventKey="profile" title="Đang giao dịch">
            <TableInTabs columns={columns} data={data} handleRowClick={handleRowClick}/>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default ListOrders;
