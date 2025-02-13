<template>
    <main>
        <div class="titulo">
            <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
        </div>

        <div v-if="mostrarBotones" class="contenedor">
            <img class="piedra" src="/images/ppt/boton-piedra.png" @click="enviarEleccion('piedra')" />
            <img class="papel" src="/images/ppt/boton-papel.png" @click="enviarEleccion('papel')" />
            <img class="tijera" src="/images/ppt/boton-tijera.png" @click="enviarEleccion('tijera')" />
        </div>

        <div v-if="eleccionHecha && !resultadoFinal && !empate" class="listo">
            <h2>LISTO</h2>
        </div>

        <div v-if="empate" class="empate">
            <h2>EMPATE</h2>
        </div>

        <div v-if="resultadoFinal" :class="resultadoFinal">
            <h2>{{ resultadoFinal === 'ganaste' ? '¡Has ganado!' : 'Has perdido' }}</h2>
        </div>
    </main>
</template>

<script setup>
import { ref,computed } from 'vue';
import socket from '../static/socket';

const eleccionHecha = ref(false);
const empate = ref(false);
const mostrarBotones = ref(true);
const resultadoFinal = ref(null);
const yo= computed(() => $nuxt.$store.state);

const enviarEleccion = (eleccion) => {
    socket.getSocket().emit('eleccionPPT', { jugador: socket.getSocket().id, eleccion, claveSala: yo.value.roomKey,number: yo.value.playerNumber-1 });
    eleccionHecha.value = true;
    mostrarBotones.value = false;
};

socket.getSocket().on('resultadoPPT', (data) => {
    const jugadorID = socket.getSocket().id;
    const jugadores = Object.keys(data);

    if (jugadores.length < 2) return;

    const [jugador1, jugador2] = jugadores;
    const eleccion1 = data[jugador1];
    const eleccion2 = data[jugador2];

    if (eleccion1 === eleccion2) { 
        empate.value = true;
        resultadoFinal.value = null;
        setTimeout(reiniciarJuego, 5000);
    } else {
        empate.value = false;
        resultadoFinal.value = determinarResultado(jugadorID, jugador1, eleccion1, jugador2, eleccion2);
    }
});

const determinarResultado = (jugadorID, jugador1, eleccion1, jugador2, eleccion2) => {
    const esJugadorActual = jugadorID === jugador1; 

    const ganaJugador1 = 
        (eleccion1 === 'piedra' && eleccion2 === 'tijera') ||
        (eleccion1 === 'papel' && eleccion2 === 'piedra') ||
        (eleccion1 === 'tijera' && eleccion2 === 'papel');

    return (esJugadorActual === ganaJugador1) ? 'ganaste' : 'perdiste';
};

const reiniciarJuego = () => {
    eleccionHecha.value = false;
    empate.value = false;
    resultadoFinal.value = null;
    mostrarBotones.value = true;
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
    color: black;
}

.piedra,
.papel,
.tijera {
    width: 100%;
    max-width: 190px;
    transition: transform 0.3s ease, filter 0.3s ease;
}

.piedra:hover,
.papel:hover,
.tijera:hover {
    transform: scale(1.1);
    filter: brightness(1.2);
}

.listo,
.empate,
.ganaste,
.perdiste {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    font-size: 3rem;
    font-weight: bold;
    text-align: center;
    font-family: 'Press Start 2P', cursive;
}

.listo {
    background-color: green;
    color: rgb(255, 255, 255);
}

.empate {
    background-color: grey;
    color: rgb(255, 255, 255);
}

.ganaste {
    background-color: green;
    color: rgb(255, 255, 255);
}

.perdiste {
    background-color: red;
    color: rgb(255, 255, 255);
}

@media (max-width: 600px) {
    .contenedor {
        grid-template-columns: repeat(3, 1fr);
        margin-top: 40px;
    }

    .piedra,
    .papel,
    .tijera {
        max-width: 100px;
    }

    .listo,
    .empate,
    .ganaste,
    .perdiste {
        font-size: 2rem;
    }
}
</style>
