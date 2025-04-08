<template>
    <div class="contenedor">
      <div class="juego-container">
        <div class="titulo-container">
          <h1 class="titulo">ADIVINA EL PERSONAJE</h1>
          <div class="subtitulo">¡ELIGE UNA CATEGORÍA!</div>
        </div>
        
        <div class="categorias-grid">
          <boton-categoria 
            v-for="(categoria, index) in categorias" 
            :key="index" 
            :categoria="categoria"
            @seleccionar="seleccionarCategoria" 
          />
        </div>
        
        <div class="instrucciones">
          PRESIONA UN BOTÓN PARA COMENZAR
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import BotonCategoria from '~/components/BotonCategoria.vue';
  
  const categorias = [
    { id: 1, nombre: 'ACTORES', icono: '🎭' },
    { id: 2, nombre: 'CANTANTES', icono: '🎤' },
    { id: 3, nombre: 'DEPORTISTAS', icono: '⚽' },
    { id: 4, nombre: 'PERSONAJES DE FICCIÓN', icono: '🦸' },
  ];
  
  const seleccionarCategoria = (categoria) => {
    console.log(`Categoría seleccionada: ${categoria.nombre}`);
    // Aquí puedes implementar la lógica para iniciar el juego con la categoría elegida
  };
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
  
  .contenedor {
    background-color: rgb(108, 163, 240);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    font-family: 'Press Start 2P', cursive;
  }
  
  .juego-container {
    background-color: #000;
    border: 8px solid #fff;
    border-radius: 10px;
    box-shadow: 0 0 0 4px #000, 0 0 0 8px #ff0;
    padding: 24px;
    width: 90%;
    max-width: 800px;
  }
  
  .titulo-container {
    text-align: center;
    margin-bottom: 32px;
  }
  
  .titulo {
    color: #ff0;
    font-size: 28px;
    margin-bottom: 16px;
    text-shadow: 4px 4px 0 #f00;
  }
  
  .subtitulo {
    color: #fff;
    font-size: 16px;
    margin-bottom: 8px;
  }
  
  .categorias-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 16px;
    margin-bottom: 32px;
  }
  
  .instrucciones {
    text-align: center;
    color: #0f0;
    font-size: 12px;
    animation: parpadeo 1s infinite;
  }
  
  @keyframes parpadeo {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
  </style>