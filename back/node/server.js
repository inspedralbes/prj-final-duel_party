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

const salas={};
let conexiones = {}; 



io.on('connection', async (socket) => {

    
    socket.user = { username: socket.handshake.auth.username };

 
    socket.on('create-room', () => {
        const claveSala = uuidv4().slice(0, 5); 
        if (!salas[claveSala]) {
            salas[claveSala] = [];  // Inicializamos la sala como un array vacío
        }
        let aux={};
        
        conexiones[socket.id]=socket
        salas[claveSala].push(socket);

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

   socket.on('move', (data,username,claveSala) => {
      
        io.to(conexiones[salas[claveSala][0].id].id).emit('move', data,username);
    });

 

    

    socket.on('join-room', (claveSala) => {
        const room = io.sockets.adapter.rooms.get(claveSala);
        if (!salas[claveSala]) {
            salas[claveSala] = [];  // Inicializamos la sala como un array vacío
        }
        
        if (room) {
            socket.join(claveSala);
            console.log(`Usuario ${socket.user.username} (ID=${socket.user.id}) se unió a la sala: ${claveSala}`);

           
            

            if(salas[claveSala].length<6){
                
                salas[claveSala].push(socket);
                conexiones[socket.id]=socket
                switch (salas[claveSala].length) {
                   case 2:
                        socket.user.player=1;
                        break;
                    case 3:
                        socket.user.player=2;
                        break;
                    case 4:
                        socket.user.player=3;
                        break;
                    case 5:
                        socket.user.player=4;
                        break;
                
                    default:
                        break;
                }
               
                socket.emit('room-joined', claveSala,socket.user);

            }

            console.log(salas[claveSala])
           
            io.to(conexiones[salas[claveSala][0].id].id).emit('room-users', {
                room: claveSala,
                users: [...room].map(id => ({
                    id,
                    username: io.sockets.sockets.get(id)?.user?.username || 'Invitado',
                    player: io.sockets.sockets.get(id)?.user?.player || 0,
                }))
            });
        } else {
            console.log(`Intento de unión a sala inexistente: ${claveSala}`);
            socket.emit('error', 'Sala no encontrada');
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
        if(salas[claveSala].length===0){

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
                salas[claveSala].splice(salas[claveSala].indexOf(socket.user), 1);
        if(salas[claveSala].length===0){

            delete salas[claveSala];
        }
            }
        }

       


    });

    socket.on('disconnect', () => {
        console.log(`Usuario desconectado: ${socket.id}`);
        delete conexiones[socket.id]
         
        
    });
});

const PORT = 20070;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
