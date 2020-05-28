import io from 'socket.io-client';

const socket = io(document.URL, { transports: ['websocket'] });

export default socket;
