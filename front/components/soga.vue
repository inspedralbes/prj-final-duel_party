<template>
<main>
  <div v-if="menu">
    <div class="tiempo"> {{ tiempoRestante }}</div>
    <img class="fondo" src="/images/soga/fondo.webp" alt="" >
    <img class="soga" :style="{ left: `${mover}%` }" src="/images/soga/soga.webp" alt="">
</div>
    <div v-else>
        <mando :mando="2"/>
    </div>
</main>
</template>
<script setup>

import { computed, ref } from 'vue';
import socketManager from '../static/socket'
// false:jugador , true: general
const menu=ref(true);
const mover=ref(50);
const yo= computed(() => $nuxt.$store.state);
const socket = socketManager.getSocket(); 
const emit = defineEmits();

if(yo.value.username!=="host"){
  menu.value=false;
}

// temporizador
let tiempoRestante = ref(30);

function actualizarTemporizador() {
  if (tiempoRestante.value <= 0) {
    clearInterval(temporizador);
    ganador();
  } else {
    tiempoRestante.value--;
  }
}
let temporizador

if(yo.value.username==="host"){
  temporizador= setInterval(actualizarTemporizador, 1000);
}

socket.on('recibir_soga', (username) => {
    if(yo.value.username!=="host"){
        return;
    }
    if(yo.value.jugadores[0].username===username){
        mover.value=mover.value-1;
    }else{
         mover.value=mover.value+1;
    }
});


function ganador(){
  if(mover.value>50){
    emit('ganador',1);
  }else{
   emit('ganador',0);
  }
}

function reiniciarTemporizador() {

  clearInterval(temporizador);       // Detiene el temporizador actual
  tiempoRestante.value = 5;          // Reinicia el valor del tiempo
  temporizador = setInterval(actualizarTemporizador, 1000);  // Vuelve a iniciar el temporizador
}

</script>
<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
.fondo {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}
.tiempo{
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 3rem;
  font-family: 'Press Start 2P', cursive;
  color: white;
  z-index: 2;
}
.soga {
  position: absolute;
  top: 50%; 
  width: 70%; 
  transform: translate(-50%, -50%);
  object-fit: cover;
  z-index: 1;
}
</style>