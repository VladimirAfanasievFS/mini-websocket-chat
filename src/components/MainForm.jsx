import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { channels, getCurrentChannelId } from '../selectors';
import { actions } from '../slices';
import ModalRoot from './ModalRoot';
import SideBar from './SideBar';
import Chat from './Chat';
import MessagesBox from './MessagesBox';
import InputMessage from './InputMessage';


const MainForm = () => {
  const errorChannels = useSelector(channels).error;
  const currentChannelId = useSelector(getCurrentChannelId);
  const dispatch = useDispatch();

  useEffect(() => {
    if (errorChannels) {
      dispatch(actions.showModal({
        modalType: 'INFO_CHANNEL',
        modalProps: { message: errorChannels.message },
      }));
    }
  }, [dispatch, errorChannels]);


  return (
    <>
      <div className="row h-100 pb-3">
        <SideBar className="col-3 border-right" />
        <Chat className="col h-100">
          <MessagesBox currentChannelId={currentChannelId} />
          <InputMessage currentChannelId={currentChannelId} />
        </Chat>

      </div>
      <ModalRoot />
    </>
  );
};

export default MainForm;
