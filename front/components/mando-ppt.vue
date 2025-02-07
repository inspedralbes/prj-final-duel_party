<template>
    <main>
        <div class="titulo">
            <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
        </div>

        <!-- Mostrar los botones solo cuando no se ha hecho una elección o después de un empate -->
        <div v-if="(!eleccionHecha && !empate) || (empate && mostrarBotones)" class="contenedor">
            <img class="piedra" src="/images/ppt/boton-piedra.png" @click="enviarEleccion('piedra')"/>
            <img class="papel" src="/images/ppt/boton-papel.png" @click="enviarEleccion('papel')"/>
            <img class="tijera" src="/images/ppt/boton-tijera.png" @click="enviarEleccion('tijera')"/>
        </div>

        <!-- Siempre mostrar "LISTO" cuando el jugador haga una elección -->
        <div v-if="eleccionHecha" class="listo">
            <h2>LISTO</h2>
        </div>
    </main>
</template>

<script setup>
import { ref } from 'vue';
import socket from '../static/socket';

const resultado = ref(null);
const eleccionHecha = ref(false);
const empate = ref(false);
const mostrarBotones = ref(true); // Controla cuándo mostrar los botones

const enviarEleccion = (eleccion) => {
    socket.getSocket().emit('eleccionPPT', { jugador: socket.getSocket().id, eleccion });
    eleccionHecha.value = true;
    mostrarBotones.value = false; // Ocultar botones cuando se elige una opción
};

socket.getSocket().on('resultadoPPT', (data) => {
    resultado.value = data;
    const jugadores = Object.keys(resultado.value);

    if (jugadores.length < 2) return; // Evita errores si aún no hay suficientes jugadores

    const eleccion1 = resultado.value[jugadores[0]];
    const eleccion2 = resultado.value[jugadores[1]];

    if (eleccion1 === eleccion2) { 
        empate.value = true;

        // Mantener "LISTO" visible durante 5 segundos antes de reiniciar
        setTimeout(() => {
            reiniciarJuego();
        }, 5000);
    } else {
        empate.value = false;
    }
});

// Función para reiniciar el juego después del empate
const reiniciarJuego = () => {
    eleccionHecha.value = false;
    empate.value = false;
    resultado.value = null;
    mostrarBotones.value = true; // Mostrar los botones nuevamente
};
</script>

<style scoped>
.contenedor {
    display: grid;
    margin-top: 70px;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    place-items: center;
    justify-content: center;
    padding: 10px;
}

.titulo {
  font-family: 'Press Start 2P', cursive;
  text-align: center;
  color: rgb(0, 0, 0);
}

.piedra, .papel, .tijera {
    width: 100%;
    max-width: 190px;
    transition: transform 0.3s ease, filter 0.3s ease;
}

.piedra:hover, .papel:hover, .tijera:hover {
    transform: scale(1.1); 
    filter: brightness(1.2); 
}

.listo {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    font-size: 3rem;
    color: green;
    font-weight: bold;
    text-align: center;
    font-family: 'Press Start 2P', cursive;
}

@media (max-width: 600px) {
    .contenedor {
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: 1fr;
        margin-top: 40px;
    }

    .piedra, .papel, .tijera {
        max-width: 100px;
    }

    .listo {
        font-size: 2rem;
    }
}
</style>
