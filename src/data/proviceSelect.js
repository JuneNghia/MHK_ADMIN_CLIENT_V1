import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { Col, Form, Row } from 'react-bootstrap';

const ProvinceDistrictSelect = ({ onChange, initialValues }) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const customNoOptionMessage = (province) => {
    if(province === true)
    return "Tỉnh/Thành phố bạn đang tìm kiếm không tồn tại"
    else return "Vui lòng chọn Tỉnh/Thành phố trước";
  };
  const customPlaceholder = (placeholder) => {
    return (
      <span className="flex-between">
        <span>Tìm kiếm hoặc chọn {placeholder}</span>
        <i className="feather icon-search"></i>
      </span>
    );
  };

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
    if (initialValues.province && selectedProvince !== initialValues.province) {
      const provinceOption = provinces.find(
        (province) => province.label === initialValues.province
      );
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
  }, [initialValues.province, provinces, selectedProvince]);

  useEffect(() => {
    if (initialValues.district && selectedDistrict !== initialValues.district) {
      const districtOption = districts.find(
        (district) => district.label === initialValues.district
      );
      if (districtOption) {
        setSelectedDistrict(districtOption);
      }
    }
  }, [initialValues.district, districts, selectedDistrict]);

  const handleProvinceChange = (selectedOption) => {
    setSelectedProvince(selectedOption);
    setSelectedDistrict(null);
    setDistricts(
      selectedOption.districts.map((district) => ({
        value: district.code,
        label: district.name
      }))
    );
    onChange(selectedOption.label, '---');
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
        <Select value={selectedProvince} noOptionsMessage={() => customNoOptionMessage(true)} options={provinces} onChange={handleProvinceChange} placeholder={customPlaceholder("Tỉnh/Thành phố")}/>
      </Col>
      <Col sm={12} lg={6}>
        <Form.Label>
          Chọn Quận/Huyện
        </Form.Label>
        <Select value={selectedDistrict} noOptionsMessage={() => customNoOptionMessage(false)} options={districts} onChange={handleDistrictChange} placeholder={customPlaceholder("Quận/Huyện")} />
      </Col>
    </Row>
  )
}

export default ProvinceDistrictSelect;