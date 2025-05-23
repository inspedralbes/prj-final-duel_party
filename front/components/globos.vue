<script setup>
import { reactive, ref, computed } from 'vue';
import socketManager from '../static/socket'
const azules = ref(10);
const rojos = ref(10);
const globos = ref([]);
const puntaje = reactive({ punto: ["white", "white", "white", "white", "white"], azul: 0, rojo: 0, ronda: 0 });
const yo = computed(() => $nuxt.$store.state);
const menu = ref(0);
const socket = socketManager.getSocket();
const emit = defineEmits();

// temporizador
let tiempoRestante = ref(5);

function actualizarTemporizador() {
  if (tiempoRestante.value <= 0) {
    clearInterval(temporizador);
    enviar();
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

for (let index = 0; index < 20; index++) {
  let numero = Math.floor(Math.random() * 2) + 1;
  if (azules.value === 0) {
    numero = 2;
  }
  if (rojos.value === 0) {
    numero = 1;
  }

  if (numero === 1) {
    azules.value--;
    globos.value.push({ color: "azul", explotado: false });
  } else {
    rojos.value--;
    globos.value.push({ color: "rojo", explotado: false });
  }

}

function explotar(index) {
  globos.value[index].explotado = true;
  socket.emit('enviar_globos', yo.value.roomKey, globos);
  globos_restantes();
  if (azules.value === 10) {
    azules.value = 0;
    rojos.value = 0;
    socket.emit('ganador_globos', yo.value.roomKey, 1);


  } else {
    if (rojos.value === 10) {
      azules.value = 0;
      rojos.value = 0;
      socket.emit('ganador_globos', yo.value.roomKey, 0);

    }

  }


}
function globos_restantes() {

  let aux = [0, 0]
  globos.value.forEach(element => {
    if (element.color === "azul" && element.explotado === true) {
      aux[0]++;
    } else {
      if (element.explotado === true) {
        aux[1]++;
      }

    }

  });
  azules.value = aux[0];
  rojos.value = aux[1];





}





socket.on('ganador_globos', (data) => {

  if (yo.value.username !== "host") {
    if (yo.value.jugadores[data].username === yo.value.username) {
      menu.value = 1;
    } else {
      menu.value = 2;
    }
  } else {
    if (data === 0) {
      puntaje.punto[puntaje.ronda] = "red";
      puntaje.rojo++;

    } else {
      puntaje.punto[puntaje.ronda] = "blue";
      puntaje.azul++;
    }
    reiniciarTemporizador();
  }
  puntaje.ronda++;

  if (puntaje.azul === 3) {
    emit('ganador',1);
  }
  if (puntaje.rojo === 3) {
    emit('ganador',0);
  }

  console.log(puntaje.ronda, puntaje.azul, puntaje.rojo);
  
});



function enviar() {
  if (yo.value.username === "host") {
    socket.emit('enviar_globos', yo.value.roomKey, globos);
  }
}


socket.on('recibir_globos', (data) => {
  if (yo.value.username !== "host") {
    globos.value = data.value;
    globos_restantes();
    menu.value = 3;

  }
});

</script>

<template>

  <main>
    <div v-if="menu === 0">

      <div class="battle-container" v-if="yo.username == 'host'">
        <div class="player-card left">
          <div class="player-avatar">
            <img class="imagess" src="/images/globos/rojo.webp">
          </div>
          <h2 class="player-name">{{ yo.jugadores[0].username }}</h2>
          <h2 class="player-name">{{ puntaje.rojo }}</h2>
        </div>

        <div class="vs-container">
          <div class="vs-circle"></div>
          <div class="vs-text">{{ tiempoRestante }}</div>
        </div>

        <div class="player-card right">
          <div class="player-avatar">
            <img class="imagess" src="/images/globos/azul.webp">
          </div>
          <h2 class="player-name">{{ yo.jugadores[1].username }}</h2>
          <h2 class="player-name">{{ puntaje.azul }}</h2>

        </div>
        <br>
        <div class="rondas">
          <div class="ronda" :style="{ backgroundColor: puntaje.punto[0] }"></div>
          <div class="ronda" :style="{ backgroundColor: puntaje.punto[1] }"></div>
          <div class="ronda" :style="{ backgroundColor: puntaje.punto[2] }"></div>
          <div class="ronda" :style="{ backgroundColor: puntaje.punto[3] }"></div>
          <div class="ronda" :style="{ backgroundColor: puntaje.punto[4] }"></div>

        </div>
      </div>


      <div class="battle-container" v-if="yo.username == yo.jugadores[0].username">
        <div class="player-card left">
          <div class="player-avatar">
            <img class="images" src="/images/globos/rojo.webp">
          </div>
          <h2 class="player-name">{{ yo.jugadores[0].username }}</h2>

        </div>

      </div>



      <div class="battle-container" v-if="yo.username == yo.jugadores[1].username">


        <div class="player-card right">
          <div class="player-avatar">
            <img class="images" src="/images/globos/azul.webp">
          </div>
          <h2 class="player-name">{{ yo.jugadores[1].username }}</h2>

        </div>

      </div>





    </div>
    <div v-else-if="menu === 1">
      <div class="battle-container">


        <div class="player-card">

          <h2 class="player-name">GANADOR</h2>

        </div>

      </div>
    </div>
    <div v-else-if="menu === 2">
      <div class="battle-container">


        <div class="player-card">

          <h2 class="player-name">PERDEDOR</h2>

        </div>

      </div>
    </div>



    <div v-else class="parent">
      <img v-for="(globo, index) in globos" :key="index" class="images" :class="[
        puntaje.ronda === 2 ? 'mover_izquierda' : '',
        puntaje.ronda === 3 ? 'mover_arriba' : '',
        puntaje.ronda === 4 ? 'mover_izquierda' : '',
        { opacity: globo.explotado }
      ]" :src="`/images/globos/${globo.color}.webp`" @click="explotar(index)" />
    </div>
  </main>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

main {
  background-color: #1a1a1a;
  height: 100vh;
  width: 100vw;

}

@keyframes mover_arriba {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-100px);
  }

  100% {
    transform: translateY(0);
  }

}


