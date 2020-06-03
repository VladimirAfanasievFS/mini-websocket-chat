import io from 'socket.io-client';

const connectSocket = (url) => io(url, { transports: ['websocket'] });
export default connectSocket;
