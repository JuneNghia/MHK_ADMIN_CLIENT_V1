import React, { useEffect, useState } from 'react';
import { Button, Card, Col, FormCheck, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap';
import Select from 'react-select';
import { ButtonLoading } from '../../../components/Button/LoadButton';
import CustomTable from '../../../components/Table/CustomTable';
import services from '../../../utils/axios';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

const ConfigPrice = () => {
  const selectList = [
    {
      title: 'Sửa giá khi bán hàng',
      input: <Select className="text-normal"></Select>,
      lg: 12
    },
    {
      title: 'Giá bán hàng mặc định',
      input: <Select className="text-normal"></Select>,
      lg: 6
    },
    {
      title: 'Giá nhập hàng mặc định',
      input: <Select className="text-normal"></Select>,
      lg: 6
    }
  ];
  return (
    <Row>
      {selectList.map((select) => (
        <Col lg={select.lg}>
          <FormGroup>
            <FormLabel>{select.title}</FormLabel>
            {select.input}
          </FormGroup>
        </Col>
      ))}

      <Col lg={12}>
        <span className="d-flex mt-2 mb-2">
          <FormCheck id="recommend_last_price" className="text-normal"></FormCheck>
          <FormLabel className="text-normal" htmlFor="recommend_last_price">
            Sử dụng chức năng gợi ý giá bán gần nhất
          </FormLabel>
        </span>
      </Col>

      <Col lg={12}>
        <span className="d-flex justify-content-end">
          <Button variant="outline-primary">Huỷ</Button>
          <ButtonLoading text="Lưu"></ButtonLoading>
        </span>
      </Col>
    </Row>
  );
};

export default function PriceLists() {
  const history = useHistory();
  const [listCustomer, setListCustomer] = useState([]);
  useEffect(() => {
    services
      .get('/customer/get-all')
      .then((response) => {
        const filteredData = response.data.data.filter((user) => user !== null);
        setListCustomer(filteredData);
      })
      .catch((error) => {});
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
        accessor: 'customer_id'
      },
      {
        Header: 'Số điện thoại',
        accessor: 'customer_phone'
      },
      {
        Header: 'Trạng thái',
        accessor: 'customer_status',
        Cell: ({ value }) => (
          <span style={{ color: value === 'Ngừng giao dịch' ? 'red' : 'rgb(13, 180, 115)' }}>
            {value === 'Ngừng giao dịch' ? 'Ngừng giao dịch' : 'Đang giao dịch'}
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

  const menuPriceLists = [
    {
      title: 'Thiết lập giá',
      description: 'Thông tin được sử dụng để MHK và khách hàng liên hệ đến bạn',
      body: <ConfigPrice />
    },
    {
      title: 'Quản lý chính sách giá',
      description:
        'Bên cạnh 3 chính sách giá mặc định được áp dụng khi bán hàng và nhập hàng, bạn có thể bổ sung thêm các giá phù hợp với nhu cầu kinh doanh của cửa hàng.',
      btnAdd: true,
      body: <CustomTable data={listCustomer} columns={columns}></CustomTable>
    }
  ];
  return (
    <>
      <Button variant="outline-primary" className="mb-3" onClick={() => history.push('/app/configurations')}>
        <i className="feather icon-arrow-left"></i>
        Quay lại cấu hình
      </Button>
      <Card>
        <Row>
          <Card.Body>
            <Col lg={12}>
              <Row>
                {menuPriceLists.map((menu) => (
                  <>
                    <Col lg={4}>
                      <h5 className="strong-title">{menu.title}</h5>
                      <p>{menu.description}</p>
                      {menu.btnAdd ? <Button>Thêm chính sách giá</Button> : null}
                    </Col>
                    <Col lg={8}>
                      <Card>
                        <Row>
                          <Card.Body>
                            <Col lg={12}>{menu.body}</Col>
                          </Card.Body>
                        </Row>
                      </Card>
                    </Col>
                  </>
                ))}
              </Row>
            </Col>
          </Card.Body>
        </Row>
      </Card>
    </>
  );
}
