import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { actions, asyncActions } from '../../slices';
import { modalProps } from '../../selectors';

const RemoveChannel = () => {
  const dispatch = useDispatch();
  const { id } = useSelector(modalProps);
  const handleHide = () => {
    dispatch(actions.hideModal());
  };

  const handleSubmit = () => {
    dispatch(asyncActions.removeChannel({ channelId: id }));
    handleHide();
  };


  return (
    <Modal show onHide={handleHide}>
      <Modal.Header closeButton>
        <Modal.Title>Remove channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <input type="submit" className="btn btn-primary" value="remove" />
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannel;
