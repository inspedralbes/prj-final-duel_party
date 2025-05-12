<template>
    <div class="container" @click="spin">
      <h1>Ruleta de la Fortuna</h1>
  
      <div class="wheel-container">
        <div class="marker"></div>
        <div
          class="wheel"
          :style="{ transform: `rotate(${currentRotation}deg)` }"
        >
          <div
            v-for="(segment, index) in segments"
            :key="index"
            class="segment"
            :style="getSegmentStyle(index, segment.color)"
          >
            <span :style="getTextStyle()">{{ segment.text }}</span>
          </div>
        </div>
      </div>
  
      
      <div class="result">{{ resultDisplay }}</div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  

  const emit = defineEmits();
  const segments = ref([ 
    { text: '🎈', color: 'none' },
    { text: '🔫', color: 'none' },
    { text: '⚽', color: 'none' }, 
    { text: '🫴', color: 'none' },
    { text: '🏃‍♂️', color: 'none' },
    { text: '🎨', color: 'none' },
    
    
  ])
  
  const segmentAngle = 360 / segments.value.length
  const currentRotation = ref(0)
  const isSpinning = ref(false)
  const resultDisplay = ref('')
  
  const getSegmentStyle = (index, color) => ({
    backgroundColor: color,
    transform: `rotate(${index * segmentAngle}deg)`
  })
  
  const getTextStyle = () => ({
    transform: `rotate(${segmentAngle / 2}deg) translateX(80px)`
  })
  
  const spin = () => {
    if (isSpinning.value) return
  
    isSpinning.value = true
    resultDisplay.value = ''
  
    const spinRotations = 5 + Math.random() * 5
    const extraAngle = Math.floor(Math.random() * 360)
    const totalRotation = currentRotation.value + spinRotations * 360 + extraAngle
  
    currentRotation.value = totalRotation
  
    setTimeout(() => {
  const normalizedRotation = (360 - (currentRotation.value % 360)) % 360
  const index = Math.floor(normalizedRotation / segmentAngle)
  const correctedIndex = (index + 1) % segments.value.length
  console.log(segments.value[correctedIndex].text)
  
  emit('minijuego',correctedIndex);
 //  resultDisplay.value = `¡${correctedIndex}!`
 // resultDisplay.value = `¡${segments.value[correctedIndex].text}!`
  isSpinning.value = false
}, 5000)

  }
  </script>
  
  <style scoped>
  .container {
    font-family: Arial, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    min-height: 100vh;
    margin: 0;
    background-color: #f5f5f5;
    padding: 2rem;
  }
  
  .wheel-container {
    position: absolute;
    width: 400px;
    height: 400px;
  }
  
  .wheel {
    width: 300px;
    height: 300px;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 10%;
    transform: translate(-50%, -50%);
    overflow: hidden;
    border: 8px solid #2e25a5;
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.795);
    transition: transform 5s cubic-bezier(0.17, 0.67, 0.12, 0.99);
  }
  
  .segment {
    position: absolute;
    width: 50%;
    height: 50%;
    transform-origin: bottom right;
    clip-path: polygon(0 0, 100% 0, 100% 100%);
    display: flex;
    align-items: left;
    justify-content: left;
    font-weight: bold;
    font-size: 50px;
    text-shadow: 1px 1px 20px rgb(0, 0, 0);
    color: white;
    border: 2px solid rgb(201, 201, 201);
  }
  
  .segment span {
    position: absolute;
    text-align: center;
    width: 60px;
  }
  
  .marker {
    position: absolute;
    top: 40%;
    left: 40%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-top: 40px solid #d00;
    z-index: 2;
  }
  
  button {
    padding: 12px 30px;
    font-size: 18px;
    background-color: #2c6fec;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  button:hover {
    background-color: #1a5ac9;
  }
  
  .result {
    font-size: 24px;
    font-weight: bold;
    height: 30px;
  }
  </style>
  