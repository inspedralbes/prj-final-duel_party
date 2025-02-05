import { io } from 'socket.io-client';

let socketInstance;


const makeSocket = (token) => {
  if (!socketInstance) {
    socketInstance = io("https://duelparty.cat", { // Usa HTTPS y el dominio
      path: "/socket.io/", // Asegúrate de incluir el path
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
