module.exports = (socket, io, salas, conexiones) => {
    // Evento para iniciar el juego
    socket.on('iniciar_adivina_personaje', (data) => {
        const { claveSala, categoria, jugadorInicial, personaje } = data;
        if (salas[claveSala]) {
            io.to(claveSala).emit('juego_iniciado', {
                categoria,
                jugadorInicial,
                personaje
            });
        }
    });

    // Evento para enviar tiempo de adivinanza
    socket.on('enviar_tiempo_adivinanza', (data) => {
        const { claveSala, jugador, tiempo, personaje } = data;
        if (salas[claveSala]) {
            io.to(claveSala).emit('tiempo_registrado', {
                jugador,
                tiempo,
                personaje
            });
        }
    });

    // Evento para finalizar ronda
    socket.on('finalizar_ronda_adivinanza', (data) => {
        const { claveSala, resultados } = data;
        if (salas[claveSala]) {
            io.to(claveSala).emit('ronda_finalizada', resultados);
        }
    });

    // Evento para cambiar turno
    socket.on('cambiar_turno_adivinanza', (data) => {
        const { claveSala, siguienteJugador } = data;
        if (salas[claveSala]) {
            io.to(claveSala).emit('turno_cambiado', siguienteJugador);
        }
    });
};