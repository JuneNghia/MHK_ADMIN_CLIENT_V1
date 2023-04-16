import React from 'react';
import { Row, Col, Alert, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik } from 'formik';
import useAuth from '../../../hooks/useAuth';
import useScriptRef from '../../../hooks/useScriptRef';

const JWTLogin = ({ className, ...rest }) => {
  const { login } = useAuth();
  const scriptedRef = useScriptRef();

  const handleSubmit = (values, { setErrors, setStatus, setSubmitting }) => {
    setTimeout(async () => {
      try {
        await login(values.phone, values.password);

        if (scriptedRef.current) {
          setStatus({ success: true });
          setSubmitting(false);
        }
      } catch (err) {
        if (scriptedRef.current) {
          setStatus({ success: false });
          if (err.message === 'Network Error') {
            setErrors({ submit: 'Lỗi kết nối máy chủ (500)' });
            setSubmitting(false);
          } else {
            setErrors({ submit: 'Tài khoản hoặc mật khẩu không chính xác' });
            setSubmitting(false);
          }
        }
      }
    }, 1000);
  };

  return (
    <Formik
      initialValues={{
        phone: '0987546325',
        password: 'mhkadmin@123',
        submit: null
      }}
      validationSchema={Yup.object().shape({
        phone: Yup.string().required('Số điện thoại không được bỏ trống'),
        password: Yup.string().max(255).required('Mật khẩu không được bỏ trống')
      })}
      onSubmit={handleSubmit}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit} className={className} {...rest}>
          {errors.submit && (
            <Col sm={12}>
              <Alert className="text-c-red">{errors.submit}</Alert>
            </Col>
          )}
          <div className="form-group mb-3">
            <input
              className="form-control"
              error={touched.phone && errors.phone}
              placeholder="Số điện thoại"
              name="phone"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.phone}
              autoComplete="username"
            />
            {touched.phone && errors.phone && <small class="text-danger form-text">{errors.phone}</small>}
          </div>
          <div className="form-group mb-4">
            <input
              className="form-control"
              error={touched.password && errors.password}
              name="password"
              placeholder="Mật khẩu"
              onBlur={handleBlur}
              onChange={handleChange}
              type="password"
              value={values.password}
              autoComplete="current-password"
            />
            {touched.password && errors.password && <small class="text-danger form-text">{errors.password}</small>}
          </div>

          <div className="custom-control custom-checkbox  text-left mb-4 mt-2">
            <input type="checkbox" className="custom-control-input" id="customCheck1" />
            <label className="custom-control-label" htmlFor="customCheck1">
              Nhớ mật khẩu
            </label>
          </div>

          <Row>
            <Col mt={2}>
              <Button className="btn-block mb-4" color="primary" disabled={isSubmitting} size="large" type="submit" variant="primary">
                {isSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
              </Button>
            </Col>
          </Row>
        </form>
      )}
    </Formik>
  );
};

export default JWTLogin;
