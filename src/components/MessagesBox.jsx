import React from 'react';
import { Image, Media } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import { getMessages } from '../selectors';

const MessagesBox = ({ currentChannelId }) => {
  const currentChannelMessages = useSelector(getMessages(currentChannelId));
  // const isSelfMessage = CurrentUserName === name;
  const messageClassNames = cn({
    'm-1 p-2': true,
    'text-wrap text-break': true,
    // 'bg-light rounded-pill': isSelfMessage
  });
  return (
    <div id="messages-box" className="chat-messages overflow-auto mb-3">
      {currentChannelMessages && currentChannelMessages.map(({
        id, avatar, nickName, message, timestamp,
      }) => (
        <Media key={id} className={messageClassNames}>
          <Image
            width={64}
            height={64}
            roundedCircle
            className="mr-2 p-1"
            src={avatar}
            alt="Avatar"
          />
          <Media.Body>
            <h6 className="text-monospace">
              {nickName}
              {' '}
              <small>{timestamp}</small>
            </h6>
            <p>{message}</p>
          </Media.Body>
        </Media>
      ))}
    </div>
  );
};

export default MessagesBox;
