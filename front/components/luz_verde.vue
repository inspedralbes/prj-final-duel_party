<template>
    <main>
        <img class="fondo" src="/images/luz_verde/fondo.webp" alt="">
    <div :style="{left:fichas.rojo+'%'}" class="rojo" @click="mover(1)"></div>
    <div :style="{left:fichas.azul+'%'}" class="azul" @click="mover(2)"></div>
    <div :style="{ backgroundColor: fichas.correr ? 'green' : 'red' }" class="meta"> </div>
    
</main>
</template>
<script setup>

import { reactive} from 'vue';

const fichas=reactive({ rojo:5,azul:5,correr:true});
 

function mover(data){

    switch(data){
        case 1:
            if(fichas.correr){
                fichas.rojo+=5;
                if(fichas.rojo==100){
                    alert("ganador rojo");
                }
            }else{
                fichas.rojo-=20;
                if(fichas.rojo<0){
                    fichas.rojo=0;
                }
            }
          
            break;
        case 2:
        if(fichas.correr){
                fichas.azul+=5;
                if(fichas.azul==100){
                    alert("ganador azul");
                }
            }else{
                fichas.azul-=20;
                if(fichas.azul<0){
                    fichas.azul=0;
                }
            }
            break;

    }
   
    console.log(fichas.azul);
    
}
cambiarEstadoAleatorio();
function cambiarEstadoAleatorio() {
  const tiempo = Math.floor(Math.random() * 1500) + 100  

  setTimeout(() => {
   // fichas.correr = !fichas.correr
    cambiarEstadoAleatorio() 
  }, tiempo)
}

</script>
<style scoped>
.fondo {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}
.meta{
    width: 50px;
    height: 500px; 
    position: absolute;
    top: 10%;
    left: 90%; 
}
.rojo{
    width: 50px;
    height: 50px;
    background-color: red;
    position: absolute;
    top: 30%; 
    transform: translate(-50%, -50%);
    border-radius: 50%;
    transition: 0.5s ease;
}
.azul{
    width: 50px;
    height: 50px;
    background-color: blue;
    position: absolute;
    top: 70%; 
    transform: translate(-50%, -50%);
    border-radius: 50%;
    transition: 0.5s ease;
}
</style>