import React, { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, FormGroup, FormControl } from 'react-bootstrap';
import { actions, asyncActions } from '../../slices';
import { modalProps } from '../../selectors';

const RenameChannel = () => {
  const dispatch = useDispatch();
  const { channel } = useSelector(modalProps);
  const handleHide = () => {
    dispatch(actions.hideModal());
  };

  const f = useFormik({
    onSubmit: (values) => {
      dispatch(asyncActions.renameChannel({ channelId: channel.id, name: `${values.body}` }));
      handleHide();
    },
    initialValues: { body: channel.name },
  });

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Modal show onHide={handleHide}>
      <Modal.Header closeButton>
        <Modal.Title>Rename channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={f.handleSubmit}>
          <FormGroup>
            <FormControl
              ref={inputRef}
              onChange={f.handleChange}
              onBlur={f.handleBlur}
              value={f.values.body}
              name="body"
            />
          </FormGroup>
          <input type="submit" className="btn btn-primary" value="submit" />
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannel;
