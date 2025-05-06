module.exports = (socket, io, salas, conexiones) => {
    socket.on('enviar_colores', (claveSala, color) => {
        io.to(claveSala).emit('recibir_colores', color);
    });

    socket.on('enviar_opcion_colores', (claveSala, username, color) => {
        io.to(claveSala).emit('recibir_opcion_colores', { username, color });
    });
};