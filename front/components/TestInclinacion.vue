<template>
    <div class="test-container">
      <h2 class="titulo">MODO PRUEBA - INCLINACIÓN</h2>
      
      <div class="controles">
        <button class="boton" @click="simularInclinacionArriba">
          SIMULAR INCLINACIÓN HACIA ARRIBA
        </button>
        <button class="boton" @click="simularInclinacionAbajo">
          SIMULAR INCLINACIÓN HACIA ABAJO
        </button>
      </div>
      
      <div class="valores">
        <div class="valor">
          <span>Beta (inclinación):</span>
          <span>{{ Math.round(inclinacion) }}°</span>
        </div>
      </div>
      
      <div class="visualizador">
        <div class="telefono" :style="{ transform: `rotateX(${-inclinacion}deg)` }">
          <div class="pantalla">
            <div class="icono-app">🎮</div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const inclinacion = ref(0);
  
  const simularInclinacionArriba = () => {
    // Simular movimiento hacia arriba (valor positivo de beta)
    inclinacion.value = 45;
    
    // Crear y disparar un evento personalizado para simular devicemotion
    const evento = new CustomEvent('devicemotion', {
      detail: {
        rotationRate: {
          beta: 45
        }
      }
    });
    
    // Añadir la propiedad rotationRate al evento para que sea compatible
    evento.rotationRate = { beta: 45 };
    
    window.dispatchEvent(evento);
    
    // Regresar a la posición neutral después de un tiempo
    setTimeout(() => {
      inclinacion.value = 0;
    }, 1000);
  };
  
  const simularInclinacionAbajo = () => {
    // Simular movimiento hacia abajo (valor negativo de beta)
    inclinacion.value = -45;
    
    // Crear y disparar un evento personalizado para simular devicemotion
    const evento = new CustomEvent('devicemotion', {
      detail: {
        rotationRate: {
          beta: -45
        }
      }
    });
    
    // Añadir la propiedad rotationRate al evento para que sea compatible
    evento.rotationRate = { beta: -45 };
    
    window.dispatchEvent(evento);
    
    // Regresar a la posición neutral después de un tiempo
    setTimeout(() => {
      inclinacion.value = 0;
    }, 1000);
  };
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
  
  .test-container {
    font-family: 'Press Start 2P', cursive;
    background-color: #222;
    color: white;
    padding: 20px;
    border-radius: 10px;
    margin-top: 20px;
  }
  
  .titulo {
    text-align: center;
    color: #0f0;
    font-size: 16px;
    margin-bottom: 20px;
  }
  
  .controles {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 20px;
  }
  
  .boton {
    background-color: #444;
    color: white;
    font-family: 'Press Start 2P', cursive;
    border: 3px solid #fff;
    border-radius: 6px;
    padding: 12px;
    cursor: pointer;
    font-size: 10px;
  }
  
  .boton:active {
    transform: translateY(2px);
  }
  
  .valores {
    background-color: #000;
    padding: 12px;
    border-radius: 6px;
    margin-bottom: 20px;
  }
  
  .valor {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #0f0;
  }
  
  .visualizador {
    display: flex;
    justify-content: center;
    perspective: 800px;
    height: 200px;
  }
  
  .telefono {
    width: 80px;
    height: 160px;
    background-color: #333;
    border: 4px solid #555;
    border-radius: 12px;
    transition: transform 0.3s;
    transform-style: preserve-3d;
  }
  
  .pantalla {
    width: 100%;
    height: 80%;
    background-color: rgba(255,255,255,0.9);
    margin: 10% auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .icono-app {
    font-size: 32px;
  }
  </style>