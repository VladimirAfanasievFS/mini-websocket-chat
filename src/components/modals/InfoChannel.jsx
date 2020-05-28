import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import { actions } from '../../slices';
import { modalProps } from '../../selectors';

const InfoChannel = () => {
  const dispatch = useDispatch();
  const { message } = useSelector(modalProps);
  console.log('InfoChannel -> message', message);
  const handleHide = () => {
    dispatch(actions.hideModal());
  };

  const handleSubmit = () => {
    handleHide();
  };


  return (
    <Modal show onHide={handleHide}>
      <Modal.Header closeButton>
        <Modal.Title>Info</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <div className="alert alert-danger" role="alert">
            {message}
          </div>
          <Button type="submit" className="btn btn-primary">OK</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default InfoChannel;
