import { io } from 'socket.io-client';

let socketInstance;

const getSocket = (token) => {
  if (!socketInstance) {
    socketInstance = io("http://localhost:20070", {
      transports: ["websocket"],
      withCredentials: true,
      auth: {
        username: token,
      },
    });
  }
  return socketInstance;
};


const RemSocket=()=>{

  if (socketInstance) {
    socketInstance.disconnect();
    socketInstance = null;  
  }
}

export default { getSocket, RemSocket } ;
