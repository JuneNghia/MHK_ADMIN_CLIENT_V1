import React from 'react';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { Row, Col, Alert, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik } from 'formik';
import useScriptRef from '../../../hooks/useScriptRef';
import Breadcrumb from '../../../layouts/AdminLayout/Breadcrumb';
import back4 from '../../../assets/images/bg-images/bg4.jpg';
import withReactContent from 'sweetalert2-react-content';
import services from '../../../utils/axios';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';
import logo from '../../../assets/images/auth/logo-mhk.png';

const SignUp = () => {
  const history = useHistory();
  const scriptedRef = useScriptRef();
  const phoneRegExp = /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0|3|4|5|7|8])+([0-9]{7})$/;

  const sweetSuccessAlert = () => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: 'Đăng ký tài khoản thành công',
      text: 'Chào mừng bạn đến với MHK, nhấn vào nút dưới đây để đăng nhập và trải nghiệm dịch vụ của chúng tôi',
      type: 'success',
      icon: 'success',
      confirmButtonText: 'Đăng nhập ngay',
      confirmButtonColor: 'success',
      showCancelButton: false
    }).then((willExit) => {
      if (willExit.isConfirmed) {
        return history.push('/auth/signin');
      } else {
      }
    });
  };

  const handleSubmit = (values, { setErrors, setStatus, setSubmitting }) => {
    setTimeout(async () => {
      try {
        const newUserData = {
          name: values.name,
          phone: values.phone,
          email: values.email,
          password: values.password
        };
        await services.post('/auth/register', newUserData);

        if (scriptedRef.current) {
          setStatus({ success: true });
          setSubmitting(false);
          sweetSuccessAlert();
        }
      } catch (err) {
        if (scriptedRef.current) {
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
        }
      }
    }, 3000);
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>Đăng ký</title>
      </Helmet>
      <Breadcrumb />
      <div className="auth-wrapper aut-bg-img-side cotainer-fiuid align-items-stretch">
        <div className="row align-items-center w-100 align-items-stretch bg-white">
          <div
            className="d-none d-lg-flex col-lg-8 aut-bg-img align-items-center d-flex justify-content-center"
            style={{
              backgroundImage: `url(${back4})`,
              backgroundSize: 'cover',
              backgroundAttachment: 'fixed',
              backgroundPosition: 'center'
            }}
          >
            <div className="col-md-8">
              <img style={{ width: '67%' }} src={logo}></img>
            </div>
          </div>
          <div className="col-lg-4 align-items-stret h-100 align-items-center d-flex justify-content-center">
            <div className=" auth-content text-center">
              <div className="mb-4">
                <i className="feather icon-user-plus auth-icon" />
              </div>
              <h3 className="mb-4">Đăng ký tài khoản</h3>

              <Formik
                initialValues={{
                  name: '',
                  phone: '',
                  email: '',
                  password: '',
                  repassword: '',
                  submit: null
                }}
                validationSchema={Yup.object().shape({
                  name: Yup.string().max(255).required('Tên không được bỏ trống'),
                  phone: Yup.string().matches(phoneRegExp, 'Số điện thoại không hợp lệ').required('Vui lòng nhập số điện thoại'),
                  email: Yup.string().email('Địa chỉ email không hợp lệ').max(255).required('Vui lòng nhập địa chỉ Email'),
                  password: Yup.string().max(255).required('Vui lòng nhập mật khẩu').min(8, 'Mật khẩu phải có ít nhất 8 ký tự'),
                  repassword: Yup.string()
                    .oneOf([Yup.ref('password'), null], 'Mật khẩu nhập lại không khớp')
                    .required('Vui lòng nhập lại mật khẩu')
                })}
                onSubmit={handleSubmit}
              >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                  <form noValidate onSubmit={handleSubmit}>
                    {errors.submit && (
                      <Col sm={12}>
                        <Alert className="text-c-red">Email hoặc số điện thoại đã tồn tại</Alert>
                      </Col>
                    )}
                    <div className="form-group mb-3">
                      <label style={{ width: '100%', textAlign: 'left' }} htmlFor="name">
                        Họ và tên
                      </label>
                      <input
                        className="form-control"
                        error={touched.name && errors.name}
                        id="name"
                        name="name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="text"
                        inputMode="numeric"
                        value={values.name}
                      />
                      {touched.name && errors.name && <small class="text-danger form-text">{errors.name}</small>}
                    </div>
                    <div className="form-group mb-3">
                      <label style={{ width: '100%', textAlign: 'left' }} htmlFor="email">
                        Địa chỉ email
                      </label>
                      <input
                        className="form-control"
                        error={touched.email && errors.email}
                        id="email"
                        name="email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="email"
                        value={values.email}
                      />
                      {touched.email && errors.email && <small class="text-danger form-text">{errors.email}</small>}
                    </div>
                    <div className="form-group mb-3">
                      <label style={{ width: '100%', textAlign: 'left' }} htmlFor="phone">
                        Số điện thoại
                      </label>
                      <input
                        className="form-control"
                        error={touched.phone && errors.phone}
                        id="phone"
                        name="phone"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="text"
                        style={{ appearance: 'none' }}
                        value={values.phone}
                      />
                      {touched.phone && errors.phone && <small class="text-danger form-text">{errors.phone}</small>}
                    </div>
                    <div className="form-group mb-3">
                      <label style={{ width: '100%', textAlign: 'left' }} htmlFor="password">
                        Mật khẩu
                      </label>
                      <input
                        className="form-control"
                        error={touched.password && errors.password}
                        id="password"
                        name="password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="password"
                        value={values.password}
                      />
                      {touched.password && errors.password && <small class="text-danger form-text">{errors.password}</small>}
                    </div>
                    <div className="form-group mb-3">
                      <label style={{ width: '100%', textAlign: 'left' }} htmlFor="repassword">
                        Nhập lại mật khẩu
                      </label>
                      <input
                        className="form-control"
                        error={touched.repassword && errors.repassword}
                        id="repassword"
                        name="repassword"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="password"
                        value={values.repassword}
                      />
                      {touched.repassword && errors.repassword && <small class="text-danger form-text">{errors.repassword}</small>}
                    </div>

                    <div className="custom-control custom-checkbox  text-left mb-4 mt-2">
                      <input type="checkbox" className="custom-control-input" id="customCheck1" />
                      <label className="custom-control-label" htmlFor="customCheck1">
                        Nhận thông báo khuyến mãi hàng tuần qua Email
                      </label>
                    </div>

                    <Row>
                      <Col mt={2}>
                        <Button
                          className="btn-block mb-4"
                          color="primary"
                          disabled={isSubmitting}
                          size="large"
                          type="submit"
                          variant="primary"
                        >
                          {isSubmitting ? 'Đang đăng ký...' : 'Đăng ký'}
                        </Button>
                      </Col>
                    </Row>
                  </form>
                )}
              </Formik>
              <p className="mb-0 text-muted">
                Đã có tài khoản? <NavLink to="/auth/signin">Đăng nhập</NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SignUp;
