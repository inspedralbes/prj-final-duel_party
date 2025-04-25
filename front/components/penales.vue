<template>
  <main>
    <div style="position: relative; width: 100vw; height: 100vh; overflow: hidden;">
      <img class="fondo" src="/images/penales/fondo.webp" alt="">
      <div v-if="menu === 0">


        <div class="marcador-container">

          <div class="marcador">
            <div class="equipo">
              <div class="nombre-equipo">JUGADOR 1</div> 
            </div>

            <div class="vs">VS</div>

            <div class="equipo">

              <div class="nombre-equipo">JUGADOR 2</div> 
            </div>
          </div>

          <div class="penales">
            <div class="penales-equipo">
              <div class="penal pendiente"></div>
              <div class="penal pendiente"></div>
              <div class="penal pendiente"></div>
              <div class="penal pendiente"></div>
              <div class="penal pendiente"></div>
            </div>

            <div class="penales-equipo">
              <div class="penal pendiente"></div>
              <div class="penal pendiente"></div>
              <div class="penal pendiente"></div>
              <div class="penal pendiente"></div>
              <div class="penal pendiente"></div>
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

import { reactive, ref } from 'vue';


// 0 = general 1 = portero 2 = jugador
const menu = ref(2);
const portero = ref("azul");
const flechas = reactive({
  izquierda: true,
  derecha: true,
  centro: true
});

const animaciones = reactive({
  izquierda: false,
  derecha: false,
  centro: false,
  izquierda_portero: false,
  derecha_portero: false,
  centro_portero: false

});

const penal = reactive({
  portero: "izquierda",
  jugador: "centro",
  gol: "",
});


function flecha(flecha) {
  if (flecha === "izquierda") {
    flechas.derecha = false;
    flechas.centro = false;
    flechas.izquierda = true;
  } else if (flecha === "derecha") {
    flechas.izquierda = false;
    flechas.centro = false;
    flechas.derecha = true;
  } else {
    flechas.izquierda = false;
    flechas.derecha = false;
    flechas.centro = true;
  }


}

function mover() {

  animaciones[`${penal.jugador}`] = true;
  animaciones[`${penal.portero}_portero`] = true;
  setTimeout(() => {
    animaciones[`${penal.jugador}`] = false;
    animaciones[`${penal.portero}_portero`] = false;
  }, 500);

}




</script>
<style scoped>
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
  font-size: 28px;
  font-weight: bold; 
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.puntuacion {
  font-size: 60px;
  font-weight: bold;
  color: #ffd700;
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.6);
}

.vs {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
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