module.exports = (socket, io, salas, conexiones) => {
    
   

    socket.on('enviar_penales', (sala,direccion,portero) => {
       
        socket.broadcast.to(sala).emit('recibir_penales', direccion,portero);

    });

    socket.on('reiniciar_penales', (sala) => {
        io.to(sala).emit('reiniciar_penales');
    });
    


};