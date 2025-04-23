<template>


  <div class="contenedor">
    <div class="juego-container">
      <!-- Título del juego -->
      <div v-if="!juegoIniciado" class="titulo-container">
        <h1 class="titulo">ADIVINA EL PERSONAJE</h1>
      </div>

      <!-- Pasos del juego -->
      <div v-if="!juegoIniciado" class="pasos-container">
        <div class="paso" :class="{ 'paso-activo': paso === 1 }">
          <span class="paso-numero">1</span>
          <span class="paso-texto">Selecciona quién empieza</span>
        </div>
        <div class="paso" :class="{ 'paso-activo': paso === 2 }">
          <span class="paso-numero">2</span>
          <span class="paso-texto">Elige una categoría</span>
        </div>
        <div class="paso" :class="{ 'paso-activo': paso === 3 }">
          <span class="paso-numero">3</span>
          <span class="paso-texto">¡A jugar!</span>
        </div>
      </div>

      <!-- Selección de jugador -->
      <div v-if="paso === 1 && !juegoIniciado" class="seleccion-container">
        <h2 class="subtitulo">¿QUIÉN EMPIEZA?</h2>
        <div class="botones-container">
          <button 
            class="boton-jugador" 
            :class="{ 'seleccionado': jugadorSeleccionado === 1 }"
            @click="seleccionarJugador(1)"
          >
            JUGADOR 1
          </button>
          <button 
            class="boton-jugador" 
            :class="{ 'seleccionado': jugadorSeleccionado === 2 }"
            @click="seleccionarJugador(2)"
          >
            JUGADOR 2
          </button>
        </div>
      </div>

      <!-- Selección de categoría -->
      <div v-if="paso === 2 && !juegoIniciado" class="seleccion-container">
        <h2 class="subtitulo">ELIGE UNA CATEGORÍA</h2>
        <div class="categorias-grid">
          <button 
            v-for="categoria in categorias" 
            :key="categoria.id"
            class="boton-categoria"
            :class="{ 'seleccionado': categoriaSeleccionada?.id === categoria.id }"
            @click="seleccionarCategoria(categoria)"
          >
            <span class="categoria-icono">{{ categoria.icono }}</span>
            <span class="categoria-nombre">{{ categoria.nombre }}</span>
          </button>
        </div>
      </div>

      <!-- Botón de inicio -->
      <div v-if="paso === 3 && !juegoIniciado" class="seleccion-container">
        <div class="resumen">
          <p>Jugador inicial: Jugador {{ jugadorSeleccionado }}</p>
          <p>Categoría: {{ categoriaSeleccionada?.nombre }}</p>
          <button class="boton-empezar" @click="empezarJuego">
            ¡EMPEZAR JUEGO!
          </button>
        </div>
      </div>

      <div v-if="juegoIniciado" class="pantalla-partida">
  <button class="boton-volver" @click="volverAlMenu">← VOLVER</button>

  <h2 class="titulo-partida">PARTIDA EN CURSO</h2>
  
  <div class="jugadores-container">
    <div class="jugador-card" :class="{ 'jugador-activo': jugadorSeleccionado === 1 }">
      <div class="jugador-titulo">JUGADOR 1</div>
      <div class="jugador-estado">
        {{ jugadorSeleccionado === 1 ? 'ADIVINANDO...' : 'ESPERANDO' }}
      </div>
      <div class="jugador-tiempo" v-if="tiempoJugador1">
        Tiempo: {{ tiempoJugador1 }}
      </div>
    </div>

    <div class="jugador-card" :class="{ 'jugador-activo': jugadorSeleccionado === 2 }">
      <div class="jugador-titulo">JUGADOR 2</div>
      <div class="jugador-estado">
        {{ jugadorSeleccionado === 2 ? 'ADIVINANDO...' : 'ESPERANDO' }}
      </div>
      <div class="jugador-tiempo" v-if="tiempoJugador2">
        Tiempo: {{ tiempoJugador2 }}
      </div>
    </div>
  </div>

  <div class="estado-juego">
    <p class="categoria-actual">Categoría: {{ categoriaSeleccionada?.nombre }}</p>
    <p class="instrucciones-juego">Esperando resultados de los jugadores...</p>
  </div>
</div>

      <!-- Navegación entre pasos -->
      <div v-if="!juegoIniciado" class="navegacion">
        <button 
          v-if="paso > 1" 
          class="boton-nav" 
          @click="paso--"
        >
          ANTERIOR
        </button>
        <button 
          v-if="paso < 3 && puedeAvanzar" 
          class="boton-nav" 
          @click="paso++"
        >
          SIGUIENTE
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
const vista = ref(0);
const paso = ref(1);
const jugadorSeleccionado = ref(null);
const categoriaSeleccionada = ref(null);
const juegoIniciado = ref(false);
const tiempoJugador1 = ref(null);
const tiempoJugador2 = ref(null);


const categorias = [
  { id: 1, nombre: 'ACTORES', icono: '🎭' },
  { id: 2, nombre: 'CANTANTES', icono: '🎤' },
  { id: 3, nombre: 'DEPORTISTAS', icono: '⚽' },
  { id: 4, nombre: 'PERSONAJES DE FICCIÓN', icono: '🦸' }
];

const puedeAvanzar = computed(() => {
  if (paso.value === 1) return jugadorSeleccionado.value !== null;
  if (paso.value === 2) return categoriaSeleccionada.value !== null;
  return true;
});

const seleccionarJugador = (jugador) => {
  jugadorSeleccionado.value = jugador;
};

const seleccionarCategoria = (categoria) => {
  categoriaSeleccionada.value = categoria;
};

