<template>
<main>
    <img class="fondo" src="/images/soga/fondo.webp" alt="" >
    <img class="soga" :style="{ left: `${mover}%` }" src="/images/soga/soga.webp" alt="">

    <div> </div>
</main>
</template>
<script setup>

import { ref } from 'vue';


const mover=ref(50);

function moverSoga(data){
    switch(data){
        case 1:
            mover.value=mover.value-1;
            break;
        case 2:
            mover.value=mover.value+1;
            break;
    }
}


import { onMounted, onBeforeUnmount } from 'vue'

function handleKeydown(event) {
  if (event.key === 'ArrowLeft') {
    moverSoga(1);
  } else if (event.key === 'ArrowRight') {
    moverSoga(2);
  } else if (event.key === 'ArrowUp') {
   
  } else if (event.key === 'ArrowDown') {
    console.log('⬇️ Flecha abajo')
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>
<style scoped>
.fondo {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}
.soga {
  position: absolute;
  top: 50%; 
  width: 70%; 
  transform: translate(-50%, -50%);
  object-fit: cover;
  z-index: 1;
}
</style>