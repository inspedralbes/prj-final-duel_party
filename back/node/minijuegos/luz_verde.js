module.exports = (socket, io, salas, conexiones) => {
    
   

    socket.on('enviar_luz', (username, sala) => {
       io.to(sala).emit('recibir_luz', username);
    });
    


};