const empezarJuego = () => {
  juegoIniciado.value = true;
  // Mantenemos el envío de datos pero sin navegar
  const datos = {
    categoria: categoriaSeleccionada.value.nombre,
    jugador: jugadorSeleccionado.value
  };
  // Aquí más adelante implementaremos la lógica de sockets
};
const volverAlMenu = () => {
  $nuxt.$router.push('/adivinaPersonaje');
};

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');


.pantalla-partida {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  height: 100%; 
  padding: 20px;
  box-sizing: border-box;
  margin: 0 auto;
  }

.titulo-partida {
  color: #ff0;
  font-size: 32px;
  text-align: center;
  font-family: 'Press Start 2P', cursive;
  margin-bottom: 30px;
  text-shadow: 2px 2px 0 #f00;
}

.jugadores-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 80px; /* Más espacio entre las tarjetas */
  width: 100%; /* Asegura que ocupe todo el ancho del contenedor */
  flex-grow: 1; 
}

.jugador-card {
  background-color: #000;
  border: 4px solid #666;
  border-radius: 12px;
  padding: 30px;
  width: 300px; /* Tarjetas más grandes */
  height: 250px; /* Altura fija */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
}

.boton-volver {
    position: absolute;
    top: 15px;
    left: 30px;
    background-color: #333;
    color: white;
    font-family: 'Press Start 2P', cursive;
    font-size: 10px;
    padding: 6px 10px;
    border: 2px solid white;
    border-radius: 4px;
    cursor: pointer;
    z-index: 10;
  }

.jugador-activo {
  border-color: #ff0;
  box-shadow: 0 0 20px rgba(255, 255, 0, 0.3);
}

.jugador-titulo {
  color: #fff;
  font-size: 24px;
  margin-bottom: 10px;
}

.jugador-estado {
  color: #0f0;
  font-size: 18px;
  margin: 10px 0;
}

.jugador-tiempo {
  color: #ff0;
  font-size: 20px;
  margin-top: 10px;
}

.estado-juego {
  width: 100%;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 12px;
  text-align: center;
  margin-top: 20px;
}

.categoria-actual {
  color: #ff0;
  font-size: 20px;
  margin-bottom: 10px;
}

.instrucciones-juego {
  color: #0f0;
  font-size: 16px;
  animation: parpadeo 2s infinite;
}

@keyframes parpadeo {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

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
  stroke-dasharray: 565.48;
  /* Valor inicial del circumference */
  transition: stroke-dashoffset 1s linear;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
}

.timer-text {
  position: absolute;
  font-size: 2rem;
  color: #fff;
}


.boton-volver {
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: #333;
  color: white;
  font-family: 'Press Start 2P', cursive;
  font-size: 14px;
  padding: 10px 15px;
  border: 2px solid white;
  border-radius: 4px;
  cursor: pointer;
  z-index: 10;
}

.boton-volver:hover {
  background-color: #f00;
  color: #fff;
  transform: scale(1.05);
}

.contenedor {
  background-color: rgb(108, 163, 240);
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px;
  font-family: 'Press Start 2P', cursive;
  overflow: hidden;
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
  grid-template-columns: repeat(2, 1fr); /* 2 columnas fijas */
  gap: 16px;
  margin: 0 auto;
  max-width: 600px;
  padding: 0 1rem;
}

.instrucciones {
  text-align: center;
  color: #0f0;
  font-size: 12px;
  animation: parpadeo 1s infinite;
}

@keyframes parpadeo {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }
}

.contador-container {
  text-align: center;
  margin-bottom: 16px;
}

.cuenta-atras{
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

.pasos-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding: 0 1rem;
}

.paso {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #666;
  transition: all 0.3s ease;
}

.paso-activo {
  color: #ff0;
}

.paso-numero {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid currentColor;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
}

.paso-texto {
  font-size: 0.8rem;
  text-align: center;
}

.seleccion-container {
  min-height: 200px; /* Altura fija mínima */
  margin-bottom: 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.botones-container {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 1rem;
  margin-top: 1rem;
  min-height: 80px; 
  align-items: center;
}

.boton-jugador {
  min-width: 200px; /* Ancho fijo mínimo */
  height: 60px; /* Altura fija */
  padding: 1rem 2rem;
  font-size: 1rem;
  border: 2px solid #ff0;
  background: transparent;
  color: #ff0;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Press Start 2P', cursive;
}

.boton-jugador.seleccionado {
  background: #ff0;
  color: #000;
}

.boton-categoria {
  height: 120px; /* Altura fija */

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border: 2px solid #ff0;
  background: transparent;
  color: #ff0;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Press Start 2P', cursive;
}

.boton-categoria.seleccionado {
  background: #ff0;
  color: #000;
}

.categoria-icono {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.categoria-nombre {
  font-size: 0.8rem;
}

.navegacion {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
}

.boton-nav {
  padding: 0.5rem 1rem;
  background: #ff0;
  color: #000;
  border: none;
  cursor: pointer;
  font-family: 'Press Start 2P', cursive;
  transition: all 0.3s ease;
}

.boton-nav:hover {
  background: #f00;
  color: #fff;
}

.boton-empezar {
  padding: 1rem 2rem;
  background: #0f0;
  color: #000;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  font-family: 'Press Start 2P', cursive;
  transition: all 0.3s ease;
}

.boton-empezar:hover {
  transform: scale(1.05);
  background: #0d0;
}

.resumen {
  min-height: 120px; /* Altura fija mínima */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
  color: #fff;
  line-height: 1.5;
}

</style>