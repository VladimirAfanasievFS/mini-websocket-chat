import React, { useContext, useRef, useEffect } from 'react';
// import Formik from './components/Formik';
import { useDispatch, useSelector } from 'react-redux';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faEdit } from '@fortawesome/free-solid-svg-icons';
import {
  getChannels, getCurrentChannelId, getMessages, getCurrentChannel,
} from '../selectors';
import nickNameContext from '../lib/context';
import { actions, asyncActions } from '../slices';
import socket from '../socket';
import ModalRoot from './ModalRoot';


const App = () => {
  const currentChannelId = useSelector(getCurrentChannelId);
  const messages = useSelector(getMessages(currentChannelId));
  const channels = useSelector(getChannels);
  const currentChannel = useSelector(getCurrentChannel);

  const dispatch = useDispatch();
  const nickName = useContext(nickNameContext);
  const inputChatRef = useRef();
  const handleClickChannel = (id) => () => {
    dispatch(actions.changeChannel({ id }));
  };
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

  const renderSettingButtons = () => (
    <div className="btn-toolbar m-0 border justify-content-end" role="toolbar" aria-label="Toolbar with button groups">
      <div className="btn-group" role="group" aria-label="Third group">
        <button
          type="button"
          onClick={() => {
            console.log('App -> currrentChannel', currentChannel);
            dispatch(actions.showModal({
              modalType: 'RENAME_CHANNEL',
              modalProps: { channel: currentChannel },
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
              modalProps: { id: currentChannelId },
            }));
          }}
          className="btn btn-link"
        >
          <FontAwesomeIcon icon={faMinus} />
        </button>
      </div>
    </div>
  );
  return (
    <>
      <div className="row h-100 pb-3">
        <div className="col-3 border-right">
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
            {channels && channels.map((channel) => {
              const channelClass = cn('nav-link btn btn-block', { active: channel.id === currentChannelId });
              return (
                <li key={channel.id} className="nav-item">
                  <button onClick={handleClickChannel(channel.id)} type="button" className={channelClass}>
                    { channel.name }
                  </button>
                </li>
              );
            })}
          </ul>

        </div>
        <div className="col h-100">
          <div className="d-flex flex-column h-100">

            { currentChannel.removable && renderSettingButtons() }

            <div id="messages-box" className="chat-messages overflow-auto mb-3">
              {messages && messages.map((message) => (
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
                onSubmit={(values, { resetForm }) => {
                  dispatch(asyncActions.postMessage({
                    channelId: currentChannelId,
                    message: values.inputChat,
                    nickName,
                  }));
                  resetForm();
                  inputChatRef.current.focus();
                }}
              >
                <Form className="input-group">
                  <Field className="form-control" innerRef={inputChatRef} name="inputChat" type="text" />
                  <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="submit">Отправить</button>
                  </div>
                  <ErrorMessage name="inputChat" />
                  {/* {touched.inputChat && error.inputChat ? error.inputChat : null} */}
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
      <ModalRoot />
    </>
  );
};

export default App;
