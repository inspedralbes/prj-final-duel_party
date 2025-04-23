import { io } from 'socket.io-client';

let socketInstance;


const makeSocket = (token) => {
  if (!socketInstance) {
  //   socketInstance = io("https://duelparty.cat", {
 //     path: "/socket.io/", // Asegúrate de incluir el path
     socketInstance = io("http://localhost:20071", { 
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
