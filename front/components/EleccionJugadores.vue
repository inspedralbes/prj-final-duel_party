<template>
<div class="centrar_main">
     
    <div class="main" v-if="!jugar">
        <div class="selector"> {{ props.numero }} numero de jugadores: {{ nJugadores }} </div> 
        <div class="jugador1" :style="{backgroundColor: jugador1Color}"> {{ props.data[0].username }} <br>Presiona <br> <span @click="unirse(1)"> A </span>  <br> para estar Listo</div>
        <div class="jugador2" :style="{backgroundColor: jugador2Color}" >{{ props.data[1].username }}<br>Presiona <br>  <span @click="unirse(2)"> A </span>  <br> para estar Listo</div>
        <div class="jugador3" :style="{backgroundColor: jugador3Color}" >{{ props.data[2].username }} <br>Presiona <br>  <span @click="unirse(3)"> A </span> <br> para estar Listo</div>
        <div class="jugador4" :style="{backgroundColor: jugador4Color}">{{ props.data[3].username }} <br>Presiona <br>  <span @click="unirse(4)"> A </span>  <br> para estar Listo</div>
        <div class="empezar" @click="empezar()" v-if="nJugadores>1"> <button>EMPEZAR</button> </div>
    </div>

    <div v-else>
        <tablero :numero="nJugadores"/>  
    </div>

</div>
</template>

<script setup>

import { reactive, ref,watch } from 'vue';
import socket from '../static/socket';

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  numero: {
    type: String,
    required: true,
  },

},)

const jugadores = reactive([
    { username: "diego", in: true },
    { username: "elihu", in: true },
    { username: "bryan", in: true },
    { username: "abdiel", in: true }
]);
const jugar=ref(false);

watch(() => props.data, (newValue) => {
  reiniciarColor();
  console.log(newValue)
  nJugadores.value = 0;
  // Iterar desde el índice 0
  for (let index = 0; index < newValue.length; index++) {
    if (newValue[index].in) {
      nJugadores.value++;
      switch (nJugadores.value) {
        case 4: jugador4Color.value="green";
        
        
        case 3: jugador3Color.value="purple";
        
        
        case 2: jugador2Color.value="blue";
        
        
        case 1: jugador1Color.value="red";
            
            
        default:
            break;
    }
    }
  }
}, { deep: true });


function empezar(){
nJugadores.value--;
jugar.value=true;
}

const jugador1Color = ref("rgba(255, 0, 0, 0.412)");
const jugador2Color = ref("rgba(0, 0, 255, 0.412)");
const jugador3Color = ref("rgba(128, 0, 128, 0.412)");
const jugador4Color = ref("rgba(0, 255, 0, 0.436)");
const nJugadores = ref(0);

function reiniciarColor(){

    jugador1Color.value="rgba(255, 0, 0, 0.412)";
    jugador2Color.value="rgba(0, 0, 255, 0.412)";
    jugador3Color.value="rgba(128, 0, 128, 0.412)";
    jugador4Color.value="rgba(0, 255, 0, 0.436)";
}

function unirse(num){

    switch (num) {
        case 1: jugador1Color.value="red";
            
            break;
            case 2: jugador2Color.value="blue";
            
            break;
            case 3: jugador3Color.value="yellow";
            
            break;
            case 4: jugador4Color.value="green";
            
            break;
        default:
            break;
    }
    nJugadores.value++;
    if(nJugadores.value>1){

    }
}




</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

 
span {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
  background-color: rgb(255, 255, 255);
  border-radius: 50%;
  font-weight: bold;
  font-size: 24px;
  color: rgb(0, 0, 0);
  text-align: center;
  margin: 0 auto;
}

.selector{
    display: grid;
    justify-content: center;
    align-items: center;
    grid-area: s;
    height: 10vh;
    gap: 0;
    font-size: 30px;
    color: white;  
    border: solid black 5px;  
    background-color: #8B4513; 
    color: white;
    border: 5px solid #5A2A0A;
    box-shadow: 0 0 50px rgba(0, 0, 0, 10);
    padding: 0px; 
    z-index: 1; 
    margin-bottom: 60px;
}
.centrar_main{
    display: grid;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    font-family: 'Press Start 2P', cursive;
    background-image: url('/images/fondo_elecciones.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    
}
.main{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 16% 1fr 1fr 1fr;  
    grid-template-areas:
    "s s s s"
    "a b c d"
    "a b c d"
    "e e e e";
    height: 80vh;
    width: 80vw;
    gap: 0px; 
    padding: 10px; 
    box-sizing: border-box; 
    color: white;

}
 
.jugador1,.jugador2,.jugador3,.jugador4{
  height: 400px;
  display: grid;
  font-size: 30px;
  text-align: center;
  margin-bottom: 20px;
}
.empezar{
  display: grid;
  grid-area: e;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  text-align: center;
  height: 100px;

}
.jugador1{
    grid-area: a;

}

.jugador2{
    grid-area: b;

}
.jugador3{
    grid-area: c;
}
.jugador4{
    grid-area: d;
}


</style>