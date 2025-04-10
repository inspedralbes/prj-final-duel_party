<template>
    <main>
        <basket :jugadores="jugadores"/>
    </main>
</template>
<script setup>

import { reactive } from 'vue';


const jugadores = reactive([
    { username: "diego", in: true },
    { username: "elihu", in: true },
    { username: "bryan", in: true },
    { username: "abdiel", in: true }
]);

</script>