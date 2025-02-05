<script setup>
import { reactive, ref, computed, watch, onMounted, onUnmounted } from 'vue';
import socketManager from '../static/socket'; 

const yo= computed(() => $nuxt.$store.state);
const socket= socketManager.getSocket(); 
const claveSala = computed(() => $nuxt.$store.state.roomKey);

const props = defineProps({
    jugadores: {
        type: Object,
        required: true,
    },


},)





const Canastas = ref(0)
const valorCanasta = ref(0)
const index = ref(0)

const info = reactive({ fallo: false, canasta: 0, racha: false })


const animaciones = reactive({
    encestar: false, fallo1: false, fallo2: false, fallo3: false, fallo4: false, fallo5: false, temblor1: false,
    temblor2: false, llamas: false, tiro_en_llamas: false

})


function apagarAnimaciones(interrumptor) {

    animaciones.encestar = false;
    animaciones.fallo1 = false;
    animaciones.fallo2 = false;
    animaciones.fallo3 = false;
    animaciones.fallo4 = false;
    animaciones.fallo5 = false;
    animaciones.tiro_en_llamas = false;

    if (interrumptor == 3) {

        animaciones.temblor1 = true


    }
    if (interrumptor == 4) {
        animaciones.temblor2 = true;



    }
    if (interrumptor >= 5) {
        animaciones.llamas = true
    }


}

function reiniciarInfo() {

    info.canasta = 0;
    info.fallo = false;
    info.racha = false;
}





const progress = ref(0.0);
const color = ref('');
const aux = ref(0);
let idTemporizador = null;

const emit = defineEmits();

const divContenedor = ref(null);

const posicion = reactive([{top:0, left:0},{top:0, left:0},{top:0, left:0},{top:0, left:0}]);
 


const j1 = ref(null);

socket.on('moveBasket', (data,player) => {
  
  if(data==='a'){
    obtenerPosicion(player-1);
  }
 
});

function obtenerPosicion(num) {
   


      const div = divContenedor.value;
      if (div) {
        const rect = div.getBoundingClientRect(); // Obtener las coordenadas
        // Guardar las coordenadas
        posicion[num].top= -450   // Ajustamos con scrollY
        switch (num) {
        case 1:
           posicion[num].left= rect.left-(rect.left/1.8)
            break;
        case 0:
          posicion[num].left= rect.left*1.080;
            break;
            case 2:
          posicion[num].left= rect.left-(rect.left*1.19);
            break;
             case 3:
          posicion[num].left= rect.left-(rect.left*1.82);
            break;
        default:
            break;
    }
         setTimeout(() => {
            posicion[num].top= -400 
         }, 400);
         setTimeout(() => {
            posicion[num].top= 0; 
            posicion[num].top=0;
         }, 1000);
      }
    };
</script>

<template>
    <main id="main_arcade">

            <RouterLink to="/jugar">
                <img style="right: inherit;" src="/volver.png" alt="Volver" class="imagen_volver">
            </RouterLink>

            <img id="canasta" ref="divContenedor"
             src="/tablero.png" alt="">








        <div class="tiempo_fuera">
            <div class="tiempo">25 </div>
        </div>

 

        <div class="div_padre">
          <div v-if="props.jugadores[0].in" @click="obtenerPosicion(0)" ref="j1" id="j1" class="div">
            <img id="balon1" class="balon"  :style="{ top: posicion[0].top + 'px', left: posicion[0].left + 'px' }"  src="/balon.png" alt="">
            <div class="jugador">{{ props.jugadores[0].username }}</div>  
        </div>
          <div v-if="props.jugadores[1].in" @click="obtenerPosicion(1)"  ref="j2" id="j2" class="div">  
            <img id="balon1" class="balon"  :style="{ top: posicion[1].top + 'px', left: posicion[1].left + 'px' }"  src="/balon.png" alt="">
            <div class="jugador">{{ props.jugadores[1].username }}</div>  
        </div>
            <div v-if="props.jugadores[2].in" @click="obtenerPosicion(2)" ref="j3" id="j3" class="div">
              <img id="balon1" class="balon"  :style="{ top: posicion[2].top + 'px', left: posicion[2].left + 'px' }"  src="/balon.png" alt="">
              <div class="jugador">{{ props.jugadores[2].username }}</div>  
            </div>
            <div v-if="props.jugadores[3].in" @click="obtenerPosicion(3)" ref="j4" id="j4" class="div">
              <img id="balon1" class="balon"  :style="{ top: posicion[3].top + 'px', left: posicion[3].left + 'px' }"  src="/balon.png" alt="">
              <div class="jugador">{{ props.jugadores[3].username }}</div>  
            </div>

        </div>


    </main>