@keyframes mover_izquierda {
  0% {
    transform: translateX(0);
  }

  50% {
    transform: translateX(-100px);
  }

  100% {
    transform: translateX(0);
  }

}

@keyframes explotar {
  0% {
    scale: 1;
    opacity: 1;
  }

  100% {
    scale: 1.2;
    opacity: 0;
  }
}


.mover_izquierda {
  animation: mover_izquierda 0.5s infinite;
}

.mover_arriba {
  animation: mover_arriba 0.5s infinite;
}

.opacity {
  animation: explotar 0.2s ease-in-out;
  opacity: 0;
}

.images {
  width: 8vw;
}
.imagess {
  width: 80px;
}

.parent {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-column-gap: 70px;
  grid-row-gap: -10px;
  justify-content: center;
  align-items: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;

}

.ronda {
  display: inline-block;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: white;
  margin-left: 10px
}

.rondas {
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.battle-container {
  position: absolute;
  font-family: 'Press Start 2P', cursive;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  max-width: 1000px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  border-radius: 10px;
  color: white;
  background: linear-gradient(45deg, #222, #333);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.battle-container_ganador {
  position: absolute;
  font-family: 'Press Start 2P', cursive;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  max-width: 1000px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  border-radius: 10px;
  background: linear-gradient(45deg, #222, #333);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.player-card {
  flex: 1;
  text-align: center;
  position: relative;
  padding: 2rem;
  transition: transform 0.3s ease;
}



.player-name {
  font-size: 3rem;
  font-weight: 900;
  letter-spacing: 2px;
  margin: 0;
  padding: 0;
  text-transform: uppercase;
}

.left .player-name {
  background: linear-gradient(90deg, #ff416c, #ff0000);

  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.right .player-name {
  background: linear-gradient(90deg, #00c6ff, #0072ff);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.vs-container {
  position: relative;
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.vs-circle {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(90deg, #ff0000, #002fff);


}

.vs-text {
  color: #fff;
  font-size: 2rem;
  font-weight: bold;
  z-index: 2;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.player-avatar {
  width: 120px;
  height: 120px;
  margin: 0 auto 1.5rem;
  border-radius: 50%;
  overflow: hidden;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
}

.right .player-avatar {
  box-shadow: 0 0 0 3px #0072ff, 0 0 20px rgba(0, 114, 255, 0.5);
}

.left .player-avatar {
  box-shadow: 0 0 0 3px #f50d0d, 0 0 20px rgb(255, 43, 43);
}

.player-stats {
  margin-top: 1rem;
  color: #ccc;
  font-size: 0.9rem;
}

.stat-bar {
  height: 5px;
  background: #444;
  margin: 0.5rem 0;
  border-radius: 5px;
  overflow: hidden;
}

.stat-fill {
  height: 100%;
  border-radius: 5px;
}

.left .stat-fill {
  background: linear-gradient(90deg, #00c6ff, #0072ff);
}

.right .stat-fill {
  background: linear-gradient(90deg, #ff416c, #ff4b2b);
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.player-initial {
  color: #fff;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .battle-container {
    flex-direction: column;
    gap: 2rem;
  }

  .vs-container {
    width: 60px;
    height: 60px;
  }

  .player-name {
    font-size: 2rem;
  }
}
</style>
