module.exports = (socket, io, salas, conexiones) => {
    
socket.on('eleccionPPT', ({ jugador, eleccion,claveSala }) => {
    if (!eleccionesPPT[claveSala]) {
        eleccionesPPT[claveSala] = {};   }
    
    eleccionesPPT[claveSala][jugador] = eleccion; 

    if (Object.keys(eleccionesPPT[claveSala]).length === 2) {
        io.emit('resultadoPPT', eleccionesPPT[claveSala]);
        
    Object.keys(eleccionesPPT[claveSala]).forEach(key => delete eleccionesPPT[claveSala][key]);
    eleccionesPPT[claveSala] = {};
    console.log("Elecciones después de reset:", eleccionesPPT[claveSala]);
    }
});

};

