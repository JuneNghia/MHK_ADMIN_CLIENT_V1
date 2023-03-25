import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { Col, Form, Row } from 'react-bootstrap';

const ProvinceDistrictSelect = ({ onChange, initialValues }) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const customNoOntionMessage = () => {
    return "Vui lòng chọn Tỉnh/Thành phố trước"
  }
  const customPlaceholder = (placeholder) => {
    return (
      <span className="flex-between">
        <span>Tìm kiếm hoặc chọn {placeholder}</span>
        <i className="feather icon-search"></i>
      </span>
    )
  }

  // Lấy danh sách các tỉnh
  useEffect(() => {
    axios
      .get('https://provinces.open-api.vn/api/?depth=2')
      .then((response) => {
        const options = response.data.map((province) => ({
          value: province.code,
          label: province.name,
          districts: province.districts
        }));
        setProvinces(options);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (initialValues.province) {
      const provinceOption = provinces.find((option) => option.label === initialValues.province);
      if (provinceOption) {
        setSelectedProvince(provinceOption);
        setDistricts(
          provinceOption.districts.map((district) => ({
            value: district.code,
            label: district.name
          }))
        );
      }
    }
    if (initialValues.district) {
      const districtOption = districts.find((option) => option.label === initialValues.district);
      if (districtOption) {
        setSelectedDistrict(districtOption);
      }
    }
  }, [initialValues, provinces]);



  const handleProvinceChange = (selectedOption) => {
    setSelectedProvince(selectedOption);
    setSelectedDistrict(null);
    setDistricts(
      selectedOption.districts.map((district) => ({
        value: district.code,
        label: district.name
      }))
    );
    onChange(selectedOption.label, null);
  };

  const handleDistrictChange = (selectedOption) => {
    setSelectedDistrict(selectedOption);
    onChange(selectedProvince.label, selectedOption.label);
  };

  return (
    <Row>
      <Col sm={12} lg={6}>
        <Form.Label>
          Chọn Tỉnh/Thành phố <span className="text-c-red">*</span>
        </Form.Label>
        <Select value={selectedProvince} options={provinces} onChange={handleProvinceChange} placeholder={customPlaceholder("Tỉnh/Thành phố")}/>
      </Col>
      <Col sm={12} lg={6}>
        <Form.Label>
          Chọn Quận/Huyện <span className="text-c-red">*</span>
        </Form.Label>
        <Select value={selectedDistrict} noOptionsMessage={customNoOntionMessage} options={districts} onChange={handleDistrictChange} placeholder={customPlaceholder("Quận/Huyện")} />
      </Col>
    </Row>
  );
};

export default ProvinceDistrictSelect;
