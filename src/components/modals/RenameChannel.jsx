import React, { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import {
  Modal, FormGroup, FormControl, Form, Button,
} from 'react-bootstrap';
import * as Yup from 'yup';
import { unwrapResult } from '@reduxjs/toolkit';
import { actions, asyncActions } from '../../slices';
import { modalProps } from '../../selectors';


const RenameChannel = () => {
  const dispatch = useDispatch();
  const { channel } = useSelector(modalProps);
  const handleHide = () => {
    dispatch(actions.hideModal());
  };

  const f = useFormik({
    onSubmit: async (values) => {
      try {
        const resultAction = await dispatch(asyncActions.renameChannel({ channelId: channel.id, name: `${values.body}` }));
        unwrapResult(resultAction);
        handleHide();
      } catch ({ message }) {
        dispatch(actions.showModal({
          modalType: 'INFO_CHANNEL',
          modalProps: { message },
        }));
      }
    },
    initialValues: { body: channel.name },
    validationSchema:
      Yup.object().shape({
        body: Yup.string()
          .min(3, 'Too Short!')
          .max(10, 'Too Long!')
          .required('Required!'),
      }),
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
        <Form onSubmit={f.handleSubmit}>
          <FormGroup>
            <FormControl
              ref={inputRef}
              onChange={f.handleChange}
              onBlur={f.handleBlur}
              value={f.values.body}
              name="body"
              isInvalid={!!f.errors.body}
            />
            <Form.Control.Feedback type="invalid">
              {f.errors.body}
            </Form.Control.Feedback>
          </FormGroup>
          <Button type="submit" className="btn btn-primary">Confirm rename channel</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannel;
