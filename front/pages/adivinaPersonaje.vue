<template>
  <div class="contenedor">
    <!-- Pantalla de selección de categoría -->
    <div v-if="!mostrarJuego" class="juego-container">
      <div class="titulo-container">
        <h1 class="titulo">ADIVINA EL PERSONAJE</h1>

        <div class="subtitulo">¡ELIGE UNA CATEGORÍA!</div>
      </div>
      
      <div class="categorias-grid">
        <boton-categoria 
          v-for="(categoria, index) in categorias" 
          :key="index" 
          :categoria="categoria"
          @seleccionar="seleccionarCategoria" 
        />
      </div>
      
      <div class="instrucciones">
        PRESIONA UN BOTÓN PARA COMENZAR
      </div>
    </div>

    <div v-if="mostrarJuego" class="juego-container">
  <div class="game-content">
    <div class="timer-container">
      <div class="timer-circle">
        <svg class="timer-svg">
          <circle
    class="timer-progress"
    r="90"
    cx="100"
    cy="100"
    :style="{
      strokeDasharray: `${circumference} ${circumference}`,
      strokeDashoffset: `${circumference * (1 - tiempoRestante / 60)}`
    }"
  ></circle>
</svg>

        <div class="timer-text">{{ tiempoRestante }}s</div>
      </div>
    </div>
    <div class="aciertos-container">
      <div class="aciertos-box">
        <span class="aciertos-label">Aciertos</span>
        <span class="aciertos-numero">{{ contadorAciertos }}</span>
      </div>
    </div>
    <button @click="volverASeleccion" class="boton-volver">Volver</button>
  </div>
</div>

    <!-- Componente de prueba para desarrollo -->
    <test-inclinacion v-if="mostrarJuego && modoDesarrollo" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import BotonCategoria from '~/components/BotonCategoria.vue';
import TestInclinacion from '~/components/TestInclinacion.vue';

const categorias = [
{ id: 1, nombre: 'ACTORES', icono: '🎭' },
{ id: 2, nombre: 'CANTANTES', icono: '🎤' },
{ id: 3, nombre: 'DEPORTISTAS', icono: '⚽' },
{ id: 4, nombre: 'PERSONAJES DE FICCIÓN', icono: '🦸' }
];

// Variables reactivas para controlar el estado de la aplicación
const mostrarJuego = ref(false);
const categoriaSeleccionada = ref(null);
const modoDesarrollo = ref(false); // Cambia a true para activar el componente de prueba
const tiempoRestante = ref(60); // Tiempo inicial de 1 minuto
const contadorAciertos = ref(0); // Contador de aciertos
const circumference = 2 * Math.PI * 90; // 2πr donde r es el radio (90)

let intervalId = null;



const iniciarCuentaAtras = () => {
  tiempoRestante.value = 60;
  contadorAciertos.value = 0;
  intervalId = setInterval(() => {
    if (tiempoRestante.value > 0) {
      tiempoRestante.value--;
    } else {
      clearInterval(intervalId);
    }
  }, 1000);
};

// Función para seleccionar categoría e iniciar el juego
const seleccionarCategoria = (categoria) => {
console.log(`Categoría seleccionada: ${categoria.nombre}`);
categoriaSeleccionada.value = categoria;
mostrarJuego.value = true;
iniciarCuentaAtras();
};


// Función para volver a la pantalla de selección de categoría
const volverASeleccion = () => {
mostrarJuego.value = false;
clearInterval(intervalId);
};

// Limpiar el intervalo al desmontar el componente
onUnmounted(() => {
clearInterval(intervalId);
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
.game-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.timer-container {
  position: relative;
  width: 200px;
  height: 200px;
}

.timer-circle {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.timer-svg {
  width: 200px;
  height: 200px;
  transform: rotate(-90deg);
}

.timer-background,
.timer-progress {
  fill: none;
  stroke-width: 10;
}

.timer-background {
  stroke: #333;
}

.timer-progress {
  stroke: #ff0;
  stroke-linecap: round;
  stroke-dasharray: 565.48; /* Valor inicial del circumference */
  transition: stroke-dashoffset 1s linear;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
}

.timer-text {
  position: absolute;
  font-size: 2rem;
  color: #fff;
}

.aciertos-container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 1rem 0;
}

.aciertos-box {
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem 2rem;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.aciertos-label {
  color: #ff0;
  font-size: 1rem;
  text-transform: uppercase;
}

.aciertos-numero {
  color: #fff;
  font-size: 2rem;
  font-weight: bold;
}

.boton-volver {
  margin-top: 1rem;
  background-color: #ff0;
  color: #000;
  border: none;
  padding: 1rem 2rem;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  text-transform: uppercase;
  font-family: 'Press Start 2P', cursive;
  transition: all 0.3s ease;
}

.boton-volver:hover {
  background-color: #f00;
  color: #fff;
  transform: scale(1.05);
}
.contenedor {
background-color: rgb(108, 163, 240);
min-height: 100vh;
display: flex;
justify-content: center;
align-items: center;
padding: 20px;
font-family: 'Press Start 2P', cursive;
}

.juego-container {
background-color: #000;
border: 8px solid #fff;
border-radius: 10px;
box-shadow: 0 0 0 4px #000, 0 0 0 8px #ff0;
padding: 24px;
width: 90%;
max-width: 800px;
}

.titulo-container {
text-align: center;
margin-bottom: 32px;
}

.titulo {
color: #ff0;
font-size: 28px;
margin-bottom: 16px;
text-shadow: 4px 4px 0 #f00;
}

.subtitulo {
color: #fff;
font-size: 16px;
margin-bottom: 8px;
}

.categorias-grid {
display: grid;
grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
gap: 16px;
margin-bottom: 32px;
}

.instrucciones {
text-align: center;
color: #0f0;
font-size: 12px;
animation: parpadeo 1s infinite;
}

@keyframes parpadeo {
0%, 100% { opacity: 1; }
50% { opacity: 0; }
}

.contador-container {
text-align: center;
margin-bottom: 16px;
}

.cuenta-atras, .contador-aciertos {
color: #fff;
font-size: 20px;
margin-bottom: 8px;
}

.boton-volver {
background-color: #ff0;
color: #000;
border: none;
padding: 10px 20px;
font-size: 16px;
cursor: pointer;
border-radius: 5px;
text-transform: uppercase;

}

.boton-volver:hover {
background-color: #f00;
color: #fff;
}
</style>