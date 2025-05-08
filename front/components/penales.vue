<template>
  <main>
    <div style="position: relative; width: 100vw; height: 100vh; overflow: hidden;">
      <img class="fondo" src="/images/penales/fondo.webp" alt="">
      <div v-if="menu === 0">


        <div class="marcador-container">

          <div class="marcador">
            <div class="equipo">
              <div class="nombre-equipo"> {{ yo.jugadores[0].username }}</div> 
            </div>

            <div class="vs">VS</div>

            <div class="equipo">

              <div class="nombre-equipo"> {{ yo.jugadores[1].username }}</div> 
            </div>
          </div>

          <div class="penales">
            <div class="penales-equipo">
              <div class="penal" :class="{'pendiente': penales_rojo[0]==0, 'gol': penales_rojo[0]==1,'fallo': penales_rojo[0]==2}" ></div>
              <div class="penal" :class="{'pendiente': penales_rojo[1]==0, 'gol': penales_rojo[1]==1,'fallo': penales_rojo[1]==2}" ></div>
              <div class="penal" :class="{'pendiente': penales_rojo[2]==0, 'gol': penales_rojo[2]==1,'fallo': penales_rojo[2]==2}" ></div>
              <div class="penal" :class="{'pendiente': penales_rojo[3]==0, 'gol': penales_rojo[3]==1,'fallo': penales_rojo[3]==2}" ></div>
              <div class="penal" :class="{'pendiente': penales_rojo[4]==0, 'gol': penales_rojo[4]==1,'fallo': penales_rojo[4]==2}" ></div>
            </div>

            <div class="penales-equipo">
              <div class="penal" :class="{'pendiente': penales_azul[0]==0, 'gol': penales_azul[0]==1,'fallo': penales_azul[0]==2}" ></div>
              <div class="penal" :class="{'pendiente': penales_azul[1]==0, 'gol': penales_azul[1]==1,'fallo': penales_azul[1]==2}" ></div>
              <div class="penal" :class="{'pendiente': penales_azul[2]==0, 'gol': penales_azul[2]==1,'fallo': penales_azul[2]==2}" ></div>
              <div class="penal" :class="{'pendiente': penales_azul[3]==0, 'gol': penales_azul[3]==1,'fallo': penales_azul[3]==2}" ></div>
              <div class="penal" :class="{'pendiente': penales_azul[4]==0, 'gol': penales_azul[4]==1,'fallo': penales_azul[4]==2}" ></div>
             </div>
          </div>

        </div>

        <img class="porteria" src="/images/penales/porteria.webp" alt="">




        <img class="portero" :class="{
          centro_portero: animaciones.centro_portero,
          izquierda_portero: animaciones.izquierda_portero,
          derecha_portero: animaciones.derecha_portero
        }"
          :src="`/images/penales/portero_${portero}.webp`">


        <img class="balon" :class="{
          centro: animaciones.centro,
          izquierda: animaciones.izquierda,
          derecha: animaciones.derecha
        }" src="/images/penales/balon.webp" alt=""
          @click="mover">
      </div>



      <div v-if="menu === 1 || menu === 2">
        <img v-if="menu === 1" class="pantalla_portero" :src="`/images/penales/portero_${portero}.webp`" alt="">
        <img v-if="menu === 2" class="pantalla_balon" :src="`/images/penales/balon.webp`" alt="">

        <img class="flecha" v-if="flechas.centro" :src="`/images/penales/flecha_${portero}.webp`" alt=""
          @click="flecha('centro')">
        <img class="flecha_der" v-if="flechas.derecha" :src="`/images/penales/flecha_${portero}.webp`" alt=""
          @click="flecha('derecha')">
        <img class="flecha_izq" v-if="flechas.izquierda" :src="`/images/penales/flecha_${portero}.webp`" alt=""
          @click="flecha('izquierda')">
      </div>



    </div>
  </main>
</template>

<script setup>

