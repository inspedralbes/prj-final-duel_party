<template>
    <main>
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
      <div v-if="juego===0">
        <div class="rojo">
            <div style="grid-column: 1; "> <img style="border-radius: 50%; width: auto; height: 100px;"
                    src="/avatar/boy4.png" alt=""> </div>
            <div style="grid-column: 2;  margin-top: 15px; margin-left:10px"> {{ movimiento[0].posicion }}o <br><br> 🏁
                {{ movimiento[0].vuelta }} </div>
            <div style="grid-column: span 3;  ">{{ yo.jugadores[0].username }}</div>
        </div>
        <div class="dado-rojo" v-if="turno === 0">
            <dado @resultado="actualizarPosicion" />
        </div>

        <div class="azul" v-if="nJugadores > 0">
            <div style="grid-column: 2;"> <img style="border-radius: 50%; width: auto; height: 100px;"
                    src="/avatar/boy1.png" alt=""> </div>
            <div style="grid-column: 3; margin-top: 15px; margin-left:10px"> {{ movimiento[1].posicion }}o <br><br> 🏁
                {{ movimiento[1].vuelta }} </div>
                <div style="grid-column: span 3;  ">{{ yo.jugadores[1].username }}</div>
        </div>
        <div class="dado-azul" v-if="turno === 1">
            <dado @resultado="actualizarPosicion" />
        </div>

        <div class="amarillo" v-if="nJugadores > 1">
            <div style="grid-column: 1;"> <img style="border-radius: 50%; width: auto; height: 100px;"
                    src="/avatar/boy2.png" alt=""> </div>
            <div style="grid-column: 2; margin-top: 15px; margin-left:10px"> {{ movimiento[2].posicion }}o <br><br> 🏁
                {{ movimiento[2].vuelta }} </div>
                <div style="grid-column: span 3;  ">{{ yo.jugadores[2].username }}</div>
        </div>
        <div class="dado-amarillo" v-if="turno === 2">
            <dado @resultado="actualizarPosicion" />

        </div>

        <div class="verde" v-if="nJugadores > 2">
            <div style="grid-column: 1;"> <img style="border-radius: 50%; width: auto; height: 100px;"
                    src="/avatar/boy3.png" alt=""> </div>
            <div style="grid-column: 2; margin-top: 15px; margin-left:10px"> {{ movimiento[3].posicion }}o <br><br> 🏁
                {{ movimiento[3].vuelta }} </div>
                <div style="grid-column: span 3;  ">{{ yo.jugadores[3].username }}</div>
        </div>
        <div class="dado-verde" v-if="turno === 3">
            <dado @resultado="actualizarPosicion" />
        </div>




        <div id="tablero">
            <div v-if="turno === 0">Rojo</div>
            <div v-if="turno === 1">Azul</div>
            <div v-if="turno === 3">Verde</div>
            <div v-if="turno === 2">Amarillo</div>
            <div v-if="explosion" class="explosion" :style="{
                marginTop: movimiento[turno - 1 < 0 ? nJugadores : turno - 1].top + 'px',
                marginLeft: movimiento[turno - 1 < 0 ? nJugadores : turno - 1].izq + 'px',
            }"> <img src="/explo.gif" alt="GIF"> </div>

             <!-- Basquet -->
            <img class="balon" src="/balon.png" alt="logo" id="logo" :style="{
                marginTop: miniBasquet[0].top + 'px',
                marginLeft: miniBasquet[0].izq - 9 + 'px',
            }">
            <img class="balon" src="/balon.png" alt="logo" id="logo" :style="{
                marginTop: miniBasquet[1].top - 9 + 'px',
                marginLeft: miniBasquet[1].izq + 'px',
            }">
            <img class="balon" src="/balon.png" alt="logo" id="logo" :style="{
                marginTop: miniBasquet[2].top + 'px',
                marginLeft: miniBasquet[2].izq - 9 + 'px',
            }">
            <img class="balon" src="/balon.png" alt="logo" id="logo" :style="{
                marginTop: miniBasquet[3].top - 12 + 'px',
                marginLeft: miniBasquet[3].izq + 'px',
            }">

            <!-- PPT -->
            <img class="ppt" src="/ppt1.png" alt="logo" id="logo" :style="{
                marginTop: miniPpt[0].top - 10 + 'px',
                marginLeft: miniPpt[0].izq - 9 + 'px',
            }">
            <img class="ppt" src="/ppt2.png" alt="logo" id="logo" :style="{
                marginTop: miniPpt[1].top - 9 + 'px',
                marginLeft: miniPpt[1].izq -15 + 'px',
            }">
            <img class="ppt" src="/ppt3.png" alt="logo" id="logo" :style="{
                marginTop: miniPpt[2].top - 9+ 'px',
                marginLeft: miniPpt[2].izq -17 + 'px',
            }">



            <div class="ficha1" :class="{ animacion: movimiento[0].animacion }" :style="{
                marginTop: movimiento[0].top + 'px',
                marginLeft: movimiento[0].izq + 'px',
            }"> </div>
            <div v-if="nJugadores > 0" class="ficha2" :class="{ animacion: movimiento[1].animacion }" :style="{
                marginTop: movimiento[1].top + 'px',
                marginLeft: movimiento[1].izq + 'px',
            }"> </div>
            <div v-if="nJugadores > 1" class="ficha3" :class="{ animacion: movimiento[2].animacion }" :style="{
                marginTop: movimiento[2].top + 'px',
                marginLeft: movimiento[2].izq + 'px',
            }"> </div>
            <div v-if="nJugadores > 2" class="ficha4" :class="{ animacion: movimiento[3].animacion }" :style="{
                marginTop: movimiento[3].top + 'px',
                marginLeft: movimiento[3].izq + 'px',
            }"></div>
            <img class="img" src="/tablero.jpeg" srcset="">

        </div>
    </div>
    <div v-if="juego===1">
        <basket @acabarJuego="acabarJuego"/>
    </div>
    <div v-if="juego===2">
        <ppt @acabarJuego="acabarJuego"/>
    </div>

    </main>
