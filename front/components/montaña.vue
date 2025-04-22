<template>
    <main>
      
<div>
    <img class="montaña" src="/images/montaña/montaña.webp" alt="" srcset=""> 
</div>
<img class="jugador1" :style="{left:movimiento.jugador1.left+'%',top:movimiento.jugador1.top+'%'}" @click="mover(1)" src="/images/montaña/jugador1.webp">
<img class="jugador2" @click="mover(2)" src="/images/montaña/jugador2.webp">

</main>
</template>

<script setup>

import { reactive } from 'vue';

const movimiento = reactive({
  jugador1: { left: 5, top: 65 },
  jugador2: { right: 2, top: 60 }
});

function mover(data){

    movimiento.jugador1.left=movimiento.jugador1.left+10;
    movimiento.jugador1.top=movimiento.jugador1.top-10;

}


</script>


<style scoped>
.jugador2{
    position: absolute;
    width: 100px;
    top: 60%;
    right: 2%;
    
}
.jugador1{
    position: absolute;
    width: 100px;
    
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