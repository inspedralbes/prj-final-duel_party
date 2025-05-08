module.exports = (socket, io, salas, conexiones) => {
    socket.on('enviar_duelo', (username, claveSala) => {
        io.to(claveSala).emit('recibir_duelo', username);
    });
}