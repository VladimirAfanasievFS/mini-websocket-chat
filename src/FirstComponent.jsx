import React from 'react';

const FirstComponent = ({ gon }) => {
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
            <li className="nav-item">
              <button type="button" key={channel.id} className="nav-link btn btn-block">{channel.name}</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="col h-100" />
    </div>
  );
};

export default FirstComponent;
