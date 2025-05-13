<template>
    <main class="main">
<Globos v-if="yo.juego===1" @ganador="ganador"/>
<Duelo v-if="yo.juego===2" @ganador="ganador"/>
<Penales v-if="yo.juego===3" @ganador="ganador"/>
<Soga v-if="yo.juego===4" @ganador="ganador"/>
<Luz_verde v-if="yo.juego===5" @ganador="ganador"/>
<Colores v-if="yo.juego===6" @ganador="ganador"/>
<Mando v-if="yo.juego===-1"/>
<explicar class="explicar" @jugar="modo2" :num="juego-1" v-if="visibleInstrucciones"/>
<Win class="win" v-if="visibleWIN" :initialWinnerName="yo.jugadores[winner].username" @salir="ganador2"/>
<div v-if="yo.juego===0"class="menu-container">
    <div class="decoration decoration-1"></div>
    <div class="decoration decoration-2"></div>
    <div class="decoration decoration-3"></div>
    
    <div class="star-coin star-1">⭐</div>
    <div class="star-coin star-2">⭐</div>
    
    <div class="menu-header">
      <h1 class="menu-title">¡MINIJUEGOS!</h1>
    </div>
    
    <div class="minigames-grid">
      <div class="minigame" @click="modo(1)">
        <div class="minigame-icon">🎈</div>
        <div class="minigame-name">Globos</div>
      </div>
      
      <div class="minigame" @click="modo(2)">
        <div class="minigame-icon" >🔫</div>
        <div class="minigame-name">Duelo oeste</div>
      </div>
      
      <div class="minigame" @click="modo(3)">
        <div class="minigame-icon">⚽</div>
        <div class="minigame-name">Penales</div>
      </div>
      <div class="minigame" @click="modo(4)">
        <div class="minigame-icon">🫴</div>
        <div class="minigame-name">Tirar de la soga</div>
      </div>

      <div class="minigame" @click="modo(5)" >
        <div class="minigame-icon">🏃‍♂️</div>
        <div class="minigame-name">Luz verde, luz roja</div>
      </div>
        
      <div class="minigame" @click="modo(6)" >
        <div class="minigame-icon">🎨</div>
        <div class="minigame-name">Colores</div>
      </div>
      
    <!--
      <div class="minigame">
        <div class="minigame-icon">💣</div>
        <div class="minigame-name">Bomba</div>
      </div>
      
      <div class="minigame">
        <div class="minigame-icon">🫴</div>
        <div class="minigame-name">Manos</div>
      </div>
    
      
      <div class="minigame">
        <div class="minigame-icon">🖼️</div>
        <div class="minigame-name">Adivina Imagen</div>
      </div>
      
     
      <div class="minigame">
        <div class="minigame-icon">🔪</div>
        <div class="minigame-name">Cuchillos</div>
      </div> 
       -->
    </div>
   
    <div class="menu-footer">
      ¡Selecciona un minijuego para comenzar la diversión!
    </div>
  </div>





</main>
</template>
<script setup>

import { ref,computed } from 'vue';
import Globos from '../components/globos.vue';
import socketManager from '../static/socket'
import Mando from '../components/mando.vue';
import Luz_verde from '../components/luz_verde.vue';
import Colores from '../components/colores.vue';
import Duelo from '../components/duelo.vue';
import Penales from '../components/penales.vue';

const socket = socketManager.getSocket();
const yo= computed(() => $nuxt.$store.state);  
const visibleWIN = ref(false);
const winner=ref(-1)
const visibleInstrucciones=ref(false);
const juego=ref(0);
function ganador(data){
  winner.value=data;
  visibleWIN.value=true;
  socket.emit('minijuego', yo.value.roomKey,-1 );
}

function ganador2(){
  visibleWIN.value=false;
  winner.value=-1;
  
   $nuxt.$store.dispatch('updateJuego', 0); 
   
   
  }
if(yo.value.juego==='' && yo.value.username!=="host"){
  $nuxt.$router.push('/jugar');
}

if(yo.value.username==="host"){
    $nuxt.$store.dispatch('updateJuego', 0); 
} 
 

function modo2(){
  visibleInstrucciones.value=false;
 $nuxt.$store.dispatch('updateJuego', juego.value); 
  socket.emit('minijuego', yo.value.roomKey,juego.value );
  juego.value=0;
}

