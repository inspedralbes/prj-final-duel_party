<template>
    <main>
    <div style="position: relative; width: 100vw; height: 100vh; overflow: hidden;">
      <img class="fondo" src="/images/penales/fondo.webp" alt="">
      <div v-if="menu===0">
     
      <img class="porteria" src="/images/penales/porteria.webp" alt="">


 

     <img class="portero"  :class="{centro_portero:animaciones.centro_portero, 
                                    izquierda_portero:animaciones.izquierda_portero,
                                    derecha_portero:animaciones.derecha_portero}" 
       :src="`/images/penales/portero_${portero}.webp`" >


      <img class="balon" :class="{centro:animaciones.centro, 
                                    izquierda:animaciones.izquierda,
                                    derecha:animaciones.derecha}" 
        src="/images/penales/balon.webp" alt="" @click="mover">
    </div>



      <div v-if="menu===1 || menu===2">
        <img v-if="menu===1" class="pantalla_portero" :src="`/images/penales/portero_${portero}.webp`"  alt="">
        <img v-if="menu===2" class="pantalla_balon" :src="`/images/penales/balon.webp`"  alt="">

        <img class="flecha" :src="`/images/penales/flecha_${portero}.webp`"  alt="">
        <img class="flecha_der" :src="`/images/penales/flecha_${portero}.webp`"  alt="">
        <img class="flecha_izq" :src="`/images/penales/flecha_${portero}.webp`"  alt="">
      </div>

      

    </div>
</main>
  </template>
   
   <script setup>

   import { reactive, ref } from 'vue';
   

    // 0 = general 1 = portero 2 = jugador
   const menu=ref(0);
   const portero=ref("rojo");

     const animaciones=reactive({
       izquierda:false,
       derecha:false,
       centro:false,
       izquierda_portero:false,
       derecha_portero:false,
       centro_portero:false
   
   });

   const penal=reactive({
    portero:"izquierda",
    jugador:"centro",
    gol:"", 
   });


   
    function mover(){

        animaciones[`${penal.jugador}`]=true;
        animaciones[`${penal.portero}_portero`]=true;
        setTimeout(()=>{
            animaciones[`${penal.jugador}`]=false;
            animaciones[`${penal.portero}_portero`]=false;
        },500);

    }
    
 


     </script>
  <style scoped>


  @keyframes izquierda {
    0%{
        transform: translateX(-50%);
    }100%{
        transform: translate(-250%,-300%); 
    }
  }

  @keyframes derecha {
    0%{
        transform: translateX(-50%);
    }100%{
        transform: translate(150%,-300%); 
    }
  }
  @keyframes centro {
    0%{
        transform: translateX(-50%);
    }100%{
        transform: translate(-50%,-300%); 
    }
  }

  @keyframes izquierda_portero {
    0%{
        transform: translateX(-50%);

    } 100%{
        transform: translate(-150%,-30%) rotate(-90deg);
        
    }
  }

  @keyframes derecha_portero {
    0%{
        transform: translateX(-50%);

    } 100%{
        transform: translate(80%,-30%) rotate(90deg);
        
    }
  }
  @keyframes centro_portero {
    0%{
        transform: translateX(-50%);
    }100%{
        transform: translate(-50%,-50%); 
    }
  }


  .fondo {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
  }
  
  .porteria {
    position: absolute;
    bottom:27%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
    width: 50%;
  }
  
  .balon {
    position: absolute;
    bottom: 10%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    width: 7%;  
    
  }

  .portero {
    position: absolute;
    bottom: 40%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    width: 12%;  
  }

  .centro{
    animation: centro 0.5s linear;
  }
  .izquierda{
    animation: izquierda 0.5s linear;
  }
  .derecha{
    animation: derecha 0.5s linear;
  }

  .izquierda_portero{
    animation: izquierda_portero 0.5s linear;
  }
  .derecha_portero{
    animation: derecha_portero 0.5s linear;
  }
  .centro_portero{
    animation: centro_portero 0.5s linear;
  }

  .pantalla_portero{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -20%);
    z-index: 2;
    width: 25%;  
  }
  .pantalla_balon{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -20%);
    z-index: 2;
    width: 20%; 
  }
  .flecha{
    position: absolute;
    top: 25%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    width: 15%;
  }
  .flecha_izq{
    position: absolute;
    top: 70%;
    left: 30%;
    transform: translate(-50%, -50%)rotate(270deg);
    z-index: 2;
    width: 15%;
  }
  .flecha_der{
    position: absolute;
    top: 70%;
    left: 70%;
    transform: translate(-50%, -50%) rotate(90deg);
    z-index: 2;
    width: 15%;
    
  }
  .pantalla_jugador{
    width: 100%;
  }
  </style>
 
  