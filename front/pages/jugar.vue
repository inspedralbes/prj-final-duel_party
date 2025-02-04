<template>
<main>
 
    <div v-if="menu===1">
        <button @click="crearSala()">Crear una sala</button>
        <button @click="unirseSala()"> Unirse a una sala</button>
        <input type="text" v-model="claveActual" class="input-sala" placeholder="Clave de la sala" />
       
    </div>

    
 <div v-if="menu===3">

<EleccionJugadores :data="jugadores" :numero="claveSala"/>

 </div>

 <div v-if="menu===4">
    <mando/>
 </div>


</main>
</template>
<script setup>
import { ref,reactive,computed } from "vue";
 
import socketManager from '../static/socket' 
  
const claveSala = computed(() => $nuxt.$store.state.roomKey);
const yo= computed(() => $nuxt.$store.state);
const claveActual=ref("");
socketManager.RemSocket();

const menu=ref(1)
const nombre=ref("");
const player=ref(0);
const socket = socketManager.makeSocket(yo.value.username);
const jugadores=reactive([{username:"", in:false},{username:"", in:false},{username:"", in:false}, {username:"", in:false}]);



function crearSala(){
     
    socket.emit('create-room');
}
function unirseSala(){
    socket.emit('join-room', claveActual.value);
   
}
function reiniciarSala(){

    for (let index = 0; index < jugadores.length; index++) {
        jugadores[index].username="";
        jugadores[index].in=false;
        
    }
}

socket.on('sala_llena',()=>{

    alert("sala llena")
})

socket.on('turno', (data) => {
    console.log(data);
    
});


socket.on('room-users', (data) => { 
    reiniciarSala();

    for (let index = 1; index < data.users.length; index++) {
        jugadores[index-1].username=data.users[index].username;
        jugadores[index-1].in=true;
    }
    if(menu.value===4){
   if(jugadores[yo.value.playerNumber-1].in===false){
    $nuxt.$store.dispatch('updateNPlayer', yo.value.playerNumber-1)
   }
}
   
   console.log(jugadores)
});

socket.on("room-joined", (claveSala,socket) => {
    menu.value=4;
    $nuxt.$store.dispatch('updatePlayer', {claveSala,socket})
    console.log(yo.value)

    
    });


socket.on("room-created", (clave_Sala) => {
     
    $nuxt.$store.dispatch('updateKeyData', clave_Sala)
    menu.value=3;
    
    });

</script>


<style scoped>
</style>