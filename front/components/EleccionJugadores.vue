<template>
<div class="centrar_main">
     
    <div class="main" v-if="!jugar">
        <div class="selector"> {{ props.numero }} numero de jugadores: {{ nJugadores }} </div> 
        <div class="jugador1" :style="{backgroundColor: jugador1Color}"> {{ props.data[0].username }} <br>Presiona <br> <span @click="unirse(1)"> A </span>  <br> para estar Listo</div>
        <div class="jugador2" :style="{backgroundColor: jugador2Color}" >{{ props.data[1].username }}<br>Presiona <br>  <span @click="unirse(2)"> A </span>  <br> para estar Listo</div>
        <div class="jugador3" :style="{backgroundColor: jugador3Color}" >{{ props.data[2].username }} <br>Presiona <br>  <span @click="unirse(3)"> A </span> <br> para estar Listo</div>
        <div class="jugador4" :style="{backgroundColor: jugador4Color}">{{ props.data[3].username }} <br>Presiona <br>  <span @click="unirse(4)"> A </span>  <br> para estar Listo</div>
        <div @click="empezar()" v-if="nJugadores>1"> <button>Empezar</button> </div>
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

const jugador1Color = ref("rgba(255, 0, 0, 0.212)");
const jugador2Color = ref("rgba(0, 0, 255, 0.212)");
const jugador3Color = ref("rgba(128, 0, 128, 0.212)");
const jugador4Color = ref("rgba(0, 255, 0, 0.336)");
const nJugadores = ref(0);

function reiniciarColor(){

    jugador1Color.value="rgba(255, 0, 0, 0.212)";
    jugador2Color.value="rgba(0, 0, 255, 0.212)";
    jugador3Color.value="rgba(255, 255, 0, 0.24)";
    jugador4Color.value="rgba(0, 255, 0, 0.336)";
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

 

.selector{
    display: grid;
    justify-content: center;
    align-items: center;
    grid-area: s;
    height: 10vh;
    gap: 0;
    font-size: 45px;
}
.centrar_main{
    display: grid;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
   
}
.main{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 12% 1fr 1fr 1fr;  
    grid-template-areas:
    "s s s s"
    "a b c d"
    "a b c d"
    "e e e e";
    height: 80vh;
    width: 80vw;
    


}
 
.empezar{
    display: grid;
    grid-area: e;
    font-size: 30px;
    text-align: center;

}
.jugador1{
    display: grid;
    grid-area: a;
  
    font-size: 30px;
    text-align: center;

}


.jugador2{
    display: grid;
    grid-area: b;
     
    font-size: 30px;
    text-align: center;

}
.jugador3{
    display: grid;
    grid-area: c;
   
    font-size: 30px;
    text-align: center;
}
.jugador4{
    display: grid;
    grid-area: d;
     
    font-size: 30px;
    text-align: center;
}

</style>