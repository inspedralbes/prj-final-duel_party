const { v4: uuidv4 } = require('uuid');
const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');
const { log } = require('console'); 
const https = require('https');
 
const privateKey=`-----BEGIN PRIVATE KEY-----
MIIJQgIBADANBgkqhkiG9w0BAQEFAASCCSwwggkoAgEAAoICAQDqpkGSKASEOda9
PysDh58ZMYohyVPmz9qf7YcaigYpUhI86Wm7hQ4BfonpmB81Yh4ig/WmkGzPOut3
AhziABbKLHXKdUPePfLwh8IE3g8xx1kJT6pWad2O7yE0nwHRIc8VtKQNA2sGb21z
rCJafc2j2RoJQnn82fMUI5tntN0pQSU7u7Y1F4GdkVTAE0Tln6haAsAEDi9NNvL4
woIlTOnhSy+mOlSWr7BpO2xtZJdHVx2E/VTwGoUDh1W8G+nCrcZGAw/yW86Y73b5
pPAEn+ChoIQWrorIixv4BHiksKENXQ6FUgzFx6VncF/4z+aFAqZo8ObFtutaRz8C
+J5bmnXbxbVk4k9SB6The33+LtzRiXYtLAvWxxTnVLrp8INrQ9V5se170ZI4n1NE
MwR8CXWG3huwQEeMLpthSbapRK+yDxM9KYJ1DRnd4wUIKawPHNrP6sf90RqMqCAH
NXdhn95IsPwJ78grlwFLhq9doIfB0PJGB1vLjdEy20QR1mehUsIoMT2tV8VH+pT3
zC+fY3K75qMa9nCBHAiBsnKlhTt0lIrb0jaLFca1SPQ0z61oTdWaN3IfcXPyLTY2
5bErKnQFk22T30i/lgE1DR8FknprGLQFbT1lClXNr0L1zTkUpBaDGTwYWINLyoj/
jY3TwRwu159gFGT0QqpePw/Rk3rlJwIDAQABAoICACQ1H1fENl4zkT/b0saqqLwk
eXduhN8ld6DHRYUCLffg+CYksPIEkqgHCeoyVQPRw2tOssXO8gX6xiwI9sKmLN4U
L4uGvhWPDZZb/G5FLacKvGHEGeQCVfPLpnNjjc44H1JEG4RT4LHk2R4ePkwkWWpN
AnLR/9d/x2h2I3FvO9Pf1N+mFB7rz6OsB0h+21oWDCOc2lrwgrqxc0XmDbBfxpRt
xkkqJbSoINqRbCZn0ogUQzPVkMOz8+PFgE8/J2T+QjgPb5Mq43Lp5eaZCDL5Je+1
axcXkRwSNcX25VQpr9BLabAyJv0Qf3oPTF/Xr28a0j7N3W4+JDbmrixxMfkEmTwo
BNRnC3Z1QAw1zqSdHtQEMN+ob58kx99fJh/djSj49r29WOyfn6qBKjKfB/7BLbFl
iTakOOrfl2DS6F1706Ts48YOj/zYpohLWABXVMvQg36wCQcg12Fv4MwSTiC+N8Bz
I0icyzsBrgCNAebxFqNaxhbQooYa2yddtRhvcVec1+eqI5bzrozksqEPZSHrYhHr
mKkYNjCAGgSbLWXu4Z6do2jCudkwSNMxf2jSqFouGSnmjzc/pAD2fku6201nrQl+
PS1izfKqWv5bAUYUYc4LuslnxA1EgfOJayW7QTRTCgmfOzXPYyZmeMPNg9/0+/da
NWt3Jvu25gz6sM0ntTShAoIBAQDvtQWLj8RZGMQjhQGNMWodOP5W5teEWzUT5O8x
mHAO5zfFLsR9euwXLR7IouoHdNXWA84f+v7omdQriDui9WnuxvoxBeQAB87ZE7N2
nDwKcPZ0PxJByOa265cZ/Oczses5e/caEF8GqQScB65WBtWNXvb9cGuyJK4MoTvD
vFEfz3P6sDOvkHe9HOGRpSnECm+Ve0Txvz9ZB06fz2C/FrzkBkQxsICA5J49bg34
asCKdYXfuaaaiTVhMeQonbM4EEGDltChfMaApv5G5OoRjSaFZy/bBgRiTXjosb2c
jH3U5/n/fHTdph2Bz5QAGBRn5VPF0PWEM8NGIrotLfiQE23vAoIBAQD6mTqz/pU9
yE9aOrXS2FFBSFeXCk8ghlH/Wc9hnYncYwZ3b7NzK5TPUQBF4ORrgN79MUcpz8oq
/0vQvResvIHdNoAsXShQ6bvS5p9LMRfG3/AW5xzCGrmWn2K/Oe7HBiPG9jLdUP4K
JqMnr5niJlotxKY0XR7QloGULlV+csRfT9DVpk6FsIVLKwSTQYCykAJjsC5LUmjf
yG0DbpGjtbMZ3E5uHWi3KLbxIXmiqQYkZe+GbGXDpWBm+qFjRE118qne9uNf8B55
Xw5wgO15If8FqwtGcAXUYw7n6jJ5xsZ2Yp3cPxBRglKt7+P+RVM/3iCYrkqm8n1w
qcSwtnZKJDRJAoIBAQCBB1LlzcxmHTOu3vB33Qp+kmgtxPJrd2D5xXiPnLts+j8F
7+eql5kv3IS+gRsySky0d7Xjdwrxj6QqjplzXWDZO9f+vWn+LjXEmZs3lF+pSycO
acjdClROUEA0p/KX3AR/G+Bl8jwEbMRjbKsF+YXIJD8VKwd9i8r4V23BLcQJOHT4
kxIvRbd+X2Z4LIxvzyJDN2hkLIrf1FQZJ9qu4YFpyIm6qYRyXR1kebIhbu0XWq1m
QRuSAZtvJxjmWATZf76UI4FH+88p/znOVXg9XFpI4sNaxUFk3MjhkJM9Ck7NZNUo
FgkeKkWl02OaLVwGlOXkDFesAuTxAs5udVlfzGWXAoIBAAERG+3ePJZpvuS8cT+3
igkEHNNYyONzju/OWxKoUAjvJvzlLddkrRqA1sZ1YaOPheOADTSBXPP36EO4OlyS
5N6jN8J4lw5ZIGKSdsUkLVy8YVJHo5iz8mxQu2PjBEA2p3pWW/sTODGk3nbxyW7s
COA/ARIh/1qV+XE/DUAfjvR064etUJJDIR4jzb4uvjSEZm40Ns49SJMDUGt+UgJn
aJ7IkFDpsSNuefDm2pS1sYAAKxfgaEJ/9rwZfwxkIwxIfy6i0G79H7QWkoIqGli0
q1hD1SV0nqG71jlohtR74yZn3xIr9o7SRjXVWpwfgW45LNxZiZnSWHRdVKgH7tL7
+nkCggEASsmX8NKCvN1GciH9QaD9PFQCWQ7piJXc3LDHQ00SpwMYBhUN2DR1MXvK
Z2ZrmXZd/0d3S3Fm+H3J1yejuEh5cJ3+gYyDEUJg03WNE06+M88U8K3h6gQns2aq
wpeAdHK1pqjbP8KVMUE68BvY3B/85j2PHiAjNmvEpu8M8HI1oR+o+n6ebb/BVmeJ
fGc/OAPEixSf4kiLo1NH83K0D/tCTcpXS1ozeHkOFrWQcZHIjcZmxpzy9iir9jK2
5y6zgudMDdORtritYt1idMYYJ86rAt3+p8Ij0cLEVOYO1w5ZJ6ElrMmi1BZ343+O
Z7L7IvzzxlhhxePfSF6KKhF0ifVYwg==
-----END PRIVATE KEY-----`; 
const certificate = `-----BEGIN CERTIFICATE-----
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
gGQkhKmL/awkqd/B0hZOEIdtcWhI
-----END CERTIFICATE-----`;

