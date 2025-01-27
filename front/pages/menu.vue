<template>
<main>
 
    <div v-if="menu===1">
        <button @click="crearSala()">Crear una sala</button>
        <button @click="unirseSala()"> Unirse a una sala</button>
        <input type="text" v-model="claveSala" class="input-sala" placeholder="Clave de la sala" />
        <input type="text" v-model="nombre" class="input-sala" placeholder="nombre"/>
    </div>

    
 <div v-if="menu===3">

<EleccionJugadores :data="player" :numero="claveSala"/>

 </div>

 <div v-if="menu===4">
    <mando @boton="boton"/>
 </div>


</main>
</template>
<script setup>
import { ref,reactive } from "vue";
import socketManager from '../static/socket'

socketManager.RemSocket();

const menu=ref(1)
const claveSala=ref("")
const nombre=ref("")
const player=ref(0)
const socket = socketManager.getSocket("profe");

function boton(param){
    socket.emit('move', param,nombre.value,claveSala.value);
}

function crearSala(){
     
    socket.emit('create-room');
}
function unirseSala(){
    socket.emit('join-room', claveSala.value);
   
}

socket.on('move', (data,username) => {
  
  if(data=="a"){
      player.value=1;
      menu.value=-0;
      menu.value=3;
        console.log(player.value);
  }
});

socket.on("room-joined", (claveSala) => {
    menu.value=4;
    
    });


socket.on("room-created", (clave_Sala) => {
     
    claveSala.value=clave_Sala;
    menu.value=3;
    });

</script>


<style scoped>
</style>