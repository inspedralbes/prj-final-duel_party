<template>
  <div class="juego-container">
    <button class="boton-volver" @click="$emit('volver')">← VOLVER</button>
    <div class="carta-personaje">
      <transition name="fade">
        <div v-if="countdownFinished" class="personaje-nombre">
          {{ personaje }}
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  categoria: {
    type: Object,
    required: true
  },
  personaje: {
    type: Object, // Accepts an object with only the 'nombre' property
    required: true
  }
});

const emit = defineEmits(['volver']);

const countdown = ref(3);
const countdownFinished = ref(true); // Skip countdown since personaje is preselected

onMounted(() => {
  const timer = setInterval(() => {
    countdown.value--;
    if (countdown.value === 0) {
      clearInterval(timer);
      countdownFinished.value = true;
    }
  }, 1000);
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

.juego-container {
  font-family: 'Press Start 2P', cursive;
  background-color: rgb(108, 163, 240);
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}

.boton-volver {
  position: absolute;
  top: 15px;
  left: 30px;
  background-color: #333;
  color: white;
  font-family: 'Press Start 2P', cursive;
  font-size: 10px;
  padding: 6px 10px;
  border: 2px solid white;
  border-radius: 4px;
  cursor: pointer;
  z-index: 10;
}

.carta-personaje {
  background-color: #000;
  border: 6px solid #fff;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 0 0 4px #000, 0 0 0 8px #ff0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 400px;
  width: 850px;
}

.countdown,
.personaje-nombre {
  font-size: 60px;
  color: #ff0;
  text-shadow: 2px 2px 0 #f00;
  text-align: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>