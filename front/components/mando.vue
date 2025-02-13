<template>
  <main>
    <div class="mando">

      <div class="cartel" v-if="!permisos">

          <h3>Permisos Requeridos</h3>
          <button class="btn-permisos"" @click="requestPermissions">Activa permisos para movimiento</button>
          <button class="btn-permisos"" @click="permisos = !permisos">Aceptar</button>
      </div>

      <div v-if="mensaje">
        ponlo horizontal porfa
      </div>
      
      <div v-if="permisos && (juego === 0 || juego === 1)">
        <div class="turno" v-if="meToca">
          TU TURNO!
        </div>
        <div class="nJugador">JUGADOR:{{yo.playerNumber}}</div>
        <div class="controller">
          <div class="dpad">
            <button class="up" @click="click('up')" :disabled="!meToca">▲</button>
            <button class="left" @click="click('left')" :disabled="!meToca">◄</button>
            <button class="center" @click="click('center')" :disabled="!meToca"></button>
            <button class="right" @click="click('right')" :disabled="!meToca">►</button>
            <button class="down" @click="click('down')" :disabled="!meToca">▼</button>
          </div>
          <div class="buttons">
            <button class="b" @click="click('b')">B</button>
            <button class="a" @click="click('a')">A</button>
          </div>
        </div>
      </div>

      <div v-if="juego === 2">
        <mando-ppt />
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
  //2 = ppt
  juego.value = data;


}



const permisos = ref(false);
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

@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
.cartel{
  background-color: #8B4513;
  border: 5px solid #5A2A0A;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 250px;
  margin: 20px auto;
}

.btn-permisos {
  background: #ec9252; 
  color: white;
  border: none;
  padding: 12px 16px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  margin: 5px;
  width: 100%;
  display: block;
}

.btn-permisos:focus{
  background-color: #621111;
}

.nJugador{
    text-align: center;
    color: white;
    margin-bottom: 60px;
    padding: 10px;

}
.turno {
    text-align: center;
    justify-content: center;
    align-items: center;
    display: flex; 
    width: 170px;
    background-color: #0eba45; 
    color: white;
    border: 5px solid #0a6b22;
    box-shadow: 0 0 50px rgba(0, 0, 0, 10);
    z-index: 1; 
    margin: 0 auto 60px auto;
    padding: 10px;
}

.mando {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #1a1a1a;
  height: 100vh;
  width: 98vw;
  overflow: hidden;
  font-family: 'Press Start 2P', cursive;
  color: #fff;
}

.controller {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 0;
  gap: 20px;
}

.dpad {
  display: grid;
  grid-template-areas:
    ". up ."
    "left center right"
    ". down .";
  gap: 10px;
  justify-items: center;
  align-items: center;
  grid-column: 1;
  margin-right: 100px;
}

.dpad button {
  width: 60px;
  height: 60px;
  background-color: #444;
  color: #fff;
  border: 2px solid #666;
  border-radius: 10px;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  touch-action: manipulation;
  box-shadow: 0px 4px 0px #333;
  transition: all 0.1s ease;
}

.dpad button:active {
  background-color: #666;
  box-shadow: 0px 2px 0px #333;
  transform: translateY(2px);
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
  border: none;
  box-shadow: none;
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
  background-color: #ff4757;
  color: #fff;
  border: 2px solid #ff6b81;
  border-radius: 50%;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  touch-action: manipulation;
  box-shadow: 0px 4px 0px #ff6b81;
  transition: all 0.1s ease;
}

.buttons button:active {
  background-color: #ff6b81;
  box-shadow: 0px 2px 0px #ff4757;
  transform: translateY(2px);
  color: black;
}

.buttons .b {
  background-color: #226fec;
  border-color: #226fec;
  box-shadow: 0px 4px 0px #144491;
}

.buttons .b:active {
  background-color: #ffffff;
  box-shadow: 0px 2px 0px #ffffff;
}

.buttons .a {
  background-color: #fa2323;
  border-color: #fa2323;
  box-shadow: 0px 4px 0px #991616;
}

.buttons .a:active {
  background-color: #ffffff;
  box-shadow: 0px 2px 0px #ffffff;
}

/* Estilo para el mensaje de orientación */
.mensaje {
  font-size: 18px;
  color: #ff4757;
  text-align: center;
  margin-top: 20px;
}
</style>