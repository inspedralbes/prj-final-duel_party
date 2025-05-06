<template>
    <main>


        <div class="botones" v-if="menu === 0">
            <div class="boton" :style="{ backgroundColor: colores[color.b1].color }" @click="enviar(1)"></div>
            <div class="boton" :style="{ backgroundColor: colores[color.b2].color }" @click="enviar(2)"></div>
           

        </div>

        <div v-if="menu === 1">
            <div class="main-screen">
                <h1 class="game-title">¡Acierta el Color!</h1>
                <div class="color-challenge" v-if="tiempo">
                 <span style="border:1px solid black">{{ tiempoRestante}}</span>
                </div>
                <div :style="{ color: color.color }" class="color-challenge" v-else>
                   {{ color.colores}}
                </div>
                
                <div class="players-container">
                    <div class="player-info">
                        <h3>Jugador 1</h3>
                        <div class="score">0</div>
                    </div>
                    <div class="player-info">
                        <h3>Jugador 2</h3>
                        <div class="score">0</div>
                    </div>
                </div>
            </div>


        </div>
      
    </main>
</template>

<script setup>

import { reactive, ref,computed } from 'vue'; 
import socketManager from '../static/socket'
const socket = socketManager.getSocket(); 
const emit = defineEmits();
// 0 = jugador, 1 = pantalla
const menu = ref(1);
const yo = computed(() => $nuxt.$store.state);
const tiempo=ref(true);

const color= reactive({
    color: "",
    colores:"",
    b1:9,
    b2:9
});
const colores = reactive([
    { color: "red",colores:"rojo" },
    { color: "blue",colores:"azul" },
    { color: "green",colores:"verde" },
    { color: "pink",colores:"rosa" },
    { color: "black",colores:"negro" },
    { color: "purple",colores:"morado" },
    { color: "orange",colores:"naranja" },
    { color: "brown",colores:"marron" },
    { color: "gray",colores:"gris" },
    { color: "white",colores:"blanco" },
]);
  

let temporizador;
if(yo.value.username!=="host"){
menu.value=0;
}else{
    temporizador= setInterval(actualizarTemporizador, 1000);
}


function asignarColor(){
    //genera numero del 1 al 9
    let colorEscogido = Math.floor(Math.random() * 9);
    let aux1 = Math.floor(Math.random() * 2)+1;
    
    //guarda el color
    color['b' + aux1]=colorEscogido;
    color.color = colores[colorEscogido].color;
    
    let textoEscodigo
    // genera numero del 1 al 9 hasta que no coincida con colorEscogido
    do{
       textoEscodigo = Math.floor(Math.random() * 9);
    }
    
    while(colorEscogido==textoEscodigo) 
    //guarda el texto
    color.colores = colores[textoEscodigo].colores;

    let aux2 
    do{
        aux2 = Math.floor(Math.random() * 2)+1;
    }
    
    while(aux1==aux2);
    color['b' + aux2]=textoEscodigo;


    
   socket.emit('enviar_colores', yo.value.roomKey,color);

   

    
}

socket.on('recibir_colores', (data) => {
  color.b1=data.b1;
  color.b2=data.b2;
  color.colores=data.colores;
  color.color=data.color;
  
});


function enviar(data){
    switch(data){
        case 1:
            
            break;
        case 2:
            break;
    }

}


// temporizador
let tiempoRestante = ref(5);

function actualizarTemporizador() {
  if (tiempoRestante.value <= 0) {
    clearInterval(temporizador);
    asignarColor();
    tiempo.value=false;
  } else {
    tiempoRestante.value--;
  }
}



function reiniciarTemporizador() {

  clearInterval(temporizador);       // Detiene el temporizador actual
  tiempoRestante.value = 5;          // Reinicia el valor del tiempo
  temporizador = setInterval(actualizarTemporizador, 1000);  // Vuelve a iniciar el temporizador
}


</script>
<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
main {
    background-color: rgb(49, 49, 49);
    font-family: 'Press Start 2P', cursive;
    height: 100vh;
    width: 100vw;
}

.botones {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: grid;
    grid-template-columns: repeat(2, 1fr);
}

.boton {
    width: 15vw;
    height: 15vw;
    border: 1px solid black;
    border-radius: 50%;
    margin-right: 50px;
    box-shadow: 1px 1px 10px black;
}




.main-screen {
    width: 1000px;
    max-width: 800px;
    margin: 50px auto;
    padding: 30px;
    border-radius: 20px;
    background-color: #fff;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.game-title {
    font-size: 36px;
    margin-bottom: 30px;
    color: #333;
}

.color-challenge {
    font-size: 48px;
    font-weight: bold;
    padding: 30px;
    border-radius: 15px;
    background-color: #f8f8f8;
    margin-bottom: 30px;
    
    
}

.timer {
    font-size: 24px;
    margin-top: 20px;
    color: #666;
}

.game-status {
    font-size: 30px;
    font-weight: bold;
    margin-top: 20px;
    min-height: 45px;
    color: #333;
}

.players-container {
    display: flex;
    justify-content: space-around;
    margin-top: 40px;
}

.player-info {
    text-align: center;
    padding: 15px;
    border-radius: 10px;
    background-color: #f8f8f8;
    min-width: 150px;
}

.player-info h3 {
    font-size: 20px;
    margin-bottom: 5px;
}

.player-info .score {
    font-size: 24px;
    font-weight: bold;
}
</style>
