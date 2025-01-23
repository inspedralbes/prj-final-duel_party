<template>
    <main>

<div id="tablero">
<div class="ficha" :style="{ marginTop: movimiento.top + 'px',
      marginLeft: movimiento.izq + 'px',
      }"> </div>
<img src="/tablero.jpeg" srcset="">
 
</div>

<button @click="actualizarPosicion(1)"> 1 </button>   
<button @click="actualizarPosicion(2)"> 2 </button>   
<button @click="actualizarPosicion(3)"> 3 </button>   
<button @click="actualizarPosicion(4)"> 4 </button>   
<button @click="actualizarPosicion(5)"> 5 </button>   
<button @click="actualizarPosicion(6)"> 6 </button>   

</main>
</template>
<script setup>

import { reactive, ref } from 'vue';
import { Coordenadas } from '../static/tablero';

const posicionActual= ref(0);
const movimiento=reactive({top:0,izq:0});
pintarFicha(); 

function getPosicion(){
    let x = Coordenadas[posicionActual.value][0];
    let y = Coordenadas[posicionActual.value][1];
    return {x,y};

    
}
function actualizarPosicion(num) {
    let index = 0;

    function moverFicha() {
        if (index < num) {
           
            posicionActual.value += 1;

           
            if (posicionActual.value >= Coordenadas.length) {
                posicionActual.value = 0; 
            }

            
            pintarFicha();

             
            index++;

            
            setTimeout(moverFicha, 200);
        }
    } 
    moverFicha();
}



function pintarFicha(){
    let posicion = getPosicion();
    movimiento.top = posicion.x;
    movimiento.izq = posicion.y;

}

</script>
<style scoped>
#tablero {
    border: 1px solid black;
  width: fit-content; /* El div se ajustará al contenido de la imagen */
  margin: 20px auto; 
  text-align: center;
 
    
}
#tablero img{
    width: 600px;
    height: auto;
     
}
.ficha{
    height: 20px;
    width: 20px;
    background-color: red;
    border-radius: 50%;
    position: absolute;
    transition: all 0.2s ease-in;
    border: 1px solid black; 
}
</style>