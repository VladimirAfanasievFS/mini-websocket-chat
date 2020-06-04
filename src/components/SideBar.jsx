import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faEdit } from '@fortawesome/free-solid-svg-icons';
import { getArrayChannels, getCurrentChannelId } from '../selectors';
import NickNameContext from '../lib/context';
import { actions } from '../slices';

const SideBar = ({ className }) => {
  const dispatch = useDispatch();
  const nickName = useContext(NickNameContext);
  const currentChannelId = useSelector(getCurrentChannelId);
  const ArrayChannels = useSelector(getArrayChannels);
  const handleClickChannel = (id) => () => {
    dispatch(actions.changeChannel({ id }));
  };
  const handleClickRename = (channel) => () => {
    console.log('App -> currrentChannel', channel);
    dispatch(actions.showModal({
      modalType: 'RENAME_CHANNEL',
      modalProps: { channel },
    }));
  };
  const handleClickRemove = (channel) => () => {
    dispatch(actions.showModal({
      modalType: 'REMOVE_CHANNEL',
      modalProps: { id: channel.id },
    }));
  };

  const handleClickAdd = () => {
    dispatch(actions.showModal({
      modalType: 'ADD_CHANNEL',
      modalProps: {},
    }));
  };

  const renderSettingButtons = (channel) => (
    <div>
      <button
        type="button"
        onClick={handleClickRename(channel)}
        className="btn btn-link"
      >
        <FontAwesomeIcon icon={faEdit} />
      </button>
      <button
        type="button"
        onClick={handleClickRemove(channel)}
        className="btn btn-link"
      >
        <FontAwesomeIcon icon={faMinus} />
      </button>
    </div>
  );
  return (
    <div className={className}>
      <div className="d-flex p-2 mb-2 bg-info text-white">
        <b>{`Current User: ${nickName}`}</b>
      </div>
      <div className="d-flex mb-2">
        <span>Channels</span>
        <button
          type="button"
          onClick={handleClickAdd}
          className="btn btn-link p-0 ml-auto"
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill">
        {ArrayChannels && ArrayChannels.map((channel) => {
          const channelClass = cn('nav-link btn', {
            active: channel.id === currentChannelId,
          });
          return (
            <li key={channel.id} className="nav-item d-flex justify-content-between">
              <button onClick={handleClickChannel(channel.id)} type="button" className={channelClass}>
                {channel.name}
              </button>
              {channel.removable && renderSettingButtons(channel)}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SideBar;
