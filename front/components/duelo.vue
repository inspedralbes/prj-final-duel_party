<template>
    <main>

        <img class="fondo" src="/images/duelo/fondo.webp" alt="" >
      

        <div v-if="!perdedor.rojo" @click="disparar(1)"> <img class="rojo" :class="{ izquierda: posicion.rojo, derecha: !posicion.rojo }" src="/images/duelo/rojo.webp" alt=""></div>
        <div v-if="!perdedor.azul" @click="disparar(2)"> <img class="azul" :class="{ izquierda: posicion.azul, derecha: !posicion.azul }" src="/images/duelo/azul.webp" alt=""></div>


        <div v-if="perdedor.rojo"> <img class="suelo_rojo" src="/images/duelo/suelo_rojo.webp" alt=""></div>
        <div v-if="perdedor.azul"> <img class="suelo_azul" src="/images/duelo/suelo_azul.webp" alt=""></div>

        <div class="tiempo" v-if="disparo">DISPARA </div>
        <div class="tiempo" v-else>EN GUARDIA </div>
    </main>
</template>

<script setup>

import { reactive, ref,computed } from 'vue'; 
import socketManager from '../static/socket'
const socket = socketManager.getSocket(); 
const emit = defineEmits();
// 0 = jugador, 1 = pantalla
const menu = ref(1);
const yo = computed(() => $nuxt.$store.state);

//false = apuntar hacia derecha, true = apuntar hacia izquierda
const perdedor= reactive({rojo:false,azul:false});
const posicion= reactive({rojo:true,azul:false});
const disparo=ref(false);
const disparoHecho=ref(true);

function disparar(data){
if(disparoHecho.value){
    disparoHecho.value=false;
    if(disparo.value){

        switch(data){
    case 2:
        perdedor.rojo = !perdedor.rojo;
        posicion.azul = !posicion.azul;
        break;
    case 1:
        perdedor.azul = !perdedor.azul;
        posicion.rojo = !posicion.rojo;
        break;
}
    }else{

switch(data){
    case 1:
        perdedor.rojo = !perdedor.rojo;
        posicion.azul = !posicion.azul;
        break;
    case 2:
        perdedor.azul = !perdedor.azul;
        posicion.rojo = !posicion.rojo;
        break;
}
    }
}
}
 

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') {
     
        disparar(2);
 
  } else if (e.key === 'ArrowLeft') {
    
        disparar(1);
 
  } else {
    console.log('Pulsaste:', e.key);
  }
});

 
let tiempo = Math.floor(Math.random() * 10)+4;
// temporizador
let tiempoRestante = ref(tiempo);

function actualizarTemporizador() {
  if (tiempoRestante.value <= 0) {
    clearInterval(temporizador);
     disparo.value = true;
  } else {
    tiempoRestante.value--;
  }
}

let temporizador = setInterval(actualizarTemporizador, 1000);



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
    top: 10%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 3rem;
    color: white;
    z-index: 2;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
    font-family: 'Press Start 2P', cursive;
    
}
.rojo {
    position: absolute;
    top: 40%;
    left: 10%;
    transform-origin: 50% 50%;
    z-index: 2; 
    width: 200px;
}
.azul{
    position: absolute;
    top: 40%;
    left: 80%;
    transform-origin: 50% 50%;
   
    z-index: 2;
    width: 200px;
}

.izquierda{
    transform: scaleX(-1); 
}
.derecha{
    transform: scaleX(1); 
}



.suelo_rojo {
    position: absolute;
    top: 70%;
    left: 10%; 
    transform-origin: left; 
    z-index: 2;
    width: 400px;
}
.suelo_azul{
    position: absolute;
    transform: scaleX(-1); 
    top: 70%;
    left: 90%;
    transform-origin: left; 
    z-index: 2;
    width: 400px;
}
  
</style>
