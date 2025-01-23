<template>
    <main>
       
        <div class="rojo"> Rojo {{ movimiento[0].posicion }} </div>
         <div class="azul"> Azul {{ movimiento[1].posicion }} </div>
         <div class="verde"> Verde {{ movimiento[2].posicion }} </div>
         <div class="amarillo"> Amarillo {{ movimiento[3].posicion }} </div>

<div id="tablero">
    <div v-if="turno === 0">Rojo</div>
        <div v-if="turno === 1">Azul</div>
        <div v-if="turno === 3">Verde</div>
        <div v-if="turno === 2">Amarillo</div>
   <div v-if="explosion" class="explosion"  :style="{ marginTop: movimiento[turno-1<0?3 : turno-1].top + 'px',
      marginLeft: movimiento[turno-1<0?3 : turno-1].izq + 'px',
      }"> <img  src="/explo.gif" alt="GIF"> </div>



<div class="ficha1" :class="{animacion: movimiento[0].animacion  }" :style="{ marginTop: movimiento[0].top + 'px',
      marginLeft: movimiento[0].izq + 'px',
      }"> </div>
      <div class="ficha2" :class="{animacion: movimiento[1].animacion  }" :style="{ marginTop: movimiento[1].top + 'px',
      marginLeft: movimiento[1].izq + 'px',
      }"> </div>
      <div class="ficha3" :class="{animacion: movimiento[2].animacion  }" :style="{ marginTop: movimiento[2].top + 'px',
      marginLeft: movimiento[2].izq + 'px',
      }"> </div>
<div class="ficha4" :class="{animacion: movimiento[3].animacion  }" :style="{ marginTop: movimiento[3].top + 'px',
      marginLeft: movimiento[3].izq + 'px',
     }"></div>
<img class="img" src="/tablero.jpeg" srcset="">
 
</div>

<button @click="actualizarPosicion(1)" :disabled="movimiento[turno].animacion" > 1 </button>   
<button @click="actualizarPosicion(2)" :disabled="movimiento[turno].animacion" > 2 </button>   
<button @click="actualizarPosicion(3)" :disabled="movimiento[turno].animacion" > 3 </button>   
<button @click="actualizarPosicion(4)" :disabled="movimiento[turno].animacion" > 4 </button>   
<button @click="actualizarPosicion(5)" :disabled="movimiento[turno].animacion" > 5 </button>   
<button @click="actualizarPosicion(6)" :disabled="movimiento[turno].animacion" > 6 </button>   

</main>
</template>
<script setup>

import { reactive, ref } from 'vue';
import { Coordenadas } from '../static/tablero';
const animacion = ref(false);
const explosion = ref(false);
const turno = ref(0);
const nJugadores= ref(3);
const posicionActual= reactive([-1,-1,-1,-1]); 
const movimiento = reactive([{top:60,izq:90,animacion:false,posicion:1},{top:60,izq:60,animacion:false,posicion:2},{top:90,izq:90,animacion:false,posicion:3},{top:90,izq:60,animacion:false,posicion:4}]);
 



function getPosicion(num){
    let x = Coordenadas[posicionActual[num]][0];
    let y = Coordenadas[posicionActual[num]][1];
    
    return {x,y};

    
}
function actualizarPosicion(num) {
    let index = 0;

    function moverFicha() {
        if (index < num) {
           
            posicionActual[turno.value] += 1;

           
            if (posicionActual[turno.value] >= Coordenadas.length) {
                posicionActual[turno.value] = 0; 
            }

            
            pintarFicha(turno.value);

             
            index++;

            
            setTimeout(moverFicha, 200);
        } else{

            dosEnCasilla(turno.value);
            turno.value += 1;
          
            if(turno.value>nJugadores.value){
                turno.value = 0;
            }
           
        }
    } 
    moverFicha();
   
}

function dosEnCasilla(num){
   
    let aux = posicionActual[num];

    for (let index = 0; index < nJugadores.value; index++) {
         
       
        if(num === index){
         
        }else{
            if(aux === posicionActual[index]){
                explosion.value = true;
                setTimeout(() => {
                    explosion.value = false;
                }, 400);
                posicionActual[index]-=3;
                if(posicionActual[index]<0){
                    posicionActual[index] += Coordenadas.length;
                    //numeo vueltas --
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

function pintarFicha(num){
    movimiento[num].animacion = true;
    let posicion = getPosicion(num);
    movimiento[num].top = posicion.x;
    movimiento[num].izq = posicion.y;
    setTimeout(() => {
  movimiento[num].animacion = false;
}, 200);
    
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

.rojo{width: 200px; height: 100px; position: absolute;
top: 0px;
left: 0px;
border: 1px solid black;
}
.azul{width: 200px; height: 100px;
position: absolute;
top: 0px;
right: 0px;
border: 1px solid black;
}
.verde{width: 200px; height: 100px;
position: absolute;
bottom: 0px;
left: 0px;
border: 1px solid black;

}
.amarillo{width: 200px; height: 100px;
position: absolute;
bottom: 0px;
right: 0px;
border: 1px solid black;
}


.explosion{
    width: auto;
    height:40px;
    position: absolute;
    
}
.explosion img{
    width: auto;
    height: 60px;
    
    position: relative;
    top:-24px;
    left: -15px;
    
}
.animacion{
    animation: crecer 0.1s infinite alternate;
}


#tablero {
    border: 1px solid black;
  width: fit-content;  
  margin: 20px auto; 
  text-align: center;
 
    
}
#tablero .img{
    width: 600px;
    height: auto;
     
}
.ficha1{
    height: 20px;
    width: 20px;
    background-color: red;
    border-radius: 50%;
    position: absolute;
    transition: all 0.2s ease-in;
    border: 1px solid black; 
}

.ficha2{
    height: 20px;
    width: 20px;
    background-color: blue;
    border-radius: 50%;
    position: absolute;
    transition: all 0.2s ease-in;
    border: 1px solid black; 
}

.ficha3{
    height: 20px;
    width: 20px;
    background-color: yellow;
    border-radius: 50%;
    position: absolute;
    transition: all 0.2s ease-in;
    border: 1px solid black; 
}

.ficha4{
    height: 20px;
    width: 20px;
    background-color: green;
    border-radius: 50%;
    position: absolute;
    transition: all 0.2s ease-in;
    border: 1px solid black; 
}
</style>