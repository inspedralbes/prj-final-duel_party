<template>
    <main>
<div class="minijuego-anuncio">
    <h1>{{ data[props.data].titulo }}</h1>
  <h3>📜 Instrucciones:</h3>
  
  <ul>
      <li>⚡ {{ data[props.data].i1 }}</li>
      <li>🕹️ {{ data[props.data].i2 }}</li>
      <li>🏆 {{ data[props.data].i3 }}</li>
  </ul>

  <button class="btn-jugar">🚀 Jugar Ahora</button>
</div>
 
</main>
</template>
<script setup>

import { reactive } from 'vue';

const props = defineProps({
    data: {
        type: Number,
        required: true,
    },

},)
let data=[
    {
        titulo:"Baloncesto 🏀",
        i1:"Sacude el movil o presiona el botón A para tirar la bola.",
        i2:"Hazlo en el momento justo.",
        i3:"Anota más puntos que los demas.",
       
    },
    {
        titulo:"Piedra, Papel, Tijera <br>🫱 🤛",
        i1:"3 botones con las diferentes jugadas.",
        i2:"Selecciona una de ellas.",
        i3:"Gana al rival.",
    }

]


const baloncesto=reactive({})





</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

.minijuego-anuncio {
  width: 80%;
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  text-align: center;
  background: linear-gradient(135deg, #ff8a00, #e52e71);
  color: white;
  border-radius: 12px;
  font-family: 'Press Start 2P', cursive;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
}

.minijuego-anuncio h2 {
  margin-bottom: 10px;
  font-size: 22px;
}

.minijuego-anuncio h3 {
  margin-top: 15px;
  font-size: 18px;
}

.minijuego-anuncio ul {
  text-align: left;
  margin: 10px 0;
  padding-left: 20px;
}

.minijuego-anuncio li {
  margin-bottom: 5px;
}

.btn-jugar {
  background-color: #ffcc00;
  color: #333;
  border: none;
  padding: 10px 15px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
}

.btn-jugar:hover {
  background-color: #ff9900;
}
</style>
