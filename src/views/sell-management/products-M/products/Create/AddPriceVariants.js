import React, { useState } from 'react';
import ModalComponent from '../../../../../components/Modal/Modal';
import ModalPrice from '../../../../configurations/price/ModalPrice';
import Swal from 'sweetalert2';
import services from '../../../../../utils/axios';

export default function AddPriceVariants({ showModalAdd, setShowModalAdd }) {
  const [showLoader, setShowLoader] = useState(false);
  const [isImportDefault, setIsImportDefault] = useState(false);
  const [isSellDefault, setIsSellDefault] = useState(false);
  const [newPrice, setNewPrice] = useState({
    price_type: '',
    price_description: '',
    isImportDefault: isImportDefault,
    isSellDefault: isSellDefault
  });

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

  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    setNewPrice((prevData) => ({
      ...prevData,
      [name]: value,
      isImportDefault: name === 'isImportDefault' ? checked : prevData.isImportDefault,
      isSellDefault: name === 'isSellDefault' ? checked : prevData.isSellDefault
    }));
  };
  return (
    <ModalComponent
      size="lg"
      show={showModalAdd}
      title="Thêm chính sách giá"
      handleClose={() => setShowModalAdd(false)}
      textSubmit={showLoader ? 'Đang thêm' : 'Thêm'}
      disabled={showLoader}
      handleSubmit={handleAddPrice}
      body={
        <ModalPrice
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
  );
}
