<template>
    <main>

        <img class="fondo" src="/images/duelo/fondo.webp" alt="">
      

        <div> <img class="rojo" src="/images/duelo/rojo.webp" alt=""></div>
        <div> <img class="azul" src="/images/duelo/azul.webp" alt=""></div>


        <div> <img class="suelo_rojo" src="/images/duelo/suelo_rojo.webp" alt=""></div>
        <div> <img class="suelo_azul" src="/images/duelo/suelo_azul.webp" alt=""></div>

    </main>
</template>

<script setup>

import { reactive, ref,computed } from 'vue'; 
import socketManager from '../static/socket'
const socket = socketManager.getSocket(); 
const emit = defineEmits();
// 0 = jugador, 1 = pantalla
const menu = ref(1);
const yo = computed(() => $nuxt.$store.state);

</script>
<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
.fondo {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}
.rojo {
    position: absolute;
    top: 20%;
    left: 20%;
    transform: scaleX(-1); 
    transform-origin: left; 
    z-index: 2;
}
.azul{
    position: absolute;
    top: 20%;
    left: 80%;
    transform-origin: left; 
    z-index: 2;
}

.suelo_rojo {
    position: absolute;
    top: 60%;
    left: 10%; 
    transform-origin: left; 
    z-index: 2;
}
.suelo_azul{
    position: absolute;
    transform: scaleX(-1); 
    top: 60%;
    left: 90%;
    transform-origin: left; 
    z-index: 2;
}
  
</style>
