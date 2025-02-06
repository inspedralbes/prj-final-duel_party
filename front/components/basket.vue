<script setup>
import { reactive, ref, computed, watch, onMounted, onUnmounted } from 'vue';
import socketManager from '../static/socket'; 

const yo= computed(() => $nuxt.$store.state);
const socket= socketManager.makeSocket(); 
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
const aro = ref(2);
const balon = ref(3);
//const animaciones = reactive({a1:false,a2:false,a3:false,a4:false
const animaciones = reactive({a0:false,a1:false,a2:false,a3:false,
                              b0:3,b1:3,b2:3,b3:3,
                              c0:2,c1:2,c2:2,c3:2

});


function obtenerPosicion(num){
    
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
        
    }, 1000);
    
}

</script>

<template>
    <main id="main_arcade">

            <RouterLink to="/jugar">
                <img style="right: inherit;" src="/volver.png" alt="Volver" class="imagen_volver">
            </RouterLink>



          <!--  <div class="div_padre_canasta">
               
               <div class="div_canasta"> <img src="/aro.png"  class="aro" alt="" srcset=""> <img class="canasta" src="/tablero.png" alt=""></div>
               <div class="div_canasta"> <img src="/aro.png"  class="aro" alt="" srcset=""> <img class="canasta" src="/tablero.png" alt=""></div>
               <div class="div_canasta"> <img src="/aro.png"  class="aro" alt="" srcset=""> <img class="canasta" src="/tablero.png" alt=""></div>

            </div>-->
            

        <div class="tiempo_fuera">
            <div class="tiempo">25 </div>
        </div>

 

        <div class="div_padre">
        
          <div v-if="props.jugadores[0].in" @click="obtenerPosicion(0)" ref="j1" id="j1" class="div">
            <div class="div_canasta"> <img src="/aro.png" :style="{ zIndex: animaciones.c0 }"  class="aro" alt="" srcset=""> <img class="canasta" src="/tablero.png" alt=""></div>
            <img id="balon1" class="balon" :class="{ 'animacion_encestar': animaciones.a0}"  :style="{zIndex: animaciones.b0 }"  src="/balon.png" alt="">
            <div class="jugador">{{ props.jugadores[0].username }}</div>  
        </div>
        
          <div v-if="props.jugadores[1].in" @click="obtenerPosicion(1)"  ref="j2" id="j2" class="div">  
            <div class="div_canasta"> <img src="/aro.png" :style="{ zIndex: animaciones.c1}"  class="aro" alt="" srcset=""> <img class="canasta" src="/tablero.png" alt=""></div>
            <img id="balon1" class="balon" :class="{ 'animacion_encestar': animaciones.a1}"  :style="{zIndex: animaciones.b1 }"  src="/balon.png" alt="">
            <div class="jugador">{{ props.jugadores[1].username }}</div>  
        </div>
            <div v-if="props.jugadores[2].in" @click="obtenerPosicion(2)" ref="j3" id="j3" class="div">
                <div class="div_canasta"> <img src="/aro.png" :style="{ zIndex: animaciones.c2 }"  class="aro" alt="" srcset=""> <img class="canasta" src="/tablero.png" alt=""></div>
                <img id="balon1" class="balon" :class="{ 'animacion_encestar': animaciones.a2}"  :style="{zIndex: animaciones.b2 }"  src="/balon.png" alt="">
              <div class="jugador">{{ props.jugadores[2].username }}</div>  
            </div>
            <div v-if="props.jugadores[3].in" @click="obtenerPosicion(3)" ref="j4" id="j4" class="div">
                <div class="div_canasta"> <img src="/aro.png" :style="{ zIndex: animaciones.c3 }"  class="aro" alt="" srcset=""> <img class="canasta" src="/tablero.png" alt=""></div>
                <img id="balon1" class="balon" :class="{ 'animacion_encestar': animaciones.a3}"  :style="{zIndex: animaciones.b3 }"  src="/balon.png" alt="">
              <div class="jugador">{{ props.jugadores[3].username }}</div>  
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
