<script setup>
import { reactive, ref, computed, watch, onMounted, onUnmounted } from 'vue';
import socketManager from '../static/socket';  
import Win from './win.vue';
const yo= computed(() => $nuxt.$store.state);
const socket= socketManager.getSocket(); 
const claveSala = computed(() => $nuxt.$store.state.roomKey);
const Canastas = ref(0)
const valorCanasta = ref(0)
const index = ref(0)

const info = reactive({ fallo: false, canasta: 0, racha: false })

const progress = ref(0.0);
const color = ref('');
const aux = ref(0);
let idTemporizador = null;

const emit = defineEmits();

const divContenedor = ref(null);

const posicion = reactive([{top:0, left:0},{top:0, left:0},{top:0, left:0},{top:0, left:0}]);
 

setTimeout(() => {
   winner.value=ganador();
    setTimeout(() => {
        emit('acabarJuego',winner.value);
    }, 3000);
    
    
    
}, 10000);

const winner= ref(-1);
const j1 = ref(null);

socket.on('moveBasket', (data,player) => {
  console.log(data);
  if(data==='a'){
    obtenerPosicion(player-1);
  }
 
});
const aro = ref(2);
const balon = ref(3);
//const animaciones = reactive({a1:false,a2:false,a3:false,a4:false
const animaciones = reactive({a0:false,a1:false,a2:false,a3:false,
                              b0:3,b1:3,b2:3,b3:3,
                              c0:2,c1:2,c2:2,c3:2,
                              p0:0,p1:0,p2:0,p3:0

});


function ganador(){
  const posiciones = { p0: animaciones.p0, p1: animaciones.p1, p2: animaciones.p2, p3: animaciones.p3 };

  // Encontrar el valor máximo
  const maxValor = Math.max(...Object.values(posiciones));

  // Encontrar la clave asociada al valor máximo
  const claveMax = Object.keys(posiciones).find(key => posiciones[key] === maxValor);

  // Extraer solo el número de la clave (p0 → 0, p1 → 1, etc.)
  return claveMax ? parseInt(claveMax.replace('p', ''), 10) : null;
}




function obtenerPosicionC(num,puntos){
    
    animaciones[`a${num}`]=true;
    console.log(animaciones[`a${num}`]);
    setTimeout(() => {
            
        animaciones[`c${num}`]=3;
        animaciones[`b${num}`]=2;
         }, 500);
    setTimeout(() => {
        animaciones[`a${num}`]=false;
        console.log(animaciones[`a${num}`]);
        animaciones[`c${num}`]=2;
        animaciones[`b${num}`]=3;
        animaciones[`p${num}`]+=puntos;
    }, 1000);
    
}


function obtenerPosicion(num){
    console.log(markerPosition.value);
    if (markerPosition.value >= 40 && markerPosition.value <= 60) {
    obtenerPosicionC(num,3);
  } else if ((markerPosition.value >= 0 && markerPosition.value <= 20) || (markerPosition.value >= 80 && markerPosition.value <= 100)  ) {
    obtenerPosicionC(num,2);
  } else {
     
  }

}

const markerPosition = ref(0);

const result = ref(null); 
const resultMessage = ref('');
 

const moveMarker = () => {
  let direction = 1; 
  const interval = setInterval(() => {
    if (markerPosition.value >= 100) {
      direction = -1;
    } else if (markerPosition.value <= 0) {
      direction = 1; 
    }

    markerPosition.value += direction;

  }, 10);
};

moveMarker();

</script>

