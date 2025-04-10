<template>
    <main>
<button @click="modo(1)">1 </button>
<Globos v-if="yo.juego===1"/>
</main>
</template>
<script setup>

import { ref,computed } from 'vue';
import Globos from '../components/globos.vue';
import socketManager from '../static/socket'
const socket = socketManager.getSocket();
const yo= computed(() => $nuxt.$store.state); 
// globos 1
// adivina persona 2

function modo(data){
    $nuxt.$store.dispatch('updateJuego', data); 
    socket.emit('minijuego', yo.value.roomKey,data );
}
 

 


</script>
<style scoped>



</style>