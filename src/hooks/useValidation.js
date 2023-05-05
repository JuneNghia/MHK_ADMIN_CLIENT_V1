import * as Yup from 'yup';

const phoneRegExp = /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0|3|4|5|7|8])+([0-9]{7})$/;

export const validationSchema = Yup.object().shape({
  name: Yup.string().required('Tên khách hàng không được để trống'),
  email: Yup.string().email('Email không hợp lệ').required('Email không được để trống'),
  phone: Yup.string().matches(phoneRegExp, 'Số điện thoại không hợp lệ').required('Số điện thoại không được để trống'),
  code: Yup.string().required('Mã khách hàng không được để trống'),
  address: Yup.string().required('Địa chỉ không được để trống'),
  province: Yup.string().required('Vui lòng chọn Tỉnh/Thành phố'),
  password: Yup.string().required('Mật khẩu không được để trống').min(8, 'Mật khẩu phải có tối thiểu 8 kí tự'),
  positions: Yup.array().of(
    Yup.object().shape({
      role: Yup.mixed().required('Vui lòng chọn ít nhất một vai trò'),
      branches: Yup.array().min(1, 'Vui lòng chọn ít nhất một chi nhánh').required('Vui lòng chọn ít nhất một chi nhánh')
    })
  )
});
