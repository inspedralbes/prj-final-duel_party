module.exports = (socket, io, salas, conexiones) => {
    // Evento para enviar la lista de personajes al jugador
    socket.on('enviar_personajes', (claveSala, personajes) => {
        socket.broadcast.to(claveSala).emit('recibir_personajes', personajes);
    });

    // Evento para enviar la pregunta del jugador al host
    socket.on('enviar_pregunta', (claveSala, pregunta) => {
        io.to(claveSala).emit('recibir_pregunta', pregunta);
    });

    // Evento para enviar la respuesta del host al jugador
    socket.on('enviar_respuesta', (claveSala, respuesta) => {
        socket.broadcast.to(claveSala).emit('recibir_respuesta', respuesta);
    });

    // Evento para anunciar al ganador
    socket.on('ganador_adivina', (claveSala, ganador) => {
        io.to(claveSala).emit('ganador_adivina', ganador);
    });
};