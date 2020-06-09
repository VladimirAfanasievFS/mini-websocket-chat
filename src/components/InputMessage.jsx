import React, { useContext, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { unwrapResult } from '@reduxjs/toolkit';
import { messages } from '../selectors';
import NickNameContext from '../lib/context';
import { asyncActions } from '../slices';

const InputMessage = ({ currentChannelId }) => {
  const dispatch = useDispatch();
  const isMessagePending = useSelector(messages).statusRequest === 'pending';
  const inputChatRef = useRef();
  const nickName = useContext(NickNameContext);

  const handleSubmit = async (values, { resetForm, setErrors }) => {
    try {
      const resultAction = await dispatch(asyncActions.postMessage({
        channelId: currentChannelId,
        message: values.inputChat,
        nickName,
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
              render={(msg) => (
                <div className="alert alert-danger" role="alert">
                  {msg}
                </div>
              )}
            />
            <Form className="input-group">
              <Field className="form-control" innerRef={inputChatRef} name="inputChat" type="text" disabled={isMessagePending} />
              <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="submit">
                  {isSubmitting
                    ? <FontAwesomeIcon icon={faSpinner} spin />
                    : <FontAwesomeIcon icon={faPaperPlane} />}
                </button>
              </div>
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
};

export default InputMessage;