</template>
<script setup>

const props = defineProps({
    numero: {
        type: Number,
        required: true,
    },

},)
 
import { reactive, ref,computed } from 'vue';
import { Coordenadas } from '../static/tablero'; 
import socketManager from '../static/socket' 
import dado from './dado.vue';
import Basket from './basket.vue';

const yo= computed(() => $nuxt.$store.state);
const explosion = ref(false);
const turno = ref(0);
const juego =ref(0);
const socket= socketManager.getSocket();
const duelos= reactive([]);
const nJugadores = ref(props.numero);
const movimiento = reactive([
{ top: 60, izq: 90, animacion: false, posicionActual: -1, posicion: 1, vuelta: 0 },
{ top: 60, izq: 60, animacion: false, posicionActual: -1, posicion: 2, vuelta: 0 },
{ top: 90, izq: 90, animacion: false, posicionActual: -1, posicion: 3, vuelta: 0 },
{ top: 90, izq: 60, animacion: false, posicionActual: -1, posicion: 4, vuelta: 0 }]);

const miniBasquet = reactive([
{ top: Coordenadas[10][0], izq: Coordenadas[10][1], posicion: 10 },
{ top: Coordenadas[22][0], izq: Coordenadas[22][1], posicion: 22 },
{ top: Coordenadas[33][0], izq: Coordenadas[33][1], posicion: 33 },
{ top: Coordenadas[42][0], izq: Coordenadas[42][1], posicion: 42 }]);

const miniPpt = reactive([
{ top: Coordenadas[15][0], izq: Coordenadas[22][1], posicion: 15 },
{ top: Coordenadas[27][0], izq: Coordenadas[27][1], posicion: 27 },
{ top: Coordenadas[38][0], izq: Coordenadas[38][1], posicion: 38 }]);




