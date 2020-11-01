import React, { useContext, useRef } from 'react';
import { useDispatch } from 'react-redux';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InputGroup, Button, Alert } from 'react-bootstrap';
import { faSpinner, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { unwrapResult } from '@reduxjs/toolkit';

import userDataContext from '../lib/context';
import { asyncActions } from '../slices';

const InputMessage = ({ currentChannelId }) => {
  const dispatch = useDispatch();
  const inputChatRef = useRef();
  const { nickName, avatar } = useContext(userDataContext);

  const handleSubmit = async (values, { resetForm, setErrors }) => {
    try {
      const date = new Date();

      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        timezone: 'UTC',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      };
      const resultAction = await dispatch(asyncActions.postMessage({
        channelId: currentChannelId,
        message: values.inputChat,
        nickName,
        avatar,
        timestamp: date.toLocaleString('ru', options),
      }));
      unwrapResult(resultAction);
      resetForm();
    } catch (err) {
      setErrors({ inputChat: err.message });
    } finally {
      inputChatRef.current.focus();
    }
  };
  return (
    <div className="mt-auto">
      <Formik
        initialValues={{
          inputChat: '',
        }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <>
            <ErrorMessage
              name="inputChat"
              render={(msg) => <Alert variant="danger">{msg}</Alert>}
            />
            <Form>
              <InputGroup aria-label="Basic exame">
                <Field className="form-control" innerRef={inputChatRef} name="inputChat" type="text" disabled={isSubmitting} />
                <InputGroup.Append>
                  <Button variant="outline-secondary" type="submit" disabled={isSubmitting}>
                    {isSubmitting
                      ? <FontAwesomeIcon icon={faSpinner} spin />
                      : <FontAwesomeIcon icon={faPaperPlane} />}
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
};

export default InputMessage;
