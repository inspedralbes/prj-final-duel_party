<script setup>
import { ref,computed } from 'vue';
import socket from '../static/socket';
import confetti from 'canvas-confetti';



const yo= computed(() => $nuxt.$store.state);
const resultado = ref(null);
const jugadores = ref([]);
const mostrandoResultados = ref(false);
const ganador = ref('');
const eleccionHecha = ref(false);
let animacionConfetti;
const socketA=socket.getSocket();
const emit = defineEmits();

socketA.on('resultadoPPT', (data) => {
    resultado.value = data;
    console.log("Resultados:", resultado.value);
    eleccionHecha.value = true;
    determinarGanador();
    mostrandoResultados.value = true;
  });

const determinarGanador = () => {
    jugadores.value = Object.keys(resultado.value);
    const eleccion1 = resultado.value[jugadores.value[0]];
    const eleccion2 = resultado.value[jugadores.value[1]];

    if (eleccion1 === eleccion2) {
        ganador.value = 'EMPATE';
        setTimeout(reiniciarJuego, 2000); 
    } else if (
        (eleccion1 === 'piedra' && eleccion2 === 'tijera') ||
        (eleccion1 === 'papel' && eleccion2 === 'piedra') ||
        (eleccion1 === 'tijera' && eleccion2 === 'papel')
    ) {
        ganador.value = yo.value.jugadores[0].username;
        lanzarConfeti();
        setTimeout(() => {
            emit('acabarJuego');
        }, 2500);

    } else {
        ganador.value = yo.value.jugadores[1].username;
        lanzarConfeti();
        setTimeout(() => {
            emit('acabarJuego');
        }, 2500);
    }
};

const reiniciarJuego = () => {
    eleccionHecha.value = false;
    resultado.value = null;
    ganador.value = '';
    mostrandoResultados.value = false;
};

function lanzarConfeti() {
  const duration = 5000; 
  const interval = 300; 
  const end = Date.now() + duration;

  const colors = ['#ff0000', '#ffff00', '#00ff00', '#0000ff', '#ff00ff',
    '#00ffff', '#ff7f00', '#8a2be2', '#a52a2a', '#000080',
    '#ff1493', '#7fff00', '#d2691e', '#ff4500', '#ff6347'];

  function frame() {
    if (Date.now() > end) return;

    confetti({
      particleCount: 3, 
      angle: 90,
      spread: 30, 
      startVelocity: 25,
      decay: 0.9,
      gravity: 1.2,
      origin: { x: Math.random(), y: 0 },
      colors: colors,
    });

    setTimeout(frame, interval);
  }

  frame();
}

</script>

<template>
  <main>

    <div class="titulo">
      <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
      <h1>PIEDRA PAPEL TIJERA</h1>
    </div>

    <div class="contenedor" v-if=" !eleccionHecha && !mostrandoResultados">
      <div class="grid-img">
        <div class="jugador1">{{ yo.jugadores[0].username }}</div>
        <img class="j1" src="/images/ppt/j1-cargando.gif" alt="Jugador 1" />
        <div class="jugador2">{{ yo.jugadores[1].username }}</div>
        <img class="j2" src="/images/ppt/j2-cargando.gif" alt="Jugador 2" />
        <img class="vs" src="/images/ppt/vs.png" alt="vs">
      </div>
    </div>

    <div class="contenedor" v-if="eleccionHecha && mostrandoResultados">
      <div class="grid-img">
          <div class="ganador">GANADOR: {{ ganador }}</div>
          <img class="j1" :src="`/images/ppt/j1-${resultado[Object.keys(resultado)[0]]}.png`" alt="Jugador 1" />
          <img class="j2" :src="`/images/ppt/j2-${resultado[Object.keys(resultado)[1]]}.png`" alt="Jugador 2" />
          <img class="vs" src="/images/ppt/vs.png" alt="vs">
      </div>
    </div>

  </main>
</template>

<style scoped>
main {
  background-image: url('/images/ppt/fondo2.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100vw;
  height: 100vh;
}

h1 {
  font-size: 41px;
}

.contenedor {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.titulo {
  font-family: 'Press Start 2P', cursive;
  text-align: center;
  color: rgb(176, 165, 6);
  background-color: rgb(31, 31, 31);
  padding: 7px;
  width: 100%;
  margin-top: -15px;
}

.grid-img {
  display: grid;
  width: 700px;
  margin-top: 0px;
  margin-right: 170px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 0px;
  place-items: center;
}
.jugador1{
  font-size: 40px;
  font-family: 'Press Start 2P', cursive;
  text-align: center;
  grid-column-start: 1;
  grid-row-start: 1;
  color: rgb(176, 165, 6);
  background-color: rgb(31, 31, 31);
  padding: 20px;
  border-radius: 20px;

}
.jugador2{
  font-size: 40px;
  font-family: 'Press Start 2P', cursive;
  text-align: center;
  grid-column-start: 3;
  grid-row-start: 1;
  color: rgb(176, 165, 6);
  background-color: rgb(31, 31, 31);
  padding: 20px;
  border-radius: 20px;
}
.ganador{
  font-size: 40px;
  font-family: 'Press Start 2P', cursive;
  text-align: center;
  grid-column: 1 / -1; 
  grid-row: 1; 
  color: rgb(176, 165, 6);
  background-color: rgb(31, 31, 31);
  padding: 20px;
  border-radius: 20px;
}

.j1 {
  width: 310px;
  grid-column-start: 1;
  grid-row-start: 2;
}

.j2 {
  width: 310px;
  grid-column-start: 3;
  grid-row-start: 2;
}

.vs {
  width: 200px;
  grid-column-start: 2;
  grid-row-start: 2;
  
}
</style>
