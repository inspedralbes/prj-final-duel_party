<template>
    <div class="explanation-box">
        <h2 class="title">{{ textos[num].title }}</h2>
        <p class="description">
            {{ textos[num].description }}
        </p>
        <button class="boton" @click="jugar">JUGAR</button>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
defineProps({
    num: {
        type: Number,
        default: 0
    }
});

const emit = defineEmits();

function jugar(){
    emit('jugar');
}

const textos=reactive([{
    title:"Globos",
    description:"Explota todos los globos de tu color"
},{
    title:"Duelos del Oeste",
    description:"Sacude el movil para disparar, cuando sea el momento justo"
},{
    title:"Penales",
    description:"Escoge donde quiere chutar, escoge donde te quires tirar"
},{
    title:"Tirar de la soga",
    description:"Presiona el boton para tirar de la soga sin parar"
},{
    title:"Luz verde, luz roja",
    description:"Agita el movil para moverte, pero CUIDADO, solo cuando esté la luz de verde"
},{
    title:"Colores",
    description:"Aparece un texto pintado en pantalla, escoge el color del texto"
}
])
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
@keyframes pop {
    0%{
        opacity: 0;
    }100%{
        opacity: 1;
    }

}
.boton{
  width: 150px;
  height: 50px;
  background-image: url('/images/fondo-inicio.png');
  border: 1px solid white;
  color: white;
  cursor: pointer;
  
}
.explanation-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-image: url('/images/fondo-inicio.png');
      text-align: center;
    padding: 16px 24px;
    margin: 20px auto;
    max-width: 600px;
    font-family: 'Press Start 2P', cursive;
    border: 2px solid white;
    border-radius: 12px;
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.445); 
    animation: pop 0.5s ease-out;
}

.title {
    margin-bottom: 10px;
    font-size: 1.5rem;
    color: #ffffff;
    text-align: center;
    
}

.description {
    font-size: 1rem;
    color: #ffffff;
    line-height: 1.6;
    text-align: center;
}
</style>
