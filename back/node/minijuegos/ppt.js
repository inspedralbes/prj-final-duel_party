module.exports = (socket, io,eleccionesPPT) => {
    

    socket.on('eleccionPPT', ({ jugador, eleccion, claveSala, number }) => {
        console.log(`Jugador: ${jugador}, Elección: ${eleccion}, Sala: ${claveSala}, Número: ${number}`);
        
        if (!eleccionesPPT[claveSala]) {
            eleccionesPPT[claveSala] = {};
        }
    
        // Guardar la elección con su número
        eleccionesPPT[claveSala][jugador] = { eleccion, number };
    
        console.log("Elecciones actuales:", JSON.stringify(eleccionesPPT[claveSala]));
    
        if (Object.keys(eleccionesPPT[claveSala]).length === 2) {
            // Convertir objeto en array de pares clave-valor
            let eleccionesArray = Object.entries(eleccionesPPT[claveSala]);
    
            // Ordenar por el número asociado
            eleccionesArray.sort((a, b) => a[1].number - b[1].number);
    
            // Reconstruir el objeto en orden
            let eleccionesOrdenadas = {};
            eleccionesArray.forEach(([jugador, data]) => {
                eleccionesOrdenadas[jugador] = data.eleccion;
            });
    
            // Emitir el resultado con las elecciones en el orden correcto
            io.to(claveSala).emit('resultadoPPT', eleccionesOrdenadas);
    
            // Resetear las elecciones de la sala
            eleccionesPPT[claveSala] = {};
            console.log("Elecciones después de reset:", eleccionesPPT[claveSala]);
        }
    });
    

};

