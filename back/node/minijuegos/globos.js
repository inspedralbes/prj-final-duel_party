module.exports = (socket, io, salas, conexiones) => {
    

    socket.on('enviar_globos', (claveSala,globos) => {
        
        socket.broadcast.to(claveSala).emit('recibir_globos', globos);
       
        
});
};