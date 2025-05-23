<template>
<div class="centrar_main">
     
    <div class="main" v-if="!jugar">
        <div class="selector"> Sala:{{ props.numero }}</div> 
        
        <div class="jugador1" :style="{backgroundColor: jugador1Color}">
          
       {{ props.data[0].username }} <br>

          <div v-if="jugadoresListos.jugador1">
            <span> LISTO </span>
          </div>
          <div v-else>
        <span class="animacion" v-if="props.data[0].in"> Sacude el movil para estar Listo </span>
        <span class="animacion" v-else> Esperando jugador </span> </div>
      </div>
        <div class="jugador2" :style="{backgroundColor: jugador2Color}"> 
        {{ props.data[1].username }} <br> 
       
       
        <div v-if="jugadoresListos.jugador2">
            <span> LISTO </span>
          </div>
          <div v-else>
        <span class="animacion" v-if="props.data[1].in"> Sacude el movil para estar Listo </span> 
        <span class="animacion" v-else> Esperando jugador </span> </div>

          </div>
      


        <div class="empezar"> VS </div>
    </div>

    <div v-else>
        <tablero :numero="nJugadores"/>  
    </div>

</div>
</template>

<script setup>

import { reactive, ref,watch } from 'vue';
import socketManager from '../static/socket'
const socket = socketManager.getSocket();
const jugarListo=ref(false);
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
 

const jugadoresListos=reactive({
  jugador1:false,
  jugador2:false,
});

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
const nJugadores = ref(0);

function reiniciarColor(){

    jugador1Color.value="rgba(255, 0, 0, 0.412)";
    jugador2Color.value="rgba(0, 0, 255, 0.412)"; 
    jugadoresListos.jugador1=false;
    jugadoresListos.jugador2=false;
}

 socket.on('move', (data, username) => {
    


  if(username===props.data[0].username){
   jugadoresListos.jugador1=true;
  }else{ 
    jugadoresListos.jugador2=true;
  }

  if(jugadoresListos.jugador1 && jugadoresListos.jugador2){
    
    $nuxt.$router.push('/modo');
  }

 });

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');


@keyframes cargando{
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
 
span {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
  font-weight: bold;
  font-size: 24px;
  color: white;
  text-align: center;
  margin: 0 auto;
 
}

.animacion{
  animation: cargando 1s infinite linear;
}
.selector{
    display: grid;
    justify-content: center;
    align-items: center;
    grid-area: s;
    height: 10vh;
    gap: 0;
    font-size: 30px;
    opacity: 0.91;
    color: white;   
    background-color: #ce53b9; 
    color: white;
    border: 1px solid #ffffff;
    box-shadow: 0 0px 20px white;
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
    background-image: url('/images/fondo-inicio.png');
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
 
.jugador1,.jugador2{
  padding-top: 30px;
  height: 370px;
  display: grid;
  font-size: 30px;
  text-align: center;
  margin-bottom: 20px;
  box-shadow: white 0px 0px 50px;
}
.empezar{
  display: grid;
  grid-area: e;
  justify-content: center;
  align-items: center;
  font-size: 70px;
  text-align: center;
  height: 100px;
  background: none;

}
.jugador1{
    grid-area: a;

}

.jugador2{
    grid-area: d;
}


</style>