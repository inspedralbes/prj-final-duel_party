module.exports = (socket, io, salas, conexiones) => {
    

        socket.on('moveBasket', (data, playerNumber, claveSala) => {
            io.to(conexiones[salas[claveSala][0].id].id).emit('moveBasket', data, playerNumber);
           
            
    });
};