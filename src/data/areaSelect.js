import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';

const ProvinceSelect = ({ handleProvinceChange }) => {
    const [provinces, setProvinces] = useState([]);
  
    useEffect(() => {
      const fetchProvinces = async () => {
        const response = await axios.get('https://provinces.open-api.vn/api/?depth=2');
        setProvinces(response.data);
      };
  
      fetchProvinces();
    }, []);
  
    const options = provinces.map((province) => ({
      value: province.code,
      label: province.name,
      provinceData: province
    }));
  
    const handleChange = (selectedOption) => {
      handleProvinceChange(selectedOption);
    };
  
    return <Select placeholder="Chọn Tỉnh/Thành phố" options={options} onChange={handleChange} />;
  };

export default ProvinceSelect;