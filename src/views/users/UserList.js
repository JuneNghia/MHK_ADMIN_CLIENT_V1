import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import services from '../../utils/axios';
import { Helmet } from 'react-helmet';
import moment from 'moment';
import NoPermission from '../errors/NoPermission';
import CustomTable from '../../components/Table/CustomTable';

function ListUsers() {
  const [listEmployees, setListEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const history = useHistory();

  const handleRowClick = (row) => {
    const id = row.values.id;
    history.push(`/app/sell-management/users/${id}`);
  };

  useEffect(() => {
    (async () => {
      await services
        .get('/staff/get-all')
        .then((response) => {
          setListEmployees(response.data.data);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error);
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
        Header: 'Tên nhân viên',
        accessor: 'staff_name'
      },
      {
        Header: 'Vai trò',
        accessor: 'staff_type'
      },
      {
        Header: 'Số điện thoại',
        accessor: 'staff_phone'
      },
      {
        Header: 'Email',
        accessor: 'staff_email'
      },
      {
        Header: 'Trạng thái',
        accessor: 'staff_status',
        Cell: ({ value }) => (
          <span style={{ color: value === 'Đã nghỉ việc' ? 'red' : 'rgb(13, 180, 115)' }}>
            {value === 'Đã nghỉ việc' ? 'Đã nghỉ việc' : 'Đang làm việc'}
          </span>
        )
      },
      {
        Header: 'Ngày khởi tạo',
        accessor: 'createdAt',
        Cell: ({ value }) => moment(value).utcOffset(7).format('DD/MM/YYYY - HH:MM')
      }
    ],
    []
  );

  if (isLoading) {
    <Helmet>
      <title>Danh sách nhân viên</title>
    </Helmet>;
    return <div>Loading...</div>;
  }

  if (error) {
    <Helmet>
      <title>Danh sách nhân viên</title>
    </Helmet>;
    return <NoPermission />;
  }
  return (
    <React.Fragment>
      <Helmet>
        <title>Danh sách nhân viên</title>
      </Helmet>
      <Row>
        <Col>
          <Card>
            <Card.Header className="flex-between">
              <Card.Title as="h5">Danh sách nhân viên</Card.Title>
              <Button style={{ marginRight: 0 }} onClick={() => history.push('/app/sell-management/users/create')}>
                <i className="feather icon-plus-circle mr-2"></i>
                Thêm nhân viên
              </Button>{' '}
            </Card.Header>
            <Card.Body>
              <CustomTable columns={columns} data={listEmployees} handleRowClick={handleRowClick} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default ListUsers;
