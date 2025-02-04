<template>
        <div class="contenedor">
            <canvas id="confetti-canvas"></canvas>

            <div class="cubito" @click="girarDado">

                <div class="cara-cubo front">
                    <div class="dentro">
                        <span class="punto"></span>
                    </div>
                </div>

                <div class="cara-cubo back">
                    <div class="dentro">
                        <span class="punto"></span>
                        <span class="punto"></span>
                        <span class="punto"></span>
                        <span class="punto"></span>
                        <span class="punto"></span>
                        <span class="punto"></span>
                    </div>
                </div>

                <div class="cara-cubo left">
                    <div class="dentro">
                        <span class="punto"></span>
                        <span class="punto"></span>
                        <span class="punto"></span>
                    </div>
                </div>


                <div class="cara-cubo right">
                    <div class="dentro">
                        <span class="punto"></span>
                        <span class="punto"></span>
                        <span class="punto"></span>
                        <span class="punto"></span>
                    </div>
                </div>

                <div class="cara-cubo top">
                    <div class="dentro">
                        <span class="punto"></span>
                        <span class="punto"></span>
                        <span class="punto"></span>
                        <span class="punto"></span>
                        <span class="punto"></span>
                    </div>
                </div>

                <div class="cara-cubo bottom">
                    <div class="dentro">
                        <span class="punto"></span>
                        <span class="punto"></span>
                    </div>
                </div>
            </div>
        </div>
        <!--<button @click="tirarEstrellas">Tirar Confeti</button>-->
        <!--<button id="startButton" @click="requestPermission">Permitir acceso a sensores</button> -->
</template>

<script setup> 
import { ref, onMounted,watch } from 'vue';
import confetti from 'canvas-confetti';
import socketManager from '../static/socket';
const socket=socketManager.getSocket(); 


socket.on('move', (data,username) => {
  
  if(data==='a') 
  girarDado();
 

});
 
const valorDado = ref(1);
const time = 2;

const agitar = new Audio('/effects/agitar.mp3');
const resul = new Audio('/effects/resultado.wav');
const emit = defineEmits(['resultado']);

let confettiInstance;
const shakeThreshold = 15;
const lastAcceleration = ref({ x: 0, y: 0, z: 0 });

const tirarEstrellas = () => {
    const defaults = {
        spread: 360,
        ticks: 50,
        gravity: 0,
        decay: 0.94,
        startVelocity: 30,
        colors: ["FFE400", "FFBD00", "E89400", "FFCA6C", "FDFFB8"],
    };

    function shoot() {
        confetti({
            ...defaults,
            particleCount: 40,
            scalar: 1.2,
            shapes: ["star"],
        });

        confetti({
            ...defaults,
            particleCount: 10,
            scalar: 0.75,
            shapes: ["circle"],
        });
    }

    setTimeout(shoot, 0);
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
};



let dadoTimeout1;
let dadoTimeout2;