function modo(data){
  if(visibleInstrucciones.value){
    juego.value=0;
  visibleInstrucciones.value=false;  
  }else{
  juego.value=data;
  visibleInstrucciones.value=true;  
  }
}


 


</script>
<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
.main{
    background-image: linear-gradient(45deg, #5c94fc 0%, #83bdff 100%);
    height: 100vh;
    width: 100vw;
}
.explicar{
    z-index: 3;
}
.win{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index:10;
}
 .menu-container {
    font-family: 'Press Start 2P', cursive;  
      width: 90%;
      max-width: 1000px;
      background-color: rgba(255, 255, 255, 0.9);
      border-radius: 20px;
      padding: 2rem;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      overflow: hidden;
    }
    
    .menu-header {
      text-align: center;
      margin-bottom: 2rem;
      color: #ff5a5f;
      text-shadow: 2px 2px 0 #ffde59, 4px 4px 0 rgba(0, 0, 0, 0.1);
      position: relative;
    }
    
    .menu-title {
      font-size: 2.5rem;
      margin: 0;
      padding: 0;
      letter-spacing: 1px;
    }
    
    .minigames-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 1rem;
      position: relative;
      z-index: 2;
    }
    
    .minigame {
      background-color: #fff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      cursor: pointer;
      position: relative;
      border: 4px solid #ffd500;
    }
    
    .minigame:hover {
      transform: translateY(-10px) scale(1.05);
      box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15);
      border-color: #ff5a5f;
      z-index: 10;
    }
    
    .minigame-icon {
      height: 120px;
      background-color: #ffde59;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 3rem;
      color: #ff5a5f;
      position: relative;
      overflow: hidden;
    }
    
    .minigame:nth-child(3n+1) .minigame-icon {
      background-color: #ffde59;
    }
    
    .minigame:nth-child(3n+2) .minigame-icon {
      background-color: #66d2b3;
    }
    
    .minigame:nth-child(3n+3) .minigame-icon {
      background-color: #ff9e7d;
    }
    
    .minigame-name {
      text-align: center;
      padding: 0.8rem;
      font-weight: bold;
      color: #333;
      font-size: 1.1rem;
    }
    
    .minigame:hover .minigame-icon::after {
      content: 'JUGAR';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(255, 90, 95, 0.8);
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      font-size: 1.5rem;
      font-weight: bold;
    }
    
    .minigame::before {
      content: '';
      position: absolute;
      top: -5px;
      left: -5px;
      right: -5px;
      bottom: -5px;
      background: linear-gradient(45deg, #ffde59, #ff5a5f, #66d2b3, #ffde59);
      z-index: -1;
      opacity: 0;
      border-radius: 15px;
      transition: opacity 0.3s ease;
    }
    
    .minigame:hover::before {
      opacity: 1;
      animation: rotate 3s linear infinite;
    }
    
    @keyframes rotate {
      0% {
        background-position: 0% 0%;
      }
      100% {
        background-position: 300% 0%;
      }
    }
    
    .decoration {
      position: absolute;
      background-color: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      z-index: 1;
    }
    
    .decoration-1 {
      width: 100px;
      height: 100px;
      top: -20px;
      left: -20px;
    }
    
    .decoration-2 {
      width: 150px;
      height: 150px;
      bottom: -50px;
      right: -30px;
    }
    
    .decoration-3 {
      width: 80px;
      height: 80px;
      top: 40%;
      left: 20px;
    }
    
    .star-coin {
      position: absolute;
      font-size: 2rem;
      animation: float 3s ease-in-out infinite;
    }
    
    .star-1 {
      top: 10%;
      right: 5%;
      animation-delay: 0s;
    }
    
    .star-2 {
      bottom: 15%;
      left: 8%;
      animation-delay: 1s;
    }
    
    @keyframes float {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-20px);
      }
    }
    
    @media (max-width: 768px) {
      .minigames-grid {
        grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
      }
      
      .minigame-icon {
        height: 90px;
      }
      
      .minigame-name {
        font-size: 0.9rem;
        padding: 0.5rem;
      }
    }
    
    .menu-footer {
      text-align: center;
      margin-top: 2rem;
      color: #5c94fc;
      font-weight: bold;
    }


</style>