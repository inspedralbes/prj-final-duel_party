<template>
    <div class="contenedor">
      <!-- Pantalla de selección de categoría -->
      <div v-if="!mostrarJuego" class="juego-container">
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
  
      <!-- Pantalla del juego -->
      <juego-personaje 
        v-if="mostrarJuego" 
        :categoria="categoriaSeleccionada"
        @volver="volverASeleccion" 
      />
  
      <!-- Componente de prueba para desarrollo -->
      <test-inclinacion v-if="mostrarJuego && modoDesarrollo" />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import BotonCategoria from '~/components/BotonCategoria.vue';
  import JuegoPersonaje from '~/components/JuegoPersonaje.vue';
  import TestInclinacion from '~/components/TestInclinacion.vue';
  
  const categorias = [
    { id: 1, nombre: 'ACTORES', icono: '🎭' },
    { id: 2, nombre: 'CANTANTES', icono: '🎤' },
    { id: 3, nombre: 'DEPORTISTAS', icono: '⚽' },
    { id: 4, nombre: 'PERSONAJES DE FICCIÓN', icono: '🦸' }
  ];
  
  // Variables reactivas para controlar el estado de la aplicación
  const mostrarJuego = ref(false);
  const categoriaSeleccionada = ref(null);
  const modoDesarrollo = ref(false); // Cambia a true para activar el componente de prueba
  
  // Función para seleccionar categoría e iniciar el juego
  const seleccionarCategoria = (categoria) => {
    console.log(`Categoría seleccionada: ${categoria.nombre}`);
    categoriaSeleccionada.value = categoria;
    mostrarJuego.value = true;
  };
  
  // Función para volver a la pantalla de selección de categoría
  const volverASeleccion = () => {
    mostrarJuego.value = false;
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