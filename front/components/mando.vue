<template>
  <main>

    

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
      <button class="left" @click="click('left')"  :disabled="!meToca">←</button>
      <button class="center" @click="click('center')"  :disabled="!meToca"></button>
      <button class="right" @click="click('right')"  :disabled="!meToca">→</button>
      <button class="down" @click="click('down')"  :disabled="!meToca">↓</button>
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
import { ref,computed } from "vue";   
import socketManager from '../static/socket' 

const yo= computed(() => $nuxt.$store.state);
const emit = defineEmits();
const turno = ref(0);
const socket=socketManager.getSocket();
const meToca=ref(false);
const permisos=ref(true);
comprobarTurno();

function comprobarTurno(){
  if(turno.value===yo.value.playerNumber-1){
    meToca.value=true;
  }else{
    meToca.value=false;
  }
}

const requestPermission = () => {
    const startButton = document.getElementById('startButton');

    if (typeof DeviceMotionEvent.requestPermission === 'function') {
        DeviceMotionEvent.requestPermission().then((state) => {
            if (state === 'granted') {
                startDeviceMotionListener();
                startButton.style.display = 'none';
                permisos.value=true;
            } else {
                alert('Permiso denegado para acceder a los sensores.');
            }
        }).catch((error) => alert(`Error al solicitar permiso: ${error}`));
    } else {
        startDeviceMotionListener();
        startButton.style.display = 'none';
    }
};


const startDeviceMotionListener = () => {
    window.addEventListener("devicemotion", (event) => {
        const { x, y, z } = event.acceleration;
        const { x: lastX, y: lastY, z: lastZ } = lastAcceleration.value;

        const shakeMagnitude = Math.sqrt(
            (x - lastX) ** 2 + (y - lastY) ** 2 + (z - lastZ) ** 2
        );

        if (shakeMagnitude > shakeThreshold){
          socket.emit('move', 'a', yo.value.playerNumber,yo.value.roomKey);
        }

        lastAcceleration.value = { x, y, z };
    });
};



function click(param){
  if(turno.value===yo.value.playerNumber-1){
    socket.emit('move', param, yo.value.playerNumber,yo.value.roomKey);
  }
   
    
}

socket.on('turno', (data) => {
  turno.value = data;
  comprobarTurno();  
  
});
  
const mensaje=ref(false)

window.addEventListener('load', ()=>{


    if (window.innerHeight > window.innerWidth) {
        // Modo vertical
        mensaje.value=true
        
      } else {
        // Modo horizontal
    mensaje.value=false
      }

});

window.addEventListener('resize', ()=>{

  if (window.innerHeight > window.innerWidth) {
    // Modo vertical
    mensaje.value=true
    
  } else {
    // Modo horizontal
mensaje.value=false
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

  .controller{
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

    .dpad .up { grid-area: up; }
    .dpad .down { grid-area: down; }
    .dpad .left { grid-area: left; }
    .dpad .right { grid-area: right; }
    .dpad .center { grid-area: center; background-color: transparent; }

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


