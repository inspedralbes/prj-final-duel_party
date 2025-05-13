<template>
    <main >
      <div class="game-container"  v-if="menu === 1">
      <!-- Pantalla de selección de modo -->
      <div  class="game-screen modo-select-screen">
        <div class="pixel-overlay"></div>
        <div class="content-container">
          <h1 class="game-title">DUEL PARTY</h1>
          <div class="modo-selection">
            <h2 class="modo-subtitle">Selecciona el Modo de Juego</h2>
            
            <div class="modo-buttons">
              <button 
                class="btn-modo" 
                @click="modoSeleccionado('mountain')"
                :class="{ 'active': hoveredmodo === 'mountain' }"
                @mouseenter="hoveredmodo = 'mountain'"
                @mouseleave="hoveredmodo = null"
              >
                <div class="modo-icon-container">
                  <img src="/montaña.png" alt="Mountain" class="modo-icon">
                </div>
                <div class="modo-text">
                  <span class="modo-name">Duelo en la Montaña</span>
                  <p class="modo-description">¡Compite en minijuegos para alcanzar la cima!</p>
                </div>
              </button>
              
              <button 
                class="btn-modo" 
                @click="modoSeleccionado('minigames')"
                :class="{ 'active': hoveredmodo === 'minigames' }"
                @mouseenter="hoveredmodo = 'minigames'"
                @mouseleave="hoveredmodo = null"
              >
                <div class="modo-icon-container">
                  <img src="/minijuegos.png" alt="Minigames" class="modo-icon">
                </div>
                <div class="modo-text">
                  <span class="modo-name">Minijuegos</span>
                  <p class="modo-description">Juega tus minijuegos favoritos cuando quieras</p>
                </div>
              </button>
            </div>
          </div>
          
          <div class="footer-note">
            <span>Presiona una opción para comenzar</span>
          </div>
        </div>
      </div>
  </div>
  <div v-if="menu === 0">
    <mando/>
  </div>
    </main>
  </template>
  
  <script setup>
  import { computed, ref } from "vue";
  import socketManager from '../static/socket' 

const socket = socketManager.getSocket();
  const menu = ref(1);
  const yo= computed(() => $nuxt.$store.state);
  const hoveredmodo = ref(null);
  
  if(yo.value.username!=="host"){
    menu.value=0;
  }
  if(yo.value.juego==='' && yo.value.username!=="host"){
  $nuxt.$router.push('/jugar');
}

socket.on('pagina', (data) => {
   $nuxt.$store.dispatch('updateJuego', -1);
  switch(data){
    case 1:
       $nuxt.$router.push('/historia');
      break;
    case 2:
     $nuxt.$router.push('/minijuegos');
      break;
    default:
      $nuxt.$router.push('/jugar');
      break;
  }
})   


  function modoSeleccionado(modo) {
    if (modo === 'mountain') {
       socket.emit('pagina', yo.value.roomKey,1);
        $nuxt.$router.push('/historia');
    } else if (modo === 'minigames') {
       socket.emit('pagina', yo.value.roomKey,2);
      $nuxt.$router.push('/minijuegos');
    }
  }
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
  
  /* Variables */
  :root {
    --primary-color: #00a6bc;
    --bg-dark: #121212;
  }
  
  /* Animaciones */
  @keyframes pixelate {
    0% { background-position: 0 0; }
    100% { background-position: 100px 100px; }
  }
  
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
  
  /* Estilos generales */
  .game-container {
    height: 100vh;
    width: 100vw;
    margin: 0;
    padding: 0;
    overflow: hidden;
    font-family: 'Press Start 2P', cursive;
    color: white;
  }
  
  .game-screen {
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--bg-dark);
  }
  
  .modo-select-screen {
    background-image: url('/images/fondo-inicio.png');
    background-size: cover;
    background-position: center;
  }
  
  .pixel-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='none' stroke='%23000' stroke-opacity='0.1' stroke-width='1' d='M0 0h100v100H0z'/%3E%3C/svg%3E");
    opacity: 0.5;
    animation: pixelate 120s linear infinite;
    pointer-events: none;
  }
  
  .content-container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 90%;
    max-width: 900px;
    z-index: 1;
  }
  
  .game-title {
    font-size: 48px;
    margin-bottom: 20px;
    text-shadow: 0 0 10px var(--primary-color);
    letter-spacing: 4px;
    animation: pulse 3s infinite;
  }
  
  .modo-subtitle {
    font-size: 24px;
    text-align: center;
    margin-bottom: 40px;
    color: white;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  }
  
  .modo-selection {
    background-color: rgba(0, 0, 0, 0.8);
    padding: 40px;
    border-radius: 20px;
    width: 100%;
    border: 2px solid var(--primary-color);
    box-shadow: 0 0 15px var(--primary-color);
  }
  
  .modo-buttons {
    display: flex;
    gap: 70px;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .btn-modo {
    width: 350px;
    padding: 20px;
    background-color: rgba(20, 20, 20, 0.9);
    border: 2px solid var(--primary-color);
    border-radius: 15px;
    color: white;
    cursor: pointer;
    transition: transform 0.3s;
    display: flex;
    align-items: center;
  }
  
  .btn-modo:hover, .btn-modo.active {
    background-color: rgba(0, 166, 188, 0.3);
    transform: translateY(-5px);
  }
  
  .modo-icon-container {
    flex: 0 0 100px;
    height: 100px;
    margin-right: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .modo-icon {
    width: 80%;
    height: 80%;
    object-fit: contain;
  }
  
  .modo-text {
    flex: 1;
  }
  
  .modo-name {
    font-size: 18px;
    margin-bottom: 15px;
  }
  
  .modo-description {
    font-size: 14px;
    line-height: 1.4;
  }
  
  .footer-note {
    margin-top: 40px;
    font-size: 18px;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.9);
    animation: pulse 2s infinite;
  }
  
  @media (max-width: 768px) {
    .modo-buttons {
      flex-direction: column;
      gap: 30px;
    }
    
    .btn-modo {
      width: 90%;
    }
    
    .game-title {
      font-size: 36px;
    }
  }
  </style>