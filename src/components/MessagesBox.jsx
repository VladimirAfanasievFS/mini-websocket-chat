import React, { useEffect } from 'react';
import { Image, Media } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Element, scroller } from 'react-scroll';
import { getMessages } from '../selectors';

const MessagesBox = ({ currentChannelId }) => {
  const currentChannelMessages = useSelector(getMessages(currentChannelId));
  useEffect(() => {
    const scrollTo = async () => {
      await scroller.scrollTo('scroll-container-element', {
        duration: 0,
        delay: 0,
        containerId: 'messages-box',
      });
    };
    scrollTo();
  }, [currentChannelMessages]);


  return (
    <div id="messages-box" className="chat-messages overflow-auto mb-3 mt-auto">
      {currentChannelMessages && currentChannelMessages.map(({
        id, avatar, nickName, message, timestamp,
      }) => (
        <Media key={id} className="m-1 p-2">
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
            <div>{message}</div>
          </Media.Body>
        </Media>
      ))}
      <Element id="scroll-container-element" />
    </div>
  );
};

export default MessagesBox;
