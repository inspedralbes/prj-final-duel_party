module.exports = (socket, io, salas, conexiones) => {

    socket.on('enviar_soga', (username, claveSala) => {
        io.to(claveSala).emit('recibir_soga', username);
    }); 
}