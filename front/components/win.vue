<!-- WinnerAnnouncement.vue -->
<template>
    <div class="winner-outer-container">
      <!-- Confeti -->
      <div 
        v-for="(confetti, index) in confettiElements" 
        :key="index" 
        class="confetti" 
        :style="{
          left: `${confetti.left}%`, 
          animationDelay: `${confetti.delay}s`,
          backgroundColor: confetti.color
        }"
      ></div>
      
      <div class="winner-container">
        <div class="trophy">🏆</div>
        <h1>¡FELICIDADES!</h1>
        <div class="winner-name">{{ winnerName }}</div>
        <div class="message">{{ winnerMessage }}</div>
        <button class="replay-button" @click="playAgain">OK</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  // Props para personalizar el componente
  const props = defineProps({
    initialWinnerName: {
      type: String,
      default: 'JUGADOR 1'
    },
    initialWinnerMessage: {
      type: String,
      default: '¡Eres el campeón!'
    }
  });
  
  // Estado reactivo
  const winnerName = ref(props.initialWinnerName);
  const winnerMessage = ref(props.initialWinnerMessage);
  
  // Confeti
  const confettiElements = ref([]);
  const confettiColors = ['#ffd700', '#ff4500', '#00bfff', '#7cfc00', '#ff1493', '#9400d3'];
  
  // Método para actualizar el ganador
  const setWinner = (name, message) => {
    winnerName.value = name;
    winnerMessage.value = message;
  };
  
const emit = defineEmits();
  // Método para el botón de jugar de nuevo - simplemente muestra un alert
  const playAgain = () => {
    emit('salir');
  };
  
  // Exponer método setWinner para uso externo
  defineExpose({
    setWinner
  });
  
  // Generar confeti al montar el componente
  onMounted(() => {
    for (let i = 0; i < 15; i++) {
      confettiElements.value.push({
        left: Math.random() * 100,
        delay: Math.random() * 2,
        color: confettiColors[Math.floor(Math.random() * confettiColors.length)]
      });
    }
  });
  </script>
  
  <style scoped>

@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
  .winner-outer-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    overflow: hidden;
  }
  
  .winner-container {
    font-family: 'Press Start 2P', cursive;
    position: relative;
    width: 80%;
    max-width: 500px;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    overflow: hidden;
    padding: 20px;
    text-align: center;
    animation: appear 0.5s ease-out forwards;
    z-index: 1;
  }
  
  .trophy {
    font-size: 60px;
    margin-bottom: 10px;
    animation: bounce 2s infinite;
    color: gold;
    text-shadow: 0 2px 5px rgba(0,0,0,0.2);
  }
  
  .confetti {
    position: absolute;
    width: 10px;
    height: 10px;
    animation: confetti-fall 5s ease-in infinite;
    z-index: 0;
  }
  
  h1 {
    color: #333;
    font-size: 32px;
    margin: 10px 0;
    text-transform: uppercase;
  }
  
  .winner-name {
    font-size: 48px;
    font-weight: bold;
    background: linear-gradient(45deg, #FF8C00, #FFA500, #FFD700);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    margin: 20px 0;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
  }
  
  .message {
    font-size: 18px;
    color: #555;
    margin-bottom: 20px;
  }
  
  .replay-button {
    background-color: #4CAF50;
    border: none;
    color: white;
    padding: 12px 24px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 18px;
    margin: 10px 0;
    cursor: pointer;
    border-radius: 30px;
    transition: all 0.3s;
  }
  
  .replay-button:hover {
    background-color: #3e8e41;
    transform: scale(1.05);
  }
  
  @keyframes appear {
    0% {
      transform: scale(0.8);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
  
  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-15px);
    }
  }
  
  @keyframes confetti-fall {
    0% {
      transform: translateY(-100vh) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translateY(100vh) rotate(360deg);
      opacity: 0;
    }
  }
  </style>