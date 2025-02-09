<template>
  <main>
    <div v-if="permisos">
      <button  @click="requestPermissions">Pedir permisos para movimiento</button>
    </div>
      <div v-if="meToca">
        me toca
      </div>
      <div v-if="mensaje">
        ponlo horizontal porfa
      </div>
      <div class="mando" v-else>


        <div class="controller">
          Jugador: {{ yo.playerNumber }}
          <div class="dpad">
            <button class="up" @click="click('up')" :disabled="!meToca">↑</button>
            <button class="left" @click="click('left')" :disabled="!meToca">←</button>
            <button class="center" @click="click('center')" :disabled="!meToca"></button>
            <button class="right" @click="click('right')" :disabled="!meToca">→</button>
            <button class="down" @click="click('down')" :disabled="!meToca">↓</button>
          </div>
          <div class="buttons">
            <button class="b" @click="click('b')">B</button>
            <button class="a" @click="click('a')">A</button>

          </div>
        </div>

      </div>

   


  </main>

</template>
<script setup>
import { ref, computed,onMounted, onUnmounted } from "vue";
import socketManager from '../static/socket'
const socket = socketManager.getSocket();
const yo = computed(() => $nuxt.$store.state);


const juego= ref(0);


function cambioJuego(data){

  //0 = dado
  //1 = basquet

  juego.value = data;


}



const permisos = ref(true);
const accelerationX = ref(0);

    const accelerationY = ref(0);
    const accelerationZ = ref(0);

    // Umbral para detectar una sacudida (puedes ajustarlo según necesites)
    const shakeThreshold = 15;
    const isShakeDetected = ref(false);

    // Función que maneja el evento devicemotion
    const handleMotion = (event) => {
      accelerationX.value = event.acceleration.x;
      accelerationY.value = event.acceleration.y;
      accelerationZ.value = event.acceleration.z;

      // Calcular la aceleración total (magnitud del vector de aceleración)
      const totalAcceleration = Math.sqrt(
        accelerationX.value ** 2 + accelerationY.value ** 2 + accelerationZ.value ** 2
      );
      if(totalAcceleration > shakeThreshold){
       click('a');
      
      }
      // Detectar sacudida cuando la aceleración total supera el umbral
    
    };

    const requestPermissions = async () => {
      
      if (window.DeviceMotionEvent) {
        try {
          // Si el dispositivo es iOS 13+, solicitar permisos
          if (typeof DeviceMotionEvent.requestPermission === 'function') {
            const permission = await DeviceMotionEvent.requestPermission();
            if (permission === 'granted') {
              permisos.value = false;
              // Permiso otorgado, podemos escuchar los eventos
              startListening();
            } else {
              console.log('Permiso denegado');
              permisos.value = true;
            }
          } else {
            // En dispositivos no iOS 13+ no es necesario el permiso
            startListening();
          }
        } catch (error) {
          console.error('Error al pedir permisos', error);
        }
      }
    };

    const startListening = () => {
      if (window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', handleMotion);
      }
    };

    onMounted(() => {
       
        requestPermissions();
       
    });

    // Se remueve el listener al desmontarse el componente
    onUnmounted(() => {
      if (window.DeviceMotionEvent) {
        window.removeEventListener('devicemotion', handleMotion);
      }
    }); 


const turno = ref(0);
const meToca = ref(false);
comprobarTurno();

function comprobarTurno() {
  if (turno.value === yo.value.playerNumber - 1) {
    meToca.value = true;
  } else {
    meToca.value = false;
  }
}


function clickC(param) {
  if (turno.value === yo.value.playerNumber - 1) {
    socket.emit('move', param, yo.value.playerNumber, yo.value.roomKey);
  }


}

function click(param) {

  switch (juego.value) {
    case 0:
     socket.emit('move', param, yo.value.playerNumber, yo.value.roomKey);
      break;
    case 1:
      socket.emit('moveBasket', param, yo.value.playerNumber, yo.value.roomKey);
      break;
    default:
      break;
  }

 
}

socket.on('turno', (data) => {
  turno.value = data;
  comprobarTurno();

});

socket.on('minijuego', (data) => {
  juego.value = data;
   
});

const mensaje = ref(false)

window.addEventListener('load', () => {


  if (window.innerHeight > window.innerWidth) {
    // Modo vertical
    mensaje.value = true

  } else {
    // Modo horizontal
    mensaje.value = false
  }

});

window.addEventListener('resize', () => {

  if (window.innerHeight > window.innerWidth) {
    // Modo vertical
    mensaje.value = true

  } else {
    // Modo horizontal
    mensaje.value = false
  }

});







</script>
<style scoped>
.mando {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;

  height: 100vh;
  width: 98vw;
  overflow: hidden;
}

.controller {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 0;
}

.dpad {
  display: grid;
  grid-template-areas:
    "up up up"
    "left center right"
    "down down down";
  gap: 0;
  justify-items: center;
  align-items: center;
  grid-column: 1;
  margin-right: 100px;
}

.dpad button {
  width: 60px;
  height: 60px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  touch-action: manipulation;
}

.dpad button:active {
  background-color: #555;
}

.dpad .up {
  grid-area: up;
}

.dpad .down {
  grid-area: down;
}

.dpad .left {
  grid-area: left;
}

.dpad .right {
  grid-area: right;
}

.dpad .center {
  grid-area: center;
  background-color: transparent;
}

.buttons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  grid-column: 2;


}

.buttons button {
  width: 80px;
  height: 80px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 50%;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  touch-action: manipulation;
}

.buttons button:active {
  background-color: #0056b3;
}
</style>
