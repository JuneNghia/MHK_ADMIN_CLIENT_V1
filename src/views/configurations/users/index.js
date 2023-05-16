import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import services from '../../../utils/axios';
import { Helmet } from 'react-helmet';
import moment from 'moment';
import CustomTable from '../../../components/Table/CustomTable';
import Error from '../../errors/Error';
import NoPermission from '../../errors/NoPermission';
import PageLoader from '../../../components/Loader/PageLoader';

function ListUsers() {
  const [listEmployees, setListEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetched, setIsFetched] = useState(false);
  const [isNoPermission, setIsNoPermission] = useState(false);
  const history = useHistory();

  const handleRowClick = (row) => {
    const id = row.values.id;
    history.push(`/app/configurations/users/${id}`);
  };

  useEffect(() => {
    (async () => {
      await services
        .get('/staff/get-all')
        .then((response) => {
          setListEmployees(response.data.data);
          setIsLoading(false);
          setIsFetched(true);
        })
        .catch((error) => {
          setIsLoading(false);
          if (error.response === 'You do not have permission!') {
            setIsNoPermission(error);
          }
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
        Header: 'Mã nhân viên',
        accessor: 'staff_code'
      },
      {
        Header: 'Số điện thoại',
        accessor: 'staff_phone'
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
        Header: 'Thời gian khởi tạo',
        accessor: 'createdAt',
        Cell: ({ value }) => moment(value).utcOffset(7).format('DD/MM/YYYY - HH:mm:ss')
      }
    ],
    []
  );

  if (isLoading) {
    return (
      <>
        <Helmet>
          <title>Danh sách nhân viên</title>
        </Helmet>
        <PageLoader />
      </>
    );
  }

  if (!isFetched) {
    return <Error />;
  }

  if (isNoPermission) {
    return <NoPermission />;
  }
  return (
    <React.Fragment>
      <Row>
        <Col>
          <Button variant="outline-primary" className="mb-3" onClick={() => history.push('/app/configurations')}>
            <i className="feather icon-arrow-left"></i>
            Quay lại cấu hình
          </Button>
          <Card>
            <Card.Header className="flex-between">
              <Card.Title as="h5">Danh sách nhân viên</Card.Title>
              <span>
                <Button
                  variant="outline-primary"
                  className="mr-2"
                  style={{ marginRight: 0 }}
                  onClick={() => history.push('/app/configurations/users/tenant_roles')}
                >
                  <i className="feather icon-git-commit mr-2"></i>
                  Phân quyền vai trò
                </Button>{' '}
                <Button style={{ marginRight: 0 }} onClick={() => history.push('/app/configurations/users/create')}>
                  <i className="feather icon-plus-circle mr-2"></i>
                  Thêm nhân viên
                </Button>{' '}
              </span>
            </Card.Header>
            <Card.Body>
              <CustomTable
                columns={columns}
                data={listEmployees}
                handleRowClick={handleRowClick}
                selectedTitle="nhân viên"
                object="staff"
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default ListUsers;