import { reactive, ref,computed } from 'vue';
import socketManager from '../static/socket'
const socket = socketManager.getSocket(); 


// 0 = general, 1 = portero, 2 = jugador
const menu = ref(0);
const portero = ref("azul");
const turno = reactive({turno:0,penal1:0,penal2:0,gol1:0,gol2:0});
const emit = defineEmits();
const yo= computed(() => $nuxt.$store.state);
const flechas = reactive({
  izquierda: true,
  derecha: true,
  centro: true
});

// 0 = pendiente, 1 = gol, 2 = fallo
const penales_rojo =ref([0,0,0,0,0]);
const penales_azul =ref([0,0,0,0,0]);

if(yo.value.jugadores[0].username===yo.value.username){
  portero.value="rojo";
  menu.value=2;
}
if(yo.value.jugadores[1].username===yo.value.username){
  portero.value="azul";
  menu.value=1;
}



const animaciones = reactive({
  izquierda: false,
  derecha: false,
  centro: false,
  izquierda_portero: false,
  derecha_portero: false,
  centro_portero: false

});

const penal = reactive({
  portero: "",
  jugador: "",
  portero_listo: false,
  jugador_listo: false,
});


function flecha(flecha) {
  if (flecha === "izquierda") {
    flechas.derecha = false;
    flechas.centro = false;
    flechas.izquierda = true;
    enviar_penales("izquierda");
  } else if (flecha === "derecha") {
    flechas.izquierda = false;
    flechas.centro = false;
    flechas.derecha = true;
    enviar_penales("derecha");
  } else {
    flechas.izquierda = false;
    flechas.derecha = false;
    flechas.centro = true;
    enviar_penales("centro");
  }

  

}

function enviar_penales(data){
  if(menu.value===1 && penal.portero_listo){
    return;
  }
  if(menu.value===2 && penal.jugador_listo){
    return;
  }
  socket.emit('enviar_penales', yo.value.roomKey, data,menu.value);
}

socket.on('recibir_penales', (direccion,portero) => {
  if(yo.value.username!=="host"){
    return;
  }
  if(portero==1){
    penal.portero=direccion;
    penal.portero_listo=true;
  }else{
    penal.jugador=direccion;
    penal.jugador_listo=true;

  }

  if(penal.portero_listo && penal.jugador_listo){
    mover();
  }
});


function comprobar_penales(){

  if(penal.jugador!==penal.portero){
    if(turno.turno===0){
      penales_rojo.value[turno.penal1]=1;
      turno.penal1++;
      turno.turno=1; 
      turno.gol1++;
    }else{
      penales_azul.value[turno.penal2]=1;
      turno.penal2++;
      turno.turno=0; 
      turno.gol2++;
    } 
    
    
  }else{
    if(turno.turno===0){
      penales_rojo.value[turno.penal1]=2;
      turno.turno=1;
      turno.penal1++;
      
    }else{
      penales_azul.value[turno.penal2]=2;
      turno.turno=0;
      turno.penal2++;
    } 
  }

  if(turno.penal2===5){
    
    if(turno.gol1>turno.gol2){ 
      emit('ganador',0);
    }else{
      if(turno.gol1<turno.gol2){ 
        emit('ganador',1);
      }else{
        alert("Empate");
        turno.turno=0;
        turno.penal1=0;
        turno.penal2=0;
       for (let index = 0; index < penales_azul.value.length; index++) {
       penales_azul.value[index]=0;
        penales_rojo.value[index]=0;
   }
      }

    }




  
  
  }
}



function mover() {

  animaciones[`${penal.jugador}`] = true;
  animaciones[`${penal.portero}_portero`] = true;
  setTimeout(() => {
    animaciones[`${penal.jugador}`] = false;
    animaciones[`${penal.portero}_portero`] = false;
    comprobar_penales();
    socket.emit('reiniciar_penales', yo.value.roomKey);
  }, 500);

  

}

