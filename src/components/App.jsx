import React from 'react';
// import Formik from './components/Formik';
import { useDispatch } from 'redux';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import { increment } from '../reducers/index';

const App = ({ gon }) => {
  const { channels } = gon;
  return (
    <div className="row h-100 pb-3">
      <div className="col-3 border-right">
        <div className="d-flex mb-2">
          <span>Channels</span>
          <button type="button" className="btn btn-link p-0 ml-auto">+</button>
        </div>
        <ul className="nav flex-column nav-pills nav-fill">
          {channels && channels.map((channel) => (
            <li key={channel.id} className="nav-item">
              <button type="button" className="nav-link btn btn-block">
                {
                channel.name
              }
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="col h-100">
        <div className="d-flex flex-column h-100">
          <div id="messages-box" className="chat-messages overflow-auto mb-3">
            <div>
              <b>Maddison.Steuber</b>
              : test
            </div>
          </div>
          <div className="mt-auto">
            <Formik
              initialValues={{ inputChat: '' }}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                  setSubmitting(false);
                }, 400);
              }}
            >
              <Form className="input-group">
                <Field className="form-control" name="inputChat" type="text" />
                <div className="input-group-append">
                  <button className="btn btn-outline-secondary" type="submit">Отправить</button>
                </div>
                <ErrorMessage name="inputChat" />
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
