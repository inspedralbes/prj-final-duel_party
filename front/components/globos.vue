<script setup>
import { reactive, ref,computed } from 'vue';
import socketManager from '../static/socket'
const azules = ref(10);
const rojos = ref(10);
const globos = ref([]);
const yo= computed(() => $nuxt.$store.state);
const socket = socketManager.getSocket();

 

function explotar(index) {
  globos.value[index].explotado = true;
}

for (let index = 0; index < 20; index++) {
  let numero = Math.floor(Math.random() * 2) + 1;
  if (azules.value === 0) {
    numero = 2;
  }
  if (rojos.value === 0) {
    numero = 1;
  }

  if (numero === 1) {
    azules.value--;
    globos.value.push({ color: "azul", explotado: false });
  } else {
    rojos.value--;
    globos.value.push({ color: "rojo", explotado: false });
  }

  
}



</script>

<template>
  <main>




    
    <div class="parent">
      <img
        v-for="(globo, index) in globos"
        :key="index"
        class="images"
        :src="`/images/globos/${globo.color}.webp`"
        :class="{ opacity: globo.explotado }"  
        @click="explotar(index)"
      />
    </div>
  </main>
</template>

<style scoped>
main {
  background-color: #1a1a1a;
  height: 100vh;
  width: 100vw;
   
}


@keyframes explotar{
    0%{
        scale: 1;
        opacity: 1; 
    }
    100%{
        scale: 1.2;
        opacity: 0; 
    }
}

.opacity {
  animation: explotar 0.2s ease-in-out;
  opacity: 0;
}

.images {
  width: 80px;
}

.parent {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-column-gap: 70px;
  grid-row-gap: -10px;
  justify-content: center;
  align-items: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  
}



 
</style>
