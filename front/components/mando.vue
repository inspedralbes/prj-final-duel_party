<template>
  <main >
    <div class="mando" :style="{ backgroundColor: '#' + fondo.yo }">

      <div class="cartel" v-if="!permisos">

        <h3> Activar Permisos Requeridos</h3>
        <button class="btn-permisos" @click="requestPermissions">IPHONE</button>
        <button class="btn-permisos" @click="permisos = true; $nuxt.$store.dispatch('updatePermisos', true); startListening();">ANDROID</button>
      </div>

      <div v-if="mensaje">
        ponlo horizontal porfa
      </div>

      <div v-if="permisos">
       
        <div class="jugador">{{ yo.username }}</div>
        <div v-if="modo===0">
        <div class="agita"><h1>¡ESPERANDO MINIJUEGO!</h1></div>
      </div>
        <div v-if="modo===1">
        <div class="agita"><h1>¡AGITA!</h1></div>
      </div>

      <div v-if="modo===2">
        <div class="controller">
          <div class="buttons">
            <button class="a" @click="click('a')">A</button>
          </div>
        </div>
      </div>

      </div>
 
    </div>

  </main>
</template>




<script setup>
import { ref, computed, onMounted, onUnmounted, reactive } from "vue";
import socketManager from '../static/socket'
const socket = socketManager.getSocket();
const yo = computed(() => $nuxt.$store.state);
const canShake =ref(true);
const fondo= reactive({rojo:"720000",azul:"12145c",yo:""});

  // Props para personalizar el componente
  const props = defineProps({
    mando: {
      type: Number,
      default: 1
    }
  });
if(yo.value.username===yo.value.jugadores[0].username){
  fondo.yo=fondo.rojo;
}else{
  fondo.yo=fondo.azul;
}
//0 = esperando, 1 = movimiento, 2 = boton 
const modo=ref(props.mando);

if(yo.value.juego===-1){
  modo.value=0;
}

const startListening = () => {
  dar_permisos();
  if (window.DeviceMotionEvent) {
    window.addEventListener('devicemotion', handleMotion);
  }
}; 


function dar_permisos() {
  permisos.value = true;
  $nuxt.$store.dispatch('updatePermisos', permisos.value);
}

 
const permisos = ref(false);
if (yo.value.permisos) {
  permisos.value = true;
  startListening();
}
const accelerationX = ref(0);
const mensaje = ref(false)
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
  if (totalAcceleration > shakeThreshold && canShake.value  ) {
    click('a');
    canShake.value = false;
    setTimeout(() => {
      canShake.value = true;
    }, 500);
  } 

};

const requestPermissions = async () => {
  if (window.DeviceMotionEvent) {
    try {
      if (typeof DeviceMotionEvent.requestPermission === 'function') {
        const permission = await DeviceMotionEvent.requestPermission();
        if (permission === 'granted') {
          permisos.value = true;
          $nuxt.$store.dispatch('updatePermisos', true);
          startListening();
        } else {
          console.log('Permiso denegado');
        }
      } else {
        permisos.value = true;
        $nuxt.$store.dispatch('updatePermisos', true);
        startListening();
      }
    } catch (error) {
      console.error('Error al pedir permisos', error);
    }
  }
};


onMounted(() => {
  if (yo.value.permisos) {
    permisos.value = true;
    startListening();
  } else {
    requestPermissions();
  }


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



function click(param) {
  if(modo.value===0){
    return;
  }


  if (yo.value.juego === 2) {
    socket.emit('enviar_duelo', yo.value.username, yo.value.roomKey);
  }else if(yo.value.juego===4){
    socket.emit('enviar_soga', yo.value.username, yo.value.roomKey);
  } else if(yo.value.juego===5){
    socket.emit('enviar_luz', yo.value.username, yo.value.roomKey);
  }
   else {
    socket.emit('move', param, yo.value.username, yo.value.roomKey);
  }

}










</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');



@keyframes agitar {
  0%{
    opacity: 1;
  }
  50%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
}
.fondo{
  background-color: #8B4513;
  
}

.cartel {
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

.btn-permisos:focus {
  background-color: #621111;
}

.nJugador {
  text-align: center;
  color: white;
  margin-bottom: 30px;
  padding: 10px;

}
 
 

.mando {
  position: fixed;
  top: 0;
  left: 0;
  margin: 0;
  padding: env(safe-area-inset-top, 0) env(safe-area-inset-right, 0) env(safe-area-inset-bottom, 0) env(safe-area-inset-left, 0);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100dvh;
  width: 100dvw;
  min-height: 100vh;
  min-width: 100vw;
  overflow: hidden;
  font-family: 'Press Start 2P', cursive;
  color: #fff;
  z-index: 1;
}

.controller {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 0;
  gap: 20px;
}
 
 
.agita {
  text-align: center;
  color: white;
  margin-bottom: 30px;
  padding: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 1000px;
  transform: translate(-50%, -50%);
  animation: agitar 1s infinite;
}
.jugador {
  text-align: center;
  color: white;
  margin-bottom: 30px;
  padding: 10px;
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);

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
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.buttons button:active {
  background-color: #ff6b81;
  box-shadow: 0px 2px 0px #ff4757;
  transform: translateY(2px);
  color: black;
}
 

.buttons .a {
  background-color: #fa2323;
  border-color: #fa2323;
  box-shadow: 0px 4px 0px #991616;
}

.buttons .a:active {
  background-color: #ffffff;
  box-shadow: 0px 2px 0px #ffffff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* Estilo para el mensaje de orientación */
.mensaje {
  font-size: 18px;
  color: #ff4757;
  text-align: center;
  margin-top: 20px;
}

/* Asegura que el fondo cubra toda la pantalla y no se desplace */
:global(html), :global(body) {
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>