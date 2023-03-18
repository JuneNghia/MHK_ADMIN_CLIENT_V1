import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';

const DistrictSelect = ({ province, handleChangeDistrict }) => {
  const customNoOptionsMessage = () => "Vui lòng chọn Tỉnh/Thành phố trước";  
  const [districts, setDistricts] = useState([]);
  
    useEffect(() => {
      const fetchDistricts = async () => {
        const response = await axios.get(`https://provinces.open-api.vn/api/p/${province.value}?depth=2`);
        setDistricts(response.data.districts);
      };
  
      fetchDistricts();
    }, [province]);

  
    const options = districts.map((district) => ({
      value: district.name,
      label: district.name,
    }));

    const handleChange = (selectedOption) => {
        handleChangeDistrict(selectedOption.label);
      };
  
    return <Select placeholder="Chọn Quận/Huyện" noOptionsMessage={customNoOptionsMessage} options={options} onChange={handleChange} />;
  };

export default DistrictSelect;
