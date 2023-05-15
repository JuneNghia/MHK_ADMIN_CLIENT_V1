import React, { useState } from 'react';
import { Card, Col, Row, Button, FormLabel, FormControl } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import { generalInfo, priceInfo, additionalInfo } from './InfoProduct';
import ToggleSwitch from '../../../../../components/Toggle/ToggleSwitch';
// import service from '../../../../utils/axios';
import { ButtonLoading } from '../../../../../components/Button/LoadButton';
import Swal from 'sweetalert2';
import AddDescription from './AddDescription';
import CreateInfoProduct from './CreateInfoProduct';

function FormCreateProducts() {
  // const [toggleWareHouse, setToggleWareHouse] = useState(false);
  // const [toggleTax, setToggleTax] = useState(false);
  // const [listBranches, setListBranches] = useState([]);
  const [toggleProperty, setToggleProperty] = useState(false);
  const [toggleUnit, setToggleUnit] = useState(false);
  const [toggleAllowSell, setToggleAllowSale] = useState(false);
  const [description, setDescription] = useState('');
  const [showLoader, setShowLoader] = useState(false);
  const [inputProperty, setInputProterty] = useState(['Kích thước', 'Màu sắc', 'Chất liệu']);
  const history = useHistory();

  const [data, setData] = useState({
    product_name: '',
    product_code: '',
    product_weight: '',
    product_barcode: '',
    product_unit_price: '',
    product_type: '',
    product_brand: '',
    product_tags: '',
    price_retail: '',
    price_wholesales: '',
    price_import: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // useEffect(() => {
  //   service
  //     .get('/agency-branch/get-all')
  //     .then((res) => {
  //       setListBranches(res.data.data);
  //     })
  //     .catch((err) => {
  //       console.log('Get List Branches Error : ' + err);
  //     });
  // }, []);

  const handleSubmit = () => {
    const submitData = { ...data, description: description, isAllowSell: toggleAllowSell };
    console.log(submitData);
  };

  const cardInfo = [
    {
      title: 'Thông tin chung',
      lg: 8,
      sm: 12,
      body: (
        <>
          {generalInfo.map((info, index) => (
            <CreateInfoProduct
              key={info.name}
              lg={info.lg}
              sm={info.sm}
              label={info.label}
              require={info.require}
              placeholder={info.placeholder}
              name={info.name}
              input={info.input}
              value={data[info.name]}
              onChange={handleChange}
            />
          ))}
          <AddDescription onDescriptionChange={(value) => setDescription(value)} />
        </>
      )
    },
    {
      title: 'Thông tin bổ sung',
      lg: 4,
      sm: 12,
      body: (
        <>
          {additionalInfo.map((info, index) => (
            <CreateInfoProduct
              key={info.name}
              lg={info.lg}
              sm={info.sm}
              label={info.label}
              require={info.require}
              placeholder={info.placeholder}
              name={info.name}
              input={info.input}
              value={data[info.name]}
              onChange={handleChange}
            />
          ))}
        </>
      )
    },
    {
      title: 'Cài đặt trạng thái',
      lg: 4,
      sm: 12,
      body: (
        <>
          <Col lg={12}>
            <FormLabel className="flex-between">
              <span>Cho phép bán</span>
              <ToggleSwitch id="allowSell" value={toggleAllowSell} setValue={setToggleAllowSale} />
            </FormLabel>
          </Col>
          {/* <Col lg={12}>
            <FormLabel className="flex-between">
              <span>Áp dụng thuế</span>
              <ToggleSwitch id="tax" value={toggleTax} setValue={setToggleTax} />
            </FormLabel>
          </Col> */}
        </>
      )
    },
    {
      title: 'Giá sản phẩm',
      lg: 8,
      sm: 12,
      body: (
        <>
          {priceInfo.map((info, index) => (
            <CreateInfoProduct
              key={info.name}
              lg={info.lg}
              sm={info.sm}
              label={info.label}
              require={info.require}
              placeholder={info.placeholder}
              name={info.name}
              input={info.input}
              value={data[info.name]}
              onChange={handleChange}
            />
          ))}
        </>
      )
    },
    // { title: 'Ảnh sản phẩm', lg: 8, sm: 12, body: <FileUpload /> },
    // {
    //   title: 'Khởi tạo kho hàng',
    //   toggleTitle: <ToggleSwitch id="warehouse" value={toggleWareHouse} setValue={setToggleWareHouse} />,
    //   lg: 8,
    //   sm: 12,
    //   subTitle: 'Ghi nhận số lượng Tồn kho ban đầu và Giá vốn của sản phẩm tại các Chi nhánh',
    //   isToggleOn: toggleWareHouse,
    //   body: (
    //     <>
    //       <Col lg={12}>
    //         <Row>
    //           <Col lg={4}>
    //             <p className="strong-title text-normal">Chi nhánh</p>
    //           </Col>
    //           <Col lg={4}>
    //             <p className="strong-title text-normal">Tồn kho ban đầu</p>
    //           </Col>
    //           <Col lg={4}>
    //             <p className="strong-title text-normal">Giá vốn</p>
    //           </Col>
    //         </Row>
    //       </Col>

    //       <Row>
    //         {listBranches.map((branch, index) => (
    //           <Col key={index} lg={12} className="d-flex flex-row mt-4 align-items-center text-normal">
    //             <Col lg={4}>
    //               <span className="text-uppercase">{branch.agency_branch_name}</span>
    //             </Col>
    //             <Col lg={4}>
    //               <Form.Control value="0" />
    //             </Col>
    //             <Col lg={4}>
    //               <Form.Control value="0" />
    //             </Col>
    //           </Col>
    //         ))}
    //       </Row>
    //     </>
    //   )
    // },
    {
      title: 'Thuộc tính',
      toggleTitle: <ToggleSwitch id="property" value={toggleProperty} setValue={setToggleProperty} />,
      lg: 8,
      sm: 12,
      subTitle: 'Thêm mới thuộc tính giúp sản phẩm có nhiều lựa chọn, như kích cỡ hay màu sắc',
      isToggleOn: toggleProperty,
      body: (
        <>
          <Col>
            <Row>
              <Col lg={5}>
                <p className="strong-title text-normal">Tên thuộc tính</p>
              </Col>
              <Col lg={7}>
                <p className="strong-title text-normal">Giá trị</p>
              </Col>
            </Row>
            {inputProperty.map((property) => (
              <Row>
                <Col className="mb-3" lg={5}>
                  <FormControl value={property}></FormControl>
                </Col>
                <Col className="mb-3" lg={7}>
                  <FormControl></FormControl>
                </Col>
              </Row>
            ))}
          </Col>
        </>
      )
    },
    {
      title: 'Thêm đơn vị quy đổi',
      toggleTitle: <ToggleSwitch id="unit" value={toggleUnit} setValue={setToggleUnit} />,
      lg: 8,
      sm: 12,
      subTitle: 'Tạo và quy đổi các đơn vị tính khác nhau',
      isToggleOn: toggleUnit
    }
  ];

  const handleExitBtn = () => {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn thoát ?',
      text: 'Mọi dữ liệu của bạn sẽ không được thay đổi',
      type: 'warning',
      icon: 'question',
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Quay lại',
      showCancelButton: true
    }).then((willExit) => {
      if (willExit.isConfirmed) {
        return history.push('/app/sell-management/products');
      } else {
        return;
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>Thêm sản phẩm</title>
      </Helmet>
      <span className="flex-between">
        <Button onClick={handleExitBtn} variant="outline-primary" className="mr-0 mb-3">
          <i className="feather icon-arrow-left"></i>
          Quay lại danh sách sản phẩm
        </Button>
        <ButtonLoading
          text={
            <span>
              <i className="feather icon-plus-circle mr-2"></i>
              Lưu sản phẩm mới
            </span>
          }
          loading={showLoader}
          type="submit"
          onSubmit={handleSubmit}
          disabled={showLoader}
          className="mx-0 my-0 mb-3"
        ></ButtonLoading>
      </span>
      <Row>
        <Col lg={8}>
          <Row>
            <Col lg={12}>
              {cardInfo.map((card, index) => (
                <>
                  {card.lg === 8 ? (
                    <Card key={index}>
                      <Card.Header>
                        <Card.Title as="h5">
                          <span className="item-center">
                            <span>{card.title}</span>
                            <span className="ml-3">{card.toggleTitle ? card.toggleTitle : null}</span>
                          </span>
                          {card.subTitle ? (
                            <p style={{ margin: 0 }} className="mt-2 text-muted">
                              {card.subTitle}
                            </p>
                          ) : null}
                        </Card.Title>
                      </Card.Header>
                      {card.isToggleOn === false ? null : (
                        <Card.Body>
                          <Row>{card.body}</Row>
                        </Card.Body>
                      )}
                    </Card>
                  ) : null}
                </>
              ))}
            </Col>
          </Row>
        </Col>

        <Col lg={4}>
          <Row>
            <Col lg={12}>
              {cardInfo.map((card, index) => (
                <>
                  {card.lg === 4 ? (
                    <Card key={index}>
                      <Card.Header>
                        <Card.Title as="h5">
                          {card.title}
                          {card.subTitle ? (
                            <p style={{ margin: 0 }} className="mt-2 text-muted">
                              {card.subTitle}
                            </p>
                          ) : null}
                        </Card.Title>
                      </Card.Header>
                      {card.isToggleOn === false ? null : (
                        <Card.Body>
                          <Row>{card.body}</Row>
                        </Card.Body>
                      )}
                    </Card>
                  ) : null}
                </>
              ))}
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default FormCreateProducts;
