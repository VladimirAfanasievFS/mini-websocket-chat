import React, { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import {
  Modal, FormGroup, FormControl, Form, Button,
} from 'react-bootstrap';
import * as Yup from 'yup';
import { actions, asyncActions } from '../../slices';


const AddChannel = () => {
  const dispatch = useDispatch();

  const handleHide = () => {
    dispatch(actions.hideModal());
  };

  const f = useFormik({
    onSubmit: async (values) => {
      try {
        const ddd = await dispatch(asyncActions.postChannel({ name: `${values.body}` }));
        console.log(ddd);
        handleHide();
      } catch (err) {
        dispatch(actions.showModal({
          modalType: 'INFO_CHANNEL',
          modalProps: { err },
        }));
      }
    },
    initialValues: { body: '' },
    initialErrors: { body: 'Required' },
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
        <Modal.Title>Add new channel</Modal.Title>
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
          <Button disabled={f.errors.body} type="submit" className="btn btn-primary">Confirm add channel</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannel;
