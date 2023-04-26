import React, { useEffect, useState } from 'react';
import { Button, Card, Tab, Tabs } from 'react-bootstrap';
import services from '../../../../utils/axios';
import { useHistory } from 'react-router-dom';
import CustomTable from '../../../../components/Table/CustomTable';
import { Helmet } from 'react-helmet';
import { HashLoader } from 'react-spinners';
import Error from '../../../errors/Error';

function Tenant_Roles() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFetched, setIsFetched] = useState(false);
  const history = useHistory();
  const [listRoles, setListRoles] = useState([]);
  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id'
      },
      {
        Header: 'Tên vai trò',
        accessor: 'role_title'
      },
      {
        Header: 'Mô tả',
        accessor: 'role_description'
      }
    ],
    []
  );

  useEffect(() => {
    services
      .get('/role/get-all')
      .then((response) => {
        setListRoles(response.data.data);
        setIsLoading(false);
        setIsFetched(true);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, []);

  const handleRowClick = (row) => {
    const id = row.values.id;
    history.push(`/app/sell-management/products/${id}`);
  };

  if (isLoading) {
    return (
      <>
        <Helmet>
          <title>Danh sách vai trò</title>
        </Helmet>
        <HashLoader style={{ display: 'block', height: '70vh', margin: 'auto' }} size={50} color="#36d7b7" />;
      </>
    );
  }

  if (!isFetched) {
    return <Error />
  }

  return (
    <>
      <Button variant="outline-primary" className="mb-3" onClick={() => history.push('/app/configurations/users')}>
        <i className="feather icon-arrow-left"></i>
        Quay lại danh sách nhân viên
      </Button>
      <Card>
        <Card.Header>
          <Card.Title as="h5">Danh sách vai trò nhân viên</Card.Title>
        </Card.Header>
        <Card.Body>
          <CustomTable columns={columns} data={listRoles} handleRowClick={handleRowClick} />
        </Card.Body>
      </Card>
    </>
  );
}

export default Tenant_Roles;
