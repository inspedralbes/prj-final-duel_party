<template>
    <main>
   <div v-if="yo.juego===0"> 
<div>
<img class="montaña" src="/images/montaña/montaña.webp" alt="" srcset=""> 
</div>
<img class="jugador1" :style="{left:movimiento.jugador1.left+'%',top:movimiento.jugador1.top+'%'}"  src="/images/montaña/jugador1.webp">
<img class="jugador2" :style="{right:movimiento.jugador2.right+'%',top:movimiento.jugador2.top+'%'}"   src="/images/montaña/jugador2.webp">
<ruleta class="ruleta" @minijuego="minijuego"/>
<explicar class="explicar" @jugar="modo" :num="juego" v-if="visibleInstrucciones"/>
</div>  

<Globos v-if="yo.juego===1" @ganador="ganador"/>
<Duelo v-if="yo.juego===2" @ganador="ganador"/>
<Penales v-if="yo.juego===3" @ganador="ganador"/>
<Soga v-if="yo.juego===4" @ganador="ganador"/>
<Luz_verde v-if="yo.juego===5" @ganador="ganador"/>
<Colores v-if="yo.juego===6" @ganador="ganador"/>
<Mando v-if="yo.juego===-1"/>
<Win class="win" v-if="visibleWIN" :initialWinnerName="yo.jugadores[winner].username" @salir="ganador2"/>
<Win class="win" v-if="visibleWINFinal" :initialWinnerName="yo.jugadores[winner].username" :initialWinnerMessage="`¡Felicidades! Has ganado el juego`" @salir="ganadorFinal"/>

</main>
</template>

<script setup>
import Duelo from '../components/duelo.vue';
import Globos from '../components/globos.vue';
import Penales from '../components/penales.vue';
import Luz_verde from '../components/luz_verde.vue';
import Colores from '../components/colores.vue';
import Soga from '../components/soga.vue';
import Mando from '../components/mando.vue';
import socketManager from '../static/socket'
import { reactive, ref,computed } from 'vue'; 
import Win from '../components/win.vue';

const socket = socketManager.getSocket();
const yo= computed(() => $nuxt.$store.state);  

if(yo.value.juego==='' && yo.value.username!=="host"){
  $nuxt.$router.push('/jugar');
}

if(yo.value.username==="host"){
    $nuxt.$store.dispatch('updateJuego', 0); 
} 
 
const visibleWIN = ref(false);
const visibleWINFinal = ref(false);
const winner=ref(-1);
const visibleInstrucciones=ref(false);
const juego=ref(0);
const movimiento = reactive({
  jugador1: { left: 5, top: 65,nivel:0 },
  jugador2: { right: 2, top: 65,nivel:0 }
});


function ganador(data){
    console.log("hola",data);
    
  visibleInstrucciones.value=false;  
  winner.value=data;
  visibleWIN.value=true;
  socket.emit('minijuego', yo.value.roomKey,-1);
}

function ganador2(){
 $nuxt.$store.dispatch('updateJuego', 0); 
  visibleWIN.value=false;
  setTimeout(()=>{
     mover(winner.value);
     winner.value=-1;
  }
  ,1000);
 
 
}

function ganadorFinal(){
 $nuxt.$router.push('/jugar');
}

function modo(){
    $nuxt.$store.dispatch('updateJuego', juego.value+1); 
    socket.emit('minijuego', yo.value.roomKey,juego.value+1 );
}


function minijuego(data){
    juego.value=data;
     
    
    visibleInstrucciones.value=true;
}

function mover(data){


    switch(data){
        case 0:
            if(movimiento.jugador1.nivel==4){
                movimiento.jugador1.left=movimiento.jugador1.left-2;
                movimiento.jugador1.top=movimiento.jugador1.top-15; 
                movimiento.jugador2.right=2;
                movimiento.jugador2.top=65
               setTimeout(()=>{
                winner.value=0;
                visibleWINFinal.value=true;
                 

               }
                ,500);
              

            }
            else{
            movimiento.jugador1.left=movimiento.jugador1.left+10;
            movimiento.jugador1.top=movimiento.jugador1.top-10;
            movimiento.jugador1.nivel++;
        }
            break;
        case 1:
            if(movimiento.jugador2.nivel==4){ 
                movimiento.jugador2.top=movimiento.jugador2.top-17;
                movimiento.jugador1.left=5;
                movimiento.jugador1.top=65;
                setTimeout(()=>{
                 winner.value=1;
                visibleWINFinal.value=true;  
               }
                ,500);
            }else{
            movimiento.jugador2.right=movimiento.jugador2.right+10;
            movimiento.jugador2.top=movimiento.jugador2.top-10;
           movimiento.jugador2.nivel++;
        }
            break;
    }
   
    
    
}


</script>


<style scoped>
.explicar{
    z-index: 3;
}
.win{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
}
.jugador2{
    position: absolute;
    width: 100px;
    transition: 0.5s ease-out;
    z-index: 2;
     
    
}
.jugador1{
    position: absolute;
    width: 100px;
    transition: 0.5s ease-out;
    z-index: 2;
}
.montaña{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

}
</style>