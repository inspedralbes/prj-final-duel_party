const { v4: uuidv4 } = require('uuid');
const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');
const { log } = require('console');

const app = express();


app.use(cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

const server = http.createServer(app);

const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true
    }
});

const salas = {};
let conexiones = {}; 
const globos = require('./minijuegos/globos');
const penales = require('./minijuegos/penales');
const luz_verde = require('./minijuegos/luz_verde');
const colores= require('./minijuegos/colores');
const duelo = require('./minijuegos/duelo');
const soga = require('./minijuegos/soga');
io.on('connection', async (socket) => {


    socket.user = { username: socket.handshake.auth.username };

    
    globos(socket,io ,salas, conexiones);
    soga(socket,io ,salas, conexiones);
    penales(socket,io ,salas, conexiones);
    luz_verde(socket,io ,salas, conexiones);
    colores(socket,io ,salas, conexiones);
    duelo(socket,io ,salas, conexiones);
    
    

    socket.on('create-room', () => {
        const claveSala = uuidv4().slice(0, 5);
        if (!salas[claveSala]) {
            salas[claveSala] = [];  // Inicializamos la sala como un array vacío
        }
        socket.user.claveSala = claveSala;
        salas[claveSala].push(socket);
        conexiones[socket.id] = socket
        socket.join(claveSala);

        socket.emit('room-created', claveSala);
        console.log(`Sala creada: ${claveSala} por el usuario: ${socket.user.username}`);

        io.to(conexiones[salas[claveSala][0].id].id).emit('room-users', {
            room: claveSala,
            users: [...io.sockets.adapter.rooms.get(claveSala)].map(id => ({
                id,
                username: io.sockets.sockets.get(id)?.user?.username || 'Invitado',
            })),
        });

    });

    socket.on('move', (data, username, claveSala) => {
          
        io.to(claveSala).emit('move', data, username);
       
    });

    socket.on('pagina', (claveSala, pagina) => {
        
        socket.broadcast.to(claveSala).emit('pagina', pagina);
         
        
    });

    socket.on('minijuego', (claveSala, minijuego) => {
        
        socket.broadcast.to(claveSala).emit('minijuego', minijuego);
        
        
    });

    socket.on('turno', (turno, claveSala) => {

        salas[claveSala][0].user.turno = turno;
        socket.broadcast.to(claveSala).emit('turno', turno);
        console.log(salas[claveSala][0].user.turno);


    });
 

    socket.on('join-room', (claveSala) => {
       
        const room = io.sockets.adapter.rooms.get(claveSala);
      
          
        if(!salas[claveSala] || !room){
            socket.emit('error', 'Sala no encontrada');
            return;
        }

        if (salas[claveSala].length < 3) {
            
            if (!salas[claveSala]) {
                salas[claveSala] = [];   
            }
                socket.join(claveSala);
                console.log(`Usuario ${socket.user.username} (ID=${socket.user.id}) se unió a la sala: ${claveSala}`);

                salas[claveSala].push(socket);
                conexiones[socket.id] = socket
                switch (salas[claveSala].length) {
                    case 2:
                        socket.user.username = "Jugador "+uuidv4().slice(0, 2);
                        break;
                    case 3:
                        socket.user.username = "Jugador "+uuidv4().slice(0, 2);
                       
                        break;
               
                }

                socket.emit('room-joined', claveSala, socket.user.username);

                io.to(claveSala).emit('room-users', {
                    room: claveSala,
                    users: [...room].map(id => ({
                        id,
                        username: io.sockets.sockets.get(id)?.user?.username || 'Invitado',
                        player: io.sockets.sockets.get(id)?.user?.player || 0,
                    }))
                });
             
        } else {
            socket.emit('error', 'Sala llena');

        }
    });

    socket.on('leave-room', (claveSala) => {
        socket.leave(claveSala);

        const room = io.sockets.adapter.rooms.get(claveSala);
        if (room) {
            io.to(claveSala).emit('room-users', {
                room: claveSala,
                users: [...room].map(id => ({
                    id,
                    username: io.sockets.sockets.get(id)?.user?.username || 'Invitado',
                }))
            });
        }
        salas[claveSala].splice(salas[claveSala].indexOf(socket.user), 1);
        if (salas[claveSala].length === 0) {

            delete salas[claveSala];
        }
        socket.emit('left-room');
    });

    socket.on('disconnecting', () => {
        for (const claveSala of socket.rooms) {
            if (claveSala !== socket.id) {
                const room = io.sockets.adapter.rooms.get(claveSala);
                if (room) {
                    const usersActualizados = [...room].filter((id) => id !== socket.id);
                   
                    io.to(claveSala).emit('room-users', {
                        room: claveSala,
                        users: usersActualizados.map(id => ({
                            id,
                            username: io.sockets.sockets.get(id)?.user?.username || 'Invitado',
                        }))
                    });



                }
                if(salas[claveSala]){
                    salas[claveSala].splice(salas[claveSala].indexOf(socket.user), 1);
                    if (salas[claveSala].length === 0) {

                        delete salas[claveSala];
                    }
                }
               
               
            }
        }




    });

    socket.on('disconnect', () => {
        console.log(`Usuario desconectado: ${socket.id}`); 
        const claveSala = socket.user.claveSala;
        if(claveSala===undefined){
            return;
        }
        io.to(claveSala).emit('sala_cerrada') 
        delete salas[claveSala];
        delete conexiones[socket.id]



    });
});

const PORT = 20071;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
