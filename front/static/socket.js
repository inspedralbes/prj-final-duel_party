import { io } from 'socket.io-client';

let socketInstance;

const makeSocket = (token) => {
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

const getSocket=()=>{
  return socketInstance;
}

export default { getSocket, RemSocket,makeSocket } ;
