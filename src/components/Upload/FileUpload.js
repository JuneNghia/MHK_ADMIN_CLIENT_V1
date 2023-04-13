import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { DropzoneComponent } from 'react-dropzone-component';

const FileUpload = () => {
  const djsConfig = {
    dictDefaultMessage: 'Kéo thả tệp tin vào đây hoặc nhấp để chọn tệp tin',
    dictFallbackMessage: 'Trình duyệt của bạn không hỗ trợ kéo và thả. Vui lòng sử dụng biểu tượng tải lên để chọn tệp tin.',
    dictRemoveFile: "Xoá",
    addRemoveLinks: true,
    acceptedFiles: 'image/jpeg,image/png,image/gif'
    /*autoProcessQueue: false,
        uploadprogress: 100,
        maxFiles: 1*/
  };

  const config = {
    iconFiletypes: ['.jpg', '.png', '.gif'],
    showFiletypeIcon: true,
    postUrl: '/'
  };

  const eventHandlers = {
    init: (dz) => {
      console.log('Dropzone component initialized:', dz);
    },
    drop: (e) => {
      console.log('File dropped:', e);
    },
    addedfile: (file) => {
      console.log('File added:', file);
    },
    success: (file) => {
      console.log('File uploaded:', file);
    }
  };

  return (
    <Col lg={12}>
      <DropzoneComponent config={config} eventHandlers={eventHandlers} djsConfig={djsConfig}></DropzoneComponent>
    </Col>
  );
};

export default FileUpload;
