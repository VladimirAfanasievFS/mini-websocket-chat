import React, { useContext, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { unwrapResult } from '@reduxjs/toolkit';
import { messages } from '../selectors';
import NickNameContext from '../lib/context';
import { asyncActions } from '../slices';

const InputMessage = ({ currentChannelId }) => {
  const dispatch = useDispatch();
  const isMessagePending = useSelector(messages).statusRequest === 'pending';
  const errorMessages = useSelector(messages).error;
  const inputChatRef = useRef();
  const nickName = useContext(NickNameContext);
  return (
    <div className="mt-auto">
      <Formik
        initialValues={{
          inputChat: '',
        }}
        onSubmit={async (values, { resetForm }) => {
          try {
            const resultAction = await dispatch(asyncActions.postMessage({
              channelId: currentChannelId,
              message: values.inputChat,
              nickName,
            }));
            unwrapResult(resultAction);
            resetForm();
          } finally {
            inputChatRef.current.focus();
          }
        }}
      >
        {() => (
          <>
            {errorMessages && (
            <div className="alert alert-danger" role="alert">
              {errorMessages.message}
            </div>
            )}
            <Form className="input-group">
              <Field className="form-control" innerRef={inputChatRef} name="inputChat" type="text" disabled={isMessagePending} />
              <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="submit">
                  {isMessagePending
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
