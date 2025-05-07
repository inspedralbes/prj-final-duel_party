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
    top: 40%;
    left: 10%;
    transform-origin: 50% 50%;
    z-index: 2;
    width: 200px;
}
.azul{
    position: absolute;
    top: 40%;
    left: 80%;
    transform-origin: 50% 50%;
    z-index: 2;
    width: 200px;
}

.suelo_rojo {
    position: absolute;
    top: 70%;
    left: 10%; 
    transform-origin: left; 
    z-index: 2;
    width: 400px;
}
.suelo_azul{
    position: absolute;
    transform: scaleX(-1); 
    top: 70%;
    left: 90%;
    transform-origin: left; 
    z-index: 2;
    width: 400px;
}
  
</style>
