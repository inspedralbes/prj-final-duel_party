<template>
    <main>
       
        <div class="rojo"> Rojo {{ movimiento[0].posicion }} vueltas {{ movimiento[0].vuelta }} </div>
         <div class="azul"> 
            <div style="grid-column: 1;"> <img style="border-radius: 50%; width: auto; height: 100px;" src="/avatar/boy1.png" alt=""> </div>
            <div style="grid-column: 2; margin-top: 15px;">Posicion   {{ movimiento[1].posicion }} <br><br> Vueltas {{ movimiento[1].vuelta }} </div>
          
           
             </div>
         <div class="amarillo"> Amarillo {{ movimiento[2].posicion }} vueltas {{ movimiento[2].vuelta }}  </div>
         <div class="verde"> Verde  {{ movimiento[3].posicion }} vueltas {{ movimiento[3].vuelta }}  </div>
       
         
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
const movimiento = reactive([{top:60,izq:90,animacion:false,posicionActual:-1,posicion:1,vuelta:0},
                            {top:60,izq:60,animacion:false,posicionActual:-1,posicion:2,vuelta:0},
                            {top:90,izq:90,animacion:false,posicionActual:-1,posicion:3,vuelta:0},
                            {top:90,izq:60,animacion:false,posicionActual:-1,posicion:4,vuelta:0}]);
                    
 


 function actualizarPosiciones(){
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


function getPosicion(num){
    let x = Coordenadas[movimiento[num].posicionActual][0];
    let y = Coordenadas[movimiento[num].posicionActual][1];
    
    return {x,y};

    
}
function actualizarPosicion(num) {
    let index = 0;

    function moverFicha() {
        if (index < num) {
           
            movimiento[turno.value].posicionActual += 1;
            console.log(movimiento[turno.value].posicionActual);
           
           
            if (movimiento[turno.value].posicionActual >= Coordenadas.length) {
                movimiento[turno.value].posicionActual = 0; 
                movimiento[turno.value].vuelta++;
                console.log(movimiento[turno.value].posicionActual);
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
   
    let aux = movimiento[num].posicionActual;

    for (let index = 0; index < nJugadores.value; index++) {
         
       
        if(num === index){
         
        }else{
            if(aux ===  movimiento[index].posicionActual){
                explosion.value = true;
                setTimeout(() => {
                    explosion.value = false;
                }, 400);
                movimiento[index].posicionActual-=3;
                if(movimiento[index].posicionActual<0){
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

function pintarFicha(num){
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

.rojo{width: 200px; height: 100px; position: absolute;
top: 0px;
left: 0px;
border: 1px solid black;
background-color: red;
border-radius: 10%; 
}
.azul{width: 200px; height: 100px;
position: absolute;
top: 0px;
right: 0px;
border: 1px solid black;
background-color: blue;
border-radius: 10%;
color: white;
display: grid;
grid-template-columns: 1fr 1fr;
}
.verde{width: 200px; height: 100px;
position: absolute;
bottom: 0px;
left: 0px;
border: 1px solid black;
background-color: green;
border-radius: 10%;

}
.amarillo{width: 200px; height: 100px;
position: absolute;
bottom: 0px;
right: 0px;
border: 1px solid black;
background-color: yellow;
border-radius: 10%;
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