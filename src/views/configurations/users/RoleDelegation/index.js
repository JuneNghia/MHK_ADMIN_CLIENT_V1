import React, { useEffect, useState } from 'react';
import { Button, Card, Tab, Tabs } from 'react-bootstrap';
import services from '../../../../utils/axios';
import { useHistory } from 'react-router-dom';
import CustomTable from '../../../../components/Table/CustomTable';

function Tenant_Roles() {
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
    (async () => {
      await services
        .get('/role/get-all')
        .then((response) => {
          setListRoles(response.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    })();
  }, []);

  const handleRowClick = (row) => {
    const id = row.values.id;
    history.push(`/app/sell-management/products/${id}`);
  };

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
