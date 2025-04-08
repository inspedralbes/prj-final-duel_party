<template>
    <div 
      class="categoria-boton" 
      :class="{ 'hover': isHover }"
      @mouseover="isHover = true"
      @mouseleave="isHover = false"
      @click="$emit('seleccionar', categoria)"
    >
      <div class="icono">{{ categoria.icono }}</div>
      <div class="texto">{{ categoria.nombre }}</div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const props = defineProps({
    categoria: {
      type: Object,
      required: true
    }
  });
  
  defineEmits(['seleccionar']);
  
  const isHover = ref(false);
  </script>
  
  <style scoped>
  .categoria-boton {
    background-color: #333;
    border: 4px solid #fff;
    border-radius: 8px;
    padding: 16px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s;
    position: relative;
    box-shadow: 0 6px 0 #555;
    user-select: none;
  }
  
  .categoria-boton:active {
    transform: translateY(4px);
    box-shadow: 0 2px 0 #555;
  }
  
  .hover {
    background-color: #444;
    transform: translateY(2px);
    box-shadow: 0 4px 0 #555;
  }
  
  .icono {
    font-size: 32px;
    margin-bottom: 12px;
  }
  
  .texto {
    color: #fff;
    font-size: 12px;
    font-family: 'Press Start 2P', cursive;
  }
  
  /* Efecto de borde brillante al hacer hover */
  .hover:before {
    content: '';
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    border: 2px solid #0f0;
    border-radius: 12px;
    animation: border-glow 1s infinite;
    pointer-events: none;
  }
  
  @keyframes border-glow {
    0%, 100% { opacity: 0.8; }
    50% { opacity: 0.3; }
  }
  </style>