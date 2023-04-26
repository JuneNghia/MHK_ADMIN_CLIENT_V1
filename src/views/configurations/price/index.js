import React, { useEffect, useState } from 'react';
import { Button, Card, Col, FormCheck, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap';
import Select from 'react-select';
import { ButtonLoading } from '../../../components/Button/LoadButton';
import CustomTable from '../../../components/Table/CustomTable';
import services from '../../../utils/axios';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import ModalComponent from '../../../components/Modal/Modal';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';
import { HashLoader } from 'react-spinners';
import Error from '../../errors/Error';

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
        <Col key={select.title} lg={select.lg}>
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

const ModalPriceBody = (props) => {
  return (
    <Row>
      <Col lg={6}>
        <FormGroup>
          <FormLabel>
            Tên chính sách giá <span className="text-c-red">*</span>
          </FormLabel>
          <FormControl
            name="price_type"
            placeholder="Nhập tên chính sách giá"
            onChange={props.onChange}
            value={props.price_type_value}
          ></FormControl>
        </FormGroup>
      </Col>
      <Col lg={6}>
        <FormGroup>
          <FormLabel>
            Mô tả chính sách giá <span className="text-c-red">*</span>
          </FormLabel>
          <FormControl
            name="price_description"
            placeholder="Nhập mô tả chính sách giá"
            onChange={props.onChange}
            value={props.price_description}
          ></FormControl>
        </FormGroup>
      </Col>
      <Col>
        <span className="d-flex text-normal">
          <span className="strong-title ">
            Áp dụng cho: <span className="text-c-red">*</span>
          </span>
          <FormCheck
            className="ml-3"
            name="isImportDefault"
            id="selectImportDefault"
            label="Nhập hàng"
            value={props.isImportDefault}
            onChange={(event) => {
              props.onChange(event);
              props.setIsImportDefault(event.target.checked);
            }}
          ></FormCheck>
          <FormCheck
            className="ml-3"
            id="selectSellDefault"
            name="isSellDefault"
            label="Bán hàng"
            value={props.isSellDefault}
            onChange={(event) => {
              props.onChange(event);
              props.setIsImportDefault(event.target.checked);
            }}
          ></FormCheck>
        </span>
      </Col>
    </Row>
  );
};

export default function PriceLists() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFetched, setIsFetched] = useState(false);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [isImportDefault, setIsImportDefault] = useState(false);
  const [isSellDefault, setIsSellDefault] = useState(false);
  const history = useHistory();
  const [listPrice, setListPrice] = useState([]);
  const [idPrice, setIdPrice] = useState('');

  useEffect(() => {
    services
      .get('/price/get-all')
      .then((res) => {
        setListPrice(res.data.data);
        setIsFetched(true);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, []);

  const [newPrice, setNewPrice] = useState({
    price_type: '',
    price_description: '',
    isImportDefault: isImportDefault,
    isSellDefault: isSellDefault
  });

  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    setNewPrice((prevData) => ({
      ...prevData,
      [name]: value,
      isImportDefault: name === 'isImportDefault' ? checked : prevData.isImportDefault,
      isSellDefault: name === 'isSellDefault' ? checked : prevData.isSellDefault
    }));
  };

  const handleAddPrice = async () => {
    setShowLoader(true);
    try {
      await services
        .post('/price/create', newPrice)
        .then((res) => {
          setTimeout(() => {
            setShowLoader(false);
            Swal.fire({
              text: 'Thêm chính sách giá mới thành công',
              icon: 'success',
              confirmButtonText: 'Xác nhận',
              showConfirmButton: true
            }).then((isConfirm) => {
              if (isConfirm.isConfirmed) {
                window.location.reload();
              }
            });
          }, 1000);
        })
        .catch((errors) => {
          setShowLoader(true);
          setTimeout(() => {
            setShowLoader(false);
            Swal.fire({
              title: 'Thất bại',
              text: 'Loại chính sách đã tồn tại',
              icon: 'warning',
              confirmButtonText: 'Xác nhận'
            });
          }, 1000);
        });
    } catch (error) {
      setShowLoader(true);
      setTimeout(() => {
        setShowLoader(false);
        Swal.fire({
          title: 'Thất bại',
          text: 'Đã xảy ra lỗi khi kết nối tới máy chủ',
          icon: 'error',
          confirmButtonText: 'Xác nhận'
        });
      }, 1000);
    }
  };

  const handleRowClick = (row) => {
    setIdPrice(row.values.id);
    setShowModalUpdate(true);
  };

  const handleDelete = () => {
    Swal.fire({
      title: 'Xoá chính sách giá',
      html: `Bạn có chắc chắn muốn xoá chính sách giá ? Thao tác này không thể khôi phục`,
      icon: 'warning',
      confirmButtonText: 'Xoá',
      confirmButtonColor: 'red',
      cancelButtonText: 'Thoát',
      showCancelButton: true
    }).then((willDelete) => {
      if (willDelete.isConfirmed) {
        setIsDelete(true);
        services
          .delete(`/price/delete-by-id/${idPrice}`)
          .then((response) => {
            setTimeout(() => {
              setIsDelete(false);
              Swal.fire({
                text: 'Xoá chính sách giá thành công',
                icon: 'success',
                confirmButtonText: 'Xác nhận',
                showConfirmButton: true
              }).then((isConfirm) => {
                if (isConfirm.isConfirmed) {
                  window.location.reload();
                }
              }, 1000);
            });
          })
          .catch((error) => {
            setTimeout(() => {
              setIsDelete(false);
              Swal.fire({
                title: 'Xoá thất bại',
                html: 'Không thể xoá chính sách giá có mặc định là</br><b>Bán hàng</b> hoặc <b>Nhập hàng</b>',
                icon: 'error'
              });
            }, 1000);
          });
      } else {
        return;
      }
    });
  };

  function getDefaultCellValue(rowData) {
    if (rowData.isImportDefault && rowData.isSellDefault) {
      return 'BÁN HÀNG/ NHẬP HÀNG';
    } else if (rowData.isImportDefault) {
      return 'NHẬP HÀNG';
    } else if (rowData.isSellDefault) {
      return 'BÁN HÀNG';
    } else {
      return '';
    }
  }

  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id'
      },
      {
        Header: 'Tên',
        accessor: 'price_type'
      },
      {
        Header: 'Mặc định',
        accessor: 'isImportDefault',
        Cell: ({ row }) => getDefaultCellValue(row.original)
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
      body: <CustomTable handleRowClick={handleRowClick} data={listPrice} columns={columns}></CustomTable>
    }
  ];

  if (isLoading) {
    return (
      <>
        <Helmet>
          <title>Quản lý chính sách giá</title>
        </Helmet>
        <HashLoader style={{ display: 'block', height: '70vh', margin: 'auto' }} size={50} color="#36d7b7" />
      </>
    )
  }

  if (!isFetched) {
    return <Error />
  }
  return (
    <>
      <Button variant="outline-primary" className="mb-3" onClick={() => history.push('/app/configurations')}>
        <i className="feather icon-arrow-left"></i>
        Quay lại cấu hình
      </Button>
      <ModalComponent
        size="lg"
        show={showModalAdd}
        title="Thêm chính sách giá"
        handleClose={() => setShowModalAdd(false)}
        textSubmit={showLoader ? 'Đang thêm' : 'Thêm'}
        disabled={showLoader}
        handleSubmit={handleAddPrice}
        body={
          <ModalPriceBody
            onChange={handleChange}
            price_type_value={newPrice.price_type}
            price_description={newPrice.price_description}
            isImportDefault={newPrice.isImportDefault}
            isSellDefault={newPrice.isSellDefault}
            setIsImportDefault={setIsImportDefault}
            setIsSellDefault={setIsSellDefault}
          />
        }
      ></ModalComponent>
      <ModalComponent
        size="lg"
        show={showModalUpdate}
        title="Cập nhật chính sách giá"
        handleClose={() => setShowModalUpdate(false)}
        textSubmit={showLoader ? 'Đang lưu' : 'Lưu'}
        disabled={showLoader}
        handleDelete={handleDelete}
        isDelete={isDelete}
        body={
          <ModalPriceBody
            onChange={handleChange}
            price_type_value={newPrice.price_type}
            price_description={newPrice.price_description}
            isImportDefault={newPrice.isImportDefault}
            isSellDefault={newPrice.isSellDefault}
            setIsImportDefault={setIsImportDefault}
            setIsSellDefault={setIsSellDefault}
          />
        }
      ></ModalComponent>
      <Card>
        <Row>
          <Card.Body>
            <Col lg={12}>
              <Row>
                {menuPriceLists.map((menu, index) => (
                  <React.Fragment key={`menuPriceLists_${index}`}>
                    <Col lg={4}>
                      <h5 className="strong-title">{menu.title}</h5>
                      <p>{menu.description}</p>
                      {menu.btnAdd ? <Button onClick={() => setShowModalAdd(true)}>Thêm chính sách giá</Button> : null}
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
                  </React.Fragment>
                ))}
              </Row>
            </Col>
          </Card.Body>
        </Row>
      </Card>
    </>
  );
}