const girarDado = () => {
    clearTimeout(dadoTimeout1);
    clearTimeout(dadoTimeout2);

    const cubito = document.querySelector('.cubito');

  //  window.navigator.vibrate([1000]);
    agitar.currentTime = 0;
    agitar.play();

    cubito.style.transition = '';
      cubito.style.transform = `translateY(400px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;

    dadoTimeout1 = setTimeout(() => {
        cubito.style.transition = `transform ${time}s`;
        valorDado.value = Math.floor((Math.random() * 6) + 1);
        console.log(`Valor:${valorDado.value}`);
        
        
        
        switch (valorDado.value) {
          case 1:
              cubito.style.transform = `translateY(400px) rotateX(3600deg) rotateY(3600deg) rotateZ(3600deg)`;
              break;
          case 2:
            cubito.style.transform = `translateY(400px) rotateX(4410deg) rotateY(3600deg) rotateZ(3600deg)`;

            break;
            case 3:
                cubito.style.transform = `translateY(400px) rotateX(3600deg) rotateY(4410deg) rotateZ(3600deg)`;
                
                break;
                case 4:
                    cubito.style.transform = `translateY(400px) rotateX(3600deg) rotateY(2430deg) rotateZ(3600deg)`;
                    
            break;
            case 5:
            cubito.style.transform = `translateY(400px) rotateX(2430deg) rotateY(3600deg) rotateZ(3600deg)`;
            
            break;
            case 6:
                cubito.style.transform = `translateY(400px) rotateX(3600deg) rotateY(1980deg) rotateZ(3600deg)`;
                
                break;
            }
        }, 100);
        
        dadoTimeout2 = setTimeout(() => {
            resul.currentTime = 0;
            resul.play();
            tirarEstrellas();
            
            emit('resultado', valorDado.value);
        }, time * 1000);
        
    };
    



onMounted(() => {
    const canvas = document.getElementById('confetti-canvas');
    if (canvas) {
        confettiInstance = confetti.create(canvas, { resize: true });
    } else {
        console.error("El canvas de confeti no se encontró.");
    }
});

</script>

<style scoped>
#confetti-canvas {
    position: fixed;
    z-index: 1;
    top: 10px;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 200px;
    height: 200px;
    pointer-events: none;
}

.cubito {
    position: relative;
    transform: translateY(400px) rotateX(0deg) rotateY(0deg) rotateZ(0deg);
    width: 100%;
    z-index: 2;
    height: 100%;
    transform-style: preserve-3d;
    
}
@media (max-width: 600px) {
    #confetti-canvas {
        width: 150px;
        height: 150px;
    }
}

@media (min-width: 601px) and (max-width: 1200px) {
    #confetti-canvas {
        width: 180px;
        height: 180px;
    }
}

@media (min-width: 1201px) {
    #confetti-canvas {
        width: 200px;
        height: 200px;
    }
}

main {
    font-family: Arial, sans-serif;
    margin: 20px;
    padding: 20px;
    color: #333;
}

.contenedor {
    width: 200px;
    height: 200px;
    margin: 0 auto;
    position: relative;
    perspective: 1200px;
    top: -230px;
    transform: scale(0.5); 
    transform-origin: center;
}


.cara-cubo {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 32px;
    background-color: white;

    border: black 2px solid;
    border-radius: 8%;
}

.front {
    transform: translateZ(100px);
}

.back {
    transform: rotateY(180deg) translateZ(100px);
}

.left {
    transform: rotateY(-90deg) translateZ(100px);

}

.right {
    transform: rotateY(90deg) translateZ(100px);

}

.top {
    transform: rotateX(90deg) translateZ(100px);

}

.bottom {
    transform: rotateX(-90deg) translateZ(100px);

}

.dentro {
    display: grid;
    grid-template-columns: repeat(3, 40px);
    grid-template-rows: repeat(3, 40px);
}

.punto {
    height: 40px;
    width: 40px;
    background-color: black;
    border-radius: 50%;
    justify-self: center;
    align-items: center;
}





.front .dentro .punto {
    grid-row: 2;
    grid-column: 2;
}


.back .dentro .punto:nth-child(1) {
    grid-row: 1;
    grid-column: 1;
}

.back .dentro .punto:nth-child(2) {
    grid-row: 1;
    grid-column: 2;
}

.back .dentro .punto:nth-child(3) {
    grid-row: 1;
    grid-column: 3;
}

.back .dentro .punto:nth-child(4) {
    grid-row: 3;
    grid-column: 1;
}

.back .dentro .punto:nth-child(5) {
    grid-row: 3;
    grid-column: 2;
}

.back .dentro .punto:nth-child(6) {
    grid-row: 3;
    grid-column: 3;
}


.left .dentro .punto:nth-child(1) {
    grid-row: 1;
    grid-column: 3;
}

.left .dentro .punto:nth-child(2) {
    grid-row: 2;
    grid-column: 2;
}

.left .dentro .punto:nth-child(3) {
    grid-row: 3;
    grid-column: 1;
}


.right .dentro .punto:nth-child(1) {
    grid-row: 1;
    grid-column: 1;
}

.right .dentro .punto:nth-child(2) {
    grid-row: 1;
    grid-column: 3;
}

.right .dentro .punto:nth-child(3) {
    grid-row: 3;
    grid-column: 1;
}

.right .dentro .punto:nth-child(4) {
    grid-row: 3;
    grid-column: 3;
}

.top .dentro .punto:nth-child(1) {
    grid-row: 1;
    grid-column: 1;
}

.top .dentro .punto:nth-child(2) {
    grid-row: 1;
    grid-column: 3;
}

.top .dentro .punto:nth-child(3) {
    grid-row: 2;
    grid-column: 2;
}

.top .dentro .punto:nth-child(4) {
    grid-row: 3;
    grid-column: 1;
}

.top .dentro .punto:nth-child(5) {
    grid-row: 3;
    grid-column: 3;
}


.bottom .dentro .punto:nth-child(1) {
    grid-row: 1;
    grid-column: 3;
}

.bottom .dentro .punto:nth-child(2) {
    grid-row: 3;
    grid-column: 1;
}

h1 {
    color: #333;
}

.alert {
    color: red;
    font-weight: bold;
}

button {
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
}

button:hover {
    background-color: #45a049;
}
</style>