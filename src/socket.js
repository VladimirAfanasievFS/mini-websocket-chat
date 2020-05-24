import io from 'socket.io-client';

const socket = io(document.URL);

export default socket;
