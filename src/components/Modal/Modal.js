import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function ModalComponent(props) {
  const { size, show, handleClose, handleSubmit, title, body, textSubmit, disabled, handleDelete, isDelete} = props;

  return (
    <Modal size={size} show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title as="h5">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Thoát
        </Button>
        {handleDelete ? (
          <Button disabled={isDelete} variant="outline-danger" onClick={handleDelete}>
            {isDelete ? 'Đang xoá...' : 'Xoá'}
          </Button>
        ) : null}
        <Button disabled={disabled} variant="primary" onClick={handleSubmit}>
          {textSubmit}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalComponent;
