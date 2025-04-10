<template>
    <main>
        <div class="div-inicio"  v-if="menu === 1">
            <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">

            <div class="grid">
                <button class="btn-inicio" @click="crearSala()">Crear una sala</button>
                <input type="text" v-model="claveActual" class="input-sala" placeholder="Clave de la sala" />
                <button class="btn-inicio" @click="unirseSala()">Unirse a una sala</button>
            </div>
        </div>

        <div v-if="menu === 3">
            <EleccionJugadores :data="jugadores" :numero="claveSala" />
        </div>

 <div v-if="menu===4">
    <mando/>
 </div>


</main>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import socketManager from '../static/socket';

const claveSala = computed(() => $nuxt.$store.state.roomKey);
const yo= computed(() => $nuxt.$store.state);
const claveActual=ref("");
socketManager.RemSocket();

const menu = ref(1);
const socket = socketManager.makeSocket("jugar");
const jugadores = reactive([
    { username: "", in: false },
    { username: "", in: false }
]);


function crearSala() {
    socket.emit('create-room');
}

function unirseSala() {
    socket.emit('join-room', claveActual.value);
}

function reiniciarSala() {
    jugadores.forEach(jugador => {
        jugador.username = "";
        jugador.in = false;
    });
}

socket.on('error', (data) => {
    alert(data)
})   

socket.on('sala_cerrada', () => {
    socketManager.RemSocket();
    alert("Sala cerrada");
    $nuxt.$router.push('/');
});

socket.on('minijuego', (data) => {
    $nuxt.$store.dispatch('updateJuego', data);
    $nuxt.$router.push('/minijuegos');

});

socket.on('room-users', (data) => {
    reiniciarSala();
    data.users.slice(1).forEach((user, index) => {
        jugadores[index].username = user.username;
        jugadores[index].in = true;

       
    });
    $nuxt.$store.dispatch('updateJugadores', jugadores);
    console.log(yo.value)
});

socket.on("room-joined", (claveSala, username) => {
    menu.value = 4;
    $nuxt.$store.dispatch('updatePlayer', { claveSala, username });
     
    console.log(yo.value.username);
});

socket.on("room-created", (claveSala) => {
   $nuxt.$store.dispatch('updatePlayer', { claveSala, username:"host" });
    menu.value = 3;
});
</script>

<style scoped>
main {
    margin: 0;
    padding: 0;
}
.div-inicio {
    place-items: center;
  background-image: url('/images/fondo-inicio.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  margin: 0;
  padding: 0;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  font-family: 'Press Start 2P', cursive;
}

.grid {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 40vh;
    margin-left: 20px;

}

.input-sala {
    width: 340px;
    font-size: 20px;
    text-align: center;
    font-family: 'Press Start 2P', cursive;
    margin-bottom: 20px;
    padding: 10px;
    
}

.btn-inicio {
    width: 350px;
    font-size: 26px;
    border: 1px solid black;
    background-color: #292828;
    color: #ffffff;
    cursor: pointer;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.9);
    transition: transform 0.3s, background-color 0.3s;
    font-family: 'Press Start 2P', cursive;
    margin-bottom: 100px;
    padding: 20px;
    border-radius: 10%;
}

.btn-inicio:hover {
    background-color: #00a6bc;
    transform: scale(1.05);
}

.btn-inicio:active {
    transform: scale(1);
}
</style>
