module.exports = (socket, io, salas, conexiones) => {
    

    socket.on('enviar_globos', (claveSala,globos) => {
        
        io.to(claveSala).emit('recibir_globos', globos);
       
});

socket.on('ganador_globos', (claveSala,globos) => {
         
        
        io.to(claveSala).emit('ganador_globos', globos);
   
});


};