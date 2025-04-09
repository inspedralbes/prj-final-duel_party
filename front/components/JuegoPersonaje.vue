<template>
    <div class="juego-container">
        <div class="carta-personaje" :class="{ 'animacion-salida': animacionSalida }">
            <button class="boton-volver" @click="$emit('volver')">← VOLVER</button>
                <div class="personaje-nombre">{{ personajeActual.nombre }}</div>
            
        </div>

        <div class="estado-inclinacion">
            <div v-if="mostrarMensaje" class="mensaje" :class="mensajeClase">
                {{ mensaje }}
            </div>
        </div>
    </div>
</template>

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
    padding: 16px;
    box-sizing: border-box;
    justify-content: center;
    position: fixed;
    top: 0;
}

.boton-volver {
    position: absolute;
    top: 8px;
    left: 8px;
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
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 600px;
    transition: transform 0.5s, opacity 0.5s;
}



.personaje-nombre {
    color: #ff0;
    font-size: 60px;
    text-shadow: 3px 3px 0 #f00;
    text-align: center;
    padding: 0 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%; /* Asegura que ocupe toda la altura del contenedor */
    width: 100%;  /* Asegura que ocupe todo el ancho */
    margin: 0;
    
    left:0;
}



.personaje-instruccion {
    color: #0f0;
    font-size: 3vw;
    animation: parpadeo 1s infinite;
    margin-top: auto;
    text-align: center;
    max-width: 100%;
    padding: 0 15px;
    line-height: 1.4;
}

.estado-inclinacion {
    position: fixed;
    top: 50%;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    pointer-events: none;
}

.mensaje {
    padding: 16px 24px;
    border-radius: 8px;
    font-size: 18px;
    animation: aparecer 0.3s;
}

.correcto {
    background-color: rgba(0, 200, 0, 0.8);
    color: white;
}

.pasar {
    background-color: rgba(200, 200, 0, 0.8);
    color: black;
}

@keyframes parpadeo {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.3;
    }
}

@keyframes aparecer {
    from {
        opacity: 0;
        transform: scale(0.8);
    }

    to {
        opacity: 1;
        transform: scale(1);
    }
}




html, body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
}

</style>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';

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
    'PERSONAJES HISTÓRICOS': [
        { id: 1, nombre: 'Albert Einstein', pista: 'Físico famoso por la teoría de la relatividad' },
        { id: 2, nombre: 'Frida Kahlo', pista: 'Pintora mexicana famosa por sus autorretratos' },
        { id: 3, nombre: 'Nelson Mandela', pista: 'Líder contra el apartheid en Sudáfrica' },
        { id: 4, nombre: 'Marie Curie', pista: 'Descubrió la radioactividad' },
        { id: 5, nombre: 'Napoleón Bonaparte', pista: 'Emperador francés de baja estatura' }
    ],
    'PERSONAJES DE FICCIÓN': [
        { id: 1, nombre: 'Harry Potter', pista: 'Mago con una cicatriz en forma de rayo' },
        { id: 2, nombre: 'Darth Vader', pista: 'Villano de Star Wars con máscara negra' },
        { id: 3, nombre: 'Wonder Woman', pista: 'Superheroína amazona de DC Comics' },
        { id: 4, nombre: 'Sherlock Holmes', pista: 'Detective con gran capacidad deductiva' },
        { id: 5, nombre: 'Walter White', pista: 'Profesor de química que se vuelve narcotraficante' }
    ],
    'CIENTÍFICOS': [
        { id: 1, nombre: 'Stephen Hawking', pista: 'Físico en silla de ruedas que estudió agujeros negros' },
        { id: 2, nombre: 'Neil deGrasse Tyson', pista: 'Astrofísico y divulgador científico' },
        { id: 3, nombre: 'Ada Lovelace', pista: 'Considerada la primera programadora' },
        { id: 4, nombre: 'Isaac Newton', pista: 'Descubrió la gravedad con una manzana' },
        { id: 5, nombre: 'Jane Goodall', pista: 'Primatóloga experta en chimpancés' }
    ]
};

const categoriaActual = computed(() => props.categoria.nombre);
const personajes = computed(() => personajesPorCategoria[categoriaActual.value] || []);
const indiceActual = ref(0);
const personajeActual = computed(() => personajes.value[indiceActual.value] || { nombre: 'Fin del juego', pista: 'Has visto todos los personajes' });
const aciertos = ref(0);
const mensaje = ref('');
const mostrarMensaje = ref(false);
const mensajeClase = ref('');
const animacionSalida = ref(false);

let handleDeviceMotion = null;

const siguientePersonaje = () => {
    animacionSalida.value = true;
    setTimeout(() => {
        indiceActual.value = (indiceActual.value + 1) % personajes.value.length;
        animacionSalida.value = false;
    }, 500);
};

const registrarAcierto = () => {
    aciertos.value++;
    mostrarMensaje.value = true;
    mensaje.value = '¡CORRECTO!';
    mensajeClase.value = 'correcto';

    setTimeout(() => {
        mostrarMensaje.value = false;
        siguientePersonaje();
    }, 1500);
};

const saltarPersonaje = () => {
    mostrarMensaje.value = true;
    mensaje.value = 'PASANDO...';
    mensajeClase.value = 'pasar';

    setTimeout(() => {
        mostrarMensaje.value = false;
        siguientePersonaje();
    }, 1000);
};

onMounted(() => {
    if (window.DeviceMotionEvent) {
        handleDeviceMotion = (event) => {
            const beta = event.rotationRate.beta;
            const threshold = 30;

            if (beta > threshold) registrarAcierto();
            else if (beta < -threshold) saltarPersonaje();
        };

        if (typeof DeviceMotionEvent.requestPermission === 'function') {
            DeviceMotionEvent.requestPermission()
                .then(permissionState => {
                    if (permissionState === 'granted') {
                        window.addEventListener('devicemotion', handleDeviceMotion);
                    }
                })
                .catch(console.error);
        } else {
            window.addEventListener('devicemotion', handleDeviceMotion);
        }
    }
});

onUnmounted(() => {
    if (handleDeviceMotion) {
        window.removeEventListener('devicemotion', handleDeviceMotion);
    }
});
</script>
