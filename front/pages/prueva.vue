<template>
    <main>
        <basket :data="data" :jugadores="jugadores"/>
    </main>
</template>
<script setup>

import { reactive } from 'vue';

const data= reactive({
    "id": 1,
    "operacion": "5 + 3",
    "respuesta_correcta": 8,
    "respuestaIncorrecta_1": 9,
    "respuestaIncorrecta_2": 7,
    "respuestaIncorrecta_3": 10,
    "nivel": 1,
    "duracion": 24

})

const jugadores = reactive([
    { username: "diego", in: true },
    { username: "elihu", in: true },
    { username: "bryan", in: true },
    { username: "abdiel", in: true }
]);

</script>