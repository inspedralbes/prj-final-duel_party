module.exports = (socket, io,eleccionesPPT) => {
    

   
     
socket.on('eleccionPPT', ({ jugador, eleccion,claveSala,number }) => {


    console.log(`Jugador: ${jugador}, Elección: ${eleccion}, Sala: ${claveSala}`);

    if (!eleccionesPPT[claveSala]) {
        eleccionesPPT[claveSala] = {};   
    }
         
    eleccionesPPT[claveSala][jugador] = eleccion; 
     
    console.log(JSON.stringify(eleccionesPPT));

    if (Object.keys(eleccionesPPT[claveSala]).length === 2) {
        io.to(claveSala).emit('resultadoPPT', eleccionesPPT[claveSala]);
        
    Object.keys(eleccionesPPT[claveSala]).forEach(key => delete eleccionesPPT[claveSala][key]);
    eleccionesPPT[claveSala] = {};
    console.log("Elecciones después de reset:", eleccionesPPT[claveSala]);
    }
});

};

