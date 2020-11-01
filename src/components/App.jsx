import React from 'react';
import { useSelector } from 'react-redux';
import { getCurrentChannelId } from '../selectors';
import ModalRoot from './ModalRoot';
import SideBar from './SideBar';
import Chat from './Chat';
import MessagesBox from './MessagesBox';
import InputMessage from './InputMessage';


const App = () => {
  const currentChannelId = useSelector(getCurrentChannelId);

  return (
    <div className="row h-100 pb-3 border rounded border-primary bg-light no-gutters">
      <SideBar className="col-3 border-right border-primary h-100" />
      <Chat className="col h-100 px-4 pt-2">
        <MessagesBox currentChannelId={currentChannelId} />
        <InputMessage currentChannelId={currentChannelId} />
      </Chat>
      <ModalRoot />
    </div>
  );
};

export default App;
