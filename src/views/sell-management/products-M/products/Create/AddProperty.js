import { Formik } from 'formik';
import React, { useState } from 'react';
import { CloseButton, Col, FormControl, Row } from 'react-bootstrap';
import { validationProperty } from '../../../../../hooks/useValidation';
import { Link } from 'react-router-dom';

export default function AddProperty() {
  const [idProperty, setIdProperty] = useState(1);
  const [listProperty, setListProterty] = useState([
    {
      name: `property${idProperty}`
    }
  ]);
  
  const handleAddProperty = () => {
    setIdProperty((prev) => prev + 1);
    setListProterty([...listProperty, { name: `property${idProperty + 1}` }]);
  };

  const handleRemoveProperty = (index) => {
    
      
    setListProterty([...listProperty.slice(0, index), ...listProperty.slice(index + 1)]);
  };

  const initialValues = {
    property1: 'Kích thước',
    property2: 'Màu sắc',
    property3: 'Chất liệu'
  };

  return (
    <Formik enableReinitialize validationSchema={validationProperty} initialValues={initialValues}>
      {({ errors, values, touched, handleChange, handleBlur }) => (
        <Col>
          <Row>
            <Col lg={5}>
              <p className="strong-title text-normal">Tên thuộc tính</p>
            </Col>
            <Col lg={7}>
              <p className="strong-title text-normal">Giá trị</p>
            </Col>
          </Row>
          {listProperty.map((property, index) => (
            <Row className="mb-3" key={property.name}>
              <Col lg={5}>
                <FormControl onChange={handleChange} onBlur={handleBlur} name={property.name} value={values[property.name]} />
                {touched[property.name] && errors[property.name] && (
                  <small className="text-danger form-text">{errors[property.name]}</small>
                )}
              </Col>
              <Col lg={7} className="d-flex">
                <FormControl style={{ width: '95%', height: 'max-content' }}></FormControl>
                {index > 0 && (
                  <CloseButton
                    onClick={(e) => {
                      e.preventDefault();
                      handleRemoveProperty(index);
                    }}
                    className="ml-3 h-50"
                  />
                )}
              </Col>
            </Row>
          ))}
          {listProperty.length === 3 ? null : (
            <Link to="#">
              <i className="feather icon-plus-circle mr-2"></i>
              <span onClick={handleAddProperty}>Thêm thuộc tính</span>
            </Link>
          )}
        </Col>
      )}
    </Formik>
  );
}
