import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Pagination, Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import services from '../../../../utils/axios';
import moment from 'moment';
import CustomTable from '../../../../components/Table/CustomTable';
import { useHistory } from 'react-router-dom';

function ListCustomers() {
  const history = useHistory();
  const [listCustomer, setListCustomer] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleRowClick = (row) => {
    const id = row.values.id;
    history.push(`/app/sell-management/customers/${id}`)
  }

  useEffect(() => {
    (async () => {
      await services
        .get('/customer/get-all')
        .then((response) => {
          const filteredData = response.data.data.filter((user) => user !== null);
          setListCustomer(filteredData);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
        });
    })();
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id'
      },
      {
        Header: 'Tên khách hàng',
        accessor: 'customer_name'
      },
      {
        Header: 'Mã khách hàng',
        accessor: 'customer_code'
      },
      {
        Header: 'Số điện thoại',
        accessor: 'customer_phone'
      },
      {
        Header: 'Ngày khởi tạo',
        accessor: 'createdAt',
        Cell: ({ value }) => moment(value).utcOffset(7).format('DD/MM/YYYY - HH:MM')
      }
    ],
    []
  );

  if (isLoading) return <div className="text-center">Đang tải...</div>;

  if (listCustomer.length === 0) {
    return <div className="text-center">Lỗi truy vấn thông tin danh sách khách hàng</div>;
  } else
    return (
      <React.Fragment>
        <Helmet>
          <title>Danh sách khách hàng</title>
        </Helmet>
        <Row>
          <Col>
            <Card>
              <Card.Header className="flex-between">
                <Card.Title as="h5">Danh sách khách hàng</Card.Title>
                <Button style={{ marginRight: 0 }} href="/app/sell-management/customers/create">
                  <i className="feather icon-plus-circle mr-2"></i>
                  Thêm khách hàng
                </Button>{' '}
              </Card.Header>
              <Card.Body>
                <CustomTable columns={columns} data={listCustomer} handleRowClick={handleRowClick}/>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    );
}

export default ListCustomers;
