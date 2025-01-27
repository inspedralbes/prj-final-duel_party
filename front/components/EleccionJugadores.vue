<template>
<div class="centrar_main">
     
    <div class="main">
        <div class="selector"> {{ props.numero }} </div> 
        <div class="jugador1" :style="{backgroundColor: jugador1Color}"> <br>Presiona <br> <span @click="unirse(1)"> A </span>  <br> para unirte a la partida</div>
        <div class="jugador2" :style="{backgroundColor: jugador2Color}" > <br>Presiona <br>  <span @click="unirse(2)"> A </span>  <br> para unirte a la partida</div>
        <div class="jugador3" :style="{backgroundColor: jugador3Color}" > <br>Presiona <br>  <span @click="unirse(3)"> A </span> <br> para unirte a la partida</div>
        <div class="jugador4" :style="{backgroundColor: jugador4Color}"> <br>Presiona <br>  <span @click="unirse(4)"> A </span>  <br> para unirte a la partida</div>
        <div @click="empezar()" v-if="nJugadores>1"> <button>Empezar</button> </div>
    </div>

</div>
</template>

<script setup>

import { reactive, ref,watch } from 'vue';

const props = defineProps({
  data: {
    type: Number,
    required: true,
  },
  numero: {
    type: String,
    required: true,
  },

},)



    if(props.data==1){
        jugador1Color.value="red";
    }
 
watch(() => props.data, (newValue) => {
  if (newValue === 1) {
    jugador1Color.value = "red";
  } else if (newValue === 2) {
    jugador2Color.value = "blue";
  } else if (newValue === 3) {
    jugador3Color.value = "yellow";
  } else if (newValue === 4) {
    jugador4Color.value = "green";
  }
});





const jugador1Color = ref("rgba(255, 0, 0, 0.212)");
const jugador2Color = ref("rgba(0, 0, 255, 0.212)");
const jugador3Color = ref("rgba(255, 255, 0, 0.24)");
const jugador4Color = ref("rgba(0, 255, 0, 0.336)");
const nJugadores = ref(0);
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