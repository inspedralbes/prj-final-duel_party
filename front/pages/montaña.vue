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
<penales v-if="yo.juego===2" @ganador="ganador"/>
<Luz_verde v-if="yo.juego===3" @ganador="ganador"/>
<Colores v-if="yo.juego===4" @ganador="ganador"/>
<Duelo v-if="yo.juego===5" @ganador="ganador"/>
<Soga v-if="yo.juego===6" @ganador="ganador"/>
<Mando v-if="yo.juego===-1"/>
<Win v-if="visibleWIN" :initialWinnerName="yo.jugadores[winner].username" @salir="ganador2"/>

</main>
</template>

<script setup>

import { reactive, ref,computed } from 'vue'; 

const yo= computed(() => $nuxt.$store.state);  

if(yo.value.juego==='' && yo.value.username!=="host"){
  $nuxt.$router.push('/jugar');
}

if(yo.value.username==="host"){
    $nuxt.$store.dispatch('updateJuego', 0); 
} 
 
const visibleWIN = ref(false);
const winner=ref(-1);
const visibleInstrucciones=ref(false);
const juego=ref(0);
const movimiento = reactive({
  jugador1: { left: 5, top: 65,nivel:0 },
  jugador2: { right: 2, top: 65,nivel:0 }
});


function ganador(data){
  winner.value=data;
  visibleWIN.value=true;
  $nuxt.$store.dispatch('updateJuego', 0); 
  socket.emit('minijuego', yo.value.roomKey,-1);
}

function ganador2(){
  visibleWIN.value=false;
  mover(winner.value);
  winner.value=-1;
}

function modo(){
    $nuxt.$store.dispatch('updateJuego', juego.value); 
    socket.emit('minijuego', yo.value.roomKey,juego.value );
}


function minijuego(data){
    juego.value=data;
    visibleInstrucciones.value=true;
}

function mover(data){


    switch(data){
        case 0:
            if(movimiento.jugador1.nivel==9){
                movimiento.jugador1.left=movimiento.jugador1.left-2;
                movimiento.jugador1.top=movimiento.jugador1.top-15; 
                movimiento.jugador2.right=2;
                movimiento.jugador2.top=65
               setTimeout(()=>{
                alert("ganador rojo");
                 $nuxt.$router.push('/jugar');

               }
                ,500);
              

            }
            else{
            movimiento.jugador1.left=movimiento.jugador1.left+5;
            movimiento.jugador1.top=movimiento.jugador1.top-5;
            movimiento.jugador1.nivel++;
        }
            break;
        case 1:
            if(movimiento.jugador2.nivel==9){ 
                movimiento.jugador2.top=movimiento.jugador2.top-17;
                movimiento.jugador1.left=5;
                movimiento.jugador1.top=65;
                setTimeout(()=>{
                alert("ganador azul");
                 $nuxt.$router.push('/jugar');    
               }
                ,500);
            }else{
            movimiento.jugador2.right=movimiento.jugador2.right+5;
            movimiento.jugador2.top=movimiento.jugador2.top-5;
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