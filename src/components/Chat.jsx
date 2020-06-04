import React from 'react';


const Chat = ({ className, children }) => (
  <div className={className}>
    <div className="d-flex flex-column h-100">
      {children}
    </div>
  </div>
);

export default Chat;
