module.exports = (socket, io, salas, conexiones) => {
    socket.on('enviar_colores', (claveSala, color) => {
        io.to(claveSala).emit('recibir_colores', color);
    });
};