</template>

<style scoped>
.jugador{
    display: grid; 
    grid-column: 2;
    margin-top: 10px;
}
.div_padre {
    display: grid;
    grid-column: span 3;
    gap: 20px;
    width: 100%;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    justify-items: center;
    /* Centra los elementos horizontalmente */
    align-items: center;
   
}

.div {
    width: 200px;
    height: 100px;
    margin-bottom: 30px;
    margin-top: 30px;
    border: 1px solid black;
    border-radius: 10%;
    color: #d59b3d;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    font-family: 'Press Start 2P', cursive;
    background-color: #1c1c1c;
    position: relative;
    
    

}

@keyframes encestar {
    0% {
        transform: translateY(0);
        /* Empieza en la parte inferior */

    }

    50% {

        transform: translateY(-300px) scale(0.8) rotate(-90deg);

    }

    100% {
        transform: translateY(-200px) scale(0.4) rotate(-180deg);
        /* Sube 200px hacia arriba */

    }
}


@keyframes fallo1 {
    0% {
        transform: translateY(0);
        /* Empieza en la parte inferior */
    }

    50% {

        transform: translateY(-300px) translateX(-100px) scale(0.8) rotate(-90deg);

    }

    100% {
        transform: translateY(-200px) translateX(-150px) scale(0.4) rotate(-180deg);
        /* Sube 200px hacia arriba */
    }
}

.q-btn:disabled {
    opacity: 1 !important;
    /* Elimina la opacidad */

}
 

.animacion_encestar {


    animation: encestar 0.5s linear;

}

.animacion_fallo1 {
    animation: fallo1 0.5s linear;
}
 
.imagen_volver {
    position: fixed;
    top: 20px;
    left: 20px;
    width: 40px;
    border: 2px solid white;
    border-radius: 5px;
}



.balon {
    height: 70px;
    width: 70px;
    border-radius: 50%;
    left:0px;
    top:0px;
    transition: top 0.5s ease, left 0.7s ease;
    position: absolute;
     
}

 


#main_arcade {
    max-height: 100svh;
    background-image: url("/parque.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;


}

.body_arcade {
    grid-column: span 3;
    text-align: center;
    grid-row: span 2;

    max-height: 80svh;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;




}

.arcade {
    display: grid;
    grid-column: span 3;
    grid-row: 3;

}


@font-face {
    font-family: 'DS-Digital';
    src: url('/DS-DIGI.TTF') format('truetype');
}


.titul {

    grid-column: span 3;
    font-size: 50px;
    border: 1px solid black;
    background-color: white;
    text-align: center
}

.tiempo_fuera {

    grid-column: 2;
    place-items: center;



}

.tiempo {
    border: 1px solid black;
    font-size: 30px;
    font-family: 'DS-Digital';
    text-shadow: 0 0 5px #f00, 0 0 10px #f00, 0 0 20px #f00, 0 0 30px #f00, 0 0 40px #f00, 0 0 50px #f00;
    color: rgb(255, 112, 112);
    background-color: black;
    grid-column: 2;
    place-items: center;
    border: 5px solid rgb(70, 70, 70);
    width: 70px;
    margin: 0 auto;
    text-align: center;


}

.problema {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    text-align: center
}

.respuestas {
    display: grid;
    grid-column: span 3;
    grid-template-columns: 1fr 1fr;

}

.botones_partida {

    width: 100%;
    font-size: 50px;
    height: 50px;
}

.barra {
    height: 20px;
    grid-column: span 2;

}
</style>
