<template>
    <main>
    
    <div v-if="menu === 1">
        <mando/>
    </div>
    
    <div v-if="menu === 0">
    <img class="fondo" src="/images/luz_verde/fondo.webp" alt="">
    <img src="/images/luz_verde/verde.webp" v-if="fichas.correr"  alt="" class="meta">     
    <img src="/images/luz_verde/rojo.webp" v-else alt="" class="meta">       
    <img src="/images/luz_verde/chico_rojo.webp"  :style="{left:fichas.rojo+'%'}" class="rojo" @click="mover(1)"></img>
    <img src="/images/luz_verde/chico_azul.webp"  :style="{left:fichas.azul+'%'}" class="azul" @click="mover(2)"></img>
      
    <div :style="{ backgroundColor: fichas.correr ? 'green' : 'red' }" class="meta"> </div>
</div>
</main>
</template>
<script setup>

import { reactive, ref, computed} from 'vue';

import socketManager from '../static/socket'
const socket = socketManager.getSocket(); 
const fichas=reactive({ rojo:5,azul:5,correr:true});
const yo= computed(() => $nuxt.$store.state);
const menu=ref(0); 
const emit = defineEmits();
 
if(yo.value.jugadores[0].username===yo.value.username){
  menu.value=1;
}
if(yo.value.jugadores[1].username===yo.value.username){
  menu.value=1;
}
 
socket.on('recibir_luz', (username) => {
    if(yo.value.jugadores[0].username===username){
    mover(1);
}else{
    mover(2);
}


});

function mover(data){

    switch(data){
        case 1:
            if(fichas.correr){
                fichas.rojo+=5;
                if(fichas.rojo==100){
                    emit('ganador',0);
                }
            }else{
                fichas.rojo-=20;
                if(fichas.rojo<0){
                    fichas.rojo=0;
                }
            }
          
            break;
        case 2:
        if(fichas.correr){
                fichas.azul+=5;
                if(fichas.azul==100){
                   emit('ganador',1);
                }
            }else{
                fichas.azul-=20;
                if(fichas.azul<0){
                    fichas.azul=0;
                }
            }
            break;

    }
    
}
cambiarEstadoAleatorio();
function cambiarEstadoAleatorio() {
  const tiempo = Math.floor(Math.random() * 3000) + 1500  

  setTimeout(() => {
     fichas.correr = !fichas.correr
    cambiarEstadoAleatorio() 
  }, tiempo)
}


 
</script>
<style scoped>
.fondo {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}
.meta{
    height: 100%;
    position: absolute;
    transform: rotate(-5deg);
    left: 90%; 
}
.rojo{
    width: 150px;
    height:150px; 
    position: absolute;
    top: 30%; 
    transform: translate(-50%, -50%);
    border-radius: 50%;
    transition: 0.5s ease;
}
.jugador{
    width: 400px;
    height: 400px; 
    position: absolute;
    top: 50%; 
    left: 50%;
    transform: translate(-50%, -50%);
}
.azul{
    width: 150px;
    height: 150px; 
    position: absolute;
    top: 70%; 
    transform: translate(-50%, -50%);
    border-radius: 50%;
    transition: 0.5s ease;
}
</style>