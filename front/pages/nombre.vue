<template>
  
  <div class="div-nombre">
    <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
    <div class="grid">
      <input type="text" v-model="nombre" placeholder="nickname" />
      <button class="btn-nombre" @click="siguiente"> SIGUIENTE</button>
    </div>
  </div>
  
</template>

<script setup>

import { ref } from 'vue';
const nombre = ref("");


function siguiente() {

  if (nombre.value == "") {
    alert("pon Nombre")
  } else {
    $nuxt.$store.dispatch('updateNamePlayer', nombre.value)
    $nuxt.$router.push('/adivinaPersonaje');
  }
}

</script>
<style scoped>
input {
  margin: 10px;
  width: 340px;
  font-size: 26px;
  text-align: center;
  font-family: 'Press Start 2P', cursive;


}
.grid {
  display: grid;
  gap: 10px;
  text-align: center;
  margin-left: 20px;
}

.div-nombre {
  place-items: center;
  background-image: url('/images/fondo-inicio.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  margin: 0;
  padding: 0;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  font-family: 'Press Start 2P', cursive;

}

.btn-nombre {
  margin: 10px;
  width: 350px;
  font-size: 26px;
  border: 1px solid black;
  background-color: #292828;
  color: #ffffff;
  border: none;
  cursor: pointer;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.9);
  transition: transform 0.3s, background-color 0.3s;
  font-family: 'Press Start 2P', cursive;

}

.btn-nombre:hover {
  background-color: #1cbc00;
  color: #ffffff;
  transform: scale(1.05);
}

.btn-nombre:active {
  transform: scale(1);
}
</style>
