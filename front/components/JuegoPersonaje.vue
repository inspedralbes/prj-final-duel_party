<template>
    <div class="juego-container">
      <button class="boton-volver" @click="$emit('volver')">← VOLVER</button>
      
      <div class="carta-personaje">
        <transition name="fade">
          <div v-if="!countdownFinished" class="countdown">
            {{ countdown }}
          </div>
          <div v-else class="personaje-nombre">
            {{ personajeActual?.nombre }}
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
    }
  });
  
  const emit = defineEmits(['volver']);
  
  const personajesPorCategoria = {
    'ACTORES': [
      { id: 1, nombre: 'Leonardo DiCaprio', pista: 'Protagonizó Titanic' },
      { id: 2, nombre: 'Scarlett Johansson', pista: 'Es la Viuda Negra en Marvel' },
      { id: 3, nombre: 'Tom Hanks', pista: 'Protagonizó Forrest Gump' },
      { id: 4, nombre: 'Meryl Streep', pista: 'Actriz con más nominaciones al Oscar' },
      { id: 5, nombre: 'Denzel Washington', pista: 'Protagonizó Training Day' }
    ],
    'CANTANTES': [
      { id: 1, nombre: 'Beyoncé', pista: 'Fue parte del grupo Destiny\'s Child' },
      { id: 2, nombre: 'Ed Sheeran', pista: 'Pelirrojo británico famoso por "Shape of You"' },
      { id: 3, nombre: 'Taylor Swift', pista: 'Famosa por regrabar sus álbumes' },
      { id: 4, nombre: 'Bad Bunny', pista: 'Reggaetonero puertorriqueño' },
      { id: 5, nombre: 'Adele', pista: 'Cantante británica de "Hello"' }
    ],
    'DEPORTISTAS': [
      { id: 1, nombre: 'Lionel Messi', pista: 'Futbolista argentino, jugó en el Barcelona' },
      { id: 2, nombre: 'Serena Williams', pista: 'Tenista con múltiples Grand Slams' },
      { id: 3, nombre: 'LeBron James', pista: 'Estrella de la NBA' },
      { id: 4, nombre: 'Simone Biles', pista: 'Gimnasta olímpica estadounidense' },
      { id: 5, nombre: 'Rafael Nadal', pista: 'Tenista español, rey de Roland Garros' }
    ],
    'PERSONAJES DE FICCIÓN': [
      { id: 1, nombre: 'Harry Potter', pista: 'Mago con una cicatriz en forma de rayo' },
      { id: 2, nombre: 'Darth Vader', pista: 'Villano de Star Wars con máscara negra' },
      { id: 3, nombre: 'Wonder Woman', pista: 'Superheroína amazona de DC Comics' },
      { id: 4, nombre: 'Sherlock Holmes', pista: 'Detective con gran capacidad deductiva' },
      { id: 5, nombre: 'Walter White', pista: 'Profesor de química que se vuelve narcotraficante' }
    ]
  };
  
  const obtenerPersonajeAleatorio = (categoria) => {
    const personajesCategoria = personajesPorCategoria[categoria];
    if (!personajesCategoria || personajesCategoria.length === 0) return null;
    
    const indiceAleatorio = Math.floor(Math.random() * personajesCategoria.length);
    return personajesCategoria[indiceAleatorio];
  };
  
  const personajeActual = ref(null);
  const countdown = ref(3);
  const countdownFinished = ref(false);
  
  onMounted(() => {
    personajeActual.value = obtenerPersonajeAleatorio(props.categoria.nombre);
  
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