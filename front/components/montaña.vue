<template>
    <main>
      
<div>
    <img class="montaña" src="/images/montaña/montaña.webp" alt="" srcset=""> 
</div>
<img class="jugador1" :style="{left:movimiento.jugador1.left+'%',top:movimiento.jugador1.top+'%'}" @click="mover(1)" src="/images/montaña/jugador1.webp">
<img class="jugador2" :style="{right:movimiento.jugador2.right+'%',top:movimiento.jugador2.top+'%'}" @click="mover(2)" src="/images/montaña/jugador2.webp">
<Ruleta class="ruleta" @minijuego="minijuego"/>
<Explicar class="explicar" :title="textos[juego].title" :description="textos[juego].description" v-if="visibleInstrucciones"/>
</main>
</template>

<script setup>

import { reactive, ref } from 'vue';
import Ruleta from './ruleta.vue';
import Explicar from './explicar.vue';
const visibleInstrucciones=ref(false);
const juego=ref(0);
const movimiento = reactive({
  jugador1: { left: 5, top: 65,nivel:0 },
  jugador2: { right: 2, top: 65,nivel:0 }
});

const textos=reactive([{
    title:"Globos",
    description:"Explota todos los globos de tu color"
},{
    title:"Duelos del Oeste",
    description:"Sacude el movil para disparar, cuando sea el momento justo"
},{
    title:"Penales",
    description:"Escoge donde quiere chutar, escoge donde te quires tirar"
},{
    title:"Tirar de la soga",
    description:"Presiona el boton para tirar de la soga sin parar"
},{
    title:"Luz verde, luz roja",
    description:"Agita el movil para moverte, pero CUIDADO, solo cuando esté la luz de verde"
},{
    title:"Colores",
    description:"Aparece un texto pintado en pantalla, escoge el color del texto"
}
])

function minijuego(data){
    juego.value=data;
    visibleInstrucciones.value=true;
}

function mover(data){


    switch(data){
        case 1:
            if(movimiento.jugador1.nivel==9){
                movimiento.jugador1.left=movimiento.jugador1.left-2;
                movimiento.jugador1.top=movimiento.jugador1.top-15; 
                movimiento.jugador2.right=2;
                movimiento.jugador2.top=65
               setTimeout(()=>{
                alert("ganador rojo");

               }
                ,500);
              

            }
            else{
            movimiento.jugador1.left=movimiento.jugador1.left+5;
            movimiento.jugador1.top=movimiento.jugador1.top-5;
            movimiento.jugador1.nivel++;
        }
            break;
        case 2:
            if(movimiento.jugador2.nivel==9){ 
                movimiento.jugador2.top=movimiento.jugador2.top-17;
                movimiento.jugador1.left=5;
                movimiento.jugador1.top=65;
                setTimeout(()=>{
                alert("ganador azul");

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