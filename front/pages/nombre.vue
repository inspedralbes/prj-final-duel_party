<template>
    <main>
 <input type="text" v-model="nombre" class="" placeholder="nombre"/>
 <button @click="siguiente" > Siguiente</button>
</main>
</template>

<script setup>

import { ref } from 'vue'; 
const nombre=ref("");


function siguiente(){

    if(nombre.value==""){
        alert("pon Nombre")
    }else{
    $nuxt.$store.dispatch('updateNamePlayer', nombre.value)
    $nuxt.$router.push('/jugar');
}
}

</script>
<style scoped>
</style>