<template>
    <main id="main_arcade">

            <RouterLink to="/jugar">
                <img style="right: inherit;" src="/volver.png" alt="Volver" class="imagen_volver">
            </RouterLink>
           


         
            

      

 

        <div class="div_padre">
          <win class="abosolute" v-if="winner>=0" :data="yo.jugadores[winner].username"/>
          <div v-if="yo.jugadores[0].in" @click="obtenerPosicion(0)" :class="{ 'disabled': animaciones.a0 }"  ref="j1" id="j1" class="div">
            <div class="container">
  
    <div class="progress-bar">
    
      <div class="highlight-start"></div>
      <div class="highlight-range"></div>
      <div class="highlight-end"></div>

      
      <div
        class="marker"
        :style="{ left: markerPosition + '%' }"
      ></div>
    </div>
   
    <p v-if="result !== null">{{ resultMessage }}</p>
  </div>
  
            <div class="div_canasta"> 
                <div class="tiempo_fuera">
            <div class="tiempo"> {{ animaciones.p0 }} </div>
            </div> <img src="/aro.png" :style="{ zIndex: animaciones.c0 }"  class="aro" alt="" srcset=""> <img class="canasta" src="/tablero.png" alt=""></div>
         
            <img id="balon1" class="balon" :class="{ 'animacion_encestar': animaciones.a0}"  :style="{zIndex: animaciones.b0 }"  src="/balon.png" alt="">
            <div class="jugador">{{ yo.jugadores[0].username }}</div>  
        </div>
        
          <div v-if="yo.jugadores[1].in" @click="obtenerPosicion(1)" :class="{ 'disabled': animaciones.a1 }"   ref="j2" id="j2" class="div">  
            <div class="container">
   
    <div class="progress-bar">
    
      <div class="highlight-start"></div>
      <div class="highlight-range"></div>
      <div class="highlight-end"></div>

     
      <div
        class="marker"
        :style="{ left: markerPosition + '%' }"
      ></div>
    </div>

  
   

   
    <p v-if="result !== null">{{ resultMessage }}</p>
  </div>
            <div class="div_canasta"> 
                <div class="tiempo_fuera">
            <div class="tiempo"> {{ animaciones.p1 }} </div>
            </div> 
                <img src="/aro.png" :style="{ zIndex: animaciones.c1}"  class="aro" alt="" srcset=""> <img class="canasta" src="/tablero.png" alt=""></div>
            <img id="balon1" class="balon" :class="{ 'animacion_encestar': animaciones.a1}"  :style="{zIndex: animaciones.b1 }"  src="/balon.png" alt="">
            <div class="jugador">{{ yo.jugadores[1].username }}</div>  
        </div>
            <div v-if="yo.jugadores[2].in" @click="obtenerPosicion(2)" :class="{ 'disabled': animaciones.a2 }"  ref="j3" id="j3" class="div">
                <div class="container">
   
    <div class="progress-bar">
     
      <div class="highlight-start"></div>
      <div class="highlight-range"></div>
      <div class="highlight-end"></div>

    
      <div
        class="marker"
        :style="{ left: markerPosition + '%' }"
      ></div>
    </div>

  
   

  
    <p v-if="result !== null">{{ resultMessage }}</p>
  </div>
                <div class="div_canasta"> 
                    <div class="tiempo_fuera">
            <div class="tiempo"> {{ animaciones.p2 }} </div>
            </div> 
                    <img src="/aro.png" :style="{ zIndex: animaciones.c2 }"  class="aro" alt="" srcset=""> <img class="canasta" src="/tablero.png" alt=""></div>
                <img id="balon1" class="balon" :class="{ 'animacion_encestar': animaciones.a2}"  :style="{zIndex: animaciones.b2 }"  src="/balon.png" alt="">
              <div class="jugador">{{ yo.jugadores[2].username }}</div>  
            </div>
            <div v-if="yo.jugadores[3].in" @click="obtenerPosicion(3)" :class="{ 'disabled': animaciones.a3 }"  ref="j4" id="j4" class="div">
                <div class="container">
   
    <div class="progress-bar">
    
      <div class="highlight-start"></div>
      <div class="highlight-range"></div>
      <div class="highlight-end"></div>

     
      <div
        class="marker"
        :style="{ left: markerPosition + '%' }"
      ></div>
    </div>

    
   

   
    <p v-if="result !== null">{{ resultMessage }}</p>
  </div>
                <div class="div_canasta"> 
                    <div class="tiempo_fuera">
            <div class="tiempo"> {{ animaciones.p3 }} </div>
            </div> <img src="/aro.png" :style="{ zIndex: animaciones.c3 }"  class="aro" alt="" srcset=""> <img class="canasta" src="/tablero.png" alt=""></div>
                <img id="balon1" class="balon" :class="{ 'animacion_encestar': animaciones.a3}"  :style="{zIndex: animaciones.b3 }"  src="/balon.png" alt="">
              <div class="jugador">{{ yo.jugadores[3].username }}</div>  
            </div>

        </div>


    </main>
