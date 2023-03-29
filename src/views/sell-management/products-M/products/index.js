import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import CustomTable from '../../../../components/Table/CustomTable';
import { useHistory } from 'react-router-dom';

function ListProducts() {
  const history = useHistory();

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

  const handleRowClick = (row) => {
    const id = row.values.id;
    history.push(`/app/sell-management/products/${id}`)
  }

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header className="flex-between">
              <Card.Title as="h5">Danh sách sản phẩm</Card.Title>
              <Button style={{ marginRight: 0 }} onClick={() => history.push('/app/sell-management/products/create')}>
                <i className="feather icon-plus-circle mr-2"></i>
                Thêm sản phẩm
              </Button>{' '}
            </Card.Header>
            <Card.Body>
              <CustomTable columns={columns} data={data} handleRowClick={handleRowClick}/>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default ListProducts;
