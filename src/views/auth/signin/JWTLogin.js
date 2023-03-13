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
    setTimeout( async () => {
      try {
        await login(values.email, values.password);

        if (scriptedRef.current) {
          setStatus({ success: true });
          setSubmitting(false);
        }
      } catch (err) {
        if (scriptedRef.current) {
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
        }
      }
    }, 1000)
  }

  return (
    <Formik
      initialValues={{
        email: 'admin1@gmail.com',
        password: 'admin123',
        submit: null
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Địa chỉ email không hợp lệ').max(255).required('Email không được bỏ trống'),
        password: Yup.string().max(255).required('Mật khẩu không được bỏ trống')
      })}
      onSubmit={handleSubmit}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit} className={className} {...rest}>
          {errors.submit && (
            <Col sm={12}>
              <Alert className="text-c-red">Tài khoản hoặc mật khẩu không chính xác</Alert>
            </Col>
          )}
          <div className="form-group mb-3">
            <input
              className="form-control"
              error={touched.email && errors.email}
              label="Email Address / Username"
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              type="email"
              value={values.email}
            />
            {touched.email && errors.email && <small class="text-danger form-text">{errors.email}</small>}
          </div>
          <div className="form-group mb-4">
            <input
              className="form-control"
              error={touched.password && errors.password}
              label="Password"
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
              type="password"
              value={values.password}
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
                {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
              </Button>
            </Col>
          </Row>
        </form>
      )}
    </Formik>
  );
};

export default JWTLogin;