</template>

<style scoped>

@keyframes 
 encestar {
    0% {
        transform: translateY(0); /* Empieza en la parte inferior */
         
    } 50%{

       transform: translateY(-500px)  scale(0.8) rotate(-90deg);
      
    }
    75% {
        transform: translateY(-400px) scale(0.7) rotate(-180deg); /* Sube 200px hacia arriba */
         
    }
    100% {
        transform: translateY(-300px) scale(0.6) rotate(-180deg); /* Sube 200px hacia arriba */
         
    }
  }
  .disabled {
  pointer-events: none;
   
}

.abosolute{
  position: absolute;
  top: -20%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}
.animacion_encestar {
    animation: encestar 1s linear;
}

.jugador{
    display: grid; 
    grid-column: 1;
    margin-top: 10px;
    margin-left: 10px;
}
 
.div_padre_canasta {
    display: grid;
    position: fixed;
    top: 0;
    margin-top: 50px;
    grid-column: span 3;
    gap: 20px;
    width: 100%;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    justify-items: center;
    /* Centra los elementos horizontalmente */
    align-items: center;
   
   
}
.div_canasta{

    width: fit-content;
    margin-top: -480px;
} 
.aro{
    position: absolute;
    width: 80px;
    margin-left: 60px;
    margin-top: 115px;
     
    
}
.canasta{
    width: 200px;
}
.div_padre {
    display: grid;
    position: fixed;
    bottom: 0;
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


.q-btn:disabled {
    opacity: 1 !important;
    /* Elimina la opacidad */

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
    height: 90px;
    width: 90px;
    border-radius: 50%;
    left:0px;
    top:0px;
    margin-left: 55px;
    transition: top 0.5s ease, left 0.7s ease;
    position: absolute;
    
     
}

 


#main_arcade {
    height: 100svh;
    width: 100vw;
    background-image: url("/parque.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;


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

    
    position: absolute;
    margin-left: 60px;

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



.container {
  width: 300px;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  margin-top: -150%;
  margin-left: -25%;
}

.progress-bar {
  width: 100%;
  height: 30px;
  background-color: #ddd;
  position: relative;
  margin-bottom: 20px;
}

.highlight-range {
  position: absolute;
  top: 0;
  left: 40%;
  width: 20%; /* De 45% a 65% */
  height: 100%;
  background-color: rgba(0, 0, 255); /* Fondo amarillo translúcido */
  pointer-events: none; /* Para que no interfiera con el marcador */
}
.highlight-start {
  position: absolute;
  top: 0;
  left: 0%;
  width: 20%; /* De 45% a 65% */
  height: 100%;
 background-color: rgba(255, 0,0); /* Fondo amarillo translúcido */
  pointer-events: none; /* Para que no interfiera con el marcador */
}
.highlight-end {
  position: absolute;
  top: 0;
  left: 80%;
  width: 20%; /* De 45% a 65% */
  height: 100%;
  background-color: rgba(255, 0,0); /* Fondo amarillo translúcido */
  pointer-events: none; /* Para que no interfiera con el marcador */
}

.marker {
  width: 20px; /* El tamaño del "palo" */
  height: 30px;
  background-color: green; /* Color del marcador */
  position: absolute;
  top: 0;
}

button {
  margin-top: 20px;
}
</style>