function actualizarPosiciones() {
    const sortedByVuelta = [...movimiento].sort((a, b) => a.vuelta - b.vuelta);

    // Asignamos las posiciones según las vueltas
    sortedByVuelta.forEach((item, index) => {
        item.posicion = 4 - index; // Asignamos la posición 4 al que tiene menos vueltas, 1 al que tiene más
    });

    // 2. Ahora, dentro de los elementos con la misma cantidad de vuelta, ordenamos por posicionActual (de menor a mayor)
    const sortedByPosicionActual = [...movimiento].sort((a, b) => {
        if (a.vuelta === b.vuelta) {
            return a.posicionActual - b.posicionActual; // Si las vueltas son iguales, ordenamos por posicionActual
        }
        return 0; // Si las vueltas son diferentes, no cambian
    });

    // Asignamos las posiciones nuevamente según posicionActual
    sortedByPosicionActual.forEach((item, index) => {
        // Esto solo cambia el valor de `posicion`, no el orden del array
        item.posicion = 4 - index; // Posicion es asignada de acuerdo a `posicionActual`
    });
}


function getPosicion(num) {
    let x = Coordenadas[movimiento[num].posicionActual][0];
    let y = Coordenadas[movimiento[num].posicionActual][1];
    
    return {x,y};

    
}


socket.on('move', (data,username) => {
  
   
  console.log(data, username);
 

});
function actualizarPosicion(num) {
    let index = 0;

    function moverFicha() {
        if (index < num) {

            movimiento[turno.value].posicionActual += 1;
           
           
           
            if (movimiento[turno.value].posicionActual >= Coordenadas.length) {
                movimiento[turno.value].posicionActual = 0;
                movimiento[turno.value].vuelta++;
                
            }


            pintarFicha(turno.value);


            index++;


            setTimeout(moverFicha, 200);
        } else {

            dosEnCasilla(turno.value);
            
            comprobarMinijuego(movimiento[turno.value].posicionActual);


            turno.value += 1;

            if (turno.value > nJugadores.value) {
                turno.value = 0;
            }
             
           
            socket.emit('turno', turno.value, $nuxt.$store.state.roomKey);
        }
        
    } 
    moverFicha();
    
  
}

function comprobarMinijuego(num){

    if(num===10 || num===22 || num===33 || num===42 ){

        alert("MINIJUEGO, BASQUET")
        socket.emit('minijuego', 1, $nuxt.$store.state.roomKey);
        juego.value=1;
         

    }

    if(num===15 || num===27 || num===38){
        alert("MINIJUEGO, PPT");
        socket.emit('minijuego', 2, $nuxt.$store.state.roomKey);
        juego.value=2;
                          


}
}

function acabarJuego(data){
    
    juego.value=0;
    socket.emit('minijuego', 0, $nuxt.$store.state.roomKey);
    let aux = turno.value;
    turno.value=data;
    console.log("turno:" + turno.value);
    actualizarPosicion(10);
    
    setTimeout(() => {
        turno.value=aux;
    }, 3000);
    
    console.log("turno2:" + turno.value);


}

function dosEnCasilla(num) {

    let aux = movimiento[num].posicionActual;

    for (let index = 0; index < nJugadores.value+1; index++) {
         
       
        if(num === index){
            console.log(
                "hola"
            );
        }else{
            if(aux ===  movimiento[index].posicionActual){
                explosion.value = true;
                setTimeout(() => {
                    explosion.value = false;
                }, 400);
                movimiento[index].posicionActual -= 3;
                if (movimiento[index].posicionActual < 0) {
                    movimiento[index].posicionActual += Coordenadas.length;
                    movimiento[index].vuelta--;

                }
                pintarFicha(index);
                console.log("iguales");
                setTimeout(() => {
                    dosEnCasilla(index);
                }, 200);

            }


        }

    }


}

