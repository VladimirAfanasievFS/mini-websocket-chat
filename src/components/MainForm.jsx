import React, { useContext, useRef, useEffect } from 'react';
// import Formik from './components/Formik';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus, faMinus, faEdit, faSpinner, faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';
import {
  getArrayChannels, getCurrentChannelId, getArrayMessages, messages, channels,
} from '../selectors';
import NickNameContext from '../lib/context';
import { actions, asyncActions } from '../slices';
import socket from '../socket';
import ModalRoot from './ModalRoot';


const MainForm = () => {
  const currentChannelId = useSelector(getCurrentChannelId);
  const currentChannelMessages = useSelector(getArrayMessages(currentChannelId));
  const ArrayChannels = useSelector(getArrayChannels);
  const isMessagePending = useSelector(messages).statusRequest === 'pending';
  const errorMessages = useSelector(messages).error;
  const errorChannels = useSelector(channels).error;
  const dispatch = useDispatch();
  const nickName = useContext(NickNameContext);
  const inputChatRef = useRef();
  const handleClickChannel = (id) => () => {
    dispatch(actions.changeChannel({ id }));
  };
  useEffect(() => {
    if (errorChannels) {
      dispatch(actions.showModal({
        modalType: 'INFO_CHANNEL',
        modalProps: { message: errorChannels.message },
      }));
    }
  }, [dispatch, errorChannels]);
  useEffect(() => {
    console.log('UseEffect->socket.on(newMessage', socket);
    socket.on('newMessage', (data) => {
      dispatch(actions.addMessage(data));
    });
    socket.on('newChannel', (data) => {
      dispatch(actions.addChannel(data));
    });
    socket.on('renameChannel', (data) => {
      dispatch(actions.renameChannel(data));
    });
    socket.on('removeChannel', (data) => {
      dispatch(actions.removeChannel(data));
    });
  }, [dispatch]);

  const renderSettingButtons = (channel) => (
    <div>
      <button
        type="button"
        onClick={() => {
          console.log('App -> currrentChannel', channel);
          dispatch(actions.showModal({
            modalType: 'RENAME_CHANNEL',
            modalProps: { channel },
          }));
        }}
        className="btn btn-link"
      >
        <FontAwesomeIcon icon={faEdit} />
      </button>
      <button
        type="button"
        onClick={() => {
          dispatch(actions.showModal({
            modalType: 'REMOVE_CHANNEL',
            modalProps: { id: channel.id },
          }));
        }}
        className="btn btn-link"
      >
        <FontAwesomeIcon icon={faMinus} />
      </button>
    </div>
  );

  return (
    <>
      <div className="row h-100 pb-3">
        <div className="col-3 border-right">
          <div className="d-flex p-2 mb-2 bg-info text-white">
            <b>{`Current User: ${nickName}`}</b>
          </div>
          <div className="d-flex mb-2">
            <span>Channels</span>
            <button
              type="button"
              onClick={() => {
                dispatch(actions.showModal({
                  modalType: 'ADD_CHANNEL',
                  modalProps: { },
                }));
              }}
              className="btn btn-link p-0 ml-auto"
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
          <ul className="nav flex-column nav-pills nav-fill">
            {ArrayChannels && ArrayChannels.map((channel) => {
              const channelClass = cn('nav-link btn', { active: channel.id === currentChannelId });

              return (
                <li key={channel.id} className="nav-item d-flex justify-content-between">
                  <button onClick={handleClickChannel(channel.id)} type="button" className={channelClass}>
                    { channel.name }
                  </button>
                  {channel.removable && renderSettingButtons(channel) }
                </li>
              );
            })}
          </ul>
        </div>
        <div className="col h-100">
          <div className="d-flex flex-column h-100">
            <div id="messages-box" className="chat-messages overflow-auto mb-3">
              {currentChannelMessages && currentChannelMessages.map((message) => (
                <div>
                  <b>{message.nickName}</b>
                  :
                  {' '}
                  {message.message}
                </div>
              ))}
            </div>
            <div className="mt-auto">
              <Formik
                initialValues={{
                  inputChat: '',
                }}
                onSubmit={async (values, { resetForm }) => {
                  await dispatch(asyncActions.postMessage({
                    channelId: currentChannelId,
                    message: values.inputChat,
                    nickName,
                  })).then(() => {
                    resetForm();
                    inputChatRef.current.focus();
                  });
                }}
              >
                {() => (
                  <>
                    { errorMessages && (
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
                            : <FontAwesomeIcon icon={faPaperPlane} /> }
                        </button>
                      </div>

                    </Form>

                  </>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
      <ModalRoot />
    </>
  );
};

export default MainForm;