const credentials = { key: privateKey, cert: certificate };


const app = express();
app.use(cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

const server = https.createServer(credentials, app);

const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true
    }
});

const salas = {};
let conexiones = {};



io.on('connection', async (socket) => {


    socket.user = { username: socket.handshake.auth.username };


    socket.on('create-room', () => {
        const claveSala = uuidv4().slice(0, 5);
        if (!salas[claveSala]) {
            salas[claveSala] = [];  // Inicializamos la sala como un array vacío
        }
        let aux = {};

        conexiones[socket.id] = socket
        socket.user.turno = 0;
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

    socket.on('move', (data, playerNumber, claveSala) => {

        

            io.to(conexiones[salas[claveSala][0].id].id).emit('move', data, playerNumber);

       

    });

    socket.on('turno', (turno, claveSala) => {

        salas[claveSala][0].user.turno = turno;
        socket.broadcast.to(claveSala).emit('turno', turno);
      
        console.log(salas[claveSala][0].user.turno);


    });



    socket.on('join-room', (claveSala) => {
        if (salas[claveSala].length < 5) {
            const room = io.sockets.adapter.rooms.get(claveSala);
            if (!salas[claveSala]) {
                salas[claveSala] = [];  // Inicializamos la sala como un array vacío
            }

            if (room) {
                socket.join(claveSala);
                console.log(`Usuario ${socket.user.username} (ID=${socket.user.id}) se unió a la sala: ${claveSala}`);




                salas[claveSala].push(socket);
                conexiones[socket.id] = socket
                switch (salas[claveSala].length) {
                    case 2:
                        socket.user.player = 1;
                        break;
                    case 3:
                        socket.user.player = 2;
                        break;
                    case 4:
                        socket.user.player = 3;
                        break;
                    case 5:
                        socket.user.player = 4;
                        break;

                    default:
                        break;
                }

                socket.emit('room-joined', claveSala, socket.user);



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
        } else {
            socket.emit('sala_llena')

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
                salas[claveSala].splice(salas[claveSala].indexOf(socket.user), 1);
                if (salas[claveSala].length === 0) {

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

const PORT = 20071; // Usa el puerto 20071 para HTTPS
server.listen(PORT, () => {
    console.log(`Servidor HTTPS corriendo en https://localhost:${PORT}`);
});
