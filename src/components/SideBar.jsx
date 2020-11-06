import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Image } from 'react-bootstrap';
import { getChannels, getCurrentChannelId } from '../selectors';
import userDataContext from '../lib/context';
import { actions } from '../slices';

const SideBar = ({ className }) => {
  const dispatch = useDispatch();
  const { nickName, avatar } = useContext(userDataContext);
  const currentChannelId = useSelector(getCurrentChannelId);
  const channels = useSelector(getChannels);
  const handleClickChannel = (id) => () => {
    dispatch(actions.changeChannel({ id }));
  };
  const handleClickRename = (channel) => () => {
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
    <div className="d-flex">
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
      <div className="p-2 border-bottom bg-primary text-center text-light d-flex align-items-center">
        <Image
          width={64}
          height={64}
          roundedCircle
          className="mr-2 p-1"
          src={avatar}
          alt="Avatar"
        />
        <div>
          <div>{'Current User: '}</div>
          <div>{nickName}</div>
        </div>
      </div>
      <div className="d-flex p-2 border-bottom border-primary align-center ">
        <div className="my-auto h6">Channels</div>
        <button
          type="button"
          onClick={handleClickAdd}
          className="btn btn-link ml-auto"
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <div className="overflow-auto flex-fill">
        <ul className="nav flex-column nav-pills nav-fill text-white w-100 ">
          {channels.map((channel) => {
            const channelClass = cn('nav-link btn w-100 text-left', {
              active: currentChannelId === channel.id,
            });
            return (
              <li key={channel.id} className="nav-item p-2 d-flex border-bottom justify-content-between">
                <button onClick={handleClickChannel(channel.id)} type="button" className={channelClass}>
                  {`# ${channel.name}`}
                </button>
                {channel.removable && renderSettingButtons(channel)}
              </li>
            );
          })}
        </ul>
      </div>

    </div>
  );
};

export default SideBar;
