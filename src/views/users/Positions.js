import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import Select from 'react-select';
import services from '../../utils/axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Positions = ({ positions, setPositions }) => {
  const [usedBranchValues, setUsedBranchValues] = useState([]);
  const [usedRoleValues, setUsedRoleValues] = useState([]);
  const [optionsBranch, setOptionsBranch] = useState([]);
  const [optionsRole, setOptionsRole] = useState([
    { label: 'Nhân viên kho', value: 'Nhân viên kho' },
    { label: 'Nhân viên vận chuyển', value: 'Nhân viên vận chuyển' },
    { label: 'Nhân viên bán hàng', value: 'Nhân viên bán hàng' },
    { label: 'Nhân viên kỹ thuật', value: 'Nhân viên kỹ thuật' },
    { label: 'Kế toán', value: 'Kế toán' }
  ]);

  useEffect(() => {
    services
      .get('/agency-branch/get-all')
      .then((res) => {
        const result = res.data.data;
        const options = result.map((branch) => ({
          label: branch.agency_branch_name,
          value: branch.id
        }));
        setOptionsBranch(options);
      })
      .catch((err) => {});
  }, []);

  const handleAddRole = () => {
    setPositions([...positions, { role: availableRoleOptions[0], branches: [] }]);
  };

  const handleRoleChange = (role, index) => {
    const newRole = [...positions.slice(0, index), { ...positions[index], role }, ...positions.slice(index + 1)];
    setPositions(newRole);
  };

  const handleBranchChange = (selectedOptions, index) => {
    const newBranch = [...positions];
    newBranch[index].branches = selectedOptions;
    setPositions(newBranch);
  };

  useEffect(() => {
    const selectedRoleValues = positions.map((item) => item.role.value);
    setUsedRoleValues(selectedRoleValues);

    const selectedBranchValues = positions.flatMap((item) => item.branches.map((branch) => branch.value));
    setUsedBranchValues(selectedBranchValues);
  }, [positions]);

  const availableRoleOptions = optionsRole.filter((option) => !usedRoleValues.includes(option.value));
  const availableBranchOptions = optionsBranch.filter((option) => !usedBranchValues.includes(option.value));

  const handleRemoveRole = (index) => {
    setPositions([...positions.slice(0, index), ...positions.slice(index + 1)]);
  };

  const formatOptionLabel = ({ value, label }) => (
    <div>
      <span>{label}</span>
      {/* {optionsBranch.some((option) => option.value === value) && (
        <span className="badge badge-pill badge-primary ml-2">Đang hoạt động</span>
      )} */}
    </div>
  );

  return (
    <>
      {positions.map((position, index) => (
        <Row key={index} style={{ alignItems: 'center' }}>
          <Col lg={5}>
            <Form.Group>
              <Form.Label>
                Vai trò <span className="text-c-red">*</span>
              </Form.Label>
              <Select
                name={`role-${index}`}
                value={position.role}
                onChange={(role) => handleRoleChange(role, index)}
                placeholder="Chọn vai trò"
                options={availableRoleOptions}
                noOptionsMessage={()=>('Đã chọn hết vai trò')}
              ></Select>
            </Form.Group>
          </Col>
          <Col lg={5}>
            <Form.Group controlId={`branch-${index}`}>
              <Form.Label>
                Chi nhánh <span className="text-c-red">*</span>
              </Form.Label>
              <Select
                placeholder="Chọn chi nhánh"
                onChange={(selectedOptions) => handleBranchChange(selectedOptions, index)}
                options={availableBranchOptions}
                isMulti
                formatOptionLabel={formatOptionLabel}
                defaultValue={position.branches}
                noOptionsMessage={()=>('Đã chọn hết chi nhánh')}
              ></Select>
            </Form.Group>
          </Col>
          <Col lg={2}>
            {index === 0 && (
              <a className="ml-5 mr-5" href="#">
                Xem chi tiết
              </a>
            )}
            {index > 0 && (
              <span>
                <a href="#" className="ml-5 mr-5" onClick={(e) => e.preventDefault()}>
                  Xem chi tiết
                </a>
                <a
                  href="#"
                  onClick={(e) => {
                    handleRemoveRole(index);
                    e.preventDefault();
                  }}
                >
                  Xoá
                </a>
              </span>
            )}
          </Col>
        </Row>
      ))}
      
      <Row className="mt-2">
        {availableBranchOptions.length === 0 || availableRoleOptions.length === 0 ? null : (
          <Col sm={12} lg={12}>
            <Button onClick={handleAddRole}>Thêm vai trò</Button>
          </Col>
        )}
      </Row>
    </>
  );
};

export default Positions;