function pintarFicha(num) {
    movimiento[num].animacion = true;
    let posicion = getPosicion(num);
    movimiento[num].top = posicion.x;
    movimiento[num].izq = posicion.y;


    setTimeout(() => {
        movimiento[num].animacion = false;

    }, 200);
    actualizarPosiciones();


}

</script>
<style scoped>
@keyframes crecer {
    0% {
        transform: scale(1);
    }

    100% {
        transform: scale(1.5);
    }
}

.rojo {
    width: 200px;
    height: 125px;
    position: absolute;
    top: 0px;
    left: 0px;
    border: 1px solid black;
    border-radius: 10%;
    color: #d59b3d;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr; 
    font-family: 'Press Start 2P', cursive;
    background-color: #1c1c1c;
    box-shadow: 0px 5px 10px rgba(255, 0, 0, 0.5);
}

.dado-rojo {
    width: 200px;
    height: 100px;
    position: absolute;
    top: 0px;
    left: 0px;
    margin-top: 120px
}

.azul {
    width: 200px;
    height: 125px;
    position: absolute;
    top: 0px;
    right: 0px;
    border: 1px solid blue;
    border-radius: 10%;
    color: #d59b3d;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    font-family: 'Press Start 2P', cursive;
    background-color: #1c1c1c;
    box-shadow: 0px 5px 10px rgba(0, 0, 255, 0.5);
}

.dado-azul {
    width: 200px;
    height: 100px;
    position: absolute;
    top: 0px;
    right: 0px;
    margin-top: 120px
}

.verde {
    width: 200px;
    height: 125px;
    position: absolute;
    bottom: 0px;
    left: 0px;
    border: 1px solid black;
    border-radius: 10%;
    color: #d59b3d;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    font-family: 'Press Start 2P', cursive;
    background-color: #1c1c1c;
    box-shadow: 0px -5px 10px rgba(0, 255, 0, 0.5);
}

.dado-verde {
    width: 200px;
    height: 100px;
    position: absolute;
    bottom: 0px;
    left: 0px;
    margin-bottom: 170px;
}

.amarillo {
    width: 200px;
    height: 125px;
    position: absolute;
    bottom: 0px;
    right: 0px;
    border: 1px solid black;
    border-radius: 10%;
    color: #d59b3d;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    font-family: 'Press Start 2P', cursive;
    background-color: #1c1c1c;
    box-shadow: 0px -5px 10px rgba(128, 0, 128, 0.5)
}

.dado-amarillo {
    width: 200px;
    height: 100px;
    position: absolute;
    bottom: 0px;
    right: 0px;
    margin-bottom: 170px
}

.explosion {
    width: auto;
    height: 40px;
    position: absolute;

}

.explosion img {
    width: auto;
    height: 60px;

    position: relative;
    top: -24px;
    left: -15px;

}

.animacion {
    animation: crecer 0.1s infinite alternate;
}


#tablero {
    border: 1px solid black;
    width: fit-content;
    margin: 20px auto;
    text-align: center;


}

#tablero .img {
    width: 600px;
    height: auto;

}
.ppt{
    position: absolute;
    width: auto;
    height: 40px;
}
.balon {
    position: absolute;
    width: 40px;
    height: 40px;
}


.ficha1 {
    height: 20px;
    width: 20px;
    background-color: red;
    border-radius: 50%;
    position: absolute;
    transition: all 0.2s ease-in;
    border: 1px solid black;
}

.ficha2 {
    height: 20px;
    width: 20px;
    background-color: blue;
    border-radius: 50%;
    position: absolute;
    transition: all 0.2s ease-in;
    border: 1px solid black;
}

.ficha3 {
    height: 20px;
    width: 20px;
    background-color: purple;
    border-radius: 50%;
    position: absolute;
    transition: all 0.2s ease-in;
    border: 1px solid black;
}

.ficha4 {
    height: 20px;
    width: 20px;
    background-color: green;
    border-radius: 50%;
    position: absolute;
    transition: all 0.2s ease-in;
    border: 1px solid black;
}
</style>