socket.on('reiniciar_penales', () => {
  flechas.izquierda = true;
  flechas.derecha = true;
  flechas.centro = true;
  penal.jugador="";
  penal.portero="";
  penal.portero_listo=false;
  penal.jugador_listo=false;

  if(menu.value===1){
    menu.value=2;
  }else{
    if(menu.value===2){
    menu.value=1;
  }
  }
  
  if(yo.value.username==="host"){
    if(portero.value==="azul"){
      portero.value="rojo";
    }else{
      portero.value="azul";
    }
  }
});



</script>
<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

@keyframes izquierda {
  0% {
    transform: translateX(-50%);
  }

  100% {
    transform: translate(-250%, -300%);
  }
}

@keyframes derecha {
  0% {
    transform: translateX(-50%);
  }

  100% {
    transform: translate(150%, -300%);
  }
}

@keyframes centro {
  0% {
    transform: translateX(-50%);
  }

  100% {
    transform: translate(-50%, -300%);
  }
}

@keyframes izquierda_portero {
  0% {
    transform: translateX(-50%);

  }

  100% {
    transform: translate(-150%, -30%) rotate(-90deg);

  }
}

@keyframes derecha_portero {
  0% {
    transform: translateX(-50%);

  }

  100% {
    transform: translate(80%, -30%) rotate(90deg);

  }
}

@keyframes centro_portero {
  0% {
    transform: translateX(-50%);
  }

  100% {
    transform: translate(-50%, -50%);
  }
}


.fondo {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

.marcador-container {

  font-family: 'Press Start 2P', cursive;
  background: linear-gradient(to bottom, #073416, #0a4d23);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7);
  overflow: hidden;
  position: absolute;
  top: 5%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  width: 50%;
  height: 17%;
  border: 1px solid black;
}

.marcador {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  color: white;
}

.equipo {
  text-align: center;
  width: 45%;
  margin-top: 10px;
}

.nombre-equipo {
  font-size: 25px;
  font-weight: bold; 
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

 

.vs {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  color: #ffd700;
}

.penales {
  display: flex;
  justify-content: space-between;
  padding: 15px 25px;
  background-color: rgba(0, 0, 0, 0.3);
}

.penales-equipo {
  display: flex;
  justify-content: center;
  width: 45%;
}

.penal {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin: 0 5px;
  background-color: #333;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.penal.gol {
  background-color: #4caf50;
  border-color: #fff;
  box-shadow: 0 0 10px rgba(76, 175, 80, 0.8);
}

.penal.fallo {
  background-color: #9e9e9e;
  border-color: #fff;
  box-shadow: 0 0 10px rgba(244, 67, 54, 0.8);
}

.penal.pendiente {
  background-color: white;
  border-color: rgba(255, 255, 255, 0.5);
  opacity: 0.5;
}


.porteria {
  position: absolute;
  bottom: 27%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  width: 50%;
}

.balon {
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  width: 7%;

}

.portero {
  position: absolute;
  bottom: 40%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  width: 12%;
}

.centro {
  animation: centro 0.5s linear;
}

.izquierda {
  animation: izquierda 0.5s linear;
}

.derecha {
  animation: derecha 0.5s linear;
}

.izquierda_portero {
  animation: izquierda_portero 0.5s linear;
}

.derecha_portero {
  animation: derecha_portero 0.5s linear;
}

.centro_portero {
  animation: centro_portero 0.5s linear;
}

.pantalla_portero {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -20%);
  z-index: 2;
  width: 25%;
}

.pantalla_balon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -20%);
  z-index: 2;
  width: 20%;
}

.flecha {
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  width: 15%;
}

.flecha_izq {
  position: absolute;
  top: 70%;
  left: 30%;
  transform: translate(-50%, -50%)rotate(270deg);
  z-index: 2;
  width: 15%;
}

.flecha_der {
  position: absolute;
  top: 70%;
  left: 70%;
  transform: translate(-50%, -50%) rotate(90deg);
  z-index: 2;
  width: 15%;

}

.pantalla_jugador {
  width: 100%;
}
</style>