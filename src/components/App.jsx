import React, { useContext, useRef, useEffect } from 'react';
// import Formik from './components/Formik';
import { useDispatch, useSelector } from 'react-redux';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import cn from 'classnames';
import {
  getInputChat2, getChannels, currentChannelId, getMessages,
} from '../selectors';
import routes from '../routes';
import nickNameContext from '../lib/context';
import { actions, asyncActions } from '../slices';
import socket from '../socket';


const App = ({ gon }) => {
  const channelId = useSelector(currentChannelId);
  const messages = useSelector(getMessages(channelId));
  const channels = useSelector(getChannels);
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
  }, [dispatch]);

  return (
    <div className="row h-100 pb-3">
      <div className="col-3 border-right">
        <div className="d-flex mb-2">
          <span>Channels</span>
          <button
            type="button"
            onClick={() => {
              dispatch(asyncActions.postChannel({ name: `newChannel${_.uniqueId()}` }));
            }}
            className="btn btn-link p-0 ml-auto"
          >
            +
          </button>
        </div>
        <ul className="nav flex-column nav-pills nav-fill">
          {channels && channels.map((channel) => {
            const channelClass = cn('nav-link btn btn-block', { active: channel.id === channelId });
            return (
              <li key={channel.id} className="nav-item">
                <button onClick={handleClickChannel(channel.id)} type="button" className={channelClass}>
                  {
                channel.name
              }
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="col h-100">
        <div className="d-flex flex-column h-100">
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
                dispatch(asyncActions.postMessage({ channelId, message: values.inputChat, nickName }));
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
  );
};

export default App;
