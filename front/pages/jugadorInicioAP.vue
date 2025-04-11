<template>
    <div class="contenedor">
      <JuegoPersonaje 
        :categoria="{ nombre: $route.query.categoria }"
        @volver="volverAlMenu"
      />
    </div>
  </template>
  
  <script setup>
  import JuegoPersonaje from '~/components/JuegoPersonaje.vue';
  
  const volverAlMenu = () => {
    $nuxt.$router.push('/adivinaPersonaje');
  };
  </script>
  
  <style scoped>
  .contenedor {
    width: 100vw;
    height: 100vh;
    background-color: rgb(108, 163, 240);
  }
  </style>