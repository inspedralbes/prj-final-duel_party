<template>
  <div class="contenedor">
    <div class="juego-container">
      <button class="boton-volver" @click="volverAlMenu">← VOLVER</button>

      <div class="carta-personaje">
        <div class="personaje-info">
          <h2 class="personaje-nombre">{{ $route.query.personaje }}</h2>
          <div class="timer">{{ formatTime(tiempo) }}</div>
          <p class="instruccion">Pausa y envia el tiempo cuando el personaje</p>
        </div>
      </div>

      <div class="botones-container">
        <button class="boton-parar-tiempo" :class="{ 'tiempo-parado': tiempoPausado }" @click="pararTiempo">{{
          tiempoPausado ? '▶ REANUDAR' : '⏸ PARAR'}}
        </button>
        <button class="boton-enviar" :disabled="!tiempoPausado" @click="enviarTiempo">
          ENVIAR TIEMPO
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const tiempoPausado = ref(false);
const tiempo = ref(0);
const tiempoFinal = ref(0);

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const volverAlMenu = () => {
  $nuxt.$router.push('/adivinaPersonaje');
};

const pararTiempo = () => {
  tiempoPausado.value = !tiempoPausado.value;
};

const enviarTiempo = () =>{
  tiempoFinal.value = tiempo.value;
  console.log("Tiempo final enviado:", formatTime(tiempoFinal.value));
}
// Start timer when component mounts
let timer;
onMounted(() => {
  timer = setInterval(() => {
    if (!tiempoPausado.value) {
      tiempo.value++;
    }
  }, 1000);
});

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

.contenedor {
  background-color: rgb(108, 163, 240);
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Press Start 2P', cursive;
}

.juego-container {
  background-color: #000;
  border: 8px solid #fff;
  border-radius: 10px;
  box-shadow: 0 0 0 4px #000, 0 0 0 8px #ff0;
  padding: 20px;
  width: 90%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.personaje-info {
  width: 100%;
  height: 100%;
  display: flex;

  justify-content: center;
  align-items: center;
}

.timer-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.timer {
  font-size: 48px;
  color: #ff0;
  text-shadow: 2px 2px 0 #f00;
  margin: 20px 0;
}

.boton-volver {
  position: absolute;
  top: 8px;
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

.instruccion {
  color: #fff;
  font-size: 14px;
  margin: 20px 0;
  text-align: center;
  line-height: 1.5;
}

.botones-container {
  display: flex;
  gap: 20px;
  margin: 20px;
}

.boton-parar-tiempo,
.boton-enviar {
  background-color: #ff0;
  color: #000;
  border: none;
  padding: 15px 30px;
  font-size: 20px;
  cursor: pointer;
  border-radius: 8px;
  font-family: 'Press Start 2P', cursive;
  transition: all 0.3s ease;
}

.boton-parar-tiempo:hover,
.boton-enviar:hover {
  transform: scale(1.05);
}

.boton-parar-tiempo.tiempo-parado {
  background-color: #f00;
  color: #fff;
}

.boton-enviar {
  background-color: #0f0;
}

.boton-enviar:disabled {
  background-color: #666;
  cursor: not-allowed;
  transform: none;
}

@media (orientation: landscape) and (max-height: 600px) {
  .botones-container {
    flex-direction: row;
    gap: 10px;
  }

  .boton-parar-tiempo,
  .boton-enviar {
    font-size: 16px;
    padding: 10px 20px;
  }
}

.carta-personaje {
  background-color: #000;
  border: 6px solid #fff;
  border-radius: 12px;
  padding: 20px;
  margin: 30px;
  text-align: center;
  box-shadow: 0 0 0 4px #000, 0 0 0 8px #ff0;
  flex-grow: 1;
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
}


</style>